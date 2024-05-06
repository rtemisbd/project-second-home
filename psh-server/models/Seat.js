import mongoose from "mongoose";
const SeatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
    },
    seatNumber: {
      type: String,
    },
    desc: {
      type: String,
    },

    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Seat", SeatSchema);
