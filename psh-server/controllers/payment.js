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
    console.error("Error during payment creation:", error);
    return res.status(401).json({ error: error.message });
  }
};
// customerMsisdn

// Callback function after payment
const call_back = async (req, res) => {
  const { paymentID, status, callbackData } = req.query;

  if (status === "cancel" || status === "failure") {
    return res.redirect(`${config.client_url}/error?message=${status}`);
  }

  if (status === "success") {
    const session = await OrderModel.startSession();
    try {
      session.startTransaction();

      // Step 4: Execute payment via bKash
      const dataForBooking = JSON.parse(decodeURIComponent(callbackData));
      console.log({ dataForBooking });

      const { data } = await axios.post(
        config.bkash_execute_payment_url,
        { paymentID },
        {
          headers: await bkash_headers(getValue("id_token")),
        }
      );

      if (data && data.statusCode === "0000") {
        // Step 5: Create order
        dataForBooking.paymentType = "bKash";
        const result = await OrderModel.create([dataForBooking], { session });
        console.log({ result });

        // Step 6: Create user transaction
        const newTransaction = await Transaction.create(
          [
            {
              orderId: result[0]?._id,
              branch: dataForBooking?.branch,
              paymentDate: new Date(),
              totalAmount: dataForBooking?.bookingInfo?.totalAmount,
              payableAmount: dataForBooking?.payableAmount,
              receivedTk: parseInt(data?.amount),
              paymentNumber: data?.customerMsisdn,
              transactionId: data.trxID,
              userId: getValue("userId"),
              userPhone: dataForBooking?.phone,
              acceptableStatus: "Accepted",
            },
          ],
          { session }
        );
        console.log({ newTransaction });

        // Phone SMS for booking
        const bookingMessage = `/api/smsapi?api_key=za0YHQ7fvYCpcWGGZgce&type=text&number=88${result[0]?.phone}&senderid=8809617617196&message=Thank%20you%20for%20choosing%20us!%20Your%20booking%20ID%3A%23${result[0]?.bookingId}%20is%20received.%20Our%20team%20will%20verify%20your%20information%20before%20confirming%20your%20booking.%20Call%20us:%2001647647404.%20-%20PSH`;

        await bookingSms(bookingMessage);

        // Commit the transaction
        await session.commitTransaction();
        return res.redirect(`${config.client_url}/success`);
      } else {
        throw new Error(data.statusMessage || "Payment execution failed");
      }
    } catch (error) {
      await session.abortTransaction();
      console.error("Error during payment execution:", error);
      return res.redirect(
        `${config.client_url}/error?message=${encodeURIComponent(
          error.message
        )}`
      );
    } finally {
      session.endSession();
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
