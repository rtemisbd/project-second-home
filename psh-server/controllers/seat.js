import Seat from "../models/Seat.js";
import catchAsync from "../shared/cathAsync.js";
import sendResponse from "../shared/sendResponse.js";

export const getAllSeats = catchAsync(async (req, res, next) => {
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
  //   res.status(200).json(result);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Seats retrieved successfully",
    data: result,
  });
});
