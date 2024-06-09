import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoadingState: false,
};
const loadingStateSlice = createSlice({
  name: "loadingModal",
  initialState,

  reducers: {
    placeLoadingShow: (state, action) => {
      state.isLoadingState = action.payload;
    },
  },
});

export const { placeLoadingShow } = loadingStateSlice.actions;
export default loadingStateSlice.reducer;
