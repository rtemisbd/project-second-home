import OrderModel from "../models/Order.js";
import Property from "../models/Property.js";
import User from "../models/User.js"; 
import Transaction from "../models/Transaction.js";
import Adjustment from "../models/Adjustment.js";
import RentRoom from "../models/RentRoom.js";
import { bookingSms } from "../SMS/BookingSms.js";
import catchAsync2 from "../shared/catchAsync2.js";
import sendResponse from "../shared/sendResponse.js";
import { orderServices } from "../services/order.service.js";
import catchAsync from "../utils/catchAsync.js";
import responseSend from "../utils/responseSend.js";


export const createOrder = catchAsync2(async (req, res, next) => {
  // Booking Save to Database
  const result = await orderServices.createOrderIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message:
      "Thank You! Your Booking Successfully Done, We will contact you very soon.",
  });
});

export const getOrder = catchAsync2(async (req, res, next) => {
  const { result, totalCount } = await orderServices.getOrderFromDB(req.query);

  const orders = result[0]?.paginatedResults || [];

  const {
    // bookingsTotalCount = 0,
    approvedCount = 0,
    canceledCount = 0,
    pendingCount = 0,
    processingCount = 0,
    totalBookingAmount = 0,
    totalReceiveAmountFilter = 0,
    totalDueAmount = 0,
  } = result[0]?.totalCounts || {};

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Orders retrieved successfully",
    data: {
      orders,
      bookingsTotalCount: totalCount,
      approvedCount,
      canceledCount,
      pendingCount,
      processingCount,
      totalBookingAmount,
      totalReceiveAmountFilter,
      totalDueAmount,
    },
  });

  updateOrderPaymentStatus();
});

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

export const orderCorrection = async (req, res) => {
  console.log("bbjdrgwa");

  try {
    /*
case 1 : discount == adjustment --> discount = 0
case 2  : discount > adjustment --> discount = discount - adjustment
case 3 : discount = 0 && adjustment > 0 ---> discount = 0, 

*/

    // Step 1: Aggregate the discount for each order
    const pipeline = [
      // {
      //   $match: {
      //     _id: Types.ObjectId("66b85e82dfc33face3052ab2"),
      //   },
      // },
      {
        $lookup: {
          from: "adjustments",
          let: { booking: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$booking", "$$booking"],
                },
              },
            },
            {
              $group: {
                _id: null,
                totalDiscount: { $sum: "$adjustmentAmount" },
              },
            },
          ],
          as: "adjustments",
        },
      },
      {
        $addFields: {
          newDiscount: {
            $ifNull: [{ $arrayElemAt: ["$adjustments.totalDiscount", 0] }, 0],
          },
        },
      },
    ];

    const results = await OrderModel.aggregate(pipeline);
    const updatePromises = results.map((order) => {
      let updatedDiscount;

      if (order.discount === 0) {
        updatedDiscount = 0;
      } else if (order.discount === order.adjustmentAmount) {
        updatedDiscount = 0;
      } else if (order.discount > order.adjustmentAmount) {
        updatedDiscount = order.discount - order.adjustmentAmount;
      } else {
        updatedDiscount = order?.discount;
      }

      return OrderModel.updateOne(
        { _id: order._id },
        { $set: { discount: updatedDiscount } }
      );
    });

    await Promise.all(updatePromises);
    res.status(200).json({ message: "Order discounts Update" });
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
};

export const getSingleOrder = async (req, res, next) => {
  try {
    const propertyId = req.params.id;

    // Find the property by ID
    const property = await OrderModel.findById(propertyId).populate("branch");

    res.status(200).json(property);
  } catch (err) {
    next(err);
  }
};
export const getUserOrders = catchAsync(async (req, res, next) => {
  const { user: phone } = req.params;

  const { result, totalCount } =await orderServices.getUserOrderFromDB(
    req.query,
    phone
  );

  const orders = result[0]?.paginatedResults || [];

  
// const encryptedOrders = encrypt(orders);


  responseSend(res, {
    statusCode: 200,
    success: true,
    message: "Orders retrieved successfully",
    data: { orders, totalCount },
    // data: { encryptedOrders, totalCount },
  });
});

