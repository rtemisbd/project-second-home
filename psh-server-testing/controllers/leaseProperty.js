import LeaseProperty from "../models/LeaseProperty.js";
export const CreateLeaseProperty = async (req, res, next) => {
  const newleaseProperty = new LeaseProperty(req.body);
  try {
    const leaseProperty = await newleaseProperty.save();
    res.status(200).json(leaseProperty);
  } catch (err) {
    next(err);
  }
};
export const getLeaseProperty = async (req, res, next) => {
  try {
    const leaseProperty = await LeaseProperty.find({});
    res.status(200).json(leaseProperty);
  } catch (err) {
    next(err);
  }
};
export const getMyLeaseProperty = async (req, res, next) => {
  try {
    const user = req.params.user;
    const leaseProperty = await LeaseProperty.find({ email: user });
    res.status(200).json(leaseProperty);
  } catch (err) {
    next(err);
  }
};
