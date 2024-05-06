import Recommended from "../models/Recommended.js";
export const CreateRecommended = async (req, res, next) => {
  const newRecommended = new Recommended(req.body);
  try {
    const recommended = await newRecommended.save();
    res.status(200).json(recommended);
  } catch (err) {
    next(err);
  }
};
export const getRecommended = async (req, res, next) => {
  try {
    const recommended = await Recommended.find({});
    res.status(200).json(recommended);
  } catch (err) {
    next(err);
  }
};
export const getSingleRecommended = async (req, res, next) => {
  try {
    const recommended = await Recommended.findById(req.params.id);
    res.status(200).json(recommended);
  } catch (err) {
    next(err);
  }
};
export const deleteRecommended = async (req, res, next) => {
  try {
    const recommended = await Recommended.findByIdAndDelete(req.params.id);
    res.status(200).json(recommended);
  } catch (err) {
    next(err);
  }
};

export const updateRecommended = async (req, res, next) => {
  try {
    const recommended = await Recommended.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(recommended);
  } catch (err) {
    next(err);
  }
};
