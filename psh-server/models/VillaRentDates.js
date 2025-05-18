import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const villaRentDateSchema = new mongoose.Schema(
  {
    bookStartDate: {
      type: mongoose.Schema.Types.Mixed,
    },
    bookEndDate: {
      type: mongoose.Schema.Types.Mixed,
    },
    daysDifference : {
      type : String,
      required : true
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
      enum: [ "Booked", "Complete", "Cancel"],
      default: "Booked",
    },
  },
  { timestamps: true }
);

export default mongoose.model("VillaRentDates", villaRentDateSchema);