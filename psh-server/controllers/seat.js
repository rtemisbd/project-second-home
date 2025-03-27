import { seatServices } from "../services/seat.service.js";
import catchAsync from "../utils/catchAsync.js";

import responseSend from "../utils/responseSend.js";

export const createSeat = catchAsync(async (req, res, next) => {
  const result = await seatServices.createSeatIntoDB(req.body);
  responseSend(res, {
    statusCode: 200,
    success: true,
    message: "Seats uploaded successfully",
  });
});

export const getAllSeats = catchAsync(async (req, res, next) => {
  const result = await seatServices.getAllSeatsFromDB(req.query);

  //   res.status(200).json(result);
  responseSend(res, {
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

  responseSend(res, {
    statusCode: 200,
    success: true,
    message: "Seats retrieved successfully",
    data: { seat, rentRooms },
  });
});

export const updateSingleSeat = catchAsync(async (req, res, next) => {
  const result = await seatServices.updateSeatById(req.params.id, req.body);

  responseSend(res, {
    statusCode: 200,
    success: true,
    message: "Seat updated successfully",
    data: result,
  });
});
