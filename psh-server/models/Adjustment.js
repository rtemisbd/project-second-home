import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const AdjustmentSchema = new mongoose.Schema(
  {
    booking: {
      type: ObjectId,
      ref: "order",
      //   required: true,
    },
    branch: {
      type: ObjectId,
      ref: "Branch",
      // required: true,
    },
    userId: {
      type: ObjectId,
      ref: "User",
      // required: true,
    },
    adjustmentAmount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Accepted", "Not Accepted"],
      default: "Not Accepted",
    },
  },
  {
    timestamps: true,
  }
);

const Adjustment = mongoose.model("Adjustment", AdjustmentSchema);
export default Adjustment;
