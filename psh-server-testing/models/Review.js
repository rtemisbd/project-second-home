import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  comment: { type: String, required: true },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
  },
  rating: { type: Number, min: 0, max: 5 },
  category: { type: String },
  replies: [
    {
      body: String,
      replyUser: String,
    },
  ],
  status: {
    type: String,
    enum: ["active", "inActive"],
    default: "inActive",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Review", ReviewSchema);
