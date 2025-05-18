import { villaOrderServices } from "../services/villaOrder.services.js";
import catchAsync from "../utils/catchAsync.js";
import responseSend from "../utils/responseSend.js";

const createVilaOrderIntoDB = catchAsync(async(req, res, next)=>{

    console.log("controller",req.body);
    
    const result = await villaOrderServices.createVillaOrderIntoDB(req.body);

    responseSend(res, {
        statusCode: 200,
        success: true,
        data : result ,
        message:
          "Booking has been created successfully!",
      });
})



export const villaOrdersControllers = {
    createVilaOrderIntoDB
}