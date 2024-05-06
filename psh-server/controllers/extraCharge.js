import ExtraCharge from "../models/ExtraCharge.js";

export const CreateExtraCharge = async (req, res, next) => {
  const newExtraCharge = new ExtraCharge(req.body);
  try {
    const extraCharge = await newExtraCharge.save();
    res.status(200).json(extraCharge);
  } catch (err) {
    next(err);
  }
};

export const getExtraCharge = async (req, res, next) => {
  try {
    const extraCharge = await ExtraCharge.find({});
    res.status(200).json(extraCharge);
  } catch (err) {
    next(err);
  }
};

export const updateExtraCharge = async (req, res, next) => {
  try {
    await ExtraCharge.findByIdAndUpdate(
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
