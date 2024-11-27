import { seatServices } from "../services/seat.service.js";
import catchAsync from "../shared/cathAsync.js";
import sendResponse from "../shared/sendResponse.js";

export const getAllSeats = catchAsync(async (req, res, next) => {
  const result = await seatServices.getAllSeatsFromDB();
  //   res.status(200).json(result);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Seats retrieved successfully",
    data: result,
  });
});

export const getSeatById = catchAsync(async (req, res, next) => {
  const { seat, rentRooms } = await seatServices.getSeatByIdFromDB(
    req.params.id
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Seats retrieved successfully",
    data: { seat, rentRooms },
  });
});
