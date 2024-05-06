import Promo from "../models/Promo.js";
export const CreatePromo = async (req, res, next) => {
  const newPromo = new Promo(req.body);
  try {
    const promo = await newPromo.save();
    res.status(200).json(promo);
  } catch (err) {
    next(err);
  }
};
export const getPromo = async (req, res, next) => {
  try {
    const promo = await Promo.find({});
    res.status(200).json(promo);
  } catch (err) {
    next(err);
  }
};
export const getSinglePromo = async (req, res, next) => {
  try {
    const promo = await Promo.findById(req.params.id);
    res.status(200).json(promo);
  } catch (err) {
    next(err);
  }
};
export const deletePromo = async (req, res, next) => {
  try {
    const promo = await Promo.findByIdAndDelete(req.params.id);
    res.status(200).json(promo);
  } catch (err) {
    next(err);
  }
};

export const updatePromo = async (req, res, next) => {
  try {
    const promo = await Promo.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(promo);
  } catch (err) {
    next(err);
  }
};
