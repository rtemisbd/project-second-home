import { resortServices } from "../services/resort.service.js";
import catchAsync from "../shared/cathAsync.js";
import sendResponse from "../shared/sendResponse.js";

const createResort = catchAsync(async(req, res, next)=>{
      const result = await resortServices.createResortIntoDB(req.body);
    
      sendResponse(res, {
        statusCode: 200,
        success: true,
        data: result,
        message:
          "Resort has been uploaded successfully!",
      });
     
})


export const resortControllers = {
    createResort
}