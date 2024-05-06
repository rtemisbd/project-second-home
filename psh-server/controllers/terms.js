import Terms from "../models/Terms.js";
export const CreateTerms = async (req, res, next) => {
  const newTerms = new Terms(req.body);
  try {
    const terms = await newTerms.save();
    res.status(200).json(terms);
  } catch (err) {
    next(err);
  }
};
export const getTerms = async (req, res, next) => {
  try {
    const terms = await Terms.find({});
    res.status(200).json(terms);
  } catch (err) {
    next(err);
  }
};
export const getSingleTerms = async (req, res, next) => {
  try {
    const terms = await Terms.findById(req.params.id);
    res.status(200).json(terms);
  } catch (err) {
    next(err);
  }
};
export const deleteTerms = async (req, res, next) => {
  try {
    const terms = await Terms.findByIdAndDelete(req.params.id);
    res.status(200).json(terms);
  } catch (err) {
    next(err);
  }
};

export const updateTerms = async (req, res, next) => {
  try {
    const terms = await Terms.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(terms);
  } catch (err) {
    next(err);
  }
};
