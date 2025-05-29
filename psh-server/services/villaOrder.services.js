import { setValue } from "node-global-storage";
import User from "../models/User.js";
import VillaOrders from "../models/VillaOrders.js"
import { generateBookingId } from "../utils/generateBookingId.js";
import TransactionForVilla from "../models/TransactionForVilla.js";
import VillaRentDates from "../models/VillaRentDates.js";

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
    payload.bookingId = await generateBookingId();

    //step 3 : create booking
      const order = await VillaOrders.create(payload);
   
    // step 4 : create transaction
    const newTransaction ={
      userId : payload.user,
      bookingId : payload.bookingId,
      paymentProof : payload.paymentProof,
      receivedAmount : payload.sendAmount,
      orderId : order?._id,
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
      userId:payload.user,
    }
    await VillaRentDates.create(newRentDate);
  
  return order;
}

const getAllVillaOrdersFromDB = async (queries) => {
  const {user, villa} = queries
  const page = parseInt(queries?.page) || 1;
  const size = parseInt(queries?.size) || 10;

  let matchStage = {}; // optionally filter by userId, villaId, status, etc.

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

  return orders;
};



const getVillaOrderByIdFromDB = async (id) => {
  const result = await VillaOrders.findById({ _id: id })
    .populate({
      path: "villa",
      select: "title type villaNumber resortId",
      populate: {
        path: "resortId",
        select: "name logo address contactNumbers resortEmail",
      },
    })
    .populate({
      path: "user",
      select: "firstName phone userAddress",
    });

  return result;
};



export const villaOrderServices = {
    createVillaOrderIntoDB,
    getAllVillaOrdersFromDB,
    getVillaOrderByIdFromDB
}