import Property from "../models/Property.js";
import RentRoom from "../models/RentRoom.js";
import { seatServices } from "./seat.service.js";

const getPropertiesFromDB = async (queries) => {
  const {
    Featured,
    isPublished,
    furnitured,
    category,
    gender,
    destination,
    bedType,
    startDate,
    endDate,
    recommended,
    withSharedRoom,
  } = queries;

  const page = parseInt(queries.page) || 0;
  const size = parseInt(queries.size) || 0;

  let query = {};
  if (Featured && Featured !== "") query.Featured = Featured;
  if (furnitured && furnitured !== "") query.furnitured = furnitured;
  if (gender && gender !== "") query.type = gender;
  if (bedType && bedType !== "") query.bedType = bedType;
  if (isPublished && isPublished !== "") {
    query.isPublished = isPublished;
  } else {
    query.isPublished = "Published";
  }
  if (recommended && recommended !== "no") {
    query.recommended = recommended;
  }
  console.log(query);

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
              foodAmount: 1,
            },
          },
        ],
      },
    },
    { $unwind: "$branchDetails" },
    {
      $match: {
        ...(destination ? { "branchDetails.name": destination } : {}),
      },
    },
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
      $match: {
        ...(category !== "" ? { "categoryDetails.name": category } : {}),
      },
    },
    {
      $facet: {
        paginatedResults: [
          { $sort: { createdAt: -1 } },
          ...(page > 0 && size > 0
            ? [{ $skip: (page - 1) * size }, { $limit: size }]
            : []),
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
  // console.log(properties);

  let paginatedResults = properties[0]?.paginatedResults || [];
  let totalCount = properties[0]?.totalCount || 0;
  if (withSharedRoom && category !== "Private Room") {
    const extractedSeats = await seatServices.getAllSeatsFromDB();

    paginatedResults = [
      ...paginatedResults.filter(
        (result) => result.categoryDetails.name === "Private Room"
      ),
      ...extractedSeats,
    ];
    totalCount += extractedSeats.length;
  }

  return {
    properties: paginatedResults,
    totalCount: totalCount,
    currentPage: page,
    pageSize: size,
  };
};

const getRecommendedPropertiesFromDB = async () => {
  const properties = await Property.aggregate([
    { $match: { recommended: "yes", isPublished: "Published" } },

    {
      $lookup: {
        from: "branches",
        localField: "branch",
        foreignField: "_id",
        as: "branchDetails",
      },
    },
    { $unwind: "$branchDetails" },

    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    { $unwind: "$categoryDetails" },
    // {
    //   $lookup: {
    //     from: "review",
    //     localField: "review",
    //     foreignField: "_id",
    //     as: "review",
    //   },
    // },
    // { $unwind: "$review" },
  ]);
  return properties;
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
  getRecommendedPropertiesFromDB,
  getSinglePropertyFromDB,
};
