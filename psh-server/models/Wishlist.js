import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    userPhone: {
      type: String,
    },
    roomType: {
      type: String,
      enum: ["Private Room", "Shared Room", "Home Stay", "Villa"],
      required: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "propertyModel",
    },
    propertyModel: {
      type: String,
      required: true,
      enum: ["Property", "Seat", "Villa"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Wishlist", WishlistSchema);
