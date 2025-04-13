import mongoose, { startSession } from "mongoose";
import Transaction from "../models/Transaction.js";
import { getValue, setValue } from "node-global-storage";
import config from "../config/index.js";
import { bkash_headers } from "../utils/bkash_headers.js";
import { v4 as uuidv4 } from "uuid";

const createTransactionIntoDB = async (payload) => {
  const result = await Transaction.create(payload);
  return result;
};

const createTransactionByUserBkash = async (payload) => {
  const { amount, dataForBackend: data } = payload;

  let responseData = null;

  try {
    // Set user context
    await setValue("userId", data?.userId);
    await setValue("order", data);
    const callbackData = encodeURIComponent(JSON.stringify(data));
    const bkash_auth_token = getValue("id_token");
    const token = encodeURIComponent(JSON.stringify(bkash_auth_token));

    const response = await fetch(config.bkash_create_payment_url, {
      method: "POST",
      headers: bkash_headers(bkash_auth_token),
      body: JSON.stringify({
        mode: "0011",
        payerReference: " ",
        callbackURL: `${config.server_url}/bkash/payment/user/callback?callbackData=${callbackData}&token=${token}`,
        amount,
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: `Inv${uuidv4().substring(0, 4)}`,
      }),
    });
    responseData = await response.json();

    return { bkashURL: responseData?.bkashURL };
  } catch (error) {}
};

const getAllTransactionFromDB = async (queries) => {
  const {
        
    fromDate,
    toDate,
    branch,
    paymentType,
    paymentNumber,
    phone,
    bookingId,
    status,
  } = queries;

  let matchStage = {};

  const page = parseInt(queries.page) || 1;
  const size = parseInt(queries.size) || 10;

  if (branch && branch !== "All") {
    matchStage.branch = mongoose.Types.ObjectId(branch);
  }
  if (paymentType && paymentType !== "All") {
    matchStage.paymentType = paymentType;
  }
  if (status && status !== "All") {
    matchStage.acceptableStatus = status;
  }
  if (paymentNumber && paymentNumber !== "") {
    matchStage.paymentNumber = paymentNumber;
  }
  if (phone && phone !== "") matchStage.userPhone = phone;
  if (fromDate && toDate) {
    matchStage.paymentDate = {
      $gte: new Date(fromDate),
      $lte: new Date(toDate),
    };
  }

  const pipeline = [
    { $match: matchStage },
    {
      $lookup: {
        from: "branches",
        localField: "branch",
        foreignField: "_id",
        as: "branchDetails",
        pipeline: [
          {
            $project: {
              _id: 1,
              name: 1,
              // location: 1,
            },
          },
        ],
      },
    },
    { $unwind: "$branchDetails" },
    {
      $lookup: {
        from: "orders",
        localField: "orderId",
        foreignField: "_id",
        as: "orderDetails",
        pipeline: [
          {
            $project: {
              _id: 1,
              bookingId: 1,
              // location: 1,
            },
          },
        ],
      },
    },
    { $unwind: "$orderDetails" },

    {
      $match: {
        ...(bookingId ? { "orderDetails.bookingId": bookingId } : {}),
      },
    },

    {
      $facet: {
        paginatedResults: [
          { $sort: { createdAt: -1 } },
          { $skip: (page - 1) * size },
          { $limit: size },
        ],
        totalCounts: [
          {
            $group: {
              _id: null,
              totalCount: { $sum: 1 },
              totalReceivedAmount: {
                $sum: {
                  $cond: [
                    { $eq: ["$acceptableStatus", "Accepted"] },
                    "$receivedTk",
                    0,
                  ],
                },
              },
            },
          },
        ],
      },
    },
    {
      $project: {
        paginatedResults: 1,
        totalCount: {
          $ifNull: [{ $arrayElemAt: ["$totalCounts.totalCount", 0] }, 0],
        },
        totalReceivedAmount: {
          $ifNull: [
            { $arrayElemAt: ["$totalCounts.totalReceivedAmount", 0] },
            0,
          ],
        },
      },
    },
    {
      $sort: { paymentDate: -1 },
    },
  ];

  const transactions = await Transaction.aggregate(pipeline);
  const paginatedResults = transactions[0]?.paginatedResults || [];
  const totalCount = transactions[0]?.totalCount || 0;
  const totalReceivedAmount = transactions[0]?.totalReceivedAmount || 0;

  return {
    transactions: paginatedResults,
    totalCount: totalCount,
    totalReceivedAmount: totalReceivedAmount,
    currentPage: page,
    pageSize: size,
  };
};

// Function to get transaction by ID
const getTransactionByIdFromDB = async (id) => {
  const matchCondition = id.length > 11 ? { _id: id } : { userPhone: id };

  const result = await Transaction.aggregate([
    { $match: matchCondition }, 
    {
      $lookup: {
        from: "orders", 
        localField: "orderId",
        foreignField: "_id",
        as: "orderDetail",
        pipeline: [
          {
            $project: {
              _id: 0, 
              bookingId: 1, // Only include bookingId
            },
          },
        ],
      },
    },
    
  ]);

  return result;
};

// Function to get transaction by OrderId
const getTransactionByOrderIdFromDB = async (orderId) => {
  const result = await Transaction.find({ orderId });
  return result;
};

// Exporting the transaction services
export const transactionServices = {
  createTransactionIntoDB,
  createTransactionByUserBkash,
  getAllTransactionFromDB,
  getTransactionByIdFromDB,
  getTransactionByOrderIdFromDB,
};
