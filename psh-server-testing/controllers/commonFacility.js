import CommonFacility from "../models/commonFacility.js";
export const createCommonFacility = async (req, res, next) => {
  const newCommonFacility = new CommonFacility(req.body);
  try {
    const category = await newCommonFacility.save();
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};
export const getCommonFacility = async (req, res, next) => {
  try {
    const category = await CommonFacility.find({});
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};
export const getSingleCommonFacility = async (req, res, next) => {
  try {
    const category = await CommonFacility.findById(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};
export const deleteCommonFacility = async (req, res, next) => {
  try {
    const category = await CommonFacility.findByIdAndDelete(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

export const updateCommonFacility = async (req, res, next) => {
  try {
    const category = await CommonFacility.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};
