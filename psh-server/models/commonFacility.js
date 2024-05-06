import mongoose from "mongoose";

const CommonFacilitychema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("CommonFacility", CommonFacilitychema);
