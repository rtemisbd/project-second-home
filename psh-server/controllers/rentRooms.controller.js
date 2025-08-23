import { rentRoomServices } from "../services/rentRoom.service.js";
import catchAsync from "../utils/catchAsync.js";
import responseSend from "../utils/responseSend.js";

const getRentRoomCollection = catchAsync(async (req, res, next) => {
  const result = await rentRoomServices.getRentRooms(req.query);

  responseSend(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: "Successfully retrieves all booked collections",
  });
});

export const rentRoomController = {
  getRentRoomCollection,
};
