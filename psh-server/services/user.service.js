import config from "../config/index.js";
import AppError from "../helpers/errorHandler/AppError.js";
import Branch from "../models/Branch.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Resort from "../models/Resort.js";
import mongoose from "mongoose";

const createUserIntoDB = async (payload) => {
  const {
    firstName,
    address,
    email,
    phone,
    role,
    refferCode,
    photos,
    branch: branchId,
  } = payload;

  const existingMobile = await User.findOne({ phone });

  if (existingMobile) {
    throw new AppError(500, "User already exists");
  }
  const hashedPassword = await bcrypt.hash(
    payload.password || config.user_default_password,
    10
  );
  payload.password = hashedPassword;

  // const user = new User({
  //   firstName,
  //   address,
  //   email,
  //   phone,
  //   role,
  //   refferCode,
  //   photos,
  //   password: hashedPassword,
  //   branch: branchId,
  // });

  // await user.save();

  const user = await User.create(payload);

  // let branch;
  // if (branchId) {
  //   branch = await Branch.findById(branchId);

  //   if (!branch) {
  //     await user.remove(); // Remove the created user if branch is not found
  //     throw new AppError(
  //     404,
  //     "Branch not found"
  //   );
  //     // return res.status(404).json({ message: "Branch not found" });
  //   }

  //   branch.user.push(user._id);
  //   await branch.save();
  // }

  const token = jwt.sign(
    {
      name: user.firstName + " " + user.lastName,
      id: user._id,
    },
    config.jwt.secret,
    { expiresIn: config.jwt.expires_in }
  );

  // res.status(200).json({ user, token, message: "Registration successful" });
  return { user, token };
};

const getAllUsersFromDB = async (payload) => {
  const { phone, usedPromo, role, resort } = payload;
  const page = parseInt(payload?.page, 10) || 1;
  const size = parseInt(payload?.size, 10) || 10;

  const matchStage = {};
  if (phone && phone.trim() !== "") matchStage.phone = { $regex: `^${phone}` };
  // Add filter for usedPromo length > 1 if usedPromo is true
  if (usedPromo) {
    matchStage.$expr = {
      $gt: [{ $size: { $ifNull: ["$usedPromo", []] } }, 1],
    };
  }
  if (role && role !== "") matchStage.role = role;
  if (resort && resort !== "undefined" && resort !== "null" && resort !== "")
    matchStage.resort = new mongoose.Types.ObjectId(resort);

  const pipeline = [
    { $match: matchStage },
    {
      $facet: {
        totalCount: [{ $count: "count" }],
        paginatedResults: [
          { $sort: { createdAt: -1 } },
          { $skip: (page - 1) * size },
          { $limit: size },
          {
            $lookup: {
              from: "branches",
              localField: "branch",
              foreignField: "_id",
              as: "branch",
            },
          },
          // { $project: { password: 0 } },
        ],
      },
    },
  ];

  const results = await User.aggregate(pipeline);

  // Extract total count and paginated results
  const totalCount = results[0]?.totalCount[0]?.count || 0;
  const users = results[0]?.paginatedResults || [];

  return { totalCount, currentPage: page, pageSize: size, users };
};

const getUserById = async (id) => {
  const result = await User.findOne({ _id: id });
  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserById,
};
