import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const rentDateSchema = new mongoose.Schema({
  bookStartDate: {
    type: mongoose.Schema.Types.Mixed,
  },
  bookEndDate: {
    type: mongoose.Schema.Types.Mixed,
  },
});

const SeatSchema = new mongoose.Schema(
  {
    roomId: {
      type: ObjectId,
      ref: "Property",
      required: true,
    },
    branch: {
      type: ObjectId,
      ref: "Branch",
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",

      required: true,
    },

    name: {
      type: String,
    },
    description: {
      type: String,
      // required: true,
    },
    seatNumber: {
      type: String,
    },
    seatType: {
      type: String,
    },

    perDay: {
      type: Number,
    },
    perMonth: {
      type: Number,
    },
    perYear: {
      type: Number,
    },

    dAmountForDay: {
      type: Number,
    },
    dAmountForMonth: {
      type: Number,
    },
    dAmountForYear: {
      type: Number,
    },
    percentOfDiscountDay: {
      type: Number,
    },
    percentOfDiscountMonth: {
      type: Number,
    },
    percentOfDiscountYear: {
      type: Number,
    },
    photos: {
      type: [String],
    },
    rentDate: [rentDateSchema],
    isSeatPublished: {
      type: String,
      enum: ["Unpublished", "Published"],
      default: "Published",
    },
  },
  {
    timestamps: true,
  }
);

const Seat = mongoose.model("Seat", SeatSchema);
export default Seat;
