import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import Branch from "../models/Branch.js";
import Otp from "../models/Otp.js";
import nodemailer from "nodemailer";
import { bookingSms } from "../SMS/BookingSms.js";
import config from "../config/index.js";
import catchAsync from "../utils/catchAsync.js";
import { userServices } from "../services/user.service.js";
import responseSend from "../utils/responseSend.js";
import mongoose from "mongoose";

export const createUser = catchAsync(async (req, res, next) => {
  const result = await userServices.createUserIntoDB(req.body);

  responseSend(res, {
    statusCode: 200,
    success: true,
    message: "User has been created successfully!",
    data: result,
  });
});

// export const createUser = async (req, res) => {
//   try {
//     const {
//       firstName,
//       address,
//       email,
//       phone,
//       role,
//       refferCode,
//       photos,
//       branch: branchId,
//     } = req.body;

//     const existingMobile = await User.findOne({ phone });

//     if (existingMobile) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(
//       req.body.password || config.user_default_password,
//       10
//     );

//     const user = new User({
//       firstName,
//       address,
//       email,
//       phone,
//       role,
//       refferCode,
//       photos,
//       password: hashedPassword,
//       branch: branchId,
//     });

//     await user.save();

//     let branch;
//     if (branchId) {
//       branch = await Branch.findById(branchId);

//       if (!branch) {
//         await user.remove(); // Remove the created user if branch is not found
//         return res.status(404).json({ message: "Branch not found" });
//       }

//       branch.user.push(user._id);
//       await branch.save();
//     }

//     const token = jwt.sign(
//       {
//         name: user.firstName + " " + user.lastName,
//         id: user._id,
//       },
//       config.jwt.secret,
//       { expiresIn: config.jwt.expires_in }
//     );

//     res.status(200).json({ user, token, message: "Registration successful" });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

