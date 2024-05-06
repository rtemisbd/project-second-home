import { configureStore } from "@reduxjs/toolkit";
import dateSlice from "./reducers/dateSlice";
import bookingSlice from "./reducers/bookingSlice";
import seatBookingSlice from "./reducers/seatBookingSlice";
import smProfileMenuSlice from "./reducers/smProfileMenuSlice";

export const store2 = configureStore({
  reducer: {
    dateCount: dateSlice,
    booking: bookingSlice,
    seatBooking: seatBookingSlice,
    profileMenu: smProfileMenuSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
