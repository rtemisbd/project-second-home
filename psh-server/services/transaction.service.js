import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";

const getAllTransactionFromDB = async (queries) => {
  const { fromDate, toDate, branch, paymentType, phone, bookingId, status } =
    queries;

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
  if (id.length > 11) {
    const result = await Transaction.findById(id);
    return result;
  } else {
    const result = await Transaction.find({ userPhone: id });
    return result;
  }
};
// Function to get transaction by OrderId
const getTransactionByOrderIdFromDB = async (orderId) => {
  const result = await Transaction.find({ orderId });
  return result;
};

// Exporting the transaction services
export const transactionServices = {
  getAllTransactionFromDB,
  getTransactionByIdFromDB,
  getTransactionByOrderIdFromDB,
};
