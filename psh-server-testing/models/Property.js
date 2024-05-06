import mongoose from "mongoose";

const rentDateSchema = new mongoose.Schema({
  bookStartDate: {
    type: mongoose.Schema.Types.Mixed,
  },
  bookEndDate: {
    type: mongoose.Schema.Types.Mixed,
  },
});

const SeatSchema = new mongoose.Schema({
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
  photos: {
    type: [String],
  },
  rentDate: [rentDateSchema],
  isSeatPublished: {
    type: String,
    enum: ["Unpublished", "Published"],
    default: "Published",
  },
});

const PropertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
    },

    roomNumber: {
      type: String,
    },
    builtYear: {
      type: String,
    },
    floor: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["male", "female", "both"],
      default: "female",
    },
    area: {
      type: String,
      required: true,
    },
    totalRoom: {
      type: String,
    },
    totalSeat: {
      type: String,
    },
    recommended: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    furnitured: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    views: {
      type: Number,
      default: 0,
    },
    desc: {
      type: String,
    },
    fulldesc: {
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
    bedroom: {
      type: String,
      // enum: ["1", "2", "3", "Bunker"],
    },
    bathroom: {
      type: String,
      required: true,
    },
    car: {
      type: Number,
    },
    bike: {
      type: Number,
    },
    pet: {
      type: Number,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    review: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
        required: true,
      },
    ],
    photos: {
      type: [String],
    },
    facility: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Facility" }],
      default: [],
    },
    commonfacility: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "CommonFacility" }],
      default: [],
    },
    bedType: {
      type: String,
      // required: true,
    },
    CCTV: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    WiFi: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    breakfast: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    balcony: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    meal: {
      type: String,
    },
    rules: {
      type: String,
    },
    //apartment
    roomCategory: {
      type: String,
    },
    additionalFacility: {
      type: String,
    },
    apartmentRent: {
      type: String,
    },
    serviceCharge: {
      type: String,
    },
    security: {
      type: String,
    },
    faltPolicy: {
      type: String,
    },
    isPublished: {
      type: String,
      enum: ["Unpublished", "Published"],
      default: "Unpublished",
    },
    isPartner: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    Featured: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    FeaturedDate: {
      type: Date,
    },
    rentDate: [rentDateSchema],

    seats: [SeatSchema],
    // Add the "options" field for seats
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Property", PropertySchema);
