import { getValue } from "node-global-storage";
import config from "../config";

// Function to generate headers for bkash API
export const bkash_headers = async () => ({
  "Content-Type": "application/json",
  Accept: "application/json",
  authorization: getValue("id_token"),
  "x-app-key": config.bkash_api_key,
});
