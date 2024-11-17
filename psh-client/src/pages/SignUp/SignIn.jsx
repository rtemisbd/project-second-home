import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { Switch } from "@material-tailwind/react";

import { AuthContext } from "../../contexts/UserProvider";
import line from "../../assets/img/Line 127.png";
import facebookIcon from "../../assets/img/facebook.svg";
import googleIcon from "../../assets/img/google.png";

const SignIn = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginError, setLoginError] = useState("");
  const { loginUser } = useContext(AuthContext);
  const onSubmit = async (data) => {
    const { email, password } = data;

    await loginUser(email, password);
    navigate(location.state?.from || "/");
  };

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  return (
    <div className="h-[90vh] md:h-[100vh] flex justify-center items-center">
      <div className="flex flex-col lg:flex-row w-[90%] lg:w-[80%] lg:h-[80vh] md:rounded-3xl md:shadow-2xl">
        <div className="w-1/2 min-h-full hidden lg:block">
          <div>
            <img
              src="https://i.ibb.co/VBhC76Y/Untitled-design-1.png"
              alt="pharmacy"
              className="img-fluid lg:h-[80vh] w-full lg:rounded-l-3xl object-fill"
            />
          </div>
        </div>
        {/* Left Part */}
        <div className="w-full lg:w-1/2 p-6">
          <div className="w-full">
            <div>
              <div className="flex justify-center mt-2 ">
                <Link to={"/"}>
                  <img
                    src={"https://i.ibb.co/RNJjy5X/Layer-1.png"}
                    alt="pharmacy"
                    className="img-fluid h-24"
                  />
                </Link>
              </div>
              <form
                className="form px-4 lg:px-12"
                onSubmit={handleSubmit(onSubmit)}
              >
                <h2 className="text-xl lg:text-2xl text-center my-4 font-[600]">
                  Please Login Here!
                </h2>
                <label htmlFor="Email" className="mt-5">
                  Email Address
                </label>
                <input
                  type="email"
                  className="infoInput"
                  placeholder="Username or Email"
                  {...register("email", {
                    required: true,
                  })}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
                <label htmlFor="Password" className="mt-5 mb-0">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="infoInput"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be 6 characters long",
                    },
                    pattern: {
                      value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                      message:
                        "Password must have uppercase, number and special characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  style={{
                    border: "none",
                    marginLeft: -40,
                    width: 40,
                    height: 60,
                  }}
                >
                  {showPassword ? (
                    <i className="fa-solid fa-eye"></i>
                  ) : (
                    <i className="fa-solid fa-eye-slash"></i>
                  )}
                </button>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
                <div className="flex items-center justify-between remember-switch py-4">
                  <div className="flex items-center mt-2">
                    <div>
                      <Switch />
                    </div>
                    <div className="mt-[-6px]">
                      <span className="ml-2 text-sm">Remember me</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[#35B0A7]">Forgot Password</span>
                  </div>
                </div>
                <div className="px-8">
                  <button className="w-full p-3 border-0 rounded-lg uppercase bg-[#00BBB4] text-white font-bold">
                    Log In
                  </button>
                </div>

                <div className="flex justify-center mt-4 text-[18px]">
                  <div>
                    <span>Don’t have an account? </span>
                  </div>
                  <div>
                    <Link to="/signup">
                      <span className="text-[#00A1FF]">Sign Up</span>
                    </Link>
                  </div>
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
    </div>
  );
};

export default SignIn;
