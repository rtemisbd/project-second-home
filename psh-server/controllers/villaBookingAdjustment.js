import { villaBookingAdjustmentServices } from "../services/viillaBookingAdjustment.service.js";
import catchAsync from "../utils/catchAsync.js";
import responseSend from "../utils/responseSend.js";

const createNewAdjustment = catchAsync(async (req, res, next) => {
  const result = await villaBookingAdjustmentServices.createNewAdjustmentIntoDB(
    req.body
  );

  responseSend(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: "An adjustment has been uploaded!",
  });
});

export const villaBookingAdjustmentController = {
    createNewAdjustment
}
