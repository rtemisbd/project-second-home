
import { districtServices } from "../services/district.service.js";
import catchAsync from "../shared/cathAsync.js";
import sendResponse from "../shared/sendResponse.js";

const createDistrict = catchAsync(async(req, res, next)=>{
    const result = await districtServices.createDistrictIntoDB(req.body);

    sendResponse(res, {
        statusCode : 200,
        success : true,
        data : result,
        message : "Successfully added district."
    })
})

export const districtControllers = {
    createDistrict
}