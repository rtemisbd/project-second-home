import mongoose from "mongoose";

const RecommendedSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    photos: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Recommended", RecommendedSchema);
