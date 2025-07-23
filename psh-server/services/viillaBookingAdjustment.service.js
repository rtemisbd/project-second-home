import VillaBookingAdjustment from "../models/VillaBookingAdjustment.js";

const createNewAdjustmentIntoDB = async (payload) => {
  const result = await VillaBookingAdjustment.create(payload);

  return result;
};

export const villaBookingAdjustmentServices = {
  createNewAdjustmentIntoDB,
};