export const getMyBooking = async (req, res, next) => {
  try {
    const user = req.params.user;
    const page = parseInt(req?.query?.page);
    const size = parseInt(req?.query?.size);

    const matchStage = {};
    if (user) {
      matchStage.phone = user;
    }

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
                as: "branch",
              },
            },
            { $unwind: "$branch" },

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
        },
      },
      {
        $project: {
          paginatedResults: 1,
          totalCounts: { $arrayElemAt: ["$totalCounts", 0] },
        },
      },
    ];

    const order = await OrderModel.aggregate(pipeline);
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};
// export const getMyBooking = async (req, res, next) => {
//   try {
//     // const email = req.query.email;
//     const user = req.params.user;
//     const order = await OrderModel.find({ phone: user }).populate("branch");
//     res.status(200).json(order);
//   } catch (err) {
//     next(err);
//   }
// };
export const updateBooking = async (req, res, next) => {
  try {
    const findSingleOrder = await OrderModel.findOne({ _id: req.params.id });
    const bookingInfo_Id = findSingleOrder?.bookingInfo?.data?._id;

    const bookingInfoForShareRoomId = findSingleOrder?.bookingInfo?.roomId;

    const bookingInfoForShareSeatId =
      findSingleOrder?.bookingInfo?.seatBooking?._id;
    // for only Email this objectIdString
    const objectIdString = findSingleOrder?._id
      ? findSingleOrder?._id.toString()
      : "";
    const slicedObjectId = objectIdString.slice(19);

    if (req.body?.status) {
      await OrderModel.findByIdAndUpdate(
        req.params.id,
        { $set: { status: req.body.status } },
        { new: true }
      );

      if (findSingleOrder?.bookingInfo?.roomType === "Shared Room") {
        if (req.body?.status === "Approved") {
          await Property.findByIdAndUpdate(
            { _id: bookingInfoForShareRoomId },
            {
              $push: {
                "seats.$[outer].rentDate":
                  findSingleOrder?.bookingInfo?.rentDate,
              },
            },
            {
              arrayFilters: [{ "outer._id": bookingInfoForShareSeatId }],
            }
            // { new: true }
          );

          // create a RentDate Collection
          const rendDate = new RentRoom({
            bookStartDate:
              findSingleOrder?.bookingInfo?.rentDate?.bookStartDate,
            bookEndDate: findSingleOrder?.bookingInfo?.rentDate?.bookEndDate,
            roomId: findSingleOrder?.bookingInfo?.roomId,
            roomNumber: findSingleOrder?.bookingInfo?.roomNumber,
            seatId: findSingleOrder?.bookingInfo?.seatBooking?._id,
            seatNumber: findSingleOrder?.bookingInfo?.seatBooking?.seatNumber,
            roomType: findSingleOrder?.bookingInfo?.roomType,
            bookingId: findSingleOrder?._id,
            branch: findSingleOrder?.bookingInfo?.branch?._id,
            userId: findSingleOrder?.userId,
          });

          await rendDate.save();

          // if promo code used then user property usedPromo update
          await User.updateOne(
            { email: findSingleOrder?.email },
            {
              $push: {
                usedPromo: findSingleOrder?.bookingInfo?.usedPromo,
              },
            },
            { new: true }
          );

          // Phone Sms for Confirmation

          const bookingMessage = `/api/smsapi?api_key=za0YHQ7fvYCpcWGGZgce&type=text&number=88${findSingleOrder?.phone}&senderid=8809617617196&message=Your%20booking%20with%20Project%20Second%20Home%20is%20Confirmed!%20Booking%20ID%3A%23${slicedObjectId}.%20Check-in%3A%${findSingleOrder?.bookingInfo?.rentDate?.bookStartDate}%2C%20Check-out%3A%${findSingleOrder?.bookingInfo?.rentDate?.bookEndDate}.%20Call%20Us%3A%2001647647404.%20Enjoy%20your%20stay!%20-%20PSH`;

          bookingSms(bookingMessage)
            .then((response) => {
              // console.log("Response from SMS API:", response);
              // Handle response data as needed
            })
            .catch((error) => {
              // console.error("Error while sending SMS:", error);
              // Handle error
            });
        }
        // if cancel
        else {
          await Property.updateOne(
            {
              _id: bookingInfoForShareRoomId,
            },
            {
              $pull: {
                "seats.$[outer].rentDate": {
                  bookStartDate:
                    findSingleOrder?.bookingInfo?.rentDate.bookStartDate,
                },
              },
            },
            {
              arrayFilters: [{ "outer._id": bookingInfoForShareSeatId }],
            }
            // { new: true }
          );

          // if Store a rent Details into database then Delelet

          await RentRoom.deleteOne({
            bookStartDate: findSingleOrder?.bookingInfo?.rentDate.bookStartDate,
            bookEndDate: findSingleOrder?.bookingInfo?.rentDate.bookEndDate,
            roomNumber: findSingleOrder?.bookingInfo?.roomNumber,
            seatNumber: findSingleOrder?.bookingInfo?.seatBooking?.seatNumber,
            roomType: findSingleOrder?.bookingInfo?.roomType,
          });

          // if have promo code then remove promo code
          await User.updateOne(
            { email: findSingleOrder?.email },

            {
              $pull: {
                usedPromo: {
                  promo: findSingleOrder?.bookingInfo?.usedPromo?.promo,
                },
              },
            }
            // { new: true }
          );

          if (req.body?.status === "Canceled") {
            // Phone Sms for cancel

            const bookingMessage = `/api/smsapi?api_key=za0YHQ7fvYCpcWGGZgce&type=text&number=88${findSingleOrder?.phone}&senderid=8809617617196&message=Your%20booking%20with%20Project%20Second%20Home%20%28Booking%20ID%3A%20%23${slicedObjectId}%29%20has%20been%20canceled.%20Contact%20us%20at%2001647647404%20for%20assistance.%20Thank%20you.%20-%20PSH`;

            bookingSms(bookingMessage)
              .then((response) => {
                // console.log("Response from SMS API:", response);
                // Handle response data as needed
              })
              .catch((error) => {
                // console.error("Error while sending SMS:", error);
              });
          }
        }
      } else {
        if (req.body?.status === "Approved") {
          await Property.findByIdAndUpdate(
            {
              _id: bookingInfo_Id,
            },
            {
              $push: {
                rentDate: findSingleOrder?.bookingInfo?.rentDate,
              },
            },
            { new: true }
          );

          // create a RentDate Collection
          const rendDate = new RentRoom({
            bookStartDate:
              findSingleOrder?.bookingInfo?.rentDate?.bookStartDate,
            bookEndDate: findSingleOrder?.bookingInfo?.rentDate?.bookEndDate,
            roomId: findSingleOrder?.bookingInfo?.data?._id,
            roomNumber: findSingleOrder?.bookingInfo?.data?.roomNumber,
            roomType: findSingleOrder?.bookingInfo?.roomType,
            bookingId: findSingleOrder?._id,
            branch: findSingleOrder?.bookingInfo?.branch?._id,
            userId: findSingleOrder?.userId,
          });

          await rendDate.save();

          // if promo code used then user property usedPromo update
          await User.updateOne(
            { email: findSingleOrder?.email },
            {
              $push: {
                usedPromo: findSingleOrder?.bookingInfo?.usedPromo,
              },
            },
            { new: true }
          );

          // Phone Sms for Confirmation

          const bookingMessage = `/api/smsapi?api_key=za0YHQ7fvYCpcWGGZgce&type=text&number=88${findSingleOrder?.phone}&senderid=8809617617196&message=Your%20booking%20with%20Project%20Second%20Home%20is%20Confirmed!%20Booking%20ID%3A%23${slicedObjectId}.%20Check-in%3A%${findSingleOrder?.bookingInfo?.rentDate?.bookStartDate}%2C%20Check-out%3A%${findSingleOrder?.bookingInfo?.rentDate?.bookEndDate}.%20Call%20Us%3A%2001647647404.%20Enjoy%20your%20stay!%20-%20PSH`;

          bookingSms(bookingMessage)
            .then((response) => {
              // console.log("Response from SMS API:", response);
              // Handle response data as needed
            })
            .catch((error) => {
              // console.error("Error while sending SMS:", error);
              // Handle error
            });
        } else {
          await Property.updateOne(
            { _id: bookingInfo_Id },
            {
              $pull: {
                rentDate: {
                  bookStartDate:
                    findSingleOrder?.bookingInfo?.rentDate.bookStartDate,
                },
              },
            },
            { new: true }
          );

          // if Store a rent Details into database then Delelet

          await RentRoom.deleteOne({
            bookStartDate: findSingleOrder?.bookingInfo?.rentDate.bookStartDate,
            bookEndDate: findSingleOrder?.bookingInfo?.rentDate.bookEndDate,
            roomNumber: findSingleOrder?.bookingInfo?.data?.roomNumber,
            roomType: findSingleOrder?.bookingInfo?.roomType,
          });

          // if have promo code then remove promo code
          await User.updateOne(
            { email: findSingleOrder?.email },

            {
              $pull: {
                usedPromo: {
                  promo: findSingleOrder?.bookingInfo?.usedPromo?.promo,
                },
              },
            }
            // { new: true }
          );

          // Booking Cancelation Mail to customer

          if (req.body?.status === "Canceled") {
            // Phone Sms for Cancel
            const bookingMessage = `/api/smsapi?api_key=za0YHQ7fvYCpcWGGZgce&type=text&number=88${findSingleOrder?.phone}&senderid=8809617617196&message=Your%20booking%20with%20Project%20Second%20Home%20%28Booking%20ID%3A%20%23${slicedObjectId}%29%20has%20been%20canceled.%20Contact%20us%20at%2001647647404%20for%20assistance.%20Thank%20you.%20-%20PSH`;

            bookingSms(bookingMessage)
              .then((response) => {
                // console.log("Response from SMS API:", response);
                // Handle response data as needed
              })
              .catch((error) => {
                // console.error("Error while sending SMS:", error);
                // Handle error
              });
          }
        }
      }
    } else if (req.body?.receivedTk) {
      const query = {
        orderId: req.params.id,
        acceptableStatus: "Accepted",
      };
      const transactions = await Transaction.find(query);
      let totalReceiveTk = 0;
      for (const item of transactions) {
        totalReceiveTk += item?.receivedTk;
      }

      if (req.body?.paymentType === "cash") {
        await OrderModel.findByIdAndUpdate(
          req.params.id,

          {
            $set: {
              dueAmount:
                req.body?.payableAmount -
                (totalReceiveTk + req.body?.receivedTk),
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
        orderId: findSingleOrder?._id,
        branch: findSingleOrder?.bookingInfo?.branch,
        paymentDate: req.body?.paymentDate,
        customerType: req.body?.customerType,
        whichOfMonthPayment: req.body?.whichOfMonthPayment,
        totalAmount: req.body?.totalAmount,
        payableAmount: req.body?.payableAmount,
        receivedTk: req.body?.receivedTk,
        paymentType: req.body?.paymentType,
        userEmail: findSingleOrder?.email,
        userId: findSingleOrder?.userId,
        userName: findSingleOrder?.fullName,
        userPhone: findSingleOrder?.phone,
        paymentNumber: req.body?.paymentNumber,
        transactionId: req.body?.transactionId,
        bankName: req.body?.bankName,
        bankHoldingName: req.body?.bankHoldingName,
        receiverName: req.body?.receiverName,
        acceptableStatus: req.body?.acceptableStatus,
        noteForTransaction: req.body?.noteForTransaction,
      });
      await transaction.save();
    } else if (req?.body?.adjustment) {
      const adjustment = new Adjustment({
        booking: findSingleOrder?._id,
        branch: findSingleOrder?.bookingInfo?.branch,
        userId: findSingleOrder?.userId,
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
    } else if (req?.body?.cancelReason) {
      await OrderModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            userCancel: req.body,
            isCancel: "Yes",
          },
        },
        { new: true }
      );
    } else {
      await OrderModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            bookingInfo: req.body,
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
      // res.status(200).json(updateDate);

      if (req.body?.roomType === "Shared Room") {
        // Remove Previous Booking Date from match property
        await Property.updateOne(
          {
            _id: bookingInfoForShareRoomId,
          },
          {
            $pull: {
              "seats.$[outer].rentDate": {
                bookStartDate: req.body?.previousDate?.bookStartDate,
              },
            },
          },
          {
            arrayFilters: [{ "outer._id": bookingInfoForShareSeatId }],
          }
          // { new: true }
        );
        // Push Current Booking Date in match property
        await Property.updateOne(
          {
            _id: bookingInfoForShareRoomId,
          },
          {
            $push: {
              "seats.$[outer].rentDate": req.body?.rentDate,
            },
          },
          {
            arrayFilters: [{ "outer._id": bookingInfoForShareSeatId }],
          }
          // { new: true }
        );
      } else {
        // Remove Previous Booking Date from match property
        await Property.updateOne(
          {
            _id: bookingInfo_Id,
          },
          {
            $pull: {
              rentDate: {
                bookStartDate: req.body?.previousDate?.bookStartDate,
              },
            },
          },
          { new: true }
        );
        // Push Current Booking Date in match property
        await Property.updateOne(
          {
            _id: bookingInfo_Id,
          },
          {
            $push: {
              rentDate: req.body?.rentDate,
            },
          },
          { new: true }
        );
      }
    }

    // res.status(200).json(updateOrder);
    res.status(200).json({
      status: "Success",
      message: "Successfully Done",
    });
  } catch (err) {
    next(err);
  }
};

export const updateBookingOrder = catchAsync2(async (req, res, next) => {
  const result = await orderServices.updateBookingStatusIntoDB({
    id: req.params.id,
    body: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message:
      "Thank You! Your Booking Has Been Successfully Updated, We will contact you very soon.",
  });
});
