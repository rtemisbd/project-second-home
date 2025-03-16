import Category from "../models/Category.js";
import Villa from "../models/Villa.js"

const createVillaIntoDB = async(payload)=>{

    const category = await Category.findOne({name : "Villa"})
    payload.category = category._id

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