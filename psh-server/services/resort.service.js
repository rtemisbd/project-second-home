
import Resort from "../models/Resort.js"
import { districtServices } from "./district.service.js";

const createResortIntoDB = async(payload) =>{
    const result = await Resort.create(payload);
    const district = payload.district;
    const postDistrict = await districtServices.createDistrictIntoDB({name : district})


    return result;
}

const getAllResortsFromDB = async()=>{
    const result = await Resort.find();
    return result;
}


export const resortServices  = {
    createResortIntoDB,
    getAllResortsFromDB
}