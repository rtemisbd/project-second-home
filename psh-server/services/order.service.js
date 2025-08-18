import mongoose, { startSession } from "mongoose";
import OrderModel from "../models/Order.js";
import User from "../models/User.js";
import { generateBookingId } from "../utils/generateBookingId.js";
import RentRoom from "../models/RentRoom.js";
import { getValue, setValue } from "node-global-storage";
import config from "../config/index.js";
import { v4 as uuidv4 } from "uuid";
import { bkash_headers } from "../utils/bkash_headers.js";
import Transaction from "../models/Transaction.js";
import { bookingSms } from "../SMS/BookingSms.js";

const createOrderIntoDB = async (payload) => {
  const { amount, dataForBooking, selectMethod } = payload;
  const session = await startSession();

  let responseData = null;

  try {
    session.startTransaction();

    // Set user context
    await setValue("userId", dataForBooking?.userId);

    // Step 1: Update user information
    const userUpdate = {
      firstName: dataForBooking?.fullName,
      phone: dataForBooking?.phone,
      userAddress: dataForBooking?.address,
      validityType: dataForBooking?.validityType,
      emergencyContact: {
        contactName: dataForBooking?.emergencyContactName,
        relation: dataForBooking?.emergencyRelationC,
        contactNumber: dataForBooking?.emergencyContact,
      },
    };
    await User.updateOne(
      { phone: dataForBooking?.phone },
      { $set: userUpdate },
      { runValidators: true, session }
    );

    // Step 2: Generate booking ID
    const generateId = await generateBookingId();
    dataForBooking.bookingId = generateId;
    dataForBooking.paymentStatus =
      dataForBooking.payableAmount === dataForBooking?.receivedTk
        ? "Paid"
        : "Unpaid";

    if (selectMethod === "manual") {
      const result = await createOrderByManualBkash(dataForBooking);
      return result;
    } else {
      // Step 3: Create payment request via bKash
      const callbackData = encodeURIComponent(JSON.stringify(dataForBooking));
      const token = encodeURIComponent(JSON.stringify(bkash_auth_token));

      const response = await fetch(config.bkash_create_payment_url, {
        method: "POST",
        headers: bkash_headers(bkash_auth_token),
        body: JSON.stringify({
          mode: "0011",
          payerReference: " ",
          callbackURL: `${config.server_url}/bkash/payment/callback?callbackData=${callbackData}&token=${token}`,
          amount,
          currency: "BDT",
          intent: "sale",
          merchantInvoiceNumber: `Inv${uuidv4().substring(0, 4)}`,
        }),
      });
      const data = await response.json();

      responseData = data;
    }
    // console.log({ data });

    await session.commitTransaction();
    return { bkashURL: responseData?.bkashURL };
  } catch (error) {
    await session.abortTransaction();
    // console.error("Error in createOrderIntoDB:", error);
    return { error: error };
  } finally {
    await session.endSession();
  }
};

