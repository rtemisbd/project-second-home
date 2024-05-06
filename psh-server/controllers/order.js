import OrderModel from "../models/Order.js";
import Property from "../models/Property.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import nodemailer from "nodemailer";
import Adjustment from "../models/Adjustment.js";
import { bookingMail } from "../mail/bookingMail.js";
import { bookingConfirmMail } from "../mail/bookingConfirmMail.js";
import { cancelBookingMail } from "../mail/cancelBookingMail.js";
import RentRoom from "../models/RentRoom.js";
import { bookingSms } from "../SMS/BookingSms.js";

export const createOrder = async (req, res, next) => {
  const {
    fullName,
    fatherName,
    motherName,
    userId,
    email,
    phone,
    address,
    gender,
    birthDate,
    emergencyContactName,
    emergencyRelationC,
    emergencyContact,
    employeeStatus,
    emplyeeIncome,
    nid,
    validityType,
    validityNumber,
    passport,
    arrivalTime,
    request,
    paymentType,
    paymentNumber,
    transactionId,
    bkashNumber,
    bkashTrx,
    nagadNumber,
    nagadTrx,
    dutchNumber,
    dutchTrx,
    customerType,
    whichOfMonthPayment,
    receivedTk,
    dueAmount,
    totalReceiveTk,
    // unReceivedTk,
    paymentStatus,
    totalAmount,
    payableAmount,
    discount,
    adjustmentAmount,

    bookingExtend,
  } = req.body;
  try {
    const user = await User.findOne({ email: email });

    const bookingInfo = JSON.parse(req.body?.bookingInfo);

    const gardianImg = req?.files?.gardianImg?.length
      ? req?.files?.gardianImg[0]?.path
      : user?.gardianImg;

    const image = req?.files?.image?.length
      ? req?.files?.image[0]?.path
      : user?.cardImage;
    const branch = bookingInfo?.branch;

    const newOrder = new OrderModel({
      // seat: seatId,
      bookingInfo,
      branch,
      fullName,
      fatherName,
      motherName,
      userId,
      email,
      phone,
      address,
      gender,
      birthDate,
      emergencyContactName,
      emergencyRelationC,
      emergencyContact,
      employeeStatus,
      emplyeeIncome,
      nid,
      validityType,
      validityNumber,
      passport,
      arrivalTime,
      request,
      image,
      gardianImg,
      paymentType,
      paymentNumber,
      transactionId,
      bkashNumber,
      bkashTrx,
      nagadNumber,
      nagadTrx,
      dutchNumber,
      dutchTrx,
      customerType,
      whichOfMonthPayment,
      receivedTk,
      dueAmount,
      totalReceiveTk,
      // unReceivedTk,
      paymentStatus,
      totalAmount,
      payableAmount,
      discount,
      adjustmentAmount,
      bookingExtend,
    });

    // Booking Save to Database
    const result = await newOrder.save();
    const objectIdString = result?._id ? result?._id.toString() : "";
    const slicedObjectId = objectIdString.slice(19);
    // Phone Sms For Booking
    const bookingMessage = `/api/smsapi?api_key=za0YHQ7fvYCpcWGGZgce&type=text&number=88${result?.phone}&senderid=8809617617196&message=Thank%20you%20for%20choosing%20us!%20Your%20booking%20ID%3A%23${slicedObjectId}%20is%20received.%20Our%20team%20will%20verify%20your%20information%20before%20confirming%20your%20booking.%20Call%20us:%2001647647404.%20-%20PSH`;

    bookingSms(bookingMessage)
      .then((response) => {
        console.log("Response from SMS API:", response);
        // Handle response data as needed
      })
      .catch((error) => {
        console.error("Error while sending SMS:", error);
        // Handle error
      });

    // User data Update
    const userUpdate = {
      firstName: fullName,
      fatherName: fatherName,
      motherName: motherName,
      branch: user?.branch,
      email: email,
      phone: phone,
      userAddress: address,
      passport: passport,
      dateOfBirth: birthDate,
      gender: gender,
      nationalId: nid,
      validityType: validityType,
      validityNumber: validityNumber,
      cardImage: image,
      gardianImg: gardianImg,

      employmentStatus: {
        workAs: employeeStatus,
        monthlyIncome: emplyeeIncome,
      },
      emergencyContact: {
        contactName: emergencyContactName,
        relation: emergencyRelationC,
        contactNumber: emergencyContact,
      },
    };

    // Order Mail to customer and Manager
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "alaminbamna08@gmail.com",
        pass: "qesfajhmrfhkfnbo",
      },
    });

    const mailOptions = {
      from: "alaminbamna08@gmail.com",
      to: `mohammad.alaminh08@gmail.com,${email}`,
      subject: "Your Booking Details at Project Second Home",
      html: bookingMail(result),
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    await User.updateOne(
      { email: email },
      { $set: userUpdate },
      { runValidators: true }
    );

    // Create Transaction whent First booking only payment bkash or nagad

    if (result?.paymentType !== "cash") {
      const currentDate = new Date().toISOString().split("T")[0];
      const transaction = new Transaction({
        orderId: result?._id,
        branch: result?.bookingInfo?.branch,
        paymentDate: currentDate,
        totalAmount: result?.totalAmount,
        payableAmount: result?.payableAmount,
        receivedTk: result?.receivedTk,
        customerType: result?.customerType,
        whichOfMonthPayment: result?.whichOfMonthPayment,

        paymentType: result?.paymentType,
        paymentNumber: result?.paymentNumber,
        transactionId: result?.transactionId,
        userEmail: result?.email,
        userName: result?.fullName,
        userId: result?.userId,
        userPhone: result?.phone,
        acceptableStatus: "Pending",
      });
      await transaction.save();
    }

    res.status(200).json({
      status: "success",
      message:
        " Thank Youe ! Your Booking Successfully Done, I will very soon Contact You",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const orderId = req.query?.orderId;
    const userId = req.query?.userId;
    const fromDate = req.query?.fromDate;
    const toDate = req.query?.toDate;
    const branch = req.query?.branch;
    const paymentStatus = req?.query?.paymentStatus;
    const bookingStatus = req?.query?.status;

    if (
      !orderId &&
      !fromDate &&
      !toDate &&
      !branch &&
      !paymentStatus &&
      !bookingStatus
    ) {
      const orders = await OrderModel.find({})
        .populate("branch")
        .sort({ createdAt: -1 });

      res.status(200).json({
        status: "Success",
        message: "Success",
        orders,
      });
    } else if (
      !orderId &&
      !fromDate &&
      !toDate &&
      branch &&
      !paymentStatus &&
      !bookingStatus
    ) {
      const orders = await OrderModel.find({ branch: branch })
        .populate("branch")
        .sort({ createdAt: -1 });

      res.status(200).json({
        status: "Success",
        message: "Success",
        orders,
      });
    } else {
      const query = {
        branch: branch,
        _id: orderId,
        userId: userId,
        createdAt: {
          $gte: fromDate,
          $lte: toDate,
        },
        paymentStatus: paymentStatus,
        status: bookingStatus,
      };
      if (paymentStatus === "All") {
        // Remove paymentStatus from the query object
        delete query.paymentStatus;
      }

      if (bookingStatus === "All") {
        // Remove status from the query object
        delete query.status;
      }
      if (branch === "All") {
        // Remove status from the query object
        delete query.branch;
      }
      if (orderId === "All") {
        // Remove orderId from the query object
        delete query._id;
      }
      if (userId === "All") {
        // Remove userId from the query object
        delete query.userId;
      }
      if (!fromDate || !toDate) {
        // Remove createdAt from the query object
        delete query.createdAt;
      }

      const orders = await OrderModel.find(query)
        .populate("branch")
        .sort({ createdAt: -1 });

      res.status(200).json({
        status: "Success",
        message: "Success",
        orders,
      });
    }

    // if totalAmount equal totalReceiveTk
    await OrderModel.updateMany(
      {
        $expr: {
          $eq: ["$payableAmount", "$totalReceiveTk"],
        },
      },
      {
        $set: {
          paymentStatus: "Paid",
        },
      },
      { new: true }
    );
    // if not Match Total Receive Tk
    await OrderModel.updateMany(
      {
        $expr: {
          $ne: ["$payableAmount", "$totalReceiveTk"],
        },
      },
      {
        $set: {
          paymentStatus: "Unpaid",
        },
      },
      { new: true }
    );
    // res.status(200).json({
    //   orders,
    // });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Sorry Order not found",
      error: error.message,
    });
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
export const getMyBooking = async (req, res, next) => {
  try {
    // const email = req.query.email;
    const user = req.params.user;
    const order = await OrderModel.find({ email: user }).populate("branch");
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};
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
            roomNumber: findSingleOrder?.bookingInfo?.roomNumber,
            seatNumber: findSingleOrder?.bookingInfo?.seatBooking?.seatNumber,
            roomType: findSingleOrder?.bookingInfo?.roomType,
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
              console.log("Response from SMS API:", response);
              // Handle response data as needed
            })
            .catch((error) => {
              console.error("Error while sending SMS:", error);
              // Handle error
            });

          // Booking Confirmation Mail to customer
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "alaminbamna08@gmail.com",
              pass: "qesfajhmrfhkfnbo",
            },
          });

          const mailOptions = {
            from: "alaminbamna08@gmail.com",
            to: `mohammad.alaminh08@gmail.com,${findSingleOrder?.email}`,
            subject:
              "Booking Confirmation: Your Reservation at Project Second Home",
            html: bookingConfirmMail(findSingleOrder),
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
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

          // Phone Sms for cancel

          const bookingMessage = `/api/smsapi?api_key=za0YHQ7fvYCpcWGGZgce&type=text&number=88${findSingleOrder?.phone}&senderid=8809617617196&message=Your%20booking%20with%20Project%20Second%20Home%20%28Booking%20ID%3A%20%23${slicedObjectId}%29%20has%20been%20canceled.%20Contact%20us%20at%2001647647404%20for%20assistance.%20Thank%20you.%20-%20PSH`;

          bookingSms(bookingMessage)
            .then((response) => {
              console.log("Response from SMS API:", response);
              // Handle response data as needed
            })
            .catch((error) => {
              console.error("Error while sending SMS:", error);
              // Handle error
            });
          // Booking Cancelation Mail to customer

          if (req.body?.status === "Canceled") {
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "alaminbamna08@gmail.com",
                pass: "qesfajhmrfhkfnbo",
              },
            });

            const mailOptions = {
              from: "alaminbamna08@gmail.com",
              to: `mohammad.alaminh08@gmail.com,${findSingleOrder?.email}`,
              subject: `Cancellation Confirmation: Booking ID [${slicedObjectId}]`,
              html: cancelBookingMail(findSingleOrder),
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
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
            roomNumber: findSingleOrder?.bookingInfo?.data?.roomNumber,
            roomType: findSingleOrder?.bookingInfo?.roomType,
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
              console.log("Response from SMS API:", response);
              // Handle response data as needed
            })
            .catch((error) => {
              console.error("Error while sending SMS:", error);
              // Handle error
            });

          // Booking Confirmation Mail to customer
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "alaminbamna08@gmail.com",
              pass: "qesfajhmrfhkfnbo",
            },
          });

          const mailOptions = {
            from: "alaminbamna08@gmail.com",
            to: `mohammad.alaminh08@gmail.com,${findSingleOrder?.email}`,
            subject: "Your Booking Details at Project Second Home",
            html: bookingConfirmMail(findSingleOrder),
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
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
          // Phone Sms for Cancel
          const bookingMessage = `/api/smsapi?api_key=za0YHQ7fvYCpcWGGZgce&type=text&number=88${findSingleOrder?.phone}&senderid=8809617617196&message=Your%20booking%20with%20Project%20Second%20Home%20%28Booking%20ID%3A%20%23${slicedObjectId}%29%20has%20been%20canceled.%20Contact%20us%20at%2001647647404%20for%20assistance.%20Thank%20you.%20-%20PSH`;

          bookingSms(bookingMessage)
            .then((response) => {
              console.log("Response from SMS API:", response);
              // Handle response data as needed
            })
            .catch((error) => {
              console.error("Error while sending SMS:", error);
              // Handle error
            });

          // Booking Cancelation Mail to customer

          if (req.body?.status === "Canceled") {
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "alaminbamna08@gmail.com",
                pass: "qesfajhmrfhkfnbo",
              },
            });

            const mailOptions = {
              from: "alaminbamna08@gmail.com",
              to: `mohammad.alaminh08@gmail.com,${findSingleOrder?.email}`,
              subject: `Cancellation Confirmation: Booking ID [${slicedObjectId}]`,
              html: cancelBookingMail(findSingleOrder),
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
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

        // discount: req.body?.discount,
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
      });
      await transaction.save();
    } else if (req.body?.unReceivedTk) {
      // If Payment Reduce
      await OrderModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            unReceivedTk: req.body?.unReceivedTk,
            dueAmount: req.body?.dueAmount,
            totalReceiveTk: req.body?.totalReceiveTk,
          },
        },
        { new: true }
      );
      // Create Transaction every payment-less Time
      const transaction = new Transaction({
        orderId: findSingleOrder?._id,
        branch: findSingleOrder?.bookingInfo?.branch,
        paymentDate: req.body?.paymentDate,
        totalAmount: req.body?.totalAmount,
        receivedTk: req.body?.receivedTk,
        unReceivedTk: req.body?.unReceivedTk,
        dueAmount: req.body?.dueAmount,
        totalReceiveTk: req.body?.totalReceiveTk,
        // discount: req.body?.discount,
        paymentType: req.body?.paymentType,
        userEmail: findSingleOrder?.email,
        userId: findSingleOrder?.userId,
        userName: findSingleOrder?.fullName,
        userPhone: findSingleOrder?.phone,
        paymentStatus: req.body?.paymentStatus,
        paymentNumber: req.body?.paymentNumber,
        transactionId: req.body?.transactionId,
        bankName: req.body?.bankName,
        bankHoldingName: req.body?.bankHoldingName,
        receiverName: req.body?.receiverName,
        acceptableStatus: req.body?.acceptableStatus,
      });
      await transaction.save();
    } else if (req?.body?.adjustment) {
      const adjustment = new Adjustment({
        booking: findSingleOrder?._id,
        branch: findSingleOrder?.bookingInfo?.branch,
        userId: findSingleOrder?.userId,
        adjustmentAmount: req.body?.adjustment,
      });
      await adjustment.save();
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
      message: "Succefully Done",
    });
  } catch (err) {
    next(err);
  }
};
