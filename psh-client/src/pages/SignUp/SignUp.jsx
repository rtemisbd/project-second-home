import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/UserProvider";
import "./SignUp.css";
import { IoEye, IoEyeOff } from "react-icons/io5";
import LoadingState from "../LoadingState/LoadingState";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const { registerUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  // Watch the password field
  const password = watch("password");

  const onSubmitRegister = async (data) => {
    const { firstName, email, phone, password } = data;
    const { user, errorMessage } = await registerUser(
      firstName,
      email,
      phone,
      password
    );
    if (user) {
      toast.success("Congratulations! Your account has been created.");
      navigate(location.state?.from || "/");
    } else {
      toast.error(errorMessage);
    }
  };

  return (
    <div className=" h-[100vh] flex justify-center items-center">
      <div className="flex flex-col md:flex-row lg:w-[86%] lg:h-[94vh] md:rounded-3xl md:shadow-2xl">
        <div className="w-1/2 min-h-full hidden lg:block">
          <div>
            <img
              src="https://i.ibb.co/VBhC76Y/Untitled-design-1.png"
              alt="pharmacy"
              className="img-fluid lg:h-[94vh] w-full lg:rounded-l-3xl object-fill"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-6">
          <div className="w-full">
            <div>
              <div className="flex justify-center mt-2 ">
                <Link to={"/"}>
                  <img
                    src={"https://i.ibb.co/RNJjy5X/Layer-1.png"}
                    alt="pharmacy"
                    className="img-fluid h-20"
                  />
                </Link>
              </div>
              <form
                onSubmit={handleSubmit(onSubmitRegister)}
                className="form px-4 lg:px-8"
              >
                <h2 className="text-xl lg:text-2xl text-center my-4 font-[600]">
                  Sign Up To <span>Project Second Home</span>
                </h2>

                {/* Full Name */}
                <label htmlFor="Name" className="text-xs mt-4">
                  Full Name
                </label>
                <input
                  type="text"
                  className="infoInput"
                  placeholder="Full Name"
                  {...register("firstName", {
                    required: "Name is required",
                  })}
                />
                {errors.firstName && (
                  <p className="text-red-500">{errors.firstName.message}</p>
                )}

                {/* Email Address */}
                <label htmlFor="Email" className="text-xs mt-4">
                  Email Address
                </label>
                <input
                  type="email"
                  className="infoInput"
                  placeholder="Email Address"
                  {...register("email", {
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}

                {/* Phone Number */}
                <label htmlFor="Phone" className="text-xs mt-4">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="infoInput"
                  placeholder="Phone Number"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                />
                {errors.phone && (
                  <p className="text-red-500">{errors.phone.message}</p>
                )}

                {/* Password */}
                <label htmlFor="Password" className="text-xs mt-4">
                  Password
                </label>
                <div className="flex form relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="infoInput "
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9]+$/,
                        message:
                          "Password must contain at least one uppercase letter , one lowercase letter and one digit",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-2"
                  >
                    {showPassword ? <IoEye /> : <IoEyeOff />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}

                {/* Confirm Password */}
                <label htmlFor="ConfirmPassword" className="text-xs mt-4">
                  Confirm Password
                </label>
                <div className="flex form relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="infoInput"
                    placeholder="Confirm Password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-2"
                  >
                    {showConfirmPassword ? <IoEye /> : <IoEyeOff />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}

                {/* Terms and Conditions */}
                <div className="flex items-center gap-2 pb-4 mt-4">
                  <input type="checkbox" name="terms" required />
                  <span className="sm:text-xs md:text-sm">
                    By Signing up, you agree to the{" "}
                    <Link to="/terms" className="underline">
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="underline">
                      {" "}
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full p-3 border-0 rounded uppercase bg-[#00BBB4] text-white"
                >
                  Sign Up
                </button>

                {/* Login Link */}
                <div className="flex text-[16px] justify-center py-4 text-center">
                  <span>Do you have an account?</span>
                  <Link to="/signin" className="text-[#00A1FF] ml-1">
                    Log in
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="bg-[#35B0A7] text-white">
        <span className="text-sm px-5">
          Copyrights &copy; Project Second Home 2023.  All rights reserved.
        </span>
      </div> */}
      <Toaster
        containerStyle={{ top: 200, zIndex: "100000" }}
        toastOptions={{ position: "top-center" }}
      ></Toaster>
      <LoadingState />
    </div>
  );
};

export default SignUp;
