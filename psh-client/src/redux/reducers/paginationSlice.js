import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  size: 10,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageSize(state, action) {
      state.size = action.payload;
    },
  },
});

export const { setPage, setPageSize } = paginationSlice.actions;
export default paginationSlice.reducer;
