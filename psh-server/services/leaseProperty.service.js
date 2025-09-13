import LeaseProperty from "../models/LeaseProperty.js";

const createLeasePropertyIntoDB = async (payload) => {
  const result = await LeaseProperty.create(payload);
  return result;
};

export const leasePropertyServices = {
  createLeasePropertyIntoDB,
};
