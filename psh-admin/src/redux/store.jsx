import { configureStore } from "@reduxjs/toolkit";
import loadingStateSlice from "./reducers/loadingStateSlice";

export const store = configureStore({
  reducer: {
    loadingModal: loadingStateSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
