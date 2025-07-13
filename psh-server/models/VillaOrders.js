import mongoose from "mongoose";

const rentDateSchema = new mongoose.Schema({
  bookStartDate: { type: mongoose.Schema.Types.Mixed, required: true },
  bookEndDate: { type: mongoose.Schema.Types.Mixed, required: true },
  daysDifference: { type: Number, required: true },
});

const villaOrderSchema = new mongoose.Schema(
  {
    bookingId: { type: String },
    villa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Villa",
      required: true,
    },
    resort: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resort",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    paymentPlatform: {
      type: String,
      //  required: true
    },
    minimumAmount: { type: Number },
    paymentMethod: {
      type: String,
      //   required: true,
      enum: ["online", "cash"],
      default: "online",
    },
    paymentProof: {
      type: String,
      //  required: true
    },
    perNight: { type: Number, required: true },
    sendAmount: {
      type: Number,
      //  required: true
    },
    senderAccountNumber: {
      type: String,
      //  required: true
    },

    occupancy: {
      child: { type: Number, default: 0 },
      adult: { type: Number, default: 0 },
    },
    pricing: {
      initialAmount: { type: Number, required: true },
      totalAmount: { type: Number, required: true },
      occupancyCharge: { type: Number, default: 0 },
      foodCost: { type: Number, default: 0 },
      discount: { type: Number, default: 0 },
    },

    // totalAmount: { type: Number, required: true },
    // discount: { type: Number, default: 0 },
    // subTotal: { type: Number, required: true },
    // payableAmount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "Unpaid",
    },
    rentDate: rentDateSchema,
    status: {
      type: String,
      enum: ["Pending", "Processing", "Approved", "Rejected"],
      default: "Processing",
    },
    specialRequest: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("VillaOrder", villaOrderSchema);
