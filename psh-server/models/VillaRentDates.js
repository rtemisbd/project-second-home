import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const villaRentDateSchema = new mongoose.Schema(
  {
    bookingStartDate: {
      type: mongoose.Schema.Types.Mixed,
    },
    bookingEndDate: {
      type: mongoose.Schema.Types.Mixed,
    },
    orderId: {
      type: ObjectId,
      ref: "order",
    },
    bookingId: {
      type: String,
      required : true
    },
    villaId: {
      type: ObjectId,
      ref: "Villa",
    },
    userId: {
      type: ObjectId,
      ref: "User",
    },
    
    bookingStatus: {
      type: String,
      enum: ["Reserved", "Booked", "Complete"],
      default: "Reserved",
    },
  },
  { timestamps: true }
);

export default mongoose.model("VillaRentDates", villaRentDateSchema);