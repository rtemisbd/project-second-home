import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const rentDateSchema = new mongoose.Schema(
  {
    bookStartDate: {
      type: mongoose.Schema.Types.Mixed,
    },
    bookEndDate: {
      type: mongoose.Schema.Types.Mixed,
    },
    roomNumber: {
      type: String,
    },
    roomId: {
      type: ObjectId,
      ref: "Property",
    },
    seatNumber: {
      type: String,
    },
    seatNumber: {
      type: String,
    },
    roomType: {
      type: String,
    },
    bookingId: {
      type: ObjectId,
      ref: "order",
      // required: true,
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

    bookingStatus: {
      type: String,
      enum: ["Reserverd", "Booked", "complete"],
      default: "Reserverd",
    },
  },
  { timestamps: true }
);

export default mongoose.model("RentRoom", rentDateSchema);
