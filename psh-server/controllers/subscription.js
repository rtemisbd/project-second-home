import Subscription from "../models/Subscription.js";
export const createSubcription = async (req, res, next) => {
  try {
    const {
      packageName,
      packageDuration,
      packagePrice,
      addedTotalRoom,
      totalFeaturedRoom,
    } = req.body;
    const subcription = new Subscription({
      packageName,
      packageDuration,
      packagePrice,
      addedTotalRoom,
      totalFeaturedRoom,
    });
    subcription.save();

    res.status(201).json({
      status: "Success",
      message: "Susbcription Created",
    });
  } catch (err) {
    next(err);
  }
};

export const getSubscripion = async (req, res, next) => {
  try {
    const subcription = await Subscription.find({});
    res.status(201).json({
      status: "Success",
      message: "Success",
      subcription,
    });
  } catch (err) {
    next(err);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    await Subscription.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      status: "Success",
      message: "Updated",
    });
  } catch (err) {
    res.status(401).json({
      status: "faild",
      message: "something Wrong",
    });
    next(err);
  }
};
