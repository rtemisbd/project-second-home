import Branch from "../models/Branch.js";
import Category from "../models/Category.js";
import Property from "../models/Property.js";
import RentRoom from "../models/RentRoom.js";

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

  const page = parseInt(queries.page) || 1;
  const size = parseInt(queries.size) || 10;

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

  const pipeline = [
    { $match: query },
    {
      $lookup: {
        from: "branches",
        localField: "branch",
        foreignField: "_id",
        as: "branchDetails",
        pipeline: [
          {
            $project: {
              _id: 1,
              name: 1,
            },
          },
        ],
      },
    },
    { $unwind: "$branchDetails" },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryDetails",
        pipeline: [
          {
            $project: {
              _id: 1,
              name: 1,
            },
          },
        ],
      },
    },
    { $unwind: "$categoryDetails" },
    {
      $facet: {
        paginatedResults: [
          { $sort: { createdAt: -1 } },
          { $skip: (page - 1) * size },
          { $limit: size },
        ],
        totalCounts: [
          {
            $group: {
              _id: null,
              totalCount: { $sum: 1 },
            },
          },
        ],
      },
    },
    {
      $project: {
        paginatedResults: 1,
        totalCount: {
          $ifNull: [{ $arrayElemAt: ["$totalCounts.totalCount", 0] }, 0],
        },
      },
    },
  ];

  const properties = await Property.aggregate(pipeline);
  const paginatedResults = properties[0]?.paginatedResults || [];
  const totalCount = properties[0]?.totalCount || 0;

  return {
    properties: paginatedResults,
    totalCount: totalCount,
    currentPage: page,
    pageSize: size,
  };
};

const getSinglePropertyFromDB = async (propertyId) => {
  const rentRooms = await RentRoom.find({
    roomId: propertyId,
    bookingStatus: { $in: ["Booked", "Reserved"] },
  }).select({
    bookStartDate: 1,
    bookEndDate: 1,
    bookingStatus: 1,
    roomType: 1,
    seatId: 1,
    seatNumber: 1,
  });
  // console.log(rentRooms);

  // Find the property by ID
  const property = await Property.findById(propertyId).populate(
    "category facility review branch"
  );

  if (!property) {
    return { error: "Property not found" };
  }

  // Increment the view count by 1
  property.views++;
  await property.save();
  return { property, rentRooms };
};

export const propertyServices = {
  getPropertiesFromDB,
  getSinglePropertyFromDB,
};
