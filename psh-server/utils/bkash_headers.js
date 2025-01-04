import { getValue } from "node-global-storage";
import config from "../config/index.js";

// Function to generate headers for bkash API
export const bkash_headers = async (id_token) => ({
  "Content-Type": "application/json",
  Accept: "application/json",
  authorization: id_token,
  // authorization: getValue("id_token"),
  "x-app-key": config.bkash_api_key,
});
