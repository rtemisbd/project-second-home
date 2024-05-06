import { ADD_BOOKING, CANCEL_BOOKING } from "../types";

export const addBooking = (booking) => {
  return {
    type: ADD_BOOKING,
    payload: booking,
  };
};

export const cancelBooking = () => {
  return {
    type: CANCEL_BOOKING,
  };
};
