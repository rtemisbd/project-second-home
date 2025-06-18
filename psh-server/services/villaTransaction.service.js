import mongoose from "mongoose";
import TransactionForVilla from "../models/TransactionForVilla.js"
import VillaOrders from "../models/VillaOrders.js";

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


const updateVillaTransactionByID = async(id, payload)=>{
   const transaction = await TransactionForVilla.findById({ _id: id });

   if(!transaction) {
    return {error : "Transaction not found!"};
   }

   const orderId = transaction.orderId;
   const oldStatus = transaction.paymentStatus;
   const newStatus = payload.paymentStatus;

 // Step 2: Update the transaction status
  const result = await TransactionForVilla.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true }
  );

  // Step 3 : Update order status
  
  const updatedOrder = await VillaOrders.findByIdAndUpdate(
    orderId,
    {$set : {status : payload.paymentStatus }},
    { new: true, runValidators: true }
  )

  return result;

}


export const transactionForVillaServices = {
    createTransactionIntoDB,
    getAllTransactionForVilla,
    updateVillaTransactionByID
}