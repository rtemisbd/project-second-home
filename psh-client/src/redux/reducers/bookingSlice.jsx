import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  booking: {},
};
const bookingSlice = createSlice({
  name: "booking",
  initialState,

  reducers: {
    placeBooking: (state, action) => {
      state.booking = action.payload;

      localStorage.setItem("bookingItem", JSON.stringify(state.booking));
    },
  },
});

export const { placeBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
