import mongoose from "mongoose";
const BranchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    locationLink: {
      type: String,
    },
    nearLocation1: {
      type: String,
    },
    nearLocation2: {
      type: String,
    },
    nearLocation3: {
      type: String,
    },
    nearLocation4: {
      type: String,
    },
    nearLocation5: {
      type: String,
    },
    nearLocation6: {
      type: String,
    },
    branchAddress: {
      type: String,
    },
    branchMobileNumber: {
      type: String,
    },
    branchBkashNumber: {
      type: String,
    },
    branchNagadNumber: {
      type: String,
    },
    branchDutchNumber: {
      type: String,
    },
    branchEmail: {
      type: String,
    },
    foodAmount: {
      type: Number,
      required: true,
    },
    photos: {
      type: [String],
    },
    branchBanner: {
      type: String,
    },

    // user: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],
  },
  { timestamps: true }
);

export default mongoose.model("Branch", BranchSchema);
