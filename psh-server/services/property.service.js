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

  const page = parseInt(queries.page);
  const size = parseInt(queries.size);

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

  // Declare pipeline as an array, adding conditional stages
  const pipeline = [
    { $match: query },

    // Lookup for branches (destination)
    ...(destination
      ? [
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
              "branchDetails.name": destination,
            },
          },
        ]
      : []),

    // Lookup for categories
    ...(category
      ? [
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
              "categoryDetails.name": category,
            },
          },
        ]
      : []),

    // Faceted Pagination and Total Counts
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
  console.log(destination);

  // Execute the pipeline
  const properties = await Property.aggregate(pipeline);

  let allProperties = properties[0]?.paginatedResults || [];
  let totalCount = properties[0]?.totalCount || 0;

  // Handle shared room logic
  if (withSharedRoom && category !== "Private Room") {
    const extractedSeats = await seatServices.getAllSeatsFromDB({
      destination,
    });

    allProperties = [
      ...allProperties.filter(
        (result) => result.categoryDetails.name === "Private Room"
      ),
      ...extractedSeats,
    ];
    totalCount += extractedSeats.length;
  }

  return {
    properties: allProperties,
    totalCount: totalCount,
    currentPage: page,
    pageSize: size,
  };
};

const getRecommendedPropertiesFromDB = async () => {
  const result = await Property.aggregate([
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
  ]);
  const extractedSeats = await seatServices.getAllSeatsFromDB({});
  const properties = [
    ...result.filter(
      (result) => result.categoryDetails.name === "Private Room"
    ),
    ...extractedSeats,
  ];

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
