import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { getValue, setValue } from "node-global-storage";
import config from "../config/index.js";
import Payment2 from "../models/paymentModel.js";

const bkashHeaders = async () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    authorization: getValue("id_token"),
    "X-App-Key": config.bkash_api_key,
  };
};

const paymentCreate = async (req, res) => {
  const { amount, userId } = req.body;
  setValue("userId", userId);

  try {
    const { data } = await axios.post(
      config.bkash_create_payment_url,
      {
        mode: "0011",
        payerReference: " ",
        callbackURL: "http://localhost:5000/api/bkash/payment/callback",
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
};

const callBack = async (req, res) => {
  const { paymentID, status } = req.query;

  if (status === "cancel" || status === "failure") {
    return res.redirect(`http://localhost:5173/error?message=${status}`);
  }

  if (status === "success") {
    try {
      const { data } = await axios.post(
        config.bkash_execute_payment_url,
        { paymentID },
        {
          headers: await bkashHeaders(),
        }
      );

      if (data && data.statusCode === "0000") {
        await Payment2.create({
          userId: Math.random() * 10 + 1,
          paymentID,
          trxID: data.trxID,
          date: data.paymentExecuteTime,
          amount: parseInt(data.amount),
        });

        return res.redirect(`http://localhost:5173/success`);
      } else {
        return res.redirect(
          `http://localhost:5173/error?message=${data.statusMessage}`
        );
      }
    } catch (error) {
      console.log(error);
      return res.redirect(
        `http://localhost:5173/error?message=${error.message}`
      );
    }
  }
};

const refund = async (req, res) => {
  const { trxID } = req.params;

  try {
    const payment = await Payment2.findOne({ trxID });

    const { data } = await axios.post(
      process.env.bkash_refund_transaction_url,
      {
        paymentID: payment.paymentID,
        amount: payment.amount,
        trxID,
        sku: "payment",
        reason: "cashback",
      },
      {
        headers: await bkashHeaders(),
      }
    );

    if (data && data.statusCode === "0000") {
      return res.status(200).json({ message: "refund success" });
    } else {
      return res.status(404).json({ error: "refund failed" });
    }
  } catch (error) {
    return res.status(404).json({ error: "refund failed" });
  }
};

export const PaymentController2 = {
  paymentCreate,
  callBack,
  refund,
};
