import { getValue } from "node-global-storage";
import config from "../config/index.js";
import { getValidToken } from "./getValidToken.js";

// Function to generate headers for bkash API
// export const bkash_headers = async (id_token) => ({
//   "Content-Type": "application/json",
//   Accept: "application/json",
//   authorization: id_token,
//   // authorization: getValue("id_token"),
//   "x-app-key": config.bkash_api_key,
// });

// Function to generate headers for bKash API
export const bkash_headers = (id_token) => {
  // console.log(id_token);

  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    // Authorization: id_token,
    Authorization: `Bearer ${id_token}`,
    "X-App-Key": config.bkash_api_key,
  };
};
