
import mongoose from "mongoose";
import Category from "../models/Category.js";
import Villa from "../models/Villa.js"

const createVillaIntoDB = async(payload)=>{

    const category = await Category.findOne({name : "Villa"})
    payload.category = category._id

    const result = await Villa.create(payload);
    return result;
}

const getAllVillaFromDB = async()=>{
    const pipeline = [
        {
            $lookup: {
                from: "resorts",
                localField: "resortId",
                foreignField: "_id",
                as: "resort",
                pipeline: [
                    {
                        $project: { _id: 1, name: 1, address : 1 }
                    }
                ]
            }
        },
        { 
            $unwind: { 
                path: "$resort", 
                preserveNullAndEmptyArrays: true // Keeps villas even if no matching resort
            } 
        }
    ];
    const result =  await Villa.aggregate(pipeline);
    return result ;
}


const getVillaByIdFromDB = async (id) => {

    const result = await Villa.findOne({_id : id}).populate("resortId");
    return result;
};

export const villaServices = {
    createVillaIntoDB,
    getAllVillaFromDB,
    getVillaByIdFromDB
}  