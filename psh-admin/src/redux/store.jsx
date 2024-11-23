import { configureStore } from "@reduxjs/toolkit";
import loadingStateSlice from "./reducers/loadingStateSlice";
import paginationReducer from "./reducers/paginationSlice";

export const store = configureStore({
  reducer: {
    loadingModal: loadingStateSlice,
    pagination: paginationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
