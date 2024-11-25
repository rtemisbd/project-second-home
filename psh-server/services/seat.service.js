import Seat from "../models/Seat.js";

const getAllSeatsFromDB = async () => {
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
  const result = await Seat.findById(id);

  return result;
};

export const seatServices = {
  getAllSeatsFromDB,
  getSeatByIdFromDB,
};
