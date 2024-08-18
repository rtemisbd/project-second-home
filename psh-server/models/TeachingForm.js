import mongoose from "mongoose";

const TeachingFormSchema = mongoose.Schema(
  {
    purpose: {
      type: String,
    },
    name: {
      type: String,
    },
    mobileNumber: {
      type: String,
      trim: true,
    },

    arrivalDate: {
      type: Date,
      trim: true,
    },
    arrivalTime: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const TeachingForm = mongoose.model("TeachingForm", TeachingFormSchema);

export default TeachingForm;
