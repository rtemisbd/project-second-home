import mongoose from "mongoose";

const Terms = new mongoose.Schema(
  {
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Terms", Terms);
