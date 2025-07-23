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

const getAllVillaOrders = catchAsync(async(req, res, next)=>{
    const result =  await villaOrderServices.getAllVillaOrdersFromDB(req.query);

    responseSend(res, {
        statusCode : 200,
        success : true,
        data : result,
        message : "Bookings retrieved successfully!"
    })
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

const updateSingleVillaOrder = catchAsync(async(req, res, next)=>{
    const transaction = await villaOrderServices.updateVillaOrderById(req.params.id, req.body);

    responseSend(res, {
        statusCode : 200,
        success : true,
        data : transaction,
        message : "Order updated successfully"
    })
})


export const villaOrdersControllers = {
    createVilaOrderIntoDB,
    getAllVillaOrders,
    getVillaOrderById,
    updateSingleVillaOrder
}