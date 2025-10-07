import { setValue } from "node-global-storage";
import User from "../models/User.js";
import VillaOrders from "../models/VillaOrders.js";
import TransactionForVilla from "../models/TransactionForVilla.js";
import VillaRentDates from "../models/VillaRentDates.js";
import mongoose from "mongoose";
import { generatedResortBookingId } from "../utils/generatedResortBookingId.js";
import { villaRentDatesServices } from "./villaRentDates.service.js";
import { bookingSms } from "../SMS/BookingSms.js";
import config from "../config/index.js";

const createVillaOrderIntoDB = async (payload) => {
  await setValue("userId", payload?.user);

  // Step 1: Update user information
  const userUpdate = {
    firstName: payload?.fullName,
    phone: payload?.phone,
    userAddress: payload?.address,
    // validityType: payload?.validityType,
    emergencyContact: {
      contactName: payload?.emergencyContactName,
      relation: payload?.emergencyRelationC,
      contactNumber: payload?.emergencyContact,
    },
  };
  await User.updateOne(
    { phone: payload?.phone },
    { $set: userUpdate },
    { runValidators: true }
    // { runValidators: true, session }
  );

  // step 2 : generate booking ID
  payload.bookingId = await generatedResortBookingId();

  //step 3 : create booking
  if (
    payload.sendAmount &&
    Number(payload.sendAmount) === Number(payload.pricing.totalAmount)
  ) {
    payload.paymentStatus = "Paid";
  }
  const order = await VillaOrders.create(payload);
  // Phone SMS for booking
  const bookingMessage = `/api/smsapi?api_key=${config.sms_api_key}&type=text&number=88${payload?.phone}&senderid=${config.sms_sender_id}&message=Thank%20you%20for%20choosing%20us!%20Your%20booking%20ID%3A%23${order?.bookingId}%20is%20received.%20Our%20team%20will%20verify%20your%20information%20before%20confirming%20your%20booking.%20Call%20us:%2001647647404.%20-%20PSH`;

  await bookingSms(bookingMessage);

  // step 4 : create transaction
  if (payload.sendAmount && payload.paymentProof && payload?.paymentPlatform) {
    const newTransaction = {
      userId: payload.user,
      bookingId: payload.bookingId,
      paymentProof: payload.paymentProof,
      receivedAmount: payload.sendAmount,
      orderId: order?._id,
      villaId: order?.villa,
      resortId: order?.resort,
      senderNumber: payload.senderAccountNumber,
      paymentMethod: payload.paymentMethod,
      paymentPlatform: payload.paymentPlatform,
    };
    await TransactionForVilla.create(newTransaction);
  }

  // step 5 : create rentDate
  const newRentDate = {
    bookStartDate: payload.rentDate.bookStartDate,
    bookEndDate: payload.rentDate.bookEndDate,
    daysDifference: payload.rentDate.daysDifference,
    orderId: order?._id,
    bookingId: payload.bookingId,
    villaId: payload.villa,
    resortId: payload?.resort,
    userId: payload.user,
  };
  await villaRentDatesServices.createRentDatesIntoDB(newRentDate);

  return order;
};

const getAllVillaOrdersFromDB = async (queries) => {
  const {
    user,
    villa,
    resort,
    phone,
    fromDate,
    toDate,
    status,
    runningStatus,
    paymentStatus,
  } = queries;
  const page = parseInt(queries?.page) || 1;
  const size = parseInt(queries?.size) || 10;

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  let matchStage = {};
  // if (resort && resort !== "undefined" && resort !== "null" && resort !== "") {
  //   matchStage.resort = new mongoose.Types.ObjectId(resort);
  // }
  if (user && user !== "undefined" && user !== "null" && user !== "") {
    matchStage.user = new mongoose.Types.ObjectId(user);
  }

  if (fromDate && toDate) {
    matchStage.createdAt = {
      $gte: new Date(fromDate),
      $lte: new Date(toDate),
    };
  }
  if (status && status !== "All") {
    matchStage.status = status;
  }

  if (runningStatus === "Running") {
    matchStage["rentDate.bookStartDate"] = { $lte: formattedDate };
    matchStage["rentDate.bookEndDate"] = { $gte: formattedDate };
  }
  if (runningStatus === "Closed") {
    matchStage["rentDate.bookEndDate"] = { $lt: formattedDate };
  }

  if (paymentStatus && paymentStatus !== "All")
    matchStage.paymentStatus = paymentStatus;

  const totalCountResult = await VillaOrders.aggregate([
    { $match: matchStage },
    { $count: "totalCount" },
  ]);
  const totalCount = totalCountResult[0]?.totalCount || 0;

  const pipeline = [
    { $match: matchStage },
    {
      $facet: {
        paginatedResult: [
          { $sort: { createdAt: -1 } },
          { $skip: (page - 1) * size },
          { $limit: size },

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
              ],
              as: "user",
            },
          },
          { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
          ...(phone && phone !== ""
            ? [
                {
                  $match: {
                    "user.phone": { $regex: phone, $options: "i" },
                  },
                },
              ]
            : []),

          {
            $lookup: {
              from: "villas",
              let: { villaId: "$villa" },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ["$_id", "$$villaId"] },
                  },
                },
                {
                  $project: { title: 1, pricing: 1, villaNumber: 1 },
                },
              ],
              as: "villa",
            },
          },
          { $unwind: { path: "$villa", preserveNullAndEmptyArrays: true } },
          {
            $lookup: {
              from: "resorts",
              let: { resortId: "$resort" },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ["$_id", "$$resortId"] },
                  },
                },
                {
                  $project: { name: 1 },
                },
              ],
              as: "resort",
            },
          },
          { $unwind: { path: "$resort", preserveNullAndEmptyArrays: true } },

          {
            $lookup: {
              from: "transactionforvillas",
              let: { orderId: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$orderId", "$$orderId"] },
                        { $eq: ["$paymentStatus", "Approved"] },
                      ],
                    },
                  },
                },
                {
                  $group: {
                    _id: null,
                    totalReceiveTk: { $sum: "$receivedAmount" },
                    allTransactions: { $push: "$$ROOT" },
                  },
                },
              ],
              as: "transactions",
            },
          },
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
  const orders = aggregatedResult?.[0]?.paginatedResult || [];

  let totalPayable = 0;
  let totalReceived = 0;

  for (const order of orders) {
    const receivedTk = order?.transactions?.[0]?.totalReceiveTk || 0;
    let totalAmount = 0;
    if (order?.status !== "Rejected") {
      totalAmount = order?.pricing?.payableAmount || 0;
    }

    const newPaymentStatus = receivedTk === totalAmount ? "Paid" : "Unpaid";

    if (order.paymentStatus !== newPaymentStatus) {
      await VillaOrders.updateOne(
        { _id: order._id },
        { $set: { paymentStatus: newPaymentStatus } }
      );
    }

    order.paymentStatus = newPaymentStatus;

    totalPayable += totalAmount;
    totalReceived += receivedTk;
  }

  // 👇 Overview Summary
  const overviewAggregation = await VillaOrders.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
        totalPayable: { $sum: "$pricing.totalAmount" },
      },
    },
  ]);

  const statusCounts = {
    totalBookings: 0,
    approved: 0,
    pending: 0,
    processing: 0,
    rejected: 0,
    totalPayable: 0,
    totalReceived: totalReceived,
    totalDue: totalPayable - totalReceived,
  };

  for (const row of overviewAggregation) {
    statusCounts.totalBookings += row.count;
    statusCounts.totalPayable += row.totalPayable;
    const key = row._id?.toLowerCase();
    if (key && key in statusCounts) {
      statusCounts[key] = row.count;
    }
  }

  return {
    orders,
    totalCount,
    overview: statusCounts,
  };
};

