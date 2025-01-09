import axios from "axios";
import { getValue, setValue } from "node-global-storage";
import config from "../config/index.js";

const bkash_auth = async (req, res, next) => {
  // Clear the token from global storage if it exists
  setValue("id_token", null); // Removes the token

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

    setValue("id_token", data?.id_token);

    next();
  } catch (error) {
    // console.error("Error in bkash_auth:", error);
    return res.status(401).json({ error: error.message });
  }
};

export default bkash_auth;
