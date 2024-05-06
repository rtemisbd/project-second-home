import Branch from "../models/Branch.js";
export const CreateBranch = async (req, res, next) => {
  const newBranch = new Branch(req.body);
  try {
    const branch = await newBranch.save();
    res.status(200).json(branch);
  } catch (err) {
    next(err);
  }
};
export const getBranch = async (req, res, next) => {
  try {
    // const branch = await Branch.find({}).populate("property user");
    const branch = await Branch.find({});
    res.status(200).json(branch);
  } catch (err) {
    next(err);
  }
};
export const getSingleBranch = async (req, res, next) => {
  try {
    const branch = await Branch.findById(req.params.id).populate("property");

    res.status(200).json(branch);
  } catch (err) {
    next(err);
  }
};
export const deleteBranch = async (req, res, next) => {
  try {
    const branch = await Branch.findByIdAndDelete(req.params.id);
    res.status(200).json(branch);
  } catch (err) {
    next(err);
  }
};

export const updateBranch = async (req, res, next) => {
  try {
    const branch = await Branch.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(branch);
  } catch (err) {
    next(err);
  }
};
