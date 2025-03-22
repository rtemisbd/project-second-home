import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, 
});

districtSchema.pre("save", async function (next) {
  try {
    const District = mongoose.model("District");
    const existingDistrict = await District.findOne({ name: this.name });

    if (existingDistrict) {
      return next(new Error("This district already exists!")); 
    }

    next();
  } catch (error) {
    next(error); 
  }
});

export default mongoose.model("District", districtSchema);
