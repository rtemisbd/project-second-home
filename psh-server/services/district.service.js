import District from "../models/District.js"

const createDistrictIntoDB = async (payload)=>{
    const existingDistrict = await District.findOne(payload);

    if (existingDistrict) {
      return existingDistrict;
    }

    // Create district if it does not exist
    return await District.create(payload);
}

export const districtServices = {
    createDistrictIntoDB
}