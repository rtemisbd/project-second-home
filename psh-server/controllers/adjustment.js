import Adjustment from "../models/Adjustment.js";
import OrderModel from "../models/Order.js";

export const getAdjustment = async (req, res, next) => {
  try {
    const adjustment = await Adjustment.find({}).populate(
      "booking branch userId"
    );

    res.status(200).json({
      status: "Success",
      message: "Success",
      adjustment,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Sorry Adjustement not found",
      error: error.message,
    });
  }
};

export const updateAdjustment = async (req, res, next) => {
  try {
    const findAdjustment = await Adjustment.findOne({
      _id: req.params.id,
    });

    const findBooking = await OrderModel.findOne({
      _id: findAdjustment.booking,
    });

    if (req?.body?.status) {
      const payableAmount =
        findBooking?.totalAmount -
        (findBooking?.discount + req?.body?.adjustmentAmount);
      const dueAmount = payableAmount - findBooking?.totalReceiveTk;

      await OrderModel.findByIdAndUpdate(
        findAdjustment.booking,
        {
          $set: {
            payableAmount: payableAmount,
            dueAmount: dueAmount,
            discount: findBooking?.discount + req?.body?.adjustmentAmount,
            adjustmentAmount:
              findBooking?.adjustmentAmount + req?.body?.adjustmentAmount,
          },
        },
        { new: true }
      );
      // Update Adjustment Status
      await Adjustment.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            status: req?.body?.status,
          },
        },
        { new: true }
      );
      res.status(200).json({
        message: "Success",
      });
    } else {
      const adjustment = await Adjustment.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(adjustment);
    }
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
