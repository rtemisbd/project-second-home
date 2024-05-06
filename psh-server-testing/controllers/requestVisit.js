import RequestVisit from "../models/RequestVisit.js";
export const CreateRequestVisit = async (req, res, next) => {
  const newrequestVisit = new RequestVisit(req.body);
  try {
    const requestVisit = await newrequestVisit.save();
    res.status(200).json(requestVisit);
  } catch (err) {
    next(err);
  }
};
export const getRequestVisit = async (req, res, next) => {
  try {
    const requestVisit = await RequestVisit.find({});
    res.status(200).json(requestVisit);
  } catch (err) {
    next(err);
  }
};
export const getMyRequestVisit = async (req, res, next) => {
  try {
    const user = req.params.user;
    const requestVisit = await RequestVisit.find({ email: user });
    res.status(200).json(requestVisit);
  } catch (err) {
    next(err);
  }
};
