import Resort from "../models/Resort.js"

const createResortIntoDB = async(payload) =>{
    const result = await Resort.create(payload);
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