import OrderModel from "../models/Order.js";

const findLastBookingId = async () => {
  const lastBooking = await OrderModel.findOne({}, { companyId: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastBooking?.bookingId;
};

export const generateBookingId = async (name) => {
  const currentId =
    (await findLastBookingId()) || (0).toString().padStart(5, "0"); //00000
  //increment by 1
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");
  return incrementedId;
};
