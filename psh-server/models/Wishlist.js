import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Wishlist", WishlistSchema);
