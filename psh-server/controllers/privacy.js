import Privacy from "../models/Privacy.js";
export const CreatePrivacy = async (req, res, next) => {
  const newPrivacy = new Privacy(req.body);
  try {
    const privacy = await newPrivacy.save();
    res.status(200).json(privacy);
  } catch (err) {
    next(err);
  }
};
export const getPrivacy = async (req, res, next) => {
  try {
    const privacy = await Privacy.find({});
    res.status(200).json(privacy);
  } catch (err) {
    next(err);
  }
};
export const getSinglePrivacy = async (req, res, next) => {
  try {
    const privacy = await Privacy.findById(req.params.id);
    res.status(200).json(privacy);
  } catch (err) {
    next(err);
  }
};
export const deletePrivacy = async (req, res, next) => {
  try {
    const privacy = await Privacy.findByIdAndDelete(req.params.id);
    res.status(200).json(privacy);
  } catch (err) {
    next(err);
  }
};

export const updatePrivacy = async (req, res, next) => {
  try {
    const privacy = await Privacy.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(privacy);
  } catch (err) {
    next(err);
  }
};
