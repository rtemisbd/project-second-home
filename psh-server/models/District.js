import mongoose from "mongoose";

import httpStatus from 'http-status'
import AppError from "../helpers/errorHandler/AppError.js";

const districtSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, 
});

districtSchema.pre("save", async function (next) {
  try {
    const District = mongoose.model("District");
    const existingDistrict = await District.findOne({ name: this.name });

    if (existingDistrict) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'This district already exists!',
      );
    }
    next();
  } catch (error) {
    next(error); 
  }
});

export default mongoose.model("District", districtSchema);
