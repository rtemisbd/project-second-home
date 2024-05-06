import { ADD_BOOKING, CANCEL_BOOKING } from "../types";

const initialState = {
  bookingCart: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_BOOKING:
      if (!state.bookingCart) {
        return {
          ...state,
          bookingCart: action.payload,
        };
      }
      return state;

    case CANCEL_BOOKING:
      if (state.bookingCart) {
        return {
          ...state,
          bookingCart: null,
        };
      }
      return state;

    default:
      return state;
  }
}