export const sendOtp = async (req, res, next) => {
  try {
    const { customerOtp, phone } = req.body;

    // Find the user by email and populate the branch field
    const phoneNumberCheck = await User.findOne({ phone });

    if (phoneNumberCheck) {
      return res.status(400).json({
        status: "Failed",
        message: "Sorry! This Number Already Exist",
      });
    } else {
      // Account Verification Mail and sms to user
      const bookingMessage = `/api/smsapi?api_key=${config.sms_api_key}&type=text&number=88${phone}&senderid=${config.sms_sender_id}&message=For%20Project%20Second%20Home(PSH)%20your%20OTP%20for%20account%20verification%20is%3A%20${customerOtp}.%20Enter%20this%20code%20to%20complete%20your%20Signup%20process.%20Thank%20you`;

      bookingSms(bookingMessage)
        .then((response) => {
          // console.log("Response from SMS API:", response);
          // Handle response data as needed
        })
        .catch((error) => {
          console.error("Error while sending SMS:", error);
          // Handle error
        });

      res.status(200).json({ status: "success" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
export const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Find the user by phone and populate the branch field
    const user = await User.findOne({ phone }).populate("branch");

    // If the user does not exist, return an error message
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (user.userStatus === "Blocked" || user.userStatus === "Deactive") {
      res
        .status(401)
        .json({ message: "User is blocked or deactivated and cannot log in" });
      return;
    }

    // Compare the provided password with the stored password
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If the passwords do not match, return an error message
    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    // Create a user object with limited properties, including the branch
    const userData = {
      _id: user._id,
      branch: user?.branch,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phone: user?.phone,
      role: user?.role,
    };

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, role: user?.role },
      config.jwt.secret
    );

    // Return the token and user information
    res.status(200).json({ token, user: userData });
  } catch (err) {
    res.status(500).json(err);
  }
};

// For Admin Login

export const loginAdminUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email and populate the branch field

    const user = await User.findOne({ email });

    // If the user does not exist, return an error message
    if (user.role === "user") {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (user.userStatus === "Blocked" || user.userStatus === "Deactive") {
      res
        .status(401)
        .json({ message: "User is blocked or deactivated and cannot log in" });
      return;
    }

    // Compare the provided password with the stored password
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If the passwords do not match, return an error message
    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    // Create a user object with limited properties, including the branch
    const userData = {
      _id: user._id,
      branch: user?.branch,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      role: user?.role,
    };

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, role: user?.role },
      config.jwt.secret
    );

    // Return the token and user information
    res.status(200).json({ token, user: userData });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    // Status Update

    if (req?.body?.userStatus) {
      await User.updateOne(
        { _id: id },
        {
          $set: {
            userStatus: req?.body?.userStatus,
          },
        },
        { runValidators: true }
      );
      res.status(200).json({
        status: "success",
        message: "Data updated Successfully",
      });
    } else {
      const presentAddressParse = JSON.parse(req.body?.presentAddress);
      const permanentAddressParse = JSON.parse(req.body?.permanentAddress);
      const employmentStatusParse = JSON.parse(req.body?.employmentStatus);
      const emergencyContactParse = JSON.parse(req.body?.emergencyContact);
      const userUpdate = {
        firstName: req.body?.firstName,
        email: req.body?.email,
        phone: req.body?.phone,
        userName: req.body?.userName,
        userId: req.body?.userId,
        photos: req.body?.photos,
        dateOfBirth: req.body?.dateOfBirth,
        gender: req.body?.gender,
        nationalId: req.body?.nationalId,
        presentAddress: {
          address: presentAddressParse?.address,
          city: presentAddressParse?.city,
          state: presentAddressParse?.state,
          postCode: presentAddressParse?.postCode,
          country: presentAddressParse?.country,
        },
        permanentAddress: {
          address: permanentAddressParse?.address,
          city: permanentAddressParse?.city,
          state: permanentAddressParse?.state,
          postCode: permanentAddressParse?.postCode,
          country: permanentAddressParse?.country,
        },
        idCardType: req.body?.idCardType,
        cardImage: req.body?.cardImage,

        employmentStatus: {
          workAs: employmentStatusParse?.workAs,
          monthlyIncome: employmentStatusParse?.monthlyIncome,
        },
        emergencyContact: {
          contactName: emergencyContactParse?.contactName,
          relation: emergencyContactParse?.relation,
          phoneNumber: emergencyContactParse?.phoneNumber,
        },
      };

      await User.updateOne(
        { _id: id },
        { $set: userUpdate },
        { runValidators: true }
      );
      res.status(200).json({
        status: "success",
        message: "Data updated Successfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "data not updated",
      error: error.message,
    });
  }
};
export const updatePassword = async (req, res) => {
  try {
    const {
      userId,
      currentPassword,
      newPassword,
      name,
      email,
      phone,
      address,
    } = req.body;

    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Verify the role of the user
    // if (user.role !== "admin") {
    //   res.status(401).json({ message: "Unauthorized access" });
    //   return;
    // }

    // Update the user's password if a new password is provided
    if (currentPassword) {
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!passwordMatch) {
        res.status(401).json({ message: "Current password is incorrect" });
        return;
      }

      if (newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
      }
    }

    // Update other user data if provided
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (phone) {
      user.phone = phone;
    }
    if (address) {
      user.address = address;
    }

    await user.save();

    res.status(200).json({ message: "User data updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

export const sendOtpForForget = async (req, res) => {
  const { phone } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ status: "User not found" });
    }
    // Generate OTP
    const otp = crypto.randomInt(10000, 99999).toString();

    // set expiration time 3 minutes
    const expirationTime = Date.now() + 10 * 60 * 1000;

    await User.updateOne({ phone }, { otp, otpExpiration: expirationTime });

    const bookingMessage = `/api/smsapi?api_key=${config.sms_api_key}&type=text&number=88${phone}&senderid=${config.sms_sender_id}&message=You%20have%20requested%20to%20reset%20your%20password%20for%20Project%20Second%20Home(PSH).%20Your%20OTP%20is%20${otp}.%20If%20this%20wasn't%20you,%20please%20contact%20our%20support%20team%20immediately.%20Call%2001647647404`;

    bookingSms(bookingMessage)
      .then((response) => {
        console.log("Response from SMS API:", response);
        // Handle response data as needed
      })
      .catch((error) => {
        console.error("Error while sending SMS:", error);
        // Handle error
      });

    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const verifiedUser = await User.findOne({ phone });

    if (
      !verifiedUser ||
      verifiedUser.otp !== otp.join("") ||
      Date.now() > verifiedUser.otpExpiration
    ) {
      return res.status(404).json({ message: "Invalid or expired OTP" });
    }

    return res.status(200).json({ verifiedUser });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(
      newPassword,
      Number(config.bcrypt_salt_rounds)
    );

    await User.findByIdAndUpdate(
      { _id: id },
      { password: hashedPassword, otp: null, otpExpiration: null }
    );
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "An error occurred" });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted successfully");
  } catch (err) {
    next(err);
  }
};

export const getUser = catchAsync(async (req, res, next) => {
  const result = await userServices.getUserById(req.params.id);

  responseSend(res, {
    statusCode: 200,
    success: true,
    message: "User has been retrieved successfully!",
    data: result,
  });
});

export const getAdmin = async (req, res, next) => {
  try {
    const { email } = req.query;

    const adminUser = await User.findOne({ email, role: "admin" });

    if (!adminUser) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    res.status(200).json(adminUser);
  } catch (err) {
    next(err);
  }
};

export const getUsers = catchAsync(async (req, res, next) => {
  const result = await userServices.getAllUsersFromDB(req.query);

  responseSend(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully!",
    data: result,
  });
});

export const getJWT = async (req, res, next) => {
  try {
    const email = req.query.email;
    const query = { email: email };
    const user = await User.findOne(query);
    if (user) {
      const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, {
        expiresIn: "1h",
      });
      return res.send({ accessToken: token });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

//update admin user
export const updateUserAdmin = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

//validate with jwt registration
