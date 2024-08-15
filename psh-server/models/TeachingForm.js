import mongoose from "mongoose";

const TeachingFormSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      // unique: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
      // unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      // unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const TeachingForm = mongoose.model("TeachingForm", TeachingFormSchema);

export default TeachingForm;
