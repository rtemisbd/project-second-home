import RentRoom from "../models/RentRoom.js";
import Seat from "../models/Seat.js";

const getAllSeatsFromDB = async (queries) => {
  const { destination, seatNumber, size, page } = queries;
  let query = {};
  if (seatNumber && seatNumber !== "") {
    query.seatNumber = { $regex: `^${seatNumber}`, $options: "i" };
  }

  const pipeline = [
    { $match: query },
    {
      $lookup: {
        from: "properties",
        localField: "roomId",
        foreignField: "_id",
        as: "property",
      },
    },
    { $unwind: "$property" },
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
      },
    },
    { $unwind: "$categoryDetails" },
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
  const result = await Seat.aggregate(pipeline);
  return result[0]?.paginatedResults || [];
};

const getSeatByIdFromDB = async (id) => {
  const rentRooms = await RentRoom.find({
    seatId: id,
    bookingStatus: { $in: ["Booked", "Reserved"] },
  }).select({
    bookStartDate: 1,
    bookEndDate: 1,
    bookingStatus: 1,
    roomType: 1,
    seatId: 1,
    seatNumber: 1,
  });
  const seat = await Seat.findById(id).populate("category branch");

  return { seat, rentRooms };
};

export const seatServices = {
  getAllSeatsFromDB,
  getSeatByIdFromDB,
};