export const createOrderByManualBkash = async (payload) => {
  const session = await startSession();
  try {
    session.startTransaction();

    const dataForBooking = payload;
    // const generateId = await generateBookingId();
    // dataForBooking.bookingId = generateId;
    // dataForBooking.paymentStatus = dataForBooking.payableAmount === dataForBooking?.receivedTk ? "Paid" : "Unpaid";

    dataForBooking.paymentType = "bkash";

    const result = await OrderModel.create([dataForBooking], { session });

    // Step 6: Create user transaction
    await Transaction.create(
      [
        {
          orderId: result[0]?._id,
          branch: dataForBooking?.branch,
          paymentDate: new Date(),
          totalAmount: dataForBooking?.bookingInfo?.totalAmount,
          payableAmount: dataForBooking?.payableAmount,
          paymentType: "bkash",
          receivedTk: dataForBooking?.receivedTk,
          paymentNumber: dataForBooking?.paymentNumber,

          // transactionId: data.trxID,
          userId: dataForBooking?.userId,
          // userPhone: dataForBooking?.phone,
          // userName: dataForBooking?.fullName,
          acceptableStatus: "Pending",
        },
      ],
      { session }
    );

    // Phone SMS for booking
    const bookingMessage = `/api/smsapi?api_key=${config.sms_api_key}&type=text&number=88${result[0]?.phone}&senderid=${config.sms_sender_id}&message=Thank%20you%20for%20choosing%20us!%20Your%20booking%20ID%3A%23${result[0]?.bookingId}%20is%20received.%20Our%20team%20will%20verify%20your%20information%20before%20confirming%20your%20booking.%20Call%20us:%2001647647404.%20-%20PSH`;

    await bookingSms(bookingMessage);

    // Start Update user information
    // const userUpdate = {
    //   firstName: dataForBooking?.fullName,
    //   phone: dataForBooking?.phone,
    //   userAddress: dataForBooking?.address,
    //   validityType: dataForBooking?.validityType,
    //   emergencyContact: {
    //     contactName: dataForBooking?.emergencyContactName,
    //     relation: dataForBooking?.emergencyRelationC,
    //     contactNumber: dataForBooking?.emergencyContact,
    //   },
    // };

    // await User.updateOne(
    //   { _id: dataForBooking?.userId },
    //   { $set: userUpdate },
    //   { runValidators: true, session }
    // );
    // End Update User

    // Commit the transaction
    await session.commitTransaction();
    return {
      bkashURL: `${config.client_url}/success`,
    };
  } catch (error) {
    await session.abortTransaction();
    // console.error("Error during payment execution:", error);
    return {
      bkashURL: `${config.client_url}/error?message=${encodeURIComponent(
        error.message
      )}`,
    };
  } finally {
    session.endSession();
  }
};
export const createOrderByCash = async (payload) => {
  const session = await startSession();
  try {
    session.startTransaction();

    const dataForBooking = payload;
    // const generateId = await generateBookingId();
    // dataForBooking.bookingId = generateId;
    // dataForBooking.paymentType = "Cash";
    const result = await OrderModel.create([dataForBooking], { session });

    // Phone SMS for booking
    const bookingMessage = `/api/smsapi?api_key=${config.sms_api_key}&type=text&number=88${result[0]?.phone}&senderid=${config.sms_sender_id}&message=Thank%20you%20for%20choosing%20us!%20Your%20booking%20ID%3A%23${result[0]?.bookingId}%20is%20received.%20Our%20team%20will%20verify%20your%20information%20before%20confirming%20your%20booking.%20Call%20us:%2001647647404.%20-%20PSH`;

    await bookingSms(bookingMessage);

    // Start Update user information
    // const userUpdate = {
    //   firstName: dataForBooking?.fullName,
    //   phone: dataForBooking?.phone,
    //   userAddress: dataForBooking?.address,
    //   validityType: dataForBooking?.validityType,
    //   emergencyContact: {
    //     contactName: dataForBooking?.emergencyContactName,
    //     relation: dataForBooking?.emergencyRelationC,
    //     contactNumber: dataForBooking?.emergencyContact,
    //   },
    // };

    // await User.updateOne(
    //   { _id: dataForBooking?.userId },
    //   { $set: userUpdate },
    //   { runValidators: true, session }
    // );
    // End Update User

    // Commit the transaction
    await session.commitTransaction();
    return {
      status: true,
    };
  } catch (error) {
    await session.abortTransaction();
    // console.error("Error during payment execution:", error);
    return { error };
  } finally {
    session.endSession();
  }
};

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
    filteredPhone,
    category,
    // seatId,
    // roomId,
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
  if (filteredPhone && filteredPhone !== "")
    matchStage.phone = { $regex: `^${filteredPhone}` };
  if (fromDate && toDate) {
    matchStage.createdAt = {
      $gte: new Date(fromDate),
      $lte: new Date(toDate),
    };
  }
  if (runningStatus === "Running") {
    matchStage["rentDate.bookStartDate"] = { $lte: formattedDate };
    matchStage["rentDate.bookEndDate"] = { $gte: formattedDate };
  }
  if (runningStatus === "Closed") {
    matchStage["rentDate.bookEndDate"] = { $lt: formattedDate };
  }
  if (category && category !== "All") {
    matchStage["bookingInfo.roomType"] = category;
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

          // user
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
                // {
                //   $project: { firstName: 1, phone: 1 },
                // },
              ],
              as: "userInfo",
            },
          },
          { $unwind: { path: "$userInfo", preserveNullAndEmptyArrays: true } },
          // branch
          {
            $lookup: {
              from: "branches",
              let: { branchId: "$branch" },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ["$_id", "$$branchId"] },
                  },
                },
                {
                  $project: {
                    name: 1,
                    branchEmail: 1,
                    branchAddress: 1,
                    branchMobileNumber: 1,
                  },
                },
              ],
              as: "branchDetails",
            },
          },
          {
            $unwind: {
              path: "$branchDetails",
              preserveNullAndEmptyArrays: true,
            },
          },
          // room
          {
            $lookup: {
              from: "properties",
              let: { roomId: "$roomId" },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ["$_id", "$$roomId"] },
                  },
                },
                {
                  $project: { name: 1, roomNumber: 1 },
                },
              ],
              as: "room",
            },
          },
          {
            $unwind: {
              path: "$room",
              preserveNullAndEmptyArrays: true,
            },
          },
          // seat
          {
            $lookup: {
              from: "seats",
              let: { seatId: "$seatId" },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ["$_id", "$$seatId"] },
                  },
                },
                {
                  $project: { name: 1, seatNumber: 1 },
                },
              ],
              as: "seat",
            },
          },
          {
            $unwind: {
              path: "$seat",
              preserveNullAndEmptyArrays: true,
            },
          },
          //transaction
          {
            $lookup: {
              from: "transactions",
              let: { orderId: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$orderId", "$$orderId"] },
                        { $eq: ["$acceptableStatus", "Accepted"] },
                      ],
                    },
                  },
                },
                {
                  $group: {
                    _id: null,
                    totalReceiveTk: { $sum: "$receivedTk" },
                    allProperties: { $push: "$$ROOT" },
                  },
                },
              ],
              as: "transactions",
            },
          },
          {
            $lookup: {
              from: "adjustments",
              let: { orderId: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$booking", "$$orderId"] },
                        { $eq: ["$status", "Accepted"] },
                      ],
                    },
                  },
                },
                {
                  $group: {
                    _id: null,
                    totatAdjustmentAmount: { $sum: "$adjustmentAmount" },
                    allProperties: { $push: "$$ROOT" },
                  },
                },
              ],
              as: "adjustments",
            },
          },
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

  const aggregatedResult = await OrderModel.aggregate(pipeline);

  const orders = aggregatedResult?.[0]?.paginatedResults || [];

  // 🔁 Update paymentStatus based on payableAmount vs receivedTk
  for (const order of orders) {
    const receivedTk = order?.transactions?.[0]?.totalReceiveTk || 0;
    const payableAmount = order?.payableAmount || 0;

    const newPaymentStatus = receivedTk === payableAmount ? "Paid" : "Unpaid";

    if (order.paymentStatus !== newPaymentStatus) {
      await OrderModel.updateOne(
        { _id: order._id },
        { $set: { paymentStatus: newPaymentStatus } }
      );
    }

    // Optional: Attach payment status to result directly if needed
    order.paymentStatus = newPaymentStatus;
  }

  return { result: aggregatedResult, totalCount };
};

