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
    roomNumber,
    seatNumber,
    fromClient,
  } = queries;

  const page = parseInt(queries?.page);
  const size = parseInt(queries?.size);
  console.log(queries);

  let query = {};
  if (Featured && Featured !== "") query.Featured = Featured;
  if (furnitured && furnitured !== "") query.furnitured = furnitured;
  if (gender && gender !== "") query.type = gender;
  if (bedType && bedType !== "") query.bedType = bedType;
  if (isPublished && isPublished !== "") {
    query.isPublished = isPublished;
  }
  if (recommended && recommended !== "no") {
    query.recommended = recommended;
  }
  if (roomNumber && roomNumber !== "") {
    query.roomNumber = { $regex: `^${roomNumber}`, $options: "i" };
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
          ...(page >= 1 && size >= 1
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

  let properties = await Property.aggregate(pipeline);

  if (seatNumber) properties = [];
  if (fromClient) properties = await Property.aggregate(pipeline);

  let allProperties = properties[0]?.paginatedResults || [];
  let totalCount = properties[0]?.totalCount || 0;
  if (withSharedRoom && category !== "Private Room" && !roomNumber) {
    const extractedSeats = await seatServices.getAllSeatsFromDB({
      destination,
      seatNumber,
      isPublished,
      size,
      page,
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
    bookingId: 1,
  });
  // console.log(rentRooms);

  // Find the property by ID
  const property = await Property.findById(propertyId).populate(
    "category facility branch"
  );

  if (!property) {
    return { error: "Property not found" };
  }

  // Increment the view count by 1
  property.views++;
  await property.save();
  return { property, rentRooms };
};

const updatePropertyById = async (propertyId, payload) => {
  if (payload.isPublished) {
    await Property.findByIdAndUpdate(
      propertyId,
      { $set: { isPublished: req.body.isPublished } },
      { new: true }
    );
  }
  // Find the property by ID
  const property = await Property.findById(propertyId);
  if (!property) {
    return { error: "Property not found" };
  }

  const result = await Property.updateOne(
    { _id: propertyId },
    { $set: payload },
    { runValidators: true }
  );
  return result;
};

export const propertyServices = {
  getPropertiesFromDB,
  getRecommendedPropertiesFromDB,
  getSinglePropertyFromDB,
  updatePropertyById,
};
