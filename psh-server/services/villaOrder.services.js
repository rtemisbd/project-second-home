import { setValue } from "node-global-storage";
import User from "../models/User.js";
import VillaOrders from "../models/VillaOrders.js"
import TransactionForVilla from "../models/TransactionForVilla.js";
import VillaRentDates from "../models/VillaRentDates.js";
import mongoose from "mongoose";
import { generatedResortBookingId } from "../utils/generatedResortBookingId.js";
import { villaRentDatesServices } from "./villaRentDates.service.js";

const createVillaOrderIntoDB = async(payload)=>{
    await setValue("userId", payload?.user);

    // Step 1: Update user information
    const userUpdate = {
      firstName: payload?.fullName,
      phone: payload?.phone,
      userAddress: payload?.address,
      emergencyContact: {
        contactName: payload?.emergencyContactName,
        relation: payload?.emergencyRelationC,
        contactNumber: payload?.emergencyContact,
      },
    };
    await User.updateOne(
      { phone: payload?.phone },
      { $set: userUpdate },
      { runValidators: true}
      // { runValidators: true, session }
    );

    // step 2 : generate booking ID 
    payload.bookingId = await generatedResortBookingId();

    //step 3 : create booking
      const order = await VillaOrders.create(payload);
   
    // step 4 : create transaction
    const newTransaction ={
      userId : payload.user,
      bookingId : payload.bookingId,
      paymentProof : payload.paymentProof,
      receivedAmount : payload.sendAmount,
      orderId : order?._id,
      villaId : order?.villa,
      resortId : order?.resort,
      senderNumber : payload.senderAccountNumber,
      paymentMethod : payload.paymentMethod,
      paymentPlatform : payload.paymentPlatform,
    };
   await TransactionForVilla.create(newTransaction);
  
    // step 5 : create rentDate
    const newRentDate = {
      bookStartDate:payload.rentDate.bookStartDate,
      bookEndDate:payload.rentDate.bookEndDate,
      daysDifference:payload.rentDate.daysDifference,
      orderId : order?._id,
      bookingId:payload.bookingId,
      villaId:payload.villa,
      resortId : payload?.resort,
      userId:payload.user,
    }
    await villaRentDatesServices.createRentDatesIntoDB(newRentDate);
  
  return order;
}


const getAllVillaOrdersFromDB = async (queries) => {
  const {user, villa, resort} = queries
  const page = parseInt(queries?.page) || 1;
  const size = parseInt(queries?.size) || 10;
  
  let matchStage = {}; 
  if(resort && resort !== "undefined" && resort !== "null" && resort !== "") {
    matchStage.resort = new mongoose.Types.ObjectId(resort);
  }
  
  const totalCountResult = await VillaOrders.aggregate([
    { $match: matchStage },
    { $count: "totalCount" },
  ]);
  const totalCount = totalCountResult[0]?.totalCount || 0;

  const pipeline = [
    { $match: matchStage },
     {
      $sort: { createdAt: -1 }
    },
    { $skip: (page - 1) * size },
    { $limit: size },
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
              let: { userId: "$user" },
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

          // VILLA  
          
          {
            $lookup: {
              from: "villas",
              let : {villaId : "$villa"},
             pipeline : [
              {
                $match : {
                  $expr : {$eq : ["$_id", "$$villaId"]}
                }
              }
             ],
              as: "villa",
            },
          },
          { $unwind: { path: "$villa", preserveNullAndEmptyArrays: true } },

          // transaction
          // {
          //   $lookup: {
          //     from: "transactionforvillas",
          //     let: { orderId: "$_id" },
          //     pipeline: [
          //       {
          //         $match: {
          //           $expr: {
          //             $and: [
          //               { $eq: ["$orderId", "$$orderId"] },
          //               { $eq: ["$paymentStatus", "Processing"] }, 
          //             ],
          //           },
          //         },
          //       },
          //       {
          //         $group: {
          //           totalReceiveTk: { $sum: "$receivedAmount" },
          //           allTransactions: { $push: "$$ROOT" },
          //         },
          //       },
          //     ],
          //     as: "transactions",
          //   },
          // },
          // { $unwind: { path: "$transactions", preserveNullAndEmptyArrays: true } },

        ],
      },
    },
    {
      $project: {
        paginatedResult: 1,
      },
    },
  ];

  const aggregatedResult = await VillaOrders.aggregate(pipeline);
  const orders =  aggregatedResult?.[0]?.paginatedResult || [];

  return {orders, totalCount};
};

const getVillaOrderByIdFromDB = async (id) => {
  const result = await VillaOrders.findById({ _id: id })
    .populate({
      path: "villa",
      select: "title type villaNumber resortId",
      
    })
    .populate({
      path: "user",
      select: "firstName phone userAddress",
    }).populate( {
        path: "resort",
        select: "name logo address contactNumbers resortEmail",
      });

  return result;
};


const updateVillaOrderById = async(id, payload)=>{
  // step 1 : check the order existence
   const order = await VillaOrders.findById({ _id: id });

   if(!order) {
    return {error : "Order not found!"};
   }


   const oldStatus = order.status;
   const newStatus = payload.status;

 // Step 2: Update the order status
  const result = await VillaOrders.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true }
  );
  // step 3 : update rent-date
  let bookingStatus = ""
  if(payload.status === "Approved" || payload.status === "Processing"){
    bookingStatus = "Booked";
  }
  if(payload.status === "Pending" || payload.status === "Rejected"){
    bookingStatus = "Cancelled";
  }
  const updateRentDate = await VillaRentDates.findOneAndUpdate({orderId :id },
    { $set: {bookingStatus} },
    { new: true, runValidators: true }) 

  return result;
}


export const villaOrderServices = {
    createVillaOrderIntoDB,
    getAllVillaOrdersFromDB,
    getVillaOrderByIdFromDB,
    updateVillaOrderById
}