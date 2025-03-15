import { villaServices } from "../services/villa.service.js";
import catchAsync from "../shared/cathAsync.js";
import sendResponse from "../shared/sendResponse.js";

const createVilla = catchAsync(async(req, res, next) =>{
    const result = await villaServices.createVillaIntoDB(req.body);
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        data: result,
        message:
          "Villa has been uploaded successfully!",
      });
})




export const villaControllers = {
    createVilla
}