import mongoose from "mongoose";
import TransactionForVilla from "../models/TransactionForVilla.js"

const createTransactionIntoDB = async(payload)=>{
    const result =  await TransactionForVilla.create(payload);
    return result ;
}


const getAllTransactionForVilla = async(queries)=>{
  const {user, villa, resortId} = queries
  const page = parseInt(queries?.page) || 1;
  const size = parseInt(queries?.size) || 10;

  let matchStage = {}; 
    if(resortId && resortId !== "undefined" && resortId !== "null" && resortId !== "") {
      matchStage.resortId = new mongoose.Types.ObjectId(resortId);
    }
    
  
  const totalCountsPipeline = [
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalCount: { $sum: 1 },
      },
    },
  ];

  const totalCountsResult = await TransactionForVilla.aggregate(totalCountsPipeline);
  const totalCount = totalCountsResult.length > 0 ? totalCountsResult[0].totalCount : 0;

  const pipeline = [
    { $match: matchStage },
    {
      $facet: {
        paginatedResult: [
          { $sort: { createdAt: -1 } },
          { $skip: (page - 1) * size },
          { $limit: size },

          //USER

          {
            $lookup: {
              from: "users",
              let: { userId: "$userId" },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ["$_id", "$$userId"] },
                  },
                },
                {
                  $project: { firstName: 1, phone: 1 },
                },
              ],
              as: "user",
            },
          },
          { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
        ],
      },
    },
    {
      $project: {
        paginatedResult: 1,
      },
    },
  ];

  const aggregatedResult = await TransactionForVilla.aggregate(pipeline);
  const transactions =  aggregatedResult?.[0]?.paginatedResult || [];

  return {transactions, totalCount};
 
}


export const transactionForVillaServices = {
    createTransactionIntoDB,
    getAllTransactionForVilla
}