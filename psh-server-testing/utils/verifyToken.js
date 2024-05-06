import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("unauthorized access");
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: "forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(403, "Not authorized");
    }
  });
};

export const verifyAdmin = async (req, res, next) => {
  const decodedEmail = req.decoded.email;
  const query = { email: decodedEmail };
  const user = await User.findOne(query);

  if (user?.role !== "admin") {
    return res.status(403).send({ message: "forbidden access" });
  }
  next();
};
