import mongoose from "mongoose";
import OrderModel from "../models/Order.js";

const getOrderFromDB = async (queries) => {
  const {
    orderId,
    userId,
    fromDate,
    toDate,
    branch,
    paymentStatus,
    runningStatus,
    guestType,
  } = queries;
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  const bookingStatus = queries?.status;
  const page = parseInt(queries?.page) || 1;
  const size = parseInt(queries?.size) || 10;
  let matchStage = {};

  if (orderId && orderId !== "All") matchStage._id = orderId;
  if (userId && userId !== "All") matchStage.userId = userId;
  if (branch && branch !== "All")
    matchStage.branch = mongoose.Types.ObjectId(branch);
  if (paymentStatus && paymentStatus !== "All")
    matchStage.paymentStatus = paymentStatus;
  if (bookingStatus && bookingStatus !== "All")
    matchStage.status = bookingStatus;
  if (fromDate && toDate) {
    matchStage.createdAt = {
      $gte: new Date(fromDate),
      $lte: new Date(toDate),
    };
  }
  if (runningStatus && runningStatus === "Running") {
    matchStage["bookingInfo.rentDate.bookStartDate"] = { $lte: formattedDate };
    matchStage["bookingInfo.rentDate.bookEndDate"] = { $gte: formattedDate };
  }
  if (runningStatus && runningStatus === "Closed") {
    matchStage["bookingInfo.rentDate.bookEndDate"] = { $lt: formattedDate };
  }
  if (guestType && guestType !== "All") matchStage.customerType = guestType;

  const totalCountsPipeline = [
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalCount: { $sum: 1 },
      },
    },
  ];

  const totalCountsResult = await OrderModel.aggregate(totalCountsPipeline);
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
        ],
        totalCounts: [
          {
            $group: {
              _id: null,
              bookingsTotalCount: { $sum: 1 },
              approvedCount: {
                $sum: { $cond: [{ $eq: ["$status", "Approved"] }, 1, 0] },
              },
              canceledCount: {
                $sum: { $cond: [{ $eq: ["$status", "Canceled"] }, 1, 0] },
              },
              pendingCount: {
                $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] },
              },
              processingCount: {
                $sum: { $cond: [{ $eq: ["$status", "Processing"] }, 1, 0] },
              },
              totalBookingAmount: {
                $sum: {
                  $cond: [
                    {
                      $eq: [
                        "$status",
                        bookingStatus === "All" ? "Approved" : bookingStatus,
                      ],
                    },
                    "$payableAmount",
                    0,
                  ],
                },
              },
              totalReceiveAmountFilter: {
                $sum: {
                  $cond: [
                    {
                      $eq: [
                        "$status",
                        bookingStatus === "All" ? "Approved" : bookingStatus,
                      ],
                    },
                    "$totalReceiveTk",
                    0,
                  ],
                },
              },
              totalDueAmount: {
                $sum: {
                  $cond: [
                    {
                      $eq: [
                        "$status",
                        bookingStatus === "All" ? "Approved" : bookingStatus,
                      ],
                    },
                    "$dueAmount",
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
        totalCounts: { $arrayElemAt: ["$totalCounts", 0] },
      },
    },
  ];

  const result = await OrderModel.aggregate(pipeline);

  return { result, totalCount };
};

export const orderServices = {
  getOrderFromDB,
};
