import { configureStore } from "@reduxjs/toolkit";
import loadingStateSlice from "./reducers/loadingStateSlice";
import paginationReducer from "./reducers/paginationSlice";
import dateSlice from "./reducers/dateSlice";

export const store = configureStore({
  reducer: {
    loadingModal: loadingStateSlice,
    pagination: paginationReducer,
    dateCount: dateSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
