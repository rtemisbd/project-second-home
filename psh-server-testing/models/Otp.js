import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    customerOtp: {
      type: Number,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Otp", otpSchema);
