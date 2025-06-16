import jwt from "jsonwebtoken";
import "dotenv/config";
import config from "../config/index.js";

const generateToken = (user) => {
  const payload = {
    userId: user._id,
    email: user?.email,
    role: user.role,
  };

  const token = jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expires_in,
  });
  return token;
};
const generateRefreshToken = (user) => {
  const payload = {
    userId: user?._id,
    email: user?.email,
    role: user.role,
  };

  const token = jwt.sign(payload, config.jwt.refresh_secret, {
    expiresIn: config.jwt.refresh_expires_in,
  });
  return token;
};

const verifyToken = (token, secret) => {       
  
  return jwt.verify(token, secret);
};

export const jwtHelpers = {
  generateToken,
  generateRefreshToken,
  verifyToken,
};
