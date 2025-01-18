import Adjustment from "../models/Adjustment.js";
import OrderModel from "../models/Order.js";

export const createAdjustment = async (req, res, next) => {
  const result = await Adjustment.create(req.body);
  return res.status(200).json({
    status: "Success",
    success: true,
    message: "Adjustment created successfully!",
    data: result,
  });
};

export const getAdjustment = async (req, res, next) => {
  try {
    const page = parseInt(req.query?.page) || 1;
    const size = parseInt(req.query?.size) || 10;
    const skip = (page - 1) * size;

    const adjustments = await Adjustment.find({})
      .populate("booking branch userId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(size);

    const adjustmentCount = await Adjustment.countDocuments({});

    res.status(200).json({
      status: "Success",
      message: "Success",
      adjustments,
      totalAdjustments: adjustmentCount,
      currentPage: page,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Sorry, Adjustment not found",
      error: error.message,
    });
  }
};

export const updateAdjustment = async (req, res, next) => {
  try {
    const findAdjustment = await Adjustment.findOne({
      _id: req.params.id,
    });
    // console.log({ findAdjustment });
    const adjustment = await Adjustment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(adjustment);

    // const findBooking = await OrderModel.findOne({
    //   _id: findAdjustment.booking,
    // });
    // console.log({ findBooking });

    // if (req?.body?.status) {
    //   const payableAmount =
    //     findBooking?.totalAmount -
    //     (parseInt(findBooking?.discount) +
    //       parseInt(req?.body?.adjustmentAmount));
    //   const dueAmount = payableAmount - findBooking?.totalReceiveTk;

    //   await OrderModel.findByIdAndUpdate(
    //     findAdjustment.booking,
    //     {
    //       $set: {
    //         payableAmount: payableAmount,
    //         dueAmount: dueAmount,
    //         discount: findBooking?.discount + req?.body?.adjustmentAmount,
    //         adjustmentAmount:
    //           findBooking?.adjustmentAmount + req?.body?.adjustmentAmount,
    //         isAdjustmentRQ: "No",
    //       },
    //     },
    //     { new: true }
    //   );
    //   // Update Adjustment Status
    //   await Adjustment.findByIdAndUpdate(
    //     req.params.id,
    //     {
    //       $set: {
    //         status: req?.body?.status,
    //       },
    //     },
    //     { new: true }
    //   );
    //   res.status(200).json({
    //     message: "Success",
    //   });
    // } else {
    //   const adjustment = await Adjustment.findByIdAndUpdate(
    //     req.params.id,
    //     { $set: req.body },
    //     { new: true }
    //   );
    //   res.status(200).json(adjustment);
    // }
  } catch (err) {
    next(err);
  }
};

export const deleteAdjustment = async (req, res, next) => {
  try {
    const adjustment = await Adjustment.findByIdAndDelete(req.params.id);
    res.status(200).json(adjustment);
  } catch (err) {
    next(err);
  }
};
