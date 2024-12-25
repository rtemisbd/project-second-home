import mongoose, { startSession } from "mongoose";
import OrderModel from "../models/Order.js";
import User from "../models/User.js";
import { generateBookingId } from "../utils/generateBookingId.js";
import RentRoom from "../models/RentRoom.js";
import { getValue, setValue } from "node-global-storage";
import axios from "axios";
import config from "../config/index.js";
import { v4 as uuidv4 } from "uuid";
import { bkash_headers } from "../utils/bkash_headers.js";
import Transaction from "../models/Transaction.js";
import { bookingSms } from "../SMS/BookingSms.js";

const createOrderIntoDB = async (payload) => {
  const { amount, dataForBooking, selectMethod } = payload;
  const session = await startSession();
  try {
    session.startTransaction();

    // Set user context
    setValue("userId", dataForBooking?.userId);

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
    const updatedUser = await User.updateOne(
      { phone: dataForBooking?.phone },
      { $set: userUpdate },
      { runValidators: true, session }
    );

    // Step 2: Generate booking ID
    const generateId = await generateBookingId();
    dataForBooking.bookingId = generateId;

    if (selectMethod === "manual") {
      const result = await createOrderByManualBkash(dataForBooking);
      return result;
    } else {
      // Step 3: Create payment request via bKash
      const callbackData = encodeURIComponent(JSON.stringify(dataForBooking));
      const { data } = await axios.post(
        config.bkash_create_payment_url,
        {
          mode: "0011",
          payerReference: " ",
          callbackURL: `${config.server_url}/bkash/payment/callback?callbackData=${callbackData}`,
          amount,
          currency: "BDT",
          intent: "sale",
          merchantInvoiceNumber: `Inv${uuidv4().substring(0, 5)}`,
        },
        {
          headers: await bkash_headers(getValue("id_token")),
        }
      );
    }

    // Commit the transaction
    await session.commitTransaction();
    return { bkashURL: data.bkashURL };
  } catch (error) {
    await session.abortTransaction();
    console.error("Error in createOrderIntoDB:", error);
    return { error: error.message };
  } finally {
    session.endSession();
  }
};

const createOrderByManualBkash = async (payload) => {
  const session = await startSession();
  try {
    session.startTransaction();

    const dataForBooking = payload;

    dataForBooking.paymentType = "bkash";
    const result = await OrderModel.create([dataForBooking], { session });
    console.log({ result });

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
          userId: getValue("userId"),
          userPhone: dataForBooking?.phone,
          userName: dataForBooking?.fullName,
          acceptableStatus: "Pending",
        },
      ],
      { session }
    );

    //step 7 : create rent collection
    await RentRoom.create(
      [
        {
          bookStartDate: dataForBooking?.bookingInfo?.rentDate?.bookStartDate,
          bookEndDate: dataForBooking?.bookingInfo?.rentDate?.bookEndDate,
          roomId: dataForBooking?.bookingInfo?.data?._id,
          roomNumber: dataForBooking?.bookingInfo?.data?.roomNumber,
          roomType: dataForBooking?.bookingInfo?.roomType,
          seatId: dataForBooking?.bookingInfo?.seatBooking?._id,
          seatNumber: dataForBooking?.bookingInfo?.seatBooking?.seatNumber,
          bookingId: dataForBooking?._id,
          branch: dataForBooking?.bookingInfo?.branch?._id,
          userId: dataForBooking?.userId,
        },
      ],
      { session }
    );

    // Phone SMS for booking
    const bookingMessage = `/api/smsapi?api_key=za0YHQ7fvYCpcWGGZgce&type=text&number=88${result[0]?.phone}&senderid=8809617617196&message=Thank%20you%20for%20choosing%20us!%20Your%20booking%20ID%3A%23${result[0]?.bookingId}%20is%20received.%20Our%20team%20will%20verify%20your%20information%20before%20confirming%20your%20booking.%20Call%20us:%2001647647404.%20-%20PSH`;

    await bookingSms(bookingMessage);

    // Commit the transaction
    await session.commitTransaction();
    return {
      bkashURL: `${config.client_url}/success`,
    };
  } catch (error) {
    await session.abortTransaction();
    console.error("Error during payment execution:", error);
    return {
      bkashURL: `${config.client_url}/error?message=${encodeURIComponent(
        error.message
      )}`,
    };
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
    // status
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

          //get transaction by order Id
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
  console.log({ result });

  return { result, totalCount };
};

const getOrderByIdFromDB = async (id) => {
  const rentRooms = await RentRoom.find({
    roomId: propertyId,
    bookingStatus: { $in: ["Booked", "Reserved"] },
  }).select({
    bookStartDate: 1,
    bookEndDate: 1,
    bookingStatus: 1,
    roomType: 1,
    seatId: 1,
    seatNumber: 1,
    roomNumber: 1,
    roomId: 1,
  });
  const result = await OrderModel.findById(id);

  return result;
};

export const orderServices = {
  createOrderIntoDB,
  getOrderFromDB,
};
