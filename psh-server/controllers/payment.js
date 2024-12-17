import axios from "axios";
import { getValue, setValue } from "node-global-storage";
import { v4 as uuidv4 } from "uuid";
import Payment from "../models/payment.js";
import config from "../config/index.js";

// Function to generate headers for bkash API
const bkash_headers = async () => ({
  "Content-Type": "application/json",
  Accept: "application/json",
  authorization: getValue("id_token"),
  "x-app-key": config.bkash_api_key,
});

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

// Callback function after payment
const call_back = async (req, res) => {
  const { paymentID, status } = req.query;

  if (status === "cancel" || status === "failure") {
    return res.redirect(`${config.client_url}/error?message=${status}`);
  }

  if (status === "success") {
    try {
      const { data } = await axios.post(
        config.bkash_execute_payment_url,
        { paymentID },
        {
          headers: await bkash_headers(),
        }
      );

      if (data && data.statusCode === "0000") {
        // Using getValue to retrieve userId from global storage
        await Payment.create({
          userId: getValue("userId"),
          paymentID,
          trxID: data.trxID,
          date: data.paymentExecuteTime,
          amount: parseInt(data.amount),
        });

        return res.redirect(`${config.client_url}/success`);
      } else {
        return res.redirect(
          `${config.client_url}/error?message=${data.statusMessage}`
        );
      }
    } catch (error) {
      console.error("Error during payment execution:", error);
      return res.redirect(
        `${config.client_url}/error?message=${error.message}`
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
