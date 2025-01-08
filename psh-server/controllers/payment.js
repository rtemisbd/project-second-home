import axios from "axios";
import { getValue, setValue } from "node-global-storage";
import { v4 as uuidv4 } from "uuid";
import Payment from "../models/payment.js";
import config from "../config/index.js";
import { bkash_headers } from "../utils/bkash_headers.js";
import { startSession } from "mongoose";
import { bookingSms } from "../SMS/BookingSms.js";
import OrderModel from "../models/Order.js";
import Transaction from "../models/Transaction.js";
import RentRoom from "../models/RentRoom.js";

// Function to create a payment
const payment_create = async (req, res) => {
  const { amount, userId } = req.body;
  console.log(req.body);

  setValue("userId", userId);

  try {
    const { data } = await axios.post(
      config.bkash_create_payment_url,
      {
        mode: "0011",
        payerReference: " ",
        callbackURL: `${config.server_url}/bkash/payment/callback`,
        amount,
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: "Inv" + uuidv4().substring(0, 5),
      },
      {
        headers: await bkash_headers(),
      }
    );
    return res.status(200).json({ bkashURL: data.bkashURL });
  } catch (error) {
    // console.error("Error during payment creation:", error);
    return res.status(401).json({ error: error.message });
  }
};

// Callback function after payment
const call_back = async (req, res) => {
  const { paymentID, status, callbackData } = req.query;

  if (status === "cancel" || status === "failure") {
    return res.redirect(`${config.client_url}/error?message=${status}`);
  }

  if (status === "success") {
    try {
      // Step 4: Execute payment via bKash
      const response = await fetch(config.bkash_execute_payment_url, {
        method: "POST",
        headers: await bkash_headers(getValue("id_token")),
        body: JSON.stringify({ paymentID }),
      });

      if (!response.ok) {
        throw new Error(
          `Error executing payment: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data && data.statusCode === "0000") {
        // Step 5: Create order
        const dataForBooking = await JSON.parse(
          decodeURIComponent(callbackData)
        );

        dataForBooking.paymentType = "bkash";
        dataForBooking.status = "Approved";
        dataForBooking.paymentNumber = data?.customerMsisdn;
        dataForBooking.transactionId = data?.trxID;
        dataForBooking.receivedTk = parseInt(data?.amount);

        const result = await OrderModel.create(dataForBooking);

        // Step 6: Create user transaction
        await Transaction.create({
          orderId: result?._id,
          branch: dataForBooking?.branch,
          paymentDate: new Date(),
          totalAmount: dataForBooking?.bookingInfo?.totalAmount,
          payableAmount: dataForBooking?.payableAmount,
          paymentType: "bkash",
          receivedTk: parseInt(data?.amount),
          paymentNumber: data?.customerMsisdn,
          transactionId: data?.trxID,
          userId: getValue("userId"),
          userPhone: dataForBooking?.phone,
          userName: dataForBooking?.fullName,
          acceptableStatus: "Accepted",
        });

        // Step 7: Create rent collection
        await RentRoom.create({
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

        // Phone SMS for booking
        const bookingMessage = `/api/smsapi?api_key=${config.sms_api_key}&type=text&number=88${dataForBooking?.phone}&senderid=8809617617196&message=Your%20booking%20with%20Project%20Second%20Home%20is%20Confirmed!%20Booking%20ID%3A%23${dataForBooking?.bookingId}.%20Check-in%3A%${dataForBooking?.bookingInfo?.rentDate?.bookStartDate}%2C%20Check-out%3A%${dataForBooking?.bookingInfo?.rentDate?.bookEndDate}.%20Call%20Us%3A%2001647647404.%20Enjoy%20your%20stay!%20-%20PSH`;

        await bookingSms(bookingMessage);
        return await res.redirect(`${config.client_url}/success`);
      } else {
        throw new Error(data.statusMessage || "Payment execution failed");
      }
    } catch (error) {
      return await res.redirect(
        `${config.client_url}/error?message=${encodeURIComponent(
          error.message
        )}`
      );
    }
  }
};

// Function to refund a payment
const refund = async (req, res) => {
  const { trxID } = req.params;

  try {
    const payment = await Payment.findOne({ trxID });

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    const { data } = await axios.post(
      config.bkash_refund_transaction_url,
      {
        paymentID: payment.paymentID,
        amount: payment.amount,
        trxID,
        sku: "payment",
        reason: "cashback",
      },
      {
        headers: await bkash_headers(), // Passing the headers including the token
      }
    );

    if (data && data.statusCode === "0000") {
      return res.status(200).json({ message: "Refund successful" });
    } else {
      return res
        .status(400)
        .json({ error: "Refund failed", message: data.statusMessage });
    }
  } catch (error) {
    console.error("Error during refund:", error);
    return res.status(500).json({ error: "Refund failed due to server error" });
  }
};

export const PaymentController = {
  payment_create,
  call_back,
  refund,
};
