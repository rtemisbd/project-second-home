import RentRoom from "../models/RentRoom.js";
import Seat from "../models/Seat.js";

const getAllSeatsFromDB = async (queries) => {
  const { destination } = queries;

  const pipeline = [
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
  ];
  const result = await Seat.aggregate(pipeline);
  return result;
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
  const seat = await Seat.findById(id);

  return { seat, rentRooms };
};

export const seatServices = {
  getAllSeatsFromDB,
  getSeatByIdFromDB,
};
