import LeaseProperty from "../models/LeaseProperty.js";
import { leasePropertyServices } from "../services/leaseProperty.service.js";
import catchAsync from "../utils/catchAsync.js";
import responseSend from "../utils/responseSend.js";

const createLeaseProperty = catchAsync(async (req, res, next) => {
  const result = await leasePropertyServices.createLeasePropertyIntoDB(
    req.body
  );
  responseSend(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: "Your registration has been created!",
  });
});
const getAllLeaseProperties = catchAsync(async (req, res, next) => {
  const result = await leasePropertyServices.getAllLeasePropertyFromDB(
    req.query
  );
  responseSend(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: "All lease properties retrieved successfully!",
  });
});

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

export const leasePropertyControllers = {
  createLeaseProperty,
  getAllLeaseProperties,
};
