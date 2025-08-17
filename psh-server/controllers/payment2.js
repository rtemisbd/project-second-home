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

  session.startTransaction();
  const { amount, selectMethod, dataForBooking } = req.body;
  const { userInfo, ...bookingData } = dataForBooking;

  // Find User
  const findUser = await User.findOne({
    _id: bookingData?.userId,
  });

  if (!findUser) {
    return new Error("Sorry! User Not Found"); //   User Not Exist
  }

  // Set user context
  await setValue("userId", bookingData?.userId);

  // Step 1: Update user information
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
    { runValidators: true, session }
  );

  // Step 2: Generate booking ID
  const generateId = await generateBookingId();
  bookingData.bookingId = generateId;
  bookingData.dueAmount = bookingData.payableAmount;
  // If Manual Payment
  if (selectMethod === "manual") {
    const result = await orderServices.createOrderByManualBkash(bookingData);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      data: result,
      message:
        "Thank You! Your Booking Successfully Done, We will contact you very soon.",
    });
  } else if (selectMethod === "cash") {
    const result = await orderServices.createOrderByCash(bookingData);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      data: result,
      message:
        "Thank You! Your Booking Successfully Done, We will contact you very soon.",
    });
  } else {
    setValue("dataForBooking", bookingData);

    try {
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
        {
          headers: await bkashHeaders(),
        }
      );

      return res.status(200).json({ bkashURL: data.bkashURL });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
};

// Callback Method (After Payment Confirmation)
const callBack = async (req, res) => {
  const { paymentID, status } = req.query;

  const dataForBooking = getValue("dataForBooking");

  if (status === "cancel" || status === "failure") {
    return res.redirect(`${config.client_url}/error?message=${status}`);
  }

  // Start MongoDB session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  if (status === "success") {
    try {
      // Fetch the payment execution data
      const { data } = await axios.post(
        config.bkash_execute_payment_url,
        { paymentID },
        {
          headers: await bkashHeaders(),
        }
      );

      if (data && data.statusCode === "0000") {
        // Start Create Booking
        // const generateId = await generateBookingId();

        // dataForBooking.bookingId = generateId;
        dataForBooking.status = "Approved";
        dataForBooking.paymentStatus =
          dataForBooking?.payableAmount === dataForBooking?.receivedTk
            ? "Paid"
            : "Unpaid";
        dataForBooking.dueAmount =
          dataForBooking?.payableAmount - dataForBooking?.receivedTk;
        const orderData = new OrderModel({
          ...dataForBooking,
        });

        const result = await orderData.save({ session });

        // End Create Booking

        // Start Create user transaction
        const newTransaction = new Transaction({
          orderId: result?._id,
          branch: dataForBooking?.branch,
          paymentDate: new Date(),
          totalAmount: dataForBooking?.totalAmount,
          payableAmount: dataForBooking?.payableAmount,
          paymentType: "bkash",
          receivedTk: parseInt(data?.amount),
          paymentNumber: data?.customerMsisdn,
          transactionId: data.trxID,
          userId: dataForBooking?.userId,
          // userPhone: dataForBooking?.phone,
          // userName: dataForBooking?.fullName,
          acceptableStatus: "Accepted",
        });

        await newTransaction.save({ session });
        // End Create User Transaction

        // Create rent collection
        const newRent = new RentRoom({
          bookStartDate: dataForBooking?.rentDate?.bookStartDate,
          bookEndDate: dataForBooking?.rentDate?.bookEndDate,
          roomId: dataForBooking?.roomId,
          // roomNumber: dataForBooking?.data?.roomNumber,
          roomType: dataForBooking?.roomType,
          seatId: dataForBooking?.seatBooking?._id,
          // seatNumber: dataForBooking?.seatBooking?.seatNumber,
          bookingId: dataForBooking?._id,
          branch: dataForBooking?.branch,
          userId: dataForBooking?.userId,
        });
        await newRent.save({ session });
        //  End Create Rent Collection

        // Phone SMS for booking
        const bookingMessage = `/api/smsapi?api_key=${config.sms_api_key}&type=text&number=88${dataForBooking?.phone}&senderid=8809617617196&message=Your%20booking%20with%20Project%20Second%20Home%20is%20Confirmed!%20Booking%20ID%3A%23${dataForBooking?.bookingId}.%20Check-in%3A%${dataForBooking?.rentDate?.bookStartDate}%2C%20Check-out%3A%${dataForBooking?.rentDate?.bookEndDate}.%20Call%20Us%3A%2001647647404.%20Enjoy%20your%20stay!%20-%20PSH`;

        await bookingSms(bookingMessage);

        // Start Update user information
        // const userUpdate = {
        //   firstName: dataForBooking?.fullName,
        //   phone: dataForBooking?.phone,
        //   userAddress: dataForBooking?.address,
        //   validityType: dataForBooking?.validityType,
        //   emergencyContact: {
        //     contactName: dataForBooking?.emergencyContactName,
        //     relation: dataForBooking?.emergencyRelationC,
        //     contactNumber: dataForBooking?.emergencyContact,
        //   },
        // };

        // await User.updateOne(
        //   { _id: dataForBooking?.userId },
        //   { $set: userUpdate },
        //   { runValidators: true, session }
        // );
        // End Update User

        // Commit the transaction if both operations are successful
        await session.commitTransaction();
        session.endSession();

        return res.redirect(`${config.client_url}/success`);
      } else {
        // Abort transaction if payment execution failed
        await session.abortTransaction();
        session.endSession();
        return res.redirect(
          `${config.client_url}/error?message=${data.statusMessage}`
        );
      }
    } catch (error) {
      // Abort transaction if any error founds
      await session.abortTransaction();
      session.endSession();
      return res.redirect(
        `${config.client_url}/error?message=${error.message}`
      );
    }
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
        }
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
          `${config.client_url}/error?message=${data.statusMessage}`
        );
      }
    } catch (error) {
      return res.redirect(
        `${config.client_url}/error?message=${error.message}`
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
