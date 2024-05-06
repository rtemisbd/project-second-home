import mongoose from "mongoose";

const RequestRent = new mongoose.Schema(
  {
    fullname: {
      type: String,
    },
    phone: {
      type: String,
    },
    totalRoom: {
      type: String,
    },
    position: {
      type: String,
    },
    company: {
      type: String,
    },
    address: {
      type: String,
    },
    companyEmail: {
      type: String,
    },
    location: {
      type: String,
    },
    propertyType: {
      type: String,
      enum: ["Share Room", "Private Room", "Apartment"],
    },

    availabilityForVisit: {
      type: Date,
    },
    availabilityForVisitTime: {
      type: String,
    },
    duration: {
      type: String,
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
export default mongoose.model("RequestRent", RequestRent);
