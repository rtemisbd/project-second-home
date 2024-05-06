import mongoose from "mongoose";

const extraFormSchema = new mongoose.Schema(
  {
    purpose: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    birthDate: {
      type: String,
    },
    profession: {
      type: String,
    },
    maritalStatus: {
      type: String,
    },
    investorIncome: {
      type: String,
    },
    investAmount: {
      type: String,
    },
    investTime: {
      type: String,
    },
    returnTime: {
      type: String,
    },
    knowAbout: {
      type: String,
    },
    reference: {
      type: String,
    },
    address: {
      type: String,
    },
    image: {
      type: String,
    },
    availabilityForVisit: {
      type: Date,
    },
    availabilityForVisitTime: {
      type: String,
    },
    duration: {
      type: String,
    },
  },
  { timestamps: true }
);

const ExtraForm = mongoose.model("ExtraForm", extraFormSchema);

export default ExtraForm;
