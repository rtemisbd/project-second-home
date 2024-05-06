import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isProfileMenu: false,
  isFaqMenu: true,
  isModalShow: false,
  isLoadingState: false,
  isSearchBoxShow: false,
};
const profileMenuSlice = createSlice({
  name: "profileMenu",
  initialState,

  reducers: {
    placeProfileMenu: (state, action) => {
      state.isProfileMenu = action.payload;
    },
    placeFaqMenu: (state, action) => {
      state.isFaqMenu = action.payload;
    },
    placeModalShow: (state, action) => {
      state.isModalShow = action.payload;
    },
    placeLoadingShow: (state, action) => {
      state.isLoadingState = action.payload;
    },
    placeSearchBoxShow: (state, action) => {
      state.isSearchBoxShow = action.payload;
    },
  },
});

export const {
  placeProfileMenu,
  placeFaqMenu,
  placeModalShow,
  placeLoadingShow,
  placeSearchBoxShow,
} = profileMenuSlice.actions;
export default profileMenuSlice.reducer;
