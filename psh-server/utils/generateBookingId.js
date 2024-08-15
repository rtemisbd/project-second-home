import OrderModel from "../models/Order.js";
const findLastBookingId = async () => {
  const lastBookingId = await OrderModel.findOne({}, { bookingId: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastBookingId?.bookingId;
};

export const generateBookingId = async () => {
  const date = new Date();
  const year = date.getFullYear().toString().substring(2, 4);

  let previousId = await findLastBookingId();
  let currentYear = year;

  if (previousId && previousId.startsWith(currentYear)) {
    let convertNumberPreviousId = previousId.slice(2);
    let incrementedId = (parseInt(convertNumberPreviousId) + 1)
      .toString()
      .padStart(4, "0");
    return currentYear + incrementedId;
  } else {
    // Reset to "0001" for the new year
    return currentYear + "0001";
  }
};
