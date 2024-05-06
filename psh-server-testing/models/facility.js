import mongoose from "mongoose";
// const ItemSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   photos: {
//     type: [String],
//   },
// });
const Facilitychema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // items: [ItemSchema],
    // type: {
    //   type: String,
    //   enum: ["common", "room"],
    //   default: "common",
    // },
    facilityCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FacilityCategory",
    },
    photos: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Facility", Facilitychema);
