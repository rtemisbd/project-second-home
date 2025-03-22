
import { districtServices } from "../services/district.service.js";
import catchAsync from "../utils/catchAsync.js";
import responseSend from "../utils/responseSend.js";

const createDistrict = catchAsync(async(req, res, next)=>{
    const result = await districtServices.createDistrictIntoDB(req.body);

    responseSend(res, {
        statusCode : 200,
        success : true,
        data : result,
        message : "Successfully added district."
    })
});

const getAllDistrict = catchAsync(async(req, res, next)=>{
    const result = await districtServices.getAllDistrictFromDB();
    
    responseSend(res, {
        statusCode : 200,
        success : true,
        data : result,
        message : "Districts retrieves successfully!"
    })
})

export const districtControllers = {
    createDistrict, getAllDistrict
}