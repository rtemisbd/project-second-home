import FacilityCategory from "../models/FacilityCategory.js";
import Facility from "../models/facility.js";

export const createFacility = async (req, res, next) => {
  try {
    const { name, facilityCategoryId, photos } = req.body;

    // Find the category by ID
    const category = await FacilityCategory.findById(facilityCategoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Create the product and assign it to the category, branch, and facilities
    const product = new Facility({
      name,
      photos,
      facilityCategory: category._id,
    });
    await product.save();

    // Add the product to the category's products array
    category.facility.push(product._id);
    await category.save();

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};
export const getFacility = async (req, res, next) => {
  try {
    const facility = await Facility.find({}).populate("facilityCategory");
    res.status(200).json(facility);
  } catch (err) {
    next(err);
  }
};
export const getSingleFacility = async (req, res, next) => {
  try {
    const facility = await Facility.findById(req.params.id).populate(
      "property"
    );
    res.status(200).json(facility);
  } catch (err) {
    next(err);
  }
};
export const deleteFacility = async (req, res, next) => {
  try {
    const facility = await Facility.findByIdAndDelete(req.params.id);
    res.status(200).json(facility);
  } catch (err) {
    next(err);
  }
};

export const updateFacility = async (req, res, next) => {
  try {
    const facility = await Facility.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(facility);
  } catch (err) {
    next(err);
  }
};
