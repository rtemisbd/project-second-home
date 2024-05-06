import mongoose from "mongoose";

const extraFormSchema = new mongoose.Schema(
  {
    purpose: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    propertySize: {
      type: String,
    },
    numberOfRooms: {
      type: String,
    },
    totalSeatCapacity: {
      type: String,
    },
    existingBooking: {
      type: String,
    },
    designation: {
      type: String,
    },
    address: {
      type: String,
    },
    image: {
      type: String,
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
  },
  { timestamps: true }
);

const ExtraForm = mongoose.model("ExtraForm", extraFormSchema);

export default ExtraForm;
