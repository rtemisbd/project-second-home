import mongoose from "mongoose";
const SubscriptionSchema = mongoose.Schema(
  {
    packageName: {
      type: String,
    },
    packageDuration: {
      type: String,
    },
    packagePrice: {
      type: String,
    },
    addedTotalRoom: {
      type: String,
    },
    totalFeaturedRoom: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Subcription", SubscriptionSchema);