const getUserOrderFromDB = async (queries, phone) => {
  const { paymentStatus, bookingStatus } = queries;
  const page = parseInt(queries?.page) || 1;
  const size = parseInt(queries?.size) || 10;

  const matchStage = {};
  if (phone) {
    matchStage.phone = phone;
  }
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
          // user
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
          // branch
          {
            $lookup: {
              from: "branches",
              let: { branchId: "$branch" },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ["$_id", "$$branchId"] },
                  },
                },
                {
                  $project: {
                    name: 1,
                    branchMobileNumber: 1,
                    branchAddress: 1,
                    branchEmail: 1,
                  },
                },
              ],
              as: "branchDetails",
            },
          },
          {
            $unwind: {
              path: "$branchDetails",
              preserveNullAndEmptyArrays: true,
            },
          },
          // room
          {
            $lookup: {
              from: "properties",
              let: { roomId: "$roomId" },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ["$_id", "$$roomId"] },
                  },
                },
                {
                  $project: { name: 1, roomNumber: 1 },
                },
              ],
              as: "room",
            },
          },
          {
            $unwind: {
              path: "$room",
              preserveNullAndEmptyArrays: true,
            },
          },
          // seat
          {
            $lookup: {
              from: "seats",
              let: { seatId: "$seatId" },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ["$_id", "$$seatId"] },
                  },
                },
                {
                  $project: { name: 1, seatNumber: 1 },
                },
              ],
              as: "seat",
            },
          },
          {
            $unwind: {
              path: "$seat",
              preserveNullAndEmptyArrays: true,
            },
          },

          {
            $lookup: {
              from: "transactions",
              let: { orderId: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$orderId", "$$orderId"] },
                        { $eq: ["$acceptableStatus", "Accepted"] },
                      ],
                    },
                  },
                },
                {
                  $group: {
                    _id: null,
                    totalReceiveTk: { $sum: "$receivedTk" },
                    allProperties: { $push: "$$ROOT" },
                  },
                },
              ],
              as: "transactions",
            },
          },
          {
            $lookup: {
              from: "adjustments",
              let: { orderId: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$booking", "$$orderId"] },
                        { $eq: ["$status", "Accepted"] },
                      ],
                    },
                  },
                },
                {
                  $group: {
                    _id: null,
                    totatAdjustmentAmount: { $sum: "$adjustmentAmount" },
                    allProperties: { $push: "$$ROOT" },
                  },
                },
              ],
              as: "adjustments",
            },
          },
        ],
      },
    },
    {
      $project: {
        paginatedResults: 1,
      },
    },
  ];

  const result = await OrderModel.aggregate(pipeline);

  return { result, totalCount };
};

