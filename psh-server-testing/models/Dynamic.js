import mongoose from "mongoose";

const Dynamic = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    link: {
      type: String,
    },
    section: {
      type: String,
      enum: ["footer1", "footer2", "footer3"],
      default: "footer1",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Dynamic", Dynamic);
