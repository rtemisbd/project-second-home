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

const getResortByName = catchAsync(async(req, res, next)=>{

  const name = req.params.name;

  const data = await resortServices.getResortByNameFromDB(name);

  responseSend(res, {
    statusCode : 200,
    success : true,
    data, 
    message : "Resort has been retrieved successfully!"
  })
})

export const updateResort = catchAsync(async (req, res, next) => {
  const result = await resortServices.updateResortById(
    req.params.id,
    req.body
  );

  responseSend(res, {
    statusCode: 200,
    success: true,
    message: "Resort has been updated successfully",
    data: result,
  });
});

export const resortControllers = {
    createResort,
    getAllResorts,
    getSingleResortById,
    getResortByName,
    updateResort
}