import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
    },
    amount: {
      type: Number,
    },
    trxID: {
      type: String,
    },
    paymentID: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
