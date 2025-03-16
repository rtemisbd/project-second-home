import Villa from "../models/Villa.js"

const createVillaIntoDB = async(payload)=>{
    const result = await Villa.create(payload);
    return result;
}

const getAllVillaFromDB = async()=>{
    const result =  await Villa.find();
    return result ;
}

export const villaServices = {
    createVillaIntoDB,
    getAllVillaFromDB
}