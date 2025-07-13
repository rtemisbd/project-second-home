import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const villaBookingAdjustmentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
    },
    orderId: {
      type: ObjectId,
      ref: "VillaOrder",
    },

    userId: {
      type: ObjectId,
      ref: "User",
    },
    resortId: {
      type: ObjectId,
      ref: "resort",
    },
    adjustmentAmount: {
      type: Number,
      default: 0,
    },
    // status: {
    //   type: String,
    //   enum: ["Accepted", "Not Accepted"],
    //   default: "Not Accepted",
    // },
    providerName: {
      type: String,
      required: true,
    },
    noteForAdjustment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const VillaBookingAdjustment = mongoose.model(
  "VillaBookingAdjustment",
  villaBookingAdjustmentSchema
);
export default VillaBookingAdjustment;
