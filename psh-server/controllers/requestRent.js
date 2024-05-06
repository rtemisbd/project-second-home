import RequestRent from "../models/RequestRent.js";
export const CreateRequestRent = async (req, res, next) => {
  const newrequestRent = new RequestRent(req.body);
  try {
    const requestRent = await newrequestRent.save();
    res.status(200).json(requestRent);
  } catch (err) {
    next(err);
  }
};
export const getRequestRent = async (req, res, next) => {
  try {
    const requestRent = await RequestRent.find({});
    res.status(200).json(requestRent);
  } catch (err) {
    next(err);
  }
};
export const getMyRequestRent = async (req, res, next) => {
  try {
    const user = req.params.user;
    const requestRent = await RequestRent.find({ email: user });
    res.status(200).json(requestRent);
  } catch (err) {
    next(err);
  }
};
