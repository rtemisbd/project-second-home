import mongoose from "mongoose";

const PromoSchema = new mongoose.Schema(
  {
    promoName: {
      type: String,
    },
    promoCode: {
      type: String,
      trim: true,
      unique: true,
    },
    minimumDays: {
      type: String,
    },
    promoStart: {
      type: String,
    },
    promoEnd: {
      type: String,
    },
    promoDiscount: {
      type: Number,
    },
    discountAmount: {
      type: Number,
    },
    useTime: {
      type: Number,
    },
    promoDetails: {
      type: String,
    },
    photos: {
      type: [String],
    },
    homePageCover: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Promo", PromoSchema);
