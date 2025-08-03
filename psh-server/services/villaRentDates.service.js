import mongoose from "mongoose";
import VillaRentDates from "../models/VillaRentDates.js";

const createRentDatesIntoDB = async (payload) => {
  const result = await VillaRentDates.create(payload);
  return result;
};

const getAllVillaRentDates = async (queries) => {
  const { villa, resort, bookStartDate, bookEndDate } = queries;

  let matchStage = {};
  if (resort && resort !== "undefined" && resort !== "null" && resort !== "") {
    matchStage.resortId = new mongoose.Types.ObjectId(resort);
  }

  // Filter by date range (only if both provided)
  if (bookStartDate && bookEndDate) {
    matchStage.bookStartDate = { $lte: bookEndDate };
    matchStage.bookEndDate = { $gte: bookStartDate };
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

  const result = await VillaRentDates.aggregate(pipeline);

  return result;
};

// const deleteVillaRents

export const villaRentDatesServices = {
  createRentDatesIntoDB,
  getAllVillaRentDates,
};
