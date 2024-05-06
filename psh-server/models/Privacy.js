import mongoose from "mongoose";

const Privacy = new mongoose.Schema(
  {
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Privacy", Privacy);
