import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  desc: { type: String },
  photos: {
    type: [String],
  },
  status: {
    type: String,
    enum: ["active", "inActive"],
    default: "inActive",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Event", EventSchema);
