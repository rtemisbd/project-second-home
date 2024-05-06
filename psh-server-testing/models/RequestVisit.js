import mongoose from "mongoose";

const RequestVisit = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    availabilityForVisit: {
      type: Date,
      required: true,
    },
    availabilityForVisitTime: {
      type: String,
      required: true,
    },
    propertyId: {
      type: String,
      required: true,
    },
    branchId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "process", "success"],
      default: "pending",
    },
  },

  {
    timestamps: true,
  }
);
export default mongoose.model("RequestVisit", RequestVisit);
