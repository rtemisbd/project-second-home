import User from "../models/User.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import Branch from "../models/Branch.js";
import Otp from "../models/Otp.js";
import nodemailer from "nodemailer";
import { bookingSms } from "../SMS/BookingSms.js";

export const createUser = async (req, res) => {
  try {
    const {
      firstName,
      address,
      email,
      phone,
      role,
      refferCode,
      photos,
      branch: branchId,
    } = req.body;
    const existingUser = await User.findOne({ email });
    const existingMobile = await User.findOne({ phone });

    if (existingUser || existingMobile) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      firstName,
      address,
      email,
      phone,
      role,
      refferCode,
      photos,
      password: hashedPassword,
      branch: branchId,
    });

    await user.save();

    let branch;
    if (branchId) {
      branch = await Branch.findById(branchId);

      if (!branch) {
        await user.remove(); // Remove the created user if branch is not found
        return res.status(404).json({ message: "Branch not found" });
      }

      branch.user.push(user._id);
      await branch.save();
    }

    const token = jwt.sign(
      {
        name: user.firstName + " " + user.lastName,
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ user, token, message: "Registration successful" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const sendOtp = async (req, res, next) => {
  try {
    const { email, customerOtp, phone } = req.body;

    // Find the user by email and populate the branch field
    const user = await User.findOne({ email });
    const phoneNumberCheck = await User.findOne({ phone });

    if (user || phoneNumberCheck) {
      return res.status(400).json({
        status: "Faild",
        message: "Sorry! This Number or Email Already Exist",
      });
    } else {
      // Account Verification Mail and sms to user
      const bookingMessage = `/api/smsapi?api_key=za0YHQ7fvYCpcWGGZgce&type=text&number=88${phone}&senderid=8809617617196&message=For%20Project%20Second%20Home(PSH)%20your%20OTP%20for%20account%20verification%20is%3A%20${customerOtp}.%20Enter%20this%20code%20to%20complete%20your%20Signup%20process.%20Thank%20you`;

      bookingSms(bookingMessage)
        .then((response) => {
          console.log("Response from SMS API:", response);
          // Handle response data as needed
        })
        .catch((error) => {
          console.error("Error while sending SMS:", error);
          // Handle error
        });
      // Mail
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "alaminbamna08@gmail.com",
          pass: "qesfajhmrfhkfnbo",
        },
      });

      const mailOptions = {
        from: "alaminbamna08@gmail.com",
        to: `mohammad.alaminh08@gmail.com,${email}`,
        subject: "Verify Your Email for Project Second Home",
        html: `  <div style="font-size: 16px; font-weight: normal;">
        <p>Dear User</p>
        <p>
          To activate your account, please enter the OTP (One-Time Password) below:
        </p>
        <p>
          OTP: ${customerOtp}
        </p>
        <p>
          If you didn't request this OTP, you can ignore this email.
        </p>
        <p>
          Thank you,
        </p>
        <p>
          Project Second Home Team
        </p>
      </div>
    
        `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.status(200).json({ status: "success" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email and populate the branch field
    const user = await User.findOne({ email }).populate("branch");

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
      // fatherName: user?.fatherName,
      // motherName: user?.motherName,
      email: user?.email,
      // phone: user?.phone,
      // userAddress: user?.userAddress,
      // passport: user?.passport,
      // dateOfBirth: user?.dateOfBirth,
      // gender: user?.gender,
      // nationalId: user?.nationalId,
      // validityType: user?.validityType,
      // validityNumber: user?.validityNumber,
      role: user?.role,
      // cardImage: user?.cardImage,
      // gardianImg: user?.gardianImg,

      // employmentStatus: {
      //   workAs: user?.employmentStatus?.workAs,
      //   monthlyIncome: user?.employmentStatus?.monthlyIncome,
      // },
      // emergencyContact: {
      //   contactName: user?.emergencyContact?.contactName,
      //   relation: user?.emergencyContact?.relation,
      //   contactNumber: user?.emergencyContact?.contactNumber,
      // },
      // usedPromo: user?.usedPromo,
    };

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, "your-secret-key");

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

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "alaminbamna08@gmail.com",
        pass: "qesfajhmrfhkfnbo",
      },
    });

    const mailOptions = {
      from: "alaminbamna08@gmail.com",
      to: `mohammad.alaminh08@gmail.com,${user.email}`,
      subject: "Reset Password Link",
      text: `https://psh.com.bd/reset_password/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to send reset password email" });
      }
      console.log("Reset password email sent: " + info.response);
      res
        .status(200)
        .json({ message: "Reset password email sent successfully" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
export const resetPassword = async (req, res, next) => {
  try {
    const { id, token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findByIdAndUpdate({
      _id: id,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", error });
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

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

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

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).populate("branch");
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

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
    const banner = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(banner);
  } catch (err) {
    next(err);
  }
};

//validate with jwt registration
