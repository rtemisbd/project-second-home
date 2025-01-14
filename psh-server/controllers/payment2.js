import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { getValue, setValue } from "node-global-storage";
import config from "../config/index.js";

import OrderModel from "../models/Order.js";
import mongoose from "mongoose"; // MongoDB session handling
import { generateBookingId } from "../utils/generateBookingId.js";
import { bookingSms } from "../SMS/BookingSms.js";
import RentRoom from "../models/RentRoom.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import { createOrderByManualBkash } from "../services/order.service.js";
import sendResponse from "../shared/sendResponse.js";

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
  const { amount, selectMethod, dataForBooking } = req.body;

  // Find User
  const findUser = await User.findOne({
    _id: dataForBooking?.userId,
  });

  if (!findUser) {
    return new Error("Sorry! User Not Found"); //   User Not Exist
  }
  // If Manual Payment
  if (selectMethod === "manual") {
    const result = await createOrderByManualBkash(dataForBooking);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      data: result,
      message:
        "Thank You! Your Booking Successfully Done, We will contact you very soon.",
    });
  } else {
    setValue("dataForBooking", dataForBooking);

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
        const generateId = await generateBookingId();

        dataForBooking.bookingId = generateId;
        dataForBooking.status = "Approved";

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
          totalAmount: dataForBooking?.bookingInfo?.totalAmount,
          payableAmount: dataForBooking?.payableAmount,
          paymentType: "bkash",
          receivedTk: parseInt(data?.amount),
          paymentNumber: data?.customerMsisdn,
          transactionId: data.trxID,
          userId: dataForBooking?.userId,
          userPhone: dataForBooking?.phone,
          userName: dataForBooking?.fullName,
          acceptableStatus: "Accepted",
        });

        await newTransaction.save({ session });
        // End Create User Transaction

        // Create rent collection
        const newRent = new RentRoom({
          bookStartDate: dataForBooking?.bookingInfo?.rentDate?.bookStartDate,
          bookEndDate: dataForBooking?.bookingInfo?.rentDate?.bookEndDate,
          roomId: dataForBooking?.bookingInfo?.roomId,
          roomNumber: dataForBooking?.bookingInfo?.data?.roomNumber,
          roomType: dataForBooking?.bookingInfo?.roomType,
          seatId: dataForBooking?.bookingInfo?.seatBooking?._id,
          seatNumber: dataForBooking?.bookingInfo?.seatBooking?.seatNumber,
          bookingId: dataForBooking?._id,
          branch: dataForBooking?.bookingInfo?.branch?._id,
          userId: dataForBooking?.userId,
        });
        await newRent.save({ session });
        //  End Create Rent Collection

        // Phone SMS for booking
        const bookingMessage = `/api/smsapi?api_key=${config.sms_api_key}&type=text&number=88${dataForBooking?.phone}&senderid=8809617617196&message=Your%20booking%20with%20Project%20Second%20Home%20is%20Confirmed!%20Booking%20ID%3A%23${dataForBooking?.bookingId}.%20Check-in%3A%${dataForBooking?.bookingInfo?.rentDate?.bookStartDate}%2C%20Check-out%3A%${dataForBooking?.bookingInfo?.rentDate?.bookEndDate}.%20Call%20Us%3A%2001647647404.%20Enjoy%20your%20stay!%20-%20PSH`;

        await bookingSms(bookingMessage);

        // Start Update user information
        const userUpdate = {
          firstName: dataForBooking?.fullName,
          phone: dataForBooking?.phone,
          userAddress: dataForBooking?.address,
          validityType: dataForBooking?.validityType,
          emergencyContact: {
            contactName: dataForBooking?.emergencyContactName,
            relation: dataForBooking?.emergencyRelationC,
            contactNumber: dataForBooking?.emergencyContact,
          },
        };

        await User.updateOne(
          { _id: dataForBooking?.userId },
          { $set: userUpdate },
          { runValidators: true, session }
        );
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
};
