import jwt from "jsonwebtoken";
import config from "../config/index.js";
import { getValue, setValue } from "node-global-storage";
import axios from "axios";
import bkash_auth from "../middleware/payment.js";

// let tokenCache = getValue("id_token");
// console.log({ tokenCache });

export const getValidToken = async (tokenCache) => {
  //   tokenCache = null;
  if (tokenCache && !isTokenExpired(tokenCache)) {
    return tokenCache;
  }

  //   console.log("Token is invalid or expired. Fetching a new one...");
  tokenCache = await refreshToken();
  if (!tokenCache) {
    throw new Error("Failed to refresh token");
  }

  setValue("id_token", tokenCache); // Set the refreshed token in storage
  return tokenCache;
};

const isTokenExpired = (token) => {
  try {
    const decoded = jwt.decode(token); // Decode JWT without verification
    return Date.now() >= decoded.exp * 1000; // Check if current time >= expiration time
  } catch (error) {
    // console.error("Error decoding token:", error);
    return true; // Treat invalid tokens as expired
  }
};

const refreshToken = async () => {
  try {
    const { data } = await axios.post(
      config.bkash_grant_token_url,
      {
        app_key: config.bkash_api_key,
        app_secret: config.bkash_secret_key,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          username: config.bkash_userName,
          password: config.bkash_password,
        },
      }
    );

    // Payload for refreshing the token
    const payload = {
      app_key: config.bkash_api_key,
      app_secret: config.bkash_secret_key,
      refresh_token: data?.refresh_token,
    };

    // console.log("Sending refresh token request with payload:", payload);

    // Sending the POST request
    const response = await axios.post(config.bkash_refresh_token_url, payload, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        username: config.bkash_userName,
        password: config.bkash_password,
      },
    });

    // Handling the response
    if (response.data && response.data.id_token) {
      //   console.log("Token refreshed successfully:", response.data.id_token);
      return response.data.id_token;
    } else {
      throw new Error("Token refresh response does not contain 'id_token'");
    }
  } catch (error) {
    // Error handling
    if (error.response) {
      // console.error(
      //   "Error refreshing token: Response from server:",
      //   error.response.data
      // );
      throw new Error(
        `Failed to refresh token: ${error.response.status} ${
          error.response.data.message || ""
        }`
      );
    } else if (error.request) {
      //   console.error("No response received from the server:", error.request);
      throw new Error("Failed to refresh token: No response from server");
    } else {
      //   console.error("Unexpected error during token refresh:", error.message);
      throw new Error(`Failed to refresh token: ${error.message}`);
    }
  }
};
