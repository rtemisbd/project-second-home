import mongoose from "mongoose";
import RentRoom from "../models/RentRoom.js";
import Seat from "../models/Seat.js";
import { propertyServices } from "./property.service.js";
import AppError from "../helpers/errorHandler/AppError.js";
// import httpStatus from "http-status";

const createSeatIntoDB = async (payload) => {
  const result = await Seat.create(payload);
  await propertyServices.updatePropertyById(payload.roomId, {
    $inc: { totalSeats: 1 },
  });
  return result;
};

const getAllSeatsFromDB = async (queries) => {
  const { destination, seatNumber, size, page, isPublished, roomId } = queries;

  let query = {};
  if (seatNumber && seatNumber !== "") {
    query.seatNumber = { $regex: `^${seatNumber}`, $options: "i" };
  }
  if (isPublished && isPublished !== "") {
    query.isSeatPublished = isPublished;
  }

  if (roomId && roomId !== "") {
    query.roomId = mongoose.Types.ObjectId(roomId);
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
          { $sort: { seatNumber: 1 } },
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
  const seat = await Seat.findOne({ _id: id }).populate("category branch");
  // if (seat?.isSeatPublished === "Unpublished") {
  //   throw new AppError(httpStatus.NO_CONTENT, "This seat has been unpublished!");
  // }

  return { seat, rentRooms };
};

export const updateSeatById = async (seatId, payload) => {
  let result;

  if (payload?.isPublished) {
    result = await Seat.findByIdAndUpdate(
      seatId,
      { $set: { isSeatPublished: payload.isPublished } },
      { new: true }
    );
  }
  // Find the property by ID
  const seat = await Seat.findById(seatId);
  if (!seat) {
    return { error: "Seat not found" };
  }

  result = await Seat.updateOne(
    { _id: seatId },
    { $set: payload },
    { runValidators: true }
  );

  return result;
};

export const seatServices = {
  createSeatIntoDB,
  getAllSeatsFromDB,
  getSeatByIdFromDB,
  updateSeatById,
};
