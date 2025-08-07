import mongoose from "mongoose";
import RentRoom from "../models/RentRoom.js";

const getRentRooms = async (queries) => {
  const { seatId, roomId, bookingId, startDate, endDate, selectedDate } =
    queries;

  const matchStage = {};

  if (seatId && seatId !== "") {
    matchStage.seatId = new mongoose.Types.ObjectId(seatId);
  }
  if (roomId && roomId !== "") {
    matchStage.roomId = new mongoose.Types.ObjectId(roomId);
  }
  if (bookingId && bookingId !== "") {
    matchStage.bookingId = new mongoose.Types.ObjectId(bookingId);
  }

  const pipeline = [
    { $match: matchStage },
    {
      $lookup: {
        from: "users",
        let: { userId: "$userId" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$_id", "$$userId"] },
            },
          },
          {
            $project: { firstName: 1, phone: 1 },
          },
        ],
        as: "user",
      },
    },
    {
      $unwind: { path: "$user", preserveNullAndEmptyArrays: true },
    },
    {
      $lookup: {
        from: "branches",
        let: { branchId: "$branch" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$_id", "$$branchId"] },
            },
          },
          {
            $project: { name: 1 },
          },
        ],
        as: "branch",
      },
    },
    {
      $unwind: { path: "$branch", preserveNullAndEmptyArrays: true },
    },
  ];

  const result = await RentRoom.aggregate(pipeline);

  const checkin = result.filter((r) => r.bookStartDate === selectedDate);

  const checkout = result.filter((r) => r.bookEndDate === selectedDate);

  return { result, checkin, checkout };
};

export const rentRoomServices = {
  getRentRooms,
};
