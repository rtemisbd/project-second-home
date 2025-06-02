import Resort from "../models/Resort.js";
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

const getResortByIdFromDB  = async(id)=>{
    const result = await Resort.findOne({ _id : id});
    return result;
}

const getResortByNameFromDB = async(name)=> {
    const result = await Resort.findOne({name});
    return result ;
}



const updateResortById =  async(id, payload)=>{
  const result = await Resort.updateOne(
    { _id: id },
    { $set: payload },
    { runValidators: true }
  );
  return result;
}

export const resortServices  = {
    createResortIntoDB,
    getAllResortsFromDB,
    getResortByIdFromDB,
    getResortByNameFromDB, 
    updateResortById
}