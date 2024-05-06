import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema(
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

export default mongoose.model("Banner", BannerSchema);
