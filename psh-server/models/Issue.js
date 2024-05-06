import mongoose from "mongoose";

const IssueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    type: {
      type: String,
    },
    category: {
      type: String,
    },
    subCategory: {
      type: String,
    },
    desc: {
      type: String,
    },
    userName: {
      type: String,
    },
    userNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },

    status: {
      type: String,
      enum: ["pending", "process", "success"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Issue", IssueSchema);
