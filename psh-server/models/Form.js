import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const formSchema = mongoose.Schema(
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

const FormSubmit = mongoose.model("FormSubmit", formSchema);

export default FormSubmit;
