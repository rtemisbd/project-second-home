import config from "../config/index.js";
import AppError from "../helpers/errorHandler/AppError.js";
import User from "../models/User.js";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginUserWithJWT = async(payload)=>{
    const { phone, password } = payload;

    // Find the user by phone and populate the branch field
        const user = await User.findOne({ phone }).populate("branch");
        // console.log({user});
        
    
        // If the user does not exist, return an error message
        if (!user) {
            console.log(1);
           throw new AppError(httpStatus.NOT_FOUND, "User Not Found!");
        }
        if (user.userStatus === "Blocked" || user.userStatus === "Deactive") {
            console.log(2);
            throw new AppError(httpStatus.NO_CONTENT , "User is blocked or deactivated and cannot log in");
        }
    
        // Compare the provided password with the stored password
        const passwordMatch = await bcrypt.compare(password, user.password);
     
        // If the passwords do not match, return an error message
        if (!passwordMatch) {
            console.log(3);
            throw new AppError(httpStatus.NOT_ACCEPTABLE, "Invalid password. Please try again!");
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
        return{ token, user: userData };
}

export const authServices = {
    loginUserWithJWT
}