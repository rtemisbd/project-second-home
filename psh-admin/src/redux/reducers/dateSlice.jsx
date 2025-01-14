import { createSlice } from "@reduxjs/toolkit";

const currentDate = new Date().toISOString().split("T")[0];

const initialState = {
  startDate: currentDate,
  endDate: currentDate,
  customerRent: {},
};

const dateSlice = createSlice({
  name: "dateCalculation",
  initialState,
  reducers: {
    leftDate: (state, action) => {
      state.startDate = action.payload;
    },
    rightDate: (state, action) => {
      state.endDate = action.payload;
    },
    toTalRent: (state, action) => {
      const firstDate = new Date(state.startDate);
      const lastDate = new Date(state.endDate);
      const timeDifferenceInMs = lastDate - firstDate;
      const daysDifference = timeDifferenceInMs / (1000 * 60 * 60 * 24);

      // Get Total Days this Year
      function getDaysInCurrentYear() {
        const currentDate = new Date(state.startDate);
        const currentYear = currentDate.getFullYear();
        const startOfYear = new Date(currentYear, 0, 1);
        const endOfYear = new Date(currentYear, 11, 31);
        // Calculate the difference in days
        const differenceInDays =
          (endOfYear - startOfYear) / (1000 * 60 * 60 * 24);
        return differenceInDays + 1; // Add 1 to include both start and end dates
      }
      const years = Math.floor(daysDifference / getDaysInCurrentYear());
      const remainingDays = Math.floor(daysDifference % getDaysInCurrentYear());
      // get month Last Day
      function getLastDayOfMonth() {
        const today = new Date(state.startDate);
        const year = today.getFullYear();
        const month = today.getMonth() + 1; // Months are zero-indexed, so we add 1.
        const lastDay = new Date(year, month, 0).getDate(); // Setting day to 0 gets the last day of the previous month.
        return lastDay;
      }
      const months = Math.floor(remainingDays / getLastDayOfMonth());
      const days = remainingDays % getLastDayOfMonth();

      if (years < 1 && months < 1) {
        state.customerRent = { daysDifference, remainingDays };
      } else if (years < 1 && months > 0) {
        state.customerRent = { months, days, remainingDays };
      } else if (years === 1) {
        state.customerRent = { months: 0, days: 0, years, remainingDays };
      } else {
        state.customerRent = { months, days, years, remainingDays };
      }
    },
  },
});
export const { leftDate, rightDate, toTalRent } = dateSlice.actions;
export default dateSlice.reducer;
