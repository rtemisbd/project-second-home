import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

// new schema

// const rentDateSchema = new mongoose.Schema({
//   bookStartDate: { type: String, required: true },
//   bookEndDate: {
//     type: String,
//     required: true,
//   },
//   dayDifference: {
//     type: Number,
//   },
// });

// const priceSchema = new mongoose.Schema({
//   perNight: {
//     type: Number,
//   },
//   initialAmount: {
//     type: Number,
//     required: true,
//   },
//   extraFoodCost: {
//     type: Number,
//   },
//   totalAmount: { type: Number, required: true },
//   totalDiscount: {
//     type: Number,
//     default: 0,
//   },
//   payableAmount: { type: Number, required: true },
//   paidAmount: {
//     type: Number,
//     default: 0,
//   },
//   dueAmount: { type: Number },
// });

// const OrderSchema = new mongoose.Schema({
//   bookingId: {
//     type: String,
//     unique: true,
//     required: true,
//   },
//   category: {
//     type: ObjectId,
//   },
//   branch: {
//     type: ObjectId,
//   },
//   roomId: {
//     type: ObjectId,
//   },
//   seatId: {
//     type: ObjectId,
//   },
//   userId: {
//     type: ObjectId,
//   },
//   rentDate: rentDateSchema,
//   status: {
//     type: String,
//     enum: ["Approved", "Processing", "Pending", "Canceled"],
//     default: "Pending",
//   },
//   pricing: priceSchema,
//   paymentStatus: {
//     type: String,
//     enum: ["Paid", "Unpaid"],
//     default: "Unpaid",
//   },
//   specialRequest: {
//     type: String,
//   },
// });

// old schema
const OrderSchema = new mongoose.Schema(
  {
    bookingInfo: {
      type: Object,
    },
    bookingId: {
      type: String,
    },
    branch: {
      type: ObjectId,
      ref: "Branch",
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
      // enum: ["Walk-in Guest", "Monthly", "Yearly"],
      // default: "Walk-in Guest",
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
    foodAmount: {
      type: Number,
    },
    isIncludeFood: {
      type: Boolean,
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
    isAdjustmentRQ: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("order", OrderSchema);

export default OrderModel;
