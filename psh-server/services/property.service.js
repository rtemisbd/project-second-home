import Branch from "../models/Branch.js";
import Category from "../models/Category.js";
import Property from "../models/Property.js";

const getPropertiesFromDB = async (queries) => {
  const {
    furnitured,
    category,
    gender,
    destination,
    bedType,
    startDate,
    endDate,
  } = queries;
  // console.log("start", startDate, "end", endDate);

  let query = {};

  if (furnitured && furnitured !== "") query.furnitured = furnitured;
  if (gender && gender !== "") query.type = gender;
  if (bedType && bedType !== "") query.bedType = bedType;

  if (destination && destination !== "") {
    const branch = await Branch.findOne({ name: destination });
    if (branch) query.branch = branch._id;
  }
  if (category && category !== "") {
    const selectedCategory = await Category.findOne({ name: category });

    if (selectedCategory) query.category = selectedCategory._id;
  }

  const properties = await Property.find(query).populate("branch category");

  return properties;
};

export const propertyServices = {
  getPropertiesFromDB,
};
