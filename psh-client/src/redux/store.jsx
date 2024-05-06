import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import booking from "./reducers/booking";

const initialStore = {};
export const store = createStore(
  booking,
  initialStore,
  composeWithDevTools(applyMiddleware(logger, thunk))
);
