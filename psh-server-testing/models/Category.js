import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
    },

    property: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
    position: {
      type: String,
      // required: true,
    },
  },

  { timestamps: true }
);

export default mongoose.model("Category", CategorySchema);
