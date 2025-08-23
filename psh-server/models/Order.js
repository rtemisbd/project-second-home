import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

// old schema
const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    phone: { type: String },
    roomId: {
      type: ObjectId,
      ref: "Property",
    },
    roomType: { type: String },
    seatId: {
      type: ObjectId,
      ref: "Seat",
    },
    branch: {
      type: ObjectId,
      ref: "Branch",
    },

    bookingId: { type: String },

    customerRent: {
      daysDifference: { type: Number },
      remainingDays: { type: Number },
    },
    rentDate: {
      bookStartDate: { type: String },
      bookEndDate: { type: String },
    },
    customerType: {
      type: String,
      enum: ["Walk-in Guest", "Monthly", "Yearly"],
      default: "Walk-in Guest",
    },

    perDay: { type: Number },

    subTotal: { type: Number },
    isIncludeFood: { type: Boolean },
    foodAmount: { type: Number, default: 0 },
    totalAmount: { type: Number },
    discount: { type: Number, default: 0 },
    payableAmount: { type: Number },
    dueAmount: { type: Number },

    minimumPayment: { type: Number },
    receivedTk: { type: Number },
    paymentNumber: { type: String },
    promoCodeDiscount: { type: Number, default: 0 },

    securityFee: { type: Number, default: 0 },
    usedPromo: {
      promo: { type: String },
      usedDate: { type: String },
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Approved", "Canceled"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Unpaid"],
    },
    bookingExtend: {
      type: Boolean,
    },
    isCancel: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    userCancel: {
      type: Object,
    },
    arrivalTime: { type: String },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("order", OrderSchema);

export default OrderModel;
