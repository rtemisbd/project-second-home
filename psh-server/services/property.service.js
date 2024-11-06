import Branch from "../models/Branch.js";
import Property from "../models/Property.js";

const getPropertiesFromDB = async (queries) => {
  const { furnitured, category, gender, destination, bedrooms } = queries;

  let query = {};

  if (furnitured && furnitured !== "") query.furnitured = furnitured;
  if (category && category !== "") query.category = category;
  if (gender && gender !== "") query.type = gender;
  if (bedrooms && bedrooms !== "") query.bedroom = bedrooms;

  if (destination && destination !== "") {
    const branch = await Branch.findOne({ name: destination });
    if (branch) query.branch = branch._id;
  }

  const properties = await Property.find(query).populate("branch");

  return properties;
};

export const propertyServices = {
  getPropertiesFromDB,
};
