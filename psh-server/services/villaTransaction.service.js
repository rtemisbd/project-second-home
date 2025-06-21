import mongoose from "mongoose";
import TransactionForVilla from "../models/TransactionForVilla.js"
import VillaOrders from "../models/VillaOrders.js";
import { villaOrderServices } from "./villaOrder.services.js";

const createTransactionIntoDB = async(payload)=>{
    const result =  await TransactionForVilla.create(payload);
    return result ;
}


const getAllTransactionForVilla = async(queries)=>{
  const { villa, resortId, phone,toDate, fromDate, status, bookingId } = queries
  const page = parseInt(queries?.page) || 1;
  const size = parseInt(queries?.size) || 10;

  let matchStage = {}; 
  if(resortId && resortId !== "undefined" && resortId !== "null" && resortId !== "") {
    matchStage.resortId = new mongoose.Types.ObjectId(resortId);
  }
  if(bookingId && bookingId !== "") {
    matchStage.bookingId = { $regex: `^${bookingId}` };
  }
  if(status && status !== "All") {
    matchStage.paymentStatus = status;
  }
  if (fromDate && toDate) {
    matchStage.createdAt = {
      $gte: new Date(fromDate),
      $lte: new Date(toDate),
    };
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

        // USER
        {
          $lookup: {
            from: "users",
            let: { userId: "$userId" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
              { $project: { firstName: 1, phone: 1 } },
            ],
            as: "user",
          },
        },
        { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
        //  ADD USER PHONE FILTER HERE
      ...(phone && phone !== ""
        ? [
            {
              $match: {
                "user.phone": { $regex: phone, $options: "i" },
              },
            },
          ]
        : []),

        // VILLA
        {
          $lookup: {
            from: "villas",
            let: { villaId: "$villaId" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$villaId"] } } },
              { $project: { title: 1, villaNumber: 1 } },
            ],
            as: "villa",
          },
        },
        { $unwind: { path: "$villa", preserveNullAndEmptyArrays: true } },

        // ORDER
        {
          $lookup: {
            from: "villaorders",
            let: { orderId: "$orderId" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$orderId"] } } },
              {
                $project: {
                  payableAmount: 1,
                  phone: 1,
                  perNight: 1,
                  rentDate: 1,
                },
              },
            ],
            as: "order",
          },
        },
        { $unwind: { path: "$order", preserveNullAndEmptyArrays: true } },
      ],
      summary: [
        {
          $group: {
            _id: null,
            totalReceivedAmount: {
              $sum: {
                $cond: [
                  { $eq: ["$paymentStatus", "Approved"] },
                  "$receivedAmount",
                  0,
                ],
              },
            },
          },
        },
      ],
    },
  },
];


  const aggregatedResult = await TransactionForVilla.aggregate(pipeline);
  const transactions =  aggregatedResult?.[0]?.paginatedResult || [];
  const totalReceivedAmount = aggregatedResult?.[0]?.summary?.[0]?.totalReceivedAmount || 0;

  return {transactions, totalCount, totalReceivedAmount};
 
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
  
  // const updatedOrder = await VillaOrders.findByIdAndUpdate(
  //   orderId,
  //   {$set : {status : payload.paymentStatus }},
  //   { new: true, runValidators: true }
  // )

  const updatedOrder = await villaOrderServices.updateVillaOrderById(orderId, {status : payload.paymentStatus });

  return result;

}


export const transactionForVillaServices = {
    createTransactionIntoDB,
    getAllTransactionForVilla,
    updateVillaTransactionByID
}