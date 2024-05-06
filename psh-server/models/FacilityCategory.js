import mongoose from "mongoose";
const FacilityCategory = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    facility: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Facility",
      },
    ],
  },

  { timestamps: true }
);

export default mongoose.model("FacilityCategory", FacilityCategory);
