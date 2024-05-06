import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const OrderSchema = new mongoose.Schema(
  {
    bookingInfo: {
      type: Object,
    },
    branch: {
      type: ObjectId,
      ref: "Branch",
      // required: true,
    },
    fullName: {
      type: String,
    },
    fatherName: {
      type: String,
    },
    motherName: {
      type: String,
    },
    userId: {
      type: ObjectId,
      ref: "User",
      // required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    birthDate: {
      type: String,
    },
    emergencyContactName: {
      type: String,
    },
    emergencyRelationC: {
      type: String,
    },
    emergencyContact: {
      type: String,
    },
    employeeStatus: {
      type: String,
    },
    emplyeeIncome: {
      type: String,
    },
    nid: {
      type: Number,
    },
    validityType: {
      type: String,
    },
    validityNumber: {
      type: Number,
    },
    passport: {
      type: String,
    },
    arrivalTime: {
      type: String,
    },
    request: {
      type: String,
    },
    image: {
      type: String,
    },
    gardianImg: {
      type: String,
    },
    paymentType: {
      type: String,
    },
    paymentNumber: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    bkashNumber: {
      type: String,
    },
    bkashTrx: {
      type: String,
    },
    nagadNumber: {
      type: String,
    },
    nagadTrx: {
      type: String,
    },
    dutchNumber: {
      type: String,
    },
    dutchTrx: {
      type: String,
    },
    customerType: {
      type: String,
    },
    whichOfMonthPayment: {
      type: String,
    },

    seat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seat",
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Approved", "Canceled"],
      default: "Pending",
    },
    totalAmount: {
      type: Number,
    },
    payableAmount: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    adjustmentAmount: {
      type: Number,
    },

    receivedTk: {
      type: Number,
    },
    dueAmount: {
      type: Number,
    },
    totalReceiveTk: {
      type: Number,
    },

    unReceivedTk: {
      type: Number,
    },
    paymentStatus: {
      type: String,
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
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("order", OrderSchema);

export default OrderModel;
