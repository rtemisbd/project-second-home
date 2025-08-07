import mongoose from "mongoose";
import RentRoom from "../models/RentRoom.js";

const getRentRooms = async (queries) => {
  const { seatId, roomId, bookingId, selectedDate } = queries;

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

  let filtered = result;
  let checkin = [];
  let checkout = [];

  if (selectedDate) {
    filtered = result.filter(
      (r) =>
        r.bookStartDate &&
        r.bookEndDate &&
        r.bookStartDate <= selectedDate &&
        r.bookEndDate >= selectedDate
    );

    checkin = filtered.filter((r) => r.bookStartDate === selectedDate);
    checkout = filtered.filter((r) => r.bookEndDate === selectedDate);
  }

  const totalBookingCount = filtered.length;

  const privateRoomBooking = filtered.filter(
    (r) => r.roomType === "Private Room"
  ).length;

  const sharedRoomBooking = filtered.filter(
    (r) => r.roomType === "Shared Room"
  ).length;

  return {
    result: filtered,
    checkin,
    checkout,
    totalBookingCount,
    privateRoomBooking,
    sharedRoomBooking,
  };
};

export const rentRoomServices = {
  getRentRooms,
};
