import mongoose from "mongoose";

const rentDateSchema = new mongoose.Schema({
  bookStartDate: {
    type: String,
  },
  bookEndDate: {
    type: String,
  },
});

const SeatSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    name: {
      type: String,
    },
    description: {
      type: String,
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

export default mongoose.model("Seat", SeatSchema);