const updateBookingStatusIntoDB = async (payload) => {
  await OrderModel.findByIdAndUpdate(payload.id, payload.body, { new: true });

  // find the booking
  const booking = await OrderModel.findById(payload.id);
  const newRent = {
    bookStartDate: booking?.rentDate?.bookStartDate,
    bookEndDate: booking?.rentDate?.bookEndDate,
    roomId: booking?.roomId,
    // roomNumber: booking?.bookingInfo?.roomNumber,
    seatId: booking?.seatId,
    // seatNumber: booking?.seatBooking,
    roomType: booking?.roomType,
    bookingId: booking?._id,
    branch: booking?.branch,
    userId: booking?.userId,
  };
  if (booking?.status === "Approved" || booking?.status === "Processing") {
    const existRent = await RentRoom.findOne({ bookingId: booking._id });
    if (existRent) {
      await RentRoom.findByIdAndUpdate(existRent._id, newRent, { new: true });
    } else {
      await RentRoom.create(newRent);
    }

    // if promo code used then user property usedPromo update
    await User.updateOne(
      { phone: booking?.phone },
      {
        $push: {
          usedPromo: booking?.bookingInfo?.usedPromo,
        },
      },
      { new: true }
    );

    // Phone Sms for Confirmation
    if (booking?.status === "Approved") {
      const bookingMessage = `/api/smsapi?api_key=${config.sms_api_key}&type=text&number=88${booking?.phone}&senderid=${config.sms_sender_id}&message=Your%20booking%20with%20Project%20Second%20Home%20is%20Confirmed!%20Booking%20ID%3A%23${booking?.bookingId}.%20Check-in%3A%${booking?.bookingInfo?.rentDate?.bookStartDate}%2C%20Check-out%3A%${booking?.bookingInfo?.rentDate?.bookEndDate}.%20Call%20Us%3A%2001647647404.%20Enjoy%20your%20stay!%20-%20PSH`;

      bookingSms(bookingMessage)
        .then((response) => {
          // console.log("Response from SMS API:", response);
        })
        .catch((error) => {
          // console.error("Error while sending SMS:", error);
        });
    }
  }

  if (booking?.status === "Pending" || booking?.status === "Canceled") {
    // delete rentDate when booking status is cancel
    await RentRoom.deleteOne({
      bookingId: booking?._id,
    });

    // if have promo code then remove promo code
    await User.updateOne(
      { phone: booking?.phone },

      {
        $pull: {
          usedPromo: {
            promo: booking?.usedPromo?.promo,
          },
        },
      }
    );

    // Phone Sms for Cancel
    const bookingMessage = `/api/smsapi?api_key=${config.sms_api_key}&type=text&number=88${booking?.phone}&senderid=${config.sms_sender_id}&message=Your%20booking%20with%20Project%20Second%20Home%20%28Booking%20ID%3A%20%23${booking?.bookingId}%29%20has%20been%20canceled.%20Contact%20us%20at%2001647647404%20for%20assistance.%20Thank%20you.%20-%20PSH`;

    bookingSms(bookingMessage)
      .then((response) => {})
      .catch((error) => {});
  }
};

export const orderServices = {
  createOrderIntoDB,
  createOrderByManualBkash,
  createOrderByCash,
  getOrderFromDB,
  updateBookingStatusIntoDB,
  createOrderByCash,
  getUserOrderFromDB,
};
