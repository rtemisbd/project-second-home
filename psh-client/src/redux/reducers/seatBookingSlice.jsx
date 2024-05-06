import { createSlice } from "@reduxjs/toolkit";

// Access the current route

const initialState = {
  seatBooking: localStorage.getItem("seatItem")
    ? JSON.parse(localStorage.getItem("seatItem"))
    : {},
};
const seatBookingSlice = createSlice({
  name: "seatBooking",
  initialState,

  reducers: {
    placeSeatBooking: (state, action) => {
      state.seatBooking = action.payload;

      localStorage.setItem("seatItem", JSON.stringify(state.seatBooking));
    },
    removeSeatBooking: (state) => {
      state.seatBooking = {};

      localStorage.removeItem("seatItem");
    },
  },
});

export const { placeSeatBooking, removeSeatBooking } = seatBookingSlice.actions;
export default seatBookingSlice.reducer;
