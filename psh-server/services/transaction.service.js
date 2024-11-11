import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";

const getAllTransactionFromDB = async (queries) => {
  // Pagination parameters
  const { fromDate, toDate, branch, paymentType, userId, bookingId } = queries;

  let matchStage = {};

  const page = parseInt(queries.page) || 1;
  const size = parseInt(queries.size) || 10;

  if (branch && branch !== "All")
    matchStage.branch = mongoose.Types.ObjectId(branch);
  if (paymentType && paymentType !== "All")
    matchStage.paymentType = paymentType;

  if (fromDate && toDate) {
    matchStage.createdAt = {
      $gt: new Date(fromDate),
      $lte: new Date(toDate),
    };
  }
  if (userId && userId !== "") matchStage["userDetails.userId"] = userId;

  const totalCountsPipeline = [
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalCount: { $sum: 1 },
      },
    },
  ];
  console.log(matchStage);

  const totalCountsResult = await Transaction.aggregate(totalCountsPipeline);
  const totalCount =
    totalCountsResult.length > 0 ? totalCountsResult[0].totalCount : 0;

  const pipeline = [
    { $match: matchStage },
    {
      $facet: {
        paginatedResults: [
          { $sort: { createdAt: -1 } },
          { $skip: (page - 1) * size },
          { $limit: size },
          {
            $lookup: {
              from: "branches",
              localField: "branch",
              foreignField: "_id",
              as: "branchDetails",
            },
          },
          { $unwind: "$branchDetails" },
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "userDetails",
            },
          },
          { $unwind: "$userDetails" },
        ],
        totalCounts: [
          {
            $group: {
              _id: null,
              totalCount: { $sum: 1 },
            },
          },
        ],
      },
    },
    {
      $project: {
        paginatedResults: 1,
        totalCounts: { $arrayElemAt: ["$totalCounts", 0] },
      },
    },
    { $sort: { paymentDate: -1 } },
  ];

  const transactions = await Transaction.aggregate(pipeline);
  const paginatedResults = transactions[0]?.paginatedResults || [];
  // const totalCount = transactions[0]?.totalCounts || 0;

  return {
    transactions: paginatedResults,
    totalCount: totalCount,
    currentPage: page,
    pageSize: size,
  };
};

// get transaction by id
const getTransactionByIdFromDB = async (id) => {
  const result = await Transaction.findById(id);

  return result;
};

export const transactionServices = {
  getAllTransactionFromDB,
  getTransactionByIdFromDB,
};
