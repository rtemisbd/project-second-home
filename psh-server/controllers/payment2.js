import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { getValue, setValue } from "node-global-storage";
import config from "../config/index.js";
import OrderModel from "../models/Order.js";
import mongoose, { startSession } from "mongoose";
import { generateBookingId } from "../utils/generateBookingId.js";
import { bookingSms } from "../SMS/BookingSms.js";
import RentRoom from "../models/RentRoom.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

import sendResponse from "../shared/sendResponse.js";
import { orderServices } from "../services/order.service.js";

// Helper to prepare bkash headers
const bkashHeaders = async () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    authorization: getValue("id_token"),
    "X-App-Key": config.bkash_api_key,
  };
};

// Create Payment Method
const paymentCreate = async (req, res) => {
  const session = await startSession();

  try {
    await session.withTransaction(
      async () => {
        const { amount, selectMethod, dataForBooking } = req.body;
        const { userInfo, ...bookingData } = dataForBooking;

        // Step 1: Find User
        const findUser = await User.findOne({
          _id: bookingData?.userId,
        }).session(session);
        if (!findUser) {
          throw new Error("Sorry! User Not Found");
        }

        // Step 2: Set user context
        await setValue("userId", bookingData?.userId);

        // Step 3: Update user information
        const userUpdate = {
          firstName: userInfo?.fullName,
          phone: userInfo?.phone,
          userAddress: userInfo?.address,
          validityType: userInfo?.validityType,
          emergencyContact: {
            contactName: userInfo?.emergencyContactName,
            relation: userInfo?.emergencyRelationC,
            contactNumber: userInfo?.emergencyContact,
          },
        };

        await User.updateOne(
          { phone: userInfo?.phone },
          { $set: userUpdate },
          { runValidators: true, session },
        );

        // Step 4: Generate booking ID
        const generateId = await generateBookingId();
        bookingData.bookingId = generateId;
        bookingData.dueAmount = bookingData.payableAmount;

        // Step 5: Handle payment type
        if (selectMethod === "manual") {
          const result = await orderServices.createOrderByManualBkash(
            bookingData,
            session,
          );
          sendResponse(res, {
            statusCode: 200,
            success: true,
            data: result,
            message:
              "Thank You! Your Booking Successfully Done, We will contact you very soon.",
          });
        } else if (selectMethod === "cash") {
          const result = await orderServices.createOrderByCash(
            bookingData,
            session,
          );
          sendResponse(res, {
            statusCode: 200,
            success: true,
            data: result,
            message:
              "Thank You! Your Booking Successfully Done, We will contact you very soon.",
          });
        } else {
          setValue("dataForBooking", bookingData);

          const { data } = await axios.post(
            config.bkash_create_payment_url,
            {
              mode: "0011",
              payerReference: " ",
              callbackURL: `${config.server_url}/bkash/payment/callback`,
              amount: amount,
              currency: "BDT",
              intent: "sale",
              merchantInvoiceNumber: "Inv" + uuidv4().substring(0, 5),
            },
            { headers: await bkashHeaders() },
          );

          return res.status(200).json({ bkashURL: data.bkashURL });
        }
      },
      {
        // optional: retry writes enabled
        readConcern: { level: "local" },
        writeConcern: { w: "majority" },
      },
    );
  } catch (error) {
    if (error.hasErrorLabel?.("TransientTransactionError")) {
      console.warn("⚠️ Retrying transaction due to transient error...");
      return paymentCreate(req, res); // retry once
    }
    console.error("Payment create failed:", error);
    return res.status(500).json({ error: error.message });
  } finally {
    await session.endSession();
  }
};

