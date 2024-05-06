import Category from "../models/Category.js";
export const CreateCategory = async (req, res, next) => {
  const newCategory = new Category(req.body);
  try {
    const category = await newCategory.save();
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};
export const getCategory = async (req, res, next) => {
  try {
    const category = await Category.find({}).populate("property");
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};
export const getSingleCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "property"
    );
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};
export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};
