import mongoose from "mongoose";
import AppError from "../helpers/errorHandler/AppError.js";
// import httpStatus from "http-status";

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


// Apply to findOne and findById queries
// SeatSchema.pre("findOne", async function (next) {
//   try {
//     const {_id} = this.getQuery(); // Access query filter

//     const Seat = mongoose.model("Seat");

//     const theSeat = await Seat.findOne({_id });
//     if (theSeat?.isSeatPublished === "Unpublished") {
//       throw new AppError(httpStatus.NO_CONTENT, "This seat has been unpublished!");
//     }
//     next();
//   } catch (error) {
//     next(error);
//   }
// });
// SeatSchema.post("findOne", async function (doc, next) {
//   try {
//     if (doc?.isSeatPublished === "Unpublished") {
//       return next(
//         new AppError(httpStatus.FORBIDDEN, "This seat has been unpublished!")
//       );
//     }
//     next();
//   } catch (error) {
//     next(error);
//   }
// });


// SeatSchema.pre(/^find/, function (next) {
//   this.where({ isSeatPublished: { $ne: "Unpublished" } });
//   next();
// });



export default mongoose.model("Seat", SeatSchema);