const getUserVillaOrderFromDB = async (queries, phone) => {
  const { paymentStatus, bookingStatus } = queries;
  const page = parseInt(queries?.page) || 1;
  const size = parseInt(queries?.size) || 10;

  const matchStage = {};
  if (paymentStatus && paymentStatus !== "All")
    matchStage.paymentStatus = paymentStatus;
  if (bookingStatus && bookingStatus !== "All")
    matchStage.status = bookingStatus;
  const totalCountsPipeline = [
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalCount: { $sum: 1 },
      },
    },
  ];

  const totalCountsResult = await VillaOrders.aggregate(totalCountsPipeline);
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
          // user
          {
            $lookup: {
              from: "users",
              let: { userId: "$userId" },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ["$_id", "$$userId"] },
                    ...(phone ? { phone } : {}),
                  },
                },
                {
                  $project: {
                    firstName: 1,
                    phone: 1,
                    userAddress: 1,
                    email: 1,
                  },
                },
              ],
              as: "userInfo",
            },
          },
          { $unwind: { path: "$userInfo", preserveNullAndEmptyArrays: true } },
        ],
      },
    },
    {
      $project: {
        paginatedResults: 1,
      },
    },
  ];

  const result = await VillaOrders.aggregate(pipeline);

  return { result, totalCount };
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
    })
    .populate({
      path: "resort",
      select: "name logo address contactNumbers resortEmail",
    });

  return result;
};

const updateVillaOrderById = async (id, payload) => {
  // step 1 : check the order exist          ence
  const order = await getVillaOrderByIdFromDB(id);

  if (!order) {
    return { error: "Order not found!" };
  }

  const oldStatus = order.status;
  const newStatus = payload?.status;

  // Step 2: Update the order
  const result = await VillaOrders.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true }
  );
  const bookingMessage = `/api/smsapi?api_key=${config.sms_api_key}&type=text&number=88${order?.user?.phone}&senderid=${config.sms_sender_id}&message=Your%20booking%20with%20Project%20Second%20Home%20is%20${payload?.status}!%20Booking%20ID%3A%23${order?.bookingId}.%20Check-in%20%3A%20${order?.rentDate?.bookStartDate}%2C%20Check-out%20%3A%20${order?.rentDate?.bookEndDate}.%20Call%20Us%3A%2001647647404.%20Enjoy%20your%20stay!%20-%20PSH`;

  await bookingSms(bookingMessage);
  // step 3 : update rent-date
  let bookingStatus = "";
  if (payload.status) {
    if (payload.status === "Approved" || payload.status === "Processing") {
      bookingStatus = "Booked";
    }
    if (payload.status === "Pending" || payload.status === "Rejected") {
      bookingStatus = "Cancelled";
    }
    const updateRentDate = await VillaRentDates.findOneAndUpdate(
      { orderId: id },
      { $set: { bookingStatus } },
      { new: true, runValidators: true }
    );
  }
  if (payload?.rentDate) {
    const newRentDate = {
      bookStartDate: payload?.rentDate?.bookStartDate,
      bookEndDate: payload?.rentDate?.bookEndDate,
      daysDifference: payload?.rentDate?.daysDifference,
    };
    const updateRentDate = await VillaRentDates.findOneAndUpdate(
      { orderId: id },
      { $set: newRentDate },
      { new: true, runValidators: true }
    );
  }

  return result;
};

export const villaOrderServices = {
  createVillaOrderIntoDB,
  getAllVillaOrdersFromDB,
  getVillaOrderByIdFromDB,
  updateVillaOrderById,
  getUserVillaOrderFromDB,
};
