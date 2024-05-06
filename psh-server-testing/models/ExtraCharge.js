import mongoose from "mongoose";

const ExtraChargeSchema = new mongoose.Schema(
  {
    vatTax: {
      type: Number,
    },
    admissionFee: {
      type: Number,
    },
    securityFee: {
      type: Number,
    },
    upto6MonthsAdmissionFee: {
      type: Number,
    },
    upto6MonthsSecurityFee: {
      type: Number,
    },
    for1YearAdmissionFee: {
      type: Number,
    },
    for1YearSecurityFee: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const ExtraCharge = mongoose.model("ExtraCharge", ExtraChargeSchema);
export default ExtraCharge;
