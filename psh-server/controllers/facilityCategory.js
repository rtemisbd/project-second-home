import FacilityCategory from "../models/FacilityCategory.js";
export const CreateFacilityCategory = async (req, res, next) => {
  const newFacilityCategory = new FacilityCategory(req.body);
  try {
    const category = await newFacilityCategory.save();
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};
export const getFacilityCategory = async (req, res, next) => {
  try {
    const category = await FacilityCategory.find({}).populate("facility");
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};
export const getSingleFacilityCategory = async (req, res, next) => {
  try {
    const category = await FacilityCategory.findById(req.params.id).populate(
      "facility"
    );
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};
export const deleteFacilityCategory = async (req, res, next) => {
  try {
    const category = await FacilityCategory.findByIdAndDelete(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

export const updateFacilityCategory = async (req, res, next) => {
  try {
    const category = await FacilityCategory.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};