// Callback Method (After Payment Confirmation)
const callBack = async (req, res) => {
  const { paymentID, status } = req.query;
  const dataForBooking = getValue("dataForBooking");

  if (status === "cancel" || status === "failure") {
    return res.redirect(`${config.client_url}/error?message=${status}`);
  }

  const session = await mongoose.startSession();

  try {
    if (status === "success") {
      const { data } = await axios.post(
        config.bkash_execute_payment_url,
        { paymentID },
        { headers: await bkashHeaders() },
      );

      if (!data || data.statusCode !== "0000") {
        throw new Error(
          data?.statusMessage || "Bkash payment execution failed",
        );
      }

      let orderResult;

      await session.withTransaction(async () => {
        // Mark booking details
        dataForBooking.status = "Approved";
        dataForBooking.paymentStatus =
          dataForBooking.payableAmount === dataForBooking.receivedTk
            ? "Paid"
            : "Unpaid";
        dataForBooking.dueAmount =
          dataForBooking.payableAmount - dataForBooking.receivedTk;

        // Save order
        const order = new OrderModel({ ...dataForBooking });
        orderResult = await order.save({ session });

        // Save transaction
        const newTransaction = new Transaction({
          orderId: orderResult._id,
          branch: dataForBooking.branch,
          paymentDate: new Date(),
          totalAmount: dataForBooking.totalAmount,
          payableAmount: dataForBooking.payableAmount,
          paymentType: "bkash",
          receivedTk: parseInt(data.amount),
          paymentNumber: data.customerMsisdn,
          transactionId: data.trxID,
          userId: dataForBooking.userId,
          acceptableStatus: "Accepted",
        });

        await newTransaction.save({ session });

        // Save rent collection
        const newRent = new RentRoom({
          bookStartDate: dataForBooking.rentDate.bookStartDate,
          bookEndDate: dataForBooking.rentDate.bookEndDate,
          roomId: dataForBooking.roomId,
          roomType: dataForBooking.roomType,
          seatId: dataForBooking.seatBooking?._id,
          bookingId: orderResult._id,
          branch: dataForBooking.branch,
          userId: dataForBooking.userId,
        });

        await newRent.save({ session });
      });

      // ⚠️ Only after commit send SMS
      const bookingMessage = `/api/smsapi?api_key=${config.sms_api_key}&type=text&number=88${dataForBooking.phone}&senderid=8809648906324&message=Your%20booking%20with%20Project%20Second%20Home%20is%20Confirmed!%20Booking%20ID%3A%23${orderResult._id}.%20Check-in%3A%${dataForBooking.rentDate.bookStartDate}%2C%20Check-out%3A%${dataForBooking.rentDate.bookEndDate}.%20Call%20Us%3A%2001647647404.%20Enjoy%20your%20stay!%20-%20PSH`;

      await bookingSms(bookingMessage);

      return res.redirect(`${config.client_url}/success`);
    }
  } catch (error) {
    return res.redirect(
      `${config.client_url}/error?message=${encodeURIComponent(error.message)}`,
    );
  } finally {
    session.endSession();
  }
};

// bkash callback for user transaction
const callbackForUser = async (req, res) => {
  const { paymentID, status } = req.query;
  const order = getValue("order");
  if (status === "cancel" || status === "failure") {
    return res.redirect(`${config.client_url}/error?message=${status}`);
  }

  if (status === "success") {
    try {
      // Fetch the payment execution data
      const { data } = await axios.post(
        config.bkash_execute_payment_url,
        { paymentID },
        {
          headers: await bkashHeaders(),
        },
      );

      if (data && data.statusCode === "0000") {
        // Start Create user transaction
        const newTransaction = {
          orderId: order?.orderId,
          branch: order?.branch,
          paymentDate: new Date(),
          totalAmount: order?.totalAmount,
          payableAmount: order?.payableAmount,
          paymentType: "bkash",
          receivedTk: parseInt(data?.amount),
          paymentNumber: data?.customerMsisdn,
          transactionId: data.trxID,
          userId: order?.userId,
          userPhone: order?.userPhone,
          userName: order?.userName,
          acceptableStatus: "Accepted",
        };

        await Transaction.create(newTransaction);

        return res.redirect(`${config.client_url}/success`);
      } else {
        return res.redirect(
          `${config.client_url}/error?message=${data.statusMessage}`,
        );
      }
    } catch (error) {
      return res.redirect(
        `${config.client_url}/error?message=${error.message}`,
      );
    }
  }
};

// Refund Method
// const refund = async (req, res) => {
//   const { trxID } = req.params;

//   // Start MongoDB session for transaction
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const payment = await Payment2.findOne({ trxID }).session(session);

//     const { data } = await axios.post(
//       process.env.bkash_refund_transaction_url,
//       {
//         paymentID: payment.paymentID,
//         amount: payment.amount,
//         trxID,
//         sku: "payment",
//         reason: "cashback",
//       },
//       {
//         headers: await bkashHeaders(),
//       }
//     );

//     if (data && data.statusCode === "0000") {
//       // Commit the transaction if refund is successful
//       await session.commitTransaction();
//       session.endSession();
//       return res.status(200).json({ message: "refund success" });
//     } else {
//       // Abort transaction if refund failed
//       await session.abortTransaction();
//       session.endSession();
//       return res.status(404).json({ error: "refund failed" });
//     }
//   } catch (error) {
//     // Abort transaction if any error occurs
//     await session.abortTransaction();
//     session.endSession();
//     return res.status(404).json({ error: "refund failed" });
//   }
// };

export const PaymentController2 = {
  paymentCreate,
  callBack,
  callbackForUser,
};
