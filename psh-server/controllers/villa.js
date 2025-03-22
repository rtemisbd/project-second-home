import { villaServices } from "../services/villa.service.js";
import catchAsync from "../utils/catchAsync.js";
import responseSend from "../utils/responseSend.js";

const createVilla = catchAsync(async(req, res, next) =>{
    const result = await villaServices.createVillaIntoDB(req.body);
    
    responseSend(res, {
        statusCode: 200,
        success: true,
        data: result,
        message:
          "Villa has been uploaded successfully!",
      });
})

const getAllVilla =  catchAsync(async(req, res, next)=>{
    const result = await villaServices.getAllVillaFromDB();
    responseSend(res, {
        statusCode : 200,
        success : true,
        data : result, message : "Successfully retrieves all villas"
    })
})




export const villaControllers = {
    createVilla, getAllVilla
}