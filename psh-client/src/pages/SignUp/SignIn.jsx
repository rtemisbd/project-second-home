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
    <div>
      <div className="grid grid-cols-12 ">
        <div className="flex flex-col items-start col-span-12  sm:col-span-12 lg:col-span-7 sm:hidden md:inline-block">
          <div>
            <img
              src="https://i.ibb.co/VBhC76Y/Untitled-design-1.png"
              alt="pharmacy"
              className="img-fluid h-[1020px]"
            />
          </div>
        </div>
        {/* Left Part */}
        <div className="col-span-12 sm:col-span-12 lg:col-span-5 px-3">
          <div className="flex w-full mt-12">
            <div>
              <div className="flex justify-center mb-5">
                <Link to={"/"}>
                  <img
                    src={"https://i.ibb.co/RNJjy5X/Layer-1.png"}
                    alt="pharmacy"
                    className="img-fluid"
                  />
                </Link>
              </div>
              <form
                className="infoForm authForm card_signup"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="form md:px-8">
                  <h2 className="text-[36px] font-[600]">Login</h2>
                  <p className="my-2">
                    Welcome Back To{" "}
                    <span className="font-bold">Project Second Home</span>
                  </p>
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
                  <label htmlFor="Email">Password</label>
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
                </div>
                <div className="flex remember-switch px-10">
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
                <div className="flex divider px-8">
                  <div>
                    <img src={line} alt="" />
                  </div>
                  <div>
                    <span className="text-sm">OR SIGN UP WITH</span>
                  </div>
                  <div>
                    <img src={line} alt="" />
                  </div>
                </div>

                <div className="md:flex social-media ">
                  <div
                    className="flex px-14 py-5 rounded-lg cursor-pointer"
                    style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
                  >
                    <div>
                      <img src={facebookIcon} alt="" />
                    </div>
                    <div className="ml-3 ">
                      <span>Facebook</span>
                    </div>
                  </div>
                  <div>
                    <div
                      className="flex px-14 py-5 rounded-lg cursor-pointer"
                      style={{
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                      }}
                    >
                      <div>
                        <img src={googleIcon} alt="" />
                      </div>
                      <div className="ml-3 ">
                        <span>Google</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex text-[18px]">
                  <div>
                    <span>Don’t have an account? </span>
                  </div>
                  <div>
                    <Link to="/signup">
                      <span className="text-[#00A1FF]">Signup</span>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#35B0A7] text-white">
        <span className="text-sm px-5">
          Copyrights &copy; Project Second Home 2023.  All rights reserved.
        </span>
      </div>
    </div>
  );
};

export default SignIn;
