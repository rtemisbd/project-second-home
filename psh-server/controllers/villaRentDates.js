import { villaRentDatesServices } from "../services/villaRentDates.service.js";
import catchAsync from "../utils/catchAsync.js";
import responseSend from "../utils/responseSend.js";

const getVillaRentDates = catchAsync(async(req, res, next)=>{
 const result  = await villaRentDatesServices.getAllVillaRentDates(req?.query);
 responseSend(res, {
    statusCode: 200,
    success: true,
    data: result,
    message:
          "Data has been retrieved successfully!",
    });
})

export const villaRentDateController = {
    getVillaRentDates
}