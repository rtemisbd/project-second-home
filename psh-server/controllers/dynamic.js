import Dynamic from "../models/Dynamic.js";
export const CreateDynamic = async (req, res, next) => {
  const newDynamic = new Dynamic(req.body);
  try {
    const dynamic = await newDynamic.save();
    res.status(200).json(dynamic);
  } catch (err) {
    next(err);
  }
};
export const getDynamic = async (req, res, next) => {
  try {
    const dynamic = await Dynamic.find({});
    res.status(200).json(dynamic);
  } catch (err) {
    next(err);
  }
};
export const getSingleDynamic = async (req, res, next) => {
  try {
    const dynamic = await Dynamic.findById(req.params.id);
    res.status(200).json(dynamic);
  } catch (err) {
    next(err);
  }
};
export const deleteDynamic = async (req, res, next) => {
  try {
    const dynamic = await Dynamic.findByIdAndDelete(req.params.id);
    res.status(200).json(dynamic);
  } catch (err) {
    next(err);
  }
};

export const updateDynamic = async (req, res, next) => {
  try {
    const dynamic = await Dynamic.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(dynamic);
  } catch (err) {
    next(err);
  }
};
