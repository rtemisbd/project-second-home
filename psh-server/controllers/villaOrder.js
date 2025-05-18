import { villaOrderServices } from "../services/villaOrder.services.js";
import catchAsync from "../utils/catchAsync.js";
import responseSend from "../utils/responseSend.js";

const createVilaOrderIntoDB = catchAsync(async(req, res, next)=>{
    const result = await villaOrderServices.createVillaOrderIntoDB(req.body);

    responseSend(res, {
        statusCode: 200,
        success: true,
        data : result ,
        message:
          "Booking has been created successfully!",
      });
})

const getVillaOrderById = catchAsync(async(req, res, next)=>{
    const result = await villaOrderServices.getVillaOrderByIdFromDB(req.params.id);

    responseSend(res, {
        statusCode : 200,
        success : true,
        data : result,
        message : "Booking retrieved successfully!"
    })

}) 


export const villaOrdersControllers = {
    createVilaOrderIntoDB,
    getVillaOrderById
}