import SubscriptionOrder from "../models/SubscriptionOrder.js";
import User from "../models/User.js";
export const createSubcriptionOrder = async (req, res, next) => {
  try {
    const {
      name,
      userEmail,
      userId,
      branch,
      paymentDate,
      totalAmount,
      totalReceiveTk,
      paymentType,
      paymentNumber,
      transactionId,
      userPhone,
      userAddress,
      paymentStatus,
      acceptableStatus,
      packageName,
      packageId,
      packageDuration,
      packagePrice,
      addedTotalRoom,
      totalFeaturedRoom,
      packageBuyDate,
      packageEndDate,
    } = req.body;
    const subscripitonOrder = new SubscriptionOrder({
      name,
      branch,
      paymentDate,
      totalAmount,
      totalReceiveTk,
      paymentType,
      paymentNumber,
      transactionId,
      userEmail,
      userId,
      userPhone,
      userAddress,
      paymentStatus,
      acceptableStatus,
      packageName,
      packageId,
      packageDuration,
      packagePrice,
      addedTotalRoom,
      totalFeaturedRoom,
      packageBuyDate,
      packageEndDate,
    });
    subscripitonOrder.save();
    await User.updateOne(
      { email: userEmail },
      {
        $push: {
          userSubscription: {
            packageName: packageName,
            packageId: packageId,
            packageDuration: packageDuration,
            packagePrice: packagePrice,
            totalFeaturedRoom: totalFeaturedRoom,
            packageBuyDate: packageBuyDate,
            packageEndDate: packageEndDate,
          },
        },
      },
      { new: true }
    );
    res.status(201).json({
      status: "Success",
      message: "Thanks, we will Contact you, very soon",
    });
  } catch (err) {
    next(err);
  }
};

export const getSubscriptionHistory = async (req, res, next) => {
  try {
    const subscriptionHistory = await SubscriptionOrder.find({});

    // if totalAmount equal totalReceiveTk

    res.status(200).json({
      status: "Success",
      message: "Success",
      subscriptionHistory,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Sorry Transaciton not found",
      error: error.message,
    });
  }
};
export const getUserSubscriptionHistory = async (req, res, next) => {
  try {
    const email = req?.params?.email;

    const subscriptionHistory = await SubscriptionOrder.find({
      userEmail: email,
    });

    // if totalAmount equal totalReceiveTk

    res.status(200).json({
      status: "Success",
      message: "Success",
      subscriptionHistory,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Sorry Transaciton not found",
      error: error.message,
    });
  }
};
export const updataeSubscriptionHistory = async (req, res, next) => {
  try {
    const id = req?.params?.id;

    const subscriptionHistory = await SubscriptionOrder.updateOne(
      { _id: id },
      {
        $set: req?.body,
      }
    );
    // if totalAmount equal totalReceiveTk

    res.status(200).json({
      status: "Success",
      message: "Success",
      subscriptionHistory,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Sorry Transaciton not found",
      error: error.message,
    });
  }
};
