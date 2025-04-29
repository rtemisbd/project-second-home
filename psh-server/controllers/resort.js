import { resortServices } from "../services/resort.service.js";
import catchAsync from "../utils/catchAsync.js";
import responseSend from "../utils/responseSend.js";

const createResort = catchAsync(async(req, res, next)=>{
      const result = await resortServices.createResortIntoDB(req.body);
    
      responseSend(res, {
        statusCode: 200,
        success: true,
        data: result,
        message:
          "Resort has been uploaded successfully!",
      });
     
})

const getAllResorts = catchAsync(async(req, res, next)=>{
  const data = await resortServices.getAllResortsFromDB();

  responseSend(res, {
    statusCode: 200,
    success: true,
    data,
    message:
      "Resort has been retrieve successfully!",
  });
})
const getSingleResortById = catchAsync(async(req, res, next)=>{
  const id = req.params.id
  const data = await resortServices.getResortByIdFromDB(id);

  responseSend(res, {
    statusCode: 200,
    success: true,
    data,
    message:
      "Resort has been retrieve successfully!",
  });
})


export const resortControllers = {
    createResort,
    getAllResorts,
    getSingleResortById
}