import OrderModel from "../models/Order.js";
import Property from "../models/Property.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import nodemailer from "nodemailer";
import Adjustment from "../models/Adjustment.js";
// import { bookingMail } from "../mail/bookingMail.js";
import { bookingConfirmMail } from "../mail/bookingConfirmMail.js";
import { cancelBookingMail } from "../mail/cancelBookingMail.js";
import RentRoom from "../models/RentRoom.js";
import { bookingSms } from "../SMS/BookingSms.js";
// import mongoose from "mongoose";
// import { generateBookingId } from "../utils/generateBookingId.js";
// import catchAsync from "../shared/cathAsync.js";
// import sendResponse from "../shared/sendResponse.js";

export const updateBooking = async (req, res, next) => {
  try {
    const findSingleOrder = await OrderModel.findById(req.params.id);

    if (!findSingleOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    const { bookingInfo, email, phone, userId, _id: orderId } = findSingleOrder;
    const { roomType, rentDate, roomId, seatBooking, branch, usedPromo } =
      bookingInfo || {};
    const slicedObjectId = orderId?.toString().slice(19);

    if (req.body?.status) {
      // Handle Shared Room Booking
      if (roomType === "Shared Room") {
        if (req.body.status === "Approved") {
          // Update Property's Rent Date for the Seat
          await Property.findByIdAndUpdate(
            roomId,
            {
              $push: {
                "seats.$[outer].rentDate": rentDate,
              },
            },
            {
              arrayFilters: [{ "outer._id": seatBooking._id }],
              new: true,
            }
          );

          // Save RentDate collection
          const newRentDate = new RentRoom({
            bookStartDate: rentDate.bookStartDate,
            bookEndDate: rentDate.bookEndDate,
            roomId,
            roomNumber: bookingInfo.roomNumber,
            seatId: seatBooking._id,
            seatNumber: seatBooking.seatNumber,
            roomType,
            bookingId: orderId,
            branch: branch._id,
            userId,
          });
          await newRentDate.save();

          // Update user's usedPromo
          if (usedPromo) {
            await User.updateOne(
              { email },
              { $push: { usedPromo } },
              { new: true }
            );
          }

          // Send SMS
          const bookingMessage = `/api/smsapi?api_key=za0YHQ7fvYCpcWGGZgce&type=text&number=88${phone}&senderid=8809617617196&message=Your%20booking%20with%20Project%20Second%20Home%20is%20Confirmed!%20Booking%20ID%3A%23${slicedObjectId}.%20Check-in%3A%20${rentDate.bookStartDate}%2C%20Check-out%3A%20${rentDate.bookEndDate}.%20Call%20Us%3A%2001647647404.%20Enjoy%20your%20stay!%20-%20PSH`;
          await bookingSms(bookingMessage);

          // Send Confirmation Email
          await sendEmail(
            ["mohammad.alaminh08@gmail.com", email],
            "Booking Confirmation: Your Reservation at Project Second Home",
            bookingConfirmMail(findSingleOrder)
          );

          // Update Order Status
          await OrderModel.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
          );
        } else {
          // Handle Cancellation
          await handleSharedRoomCancellation(findSingleOrder, req.body.status);
        }
      } else {
        // Handle Private Room Booking
        if (req.body.status === "Approved") {
          await handlePrivateRoomApproval(findSingleOrder, req.body);
        } else {
          await handlePrivateRoomCancellation(findSingleOrder);
        }
      }
    } else if (req.body?.receivedTk) {
      await handlePaymentUpdate(req, findSingleOrder);
    } else if (req.body?.adjustment) {
      await handleAdjustment(req, findSingleOrder);
    } else if (req.body?.cancelReason) {
      await handleCancellation(req, findSingleOrder);
    } else {
      await updateBookingInfo(req, findSingleOrder);
    }

    res.status(200).json({ message: "Booking updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Function to send email using nodemailer
const sendEmail = async (recipients, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "alaminbamna08@gmail.com",
      pass: "qesfajhmrfhkfnbo", // Use an environment variable instead of hardcoding
    },
  });

  const mailOptions = {
    from: "alaminbamna08@gmail.com",
    to: recipients.join(","),
    subject,
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error while sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

// Handle Shared Room Cancellation
const handleSharedRoomCancellation = async (order, status) => {
  const { roomId, roomType, seatBooking, rentDate } = order.bookingInfo;

  await Property.updateOne(
    { _id: roomId },
    {
      $pull: {
        "seats.$[outer].rentDate": { bookStartDate: rentDate.bookStartDate },
      },
    },
    { arrayFilters: [{ "outer._id": seatBooking._id }] }
  );

  await RentRoom.deleteOne({
    bookStartDate: rentDate.bookStartDate,
    bookEndDate: rentDate.bookEndDate,
    seatId: seatBooking._id,
    roomId,
    roomType,
  });

  // Remove promo code if applicable
  await User.updateOne(
    { email: order.email },
    {
      $pull: {
        usedPromo: { promo: order.bookingInfo.usedPromo.promo },
      },
    }
  );

  // Send Cancellation Email and SMS
  const slicedObjectId = order?._id?.toString()?.slice(19);
  const bookingMessage = `/api/smsapi?api_key=za0YHQ7fvYCpcWGGZgce&type=text&number=88${order.phone}&senderid=8809617617196&message=Your%20booking%20with%20Project%20Second%20Home%20%28Booking%20ID%3A%20%23${slicedObjectId}%29%20has%20been%20canceled.%20Contact%20us%20at%2001647647404%20for%20assistance.%20Thank%20you.%20-%20PSH`;
  await bookingSms(bookingMessage);

  if (status === "Canceled") {
    await sendEmail(
      ["mohammad.alaminh08@gmail.com", order?.email],
      `Cancellation Confirmation: Booking ID [${slicedObjectId}]`,
      cancelBookingMail(order)
    );
  }

  await OrderModel.findByIdAndUpdate(order._id, { status }, { new: true });
};

// Handle Private Room Booking Approval
const handlePrivateRoomApproval = async (order, body) => {
  const { bookingInfo, _id: orderId } = order;
  const { rentDate, branch } = bookingInfo;
  const roomId = bookingInfo?.data?._id;
  const roomNumber = bookingInfo?.data?.roomNumber;
  // Update Property's Rent Date for the Room
  await Property.findByIdAndUpdate(
    roomId,
    {
      $push: {
        rentDate: rentDate,
      },
    },
    { new: true }
  );

  // Save RentRoom Document
  const newRentDate = new RentRoom({
    bookStartDate: rentDate.bookStartDate,
    bookEndDate: rentDate.bookEndDate,
    roomId,
    roomNumber,
    roomType: bookingInfo.roomType,
    bookingId: orderId,
    branch: branch._id,
    userId: order.userId,
  });
  await newRentDate.save();

  // Send SMS
  const bookingMessage = `/api/smsapi?api_key=za0YHQ7fvYCpcWGGZgce&type=text&number=88${
    order.phone
  }&senderid=8809617617196&message=Your%20booking%20with%20Project%20Second%20Home%20is%20confirmed!%20Booking%20ID%3A%23${orderId
    .toString()
    .slice(19)}.%20Check-in%3A%20${
    rentDate.bookStartDate
  }%2C%20Check-out%3A%20${
    rentDate.bookEndDate
  }.%20Call%20Us%3A%2001647647404.%20Enjoy%20your%20stay!%20-%20PSH`;
  await bookingSms(bookingMessage);

  // Send Confirmation Email
  await sendEmail(
    ["mohammad.alaminh08@gmail.com", order.email],
    "Booking Confirmation: Your Reservation at Project Second Home",
    bookingConfirmMail(order)
  );

  // if promo code used then user property usedPromo update
  await User.updateOne(
    { email: order?.email },
    {
      $push: {
        usedPromo: order?.bookingInfo?.usedPromo,
      },
    },
    { new: true }
  );

  // Update Order Status
  await OrderModel.findByIdAndUpdate(
    orderId,
    { status: body.status },
    { new: true }
  );
};

// Handle Private Room Booking Cancellation
const handlePrivateRoomCancellation = async (order) => {
  const { bookingInfo, _id: orderId } = order;
  const { rentDate } = bookingInfo;
  const roomId = bookingInfo?.data?._id;
  // Remove Rent Date from Property
  await Property.findByIdAndUpdate(
    roomId,
    {
      $pull: { rentDate },
    },
    { new: true }
  );

  // Remove RentRoom Document
  await RentRoom.deleteOne({
    bookStartDate: rentDate.bookStartDate,
    bookEndDate: rentDate.bookEndDate,
    roomId,
  });

  // Send Cancellation Email
  const slicedObjectId = orderId.toString().slice(19);
  await sendEmail(
    ["mohammad.alaminh08@gmail.com", order.email],
    `Cancellation Confirmation: Booking ID [${slicedObjectId}]`,
    cancelBookingMail(order)
  );

  // if have promo code then remove promo code
  await User.updateOne(
    { email: orderId?.email },

    {
      $pull: {
        usedPromo: {
          promo: orderId?.bookingInfo?.usedPromo?.promo,
        },
      },
    }
    // { new: true }
  );

  // Update Order Status
  await OrderModel.findByIdAndUpdate(
    orderId,
    { status: "Canceled" },
    { new: true }
  );
};

// Handle Payment Update
const handlePaymentUpdate = async (req, order) => {
  // const { receivedTk, status } = req.body;
  const { _id: orderId } = order;

  const query = {
    orderId: orderId,
    acceptableStatus: "Accepted",
  };
  const transactions = await Transaction.find(query);
  let totalReceiveTk = 0;
  for (const item of transactions) {
    totalReceiveTk += item?.receivedTk;
  }

  if (req.body?.paymentType === "cash") {
    await OrderModel.findByIdAndUpdate(
      orderId,

      {
        $set: {
          dueAmount:
            req.body?.payableAmount - (totalReceiveTk + req.body?.receivedTk),
          totalReceiveTk: totalReceiveTk + req.body?.receivedTk,
          customerType: req.body?.customerType,
          whichOfMonthPayment: req.body?.whichOfMonthPayment,
        },
      },
      { new: true }
    );
  }

  // Create Transaction every payment Time
  const transaction = new Transaction({
    orderId: orderId,
    branch: order?.bookingInfo?.branch,
    paymentDate: req.body?.paymentDate,
    customerType: req.body?.customerType,
    whichOfMonthPayment: req.body?.whichOfMonthPayment,
    totalAmount: req.body?.totalAmount,
    payableAmount: req.body?.payableAmount,
    receivedTk: req.body?.receivedTk,
    paymentType: req.body?.paymentType,
    userEmail: order?.email,
    userId: order?.userId,
    userName: order?.fullName,
    userPhone: order?.phone,
    paymentNumber: req.body?.paymentNumber,
    transactionId: req.body?.transactionId,
    bankName: req.body?.bankName,
    bankHoldingName: req.body?.bankHoldingName,
    receiverName: req.body?.receiverName,
    acceptableStatus: req.body?.acceptableStatus,
    noteForTransaction: req.body?.noteForTransaction,
  });
  await transaction.save();

  // Send Payment Confirmation Email
  // await sendEmail(
  //   ["mohammad.alaminh08@gmail.com", order.email],
  //   "Payment Received Confirmation",
  //   `<p>Your payment of ${receivedTk} has been received. Thank you for your payment.</p>`
  // );
};

// Handle Adjustment Update
const handleAdjustment = async (req, order) => {
  // const { adjustment } = req.body;
  // const { _id: orderId } = order;

  // Create Adjustment Document
  const adjustment = new Adjustment({
    booking: order?._id,
    branch: order?.bookingInfo?.branch,
    userId: order?.userId,
    adjustmentAmount: req.body?.adjustment,
    noteForAdjustment: req.body?.noteForAdjustment,
  });
  await adjustment.save();

  // Update Order adjustment request
  await OrderModel.findByIdAndUpdate(
    req.params.id,

    {
      $set: {
        isAdjustmentRQ: "Yes",
      },
    },
    { new: true }
  );

  // Send Adjustment Confirmation Email
  // await sendEmail(
  //   ["mohammad.alaminh08@gmail.com", order.email],
  //   "Adjustment Confirmation",
  //   `<p>Your booking has been adjusted. Please check the details in your account.</p>`
  // );
};

// Handle Booking Cancellation
const handleCancellation = async (req, order) => {
  // const { cancelReason } = req.body;
  const { _id: orderId, email } = order;

  // Update Order Status
  await OrderModel.findByIdAndUpdate(
    orderId,
    {
      $set: {
        userCancel: req.body,
        isCancel: "Yes",
      },
    },
    { new: true }
  );

  // Send Cancellation Confirmation Email
  // await sendEmail(
  //   ["mohammad.alaminh08@gmail.com", email],
  //   "Booking Cancellation",
  //   `<p>Your booking has been canceled. Reason: ${cancelReason}. If you have any questions, please contact us.</p>`
  // );
};

// Update Booking Info
const updateBookingInfo = async (req, order) => {
  const { bookingInfo } = req.body;
  const { _id: orderId } = order;

  // Update Booking Information
  await OrderModel.findByIdAndUpdate(
    orderId,
    {
      $set: {
        bookingInfo: bookingInfo,
        totalAmount: req.body?.totalAmount,
        foodAmount: req.body?.foodAmount,
        isIncludeFood: req.body?.isIncludeFood,
        payableAmount: req.body?.payableAmount,
        dueAmount: req.body?.dueAmount,
        discount: req.body?.discount,
        adjustmentAmount: req.body?.adjustmentAmount,
      },
    },
    { new: true }
  );
};

export const getOrder = async (req, res, next) => {
  try {
    const orderId = req.query?.orderId;
    const userId = req.query?.userId;
    const fromDate = req.query?.fromDate;
    const toDate = req.query?.toDate;
    const branch = req.query?.branch;
    const paymentStatus = req.query?.paymentStatus;
    const bookingStatus = req.query?.status;
    const page = parseInt(req.query?.page) || 1;
    const size = parseInt(req.query?.size) || 10;
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
            {
              $unwind: {
                path: "$branchDetails",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: "properties",
                localField: "roomId",
                foreignField: "_id",
                as: "roomDetails",
              },
            },
            {
              $unwind: {
                path: "$roomDetails",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $project: {
                "branchDetails.name": 1,
                "branchDetails._id": 1,
                "branchDetails.branchAddress": 1,
                "roomDetails.rentDate": 1,
                "roomDetails.roomNumber": 1,
                "roomDetails.seats": 1,
                otherFields: "$$ROOT",
              },
            },
            {
              $replaceRoot: {
                newRoot: {
                  $mergeObjects: [
                    "$otherFields",
                    {
                      branchDetails: {
                        _id: "$branchDetails._id",
                        name: "$branchDetails.name",
                        branchAddress: "$branchDetails.branchAddress",
                      },
                      roomDetails: {
                        rentDate: "$roomDetails.rentDate",
                        roomNumber: "$roomDetails.roomNumber",
                        seats: "$roomDetails.seats",
                      },
                    },
                  ],
                },
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

    const results = await OrderModel.aggregate(pipeline);
    const orders = results[0]?.paginatedResults || [];

    const {
      // bookingsTotalCount = 0,
      approvedCount = 0,
      canceledCount = 0,
      pendingCount = 0,
      processingCount = 0,
      totalBookingAmount = 0,
      totalReceiveAmountFilter = 0,
      totalDueAmount = 0,
    } = results[0]?.totalCounts || {};

    res.status(200).json({
      status: "Success",
      message: "Orders retrieved successfully",
      orders,
      bookingsTotalCount: totalCount,
      approvedCount,
      canceledCount,
      pendingCount,
      processingCount,
      totalBookingAmount,
      totalReceiveAmountFilter,
      totalDueAmount,
    });

    updateOrderPaymentStatus();
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Failed to retrieve orders",
      error: error.message,
    });
  }
};

// Separate function to update order payment status
const updateOrderPaymentStatus = async () => {
  try {
    await Promise.all([
      OrderModel.updateMany(
        { $expr: { $eq: ["$payableAmount", "$totalReceiveTk"] } },
        { $set: { paymentStatus: "Paid" } },
        { new: true }
      ),
      OrderModel.updateMany(
        { $expr: { $ne: ["$payableAmount", "$totalReceiveTk"] } },
        { $set: { paymentStatus: "Unpaid" } },
        { new: true }
      ),
    ]);
  } catch (error) {
    // console.error("Error updating order payment status:", error);
  }
};
