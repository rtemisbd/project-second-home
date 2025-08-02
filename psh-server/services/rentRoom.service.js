import mongoose from "mongoose";
import RentRoom from "../models/RentRoom.js";

const getRentRooms = async (queries) => {
  const { seatId, roomId, bookingId, startDate, endDate } = queries;

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
  ];

  const result = await RentRoom.aggregate(pipeline);

  return result;
};

export const rentRoomServices = {
  getRentRooms,
};
