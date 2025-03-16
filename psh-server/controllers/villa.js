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

const getAllVilla =  catchAsync(async(req, res, next)=>{
    const result = await villaServices.getAllVillaFromDB();
    sendResponse(res, {
        statusCode : 200,
        success : true,
        data : result, message : "Successfully retrives all villas"
    })
})




export const villaControllers = {
    createVilla, getAllVilla
}