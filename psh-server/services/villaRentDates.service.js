import mongoose from "mongoose";
import VillaRentDates from "../models/VillaRentDates.js"

const createRentDatesIntoDB = async(payload) =>{
    const result = await VillaRentDates.create(payload)
    return result;
}


const getAllVillaRentDates = async(queries)=>{  
  const { villa, resort} = queries

  let matchStage = {}; 
  if(resort && resort !== "undefined" && resort !== "null" && resort !== "") {
    matchStage.resortId = new mongoose.Types.ObjectId(resort);
  }


    const pipeline = [
        { $match: matchStage },
      ];
    
    const result = await VillaRentDates.aggregate(pipeline);

    return result;
}


// const deleteVillaRents

export const villaRentDatesServices = {
    createRentDatesIntoDB,
    getAllVillaRentDates,
    
}