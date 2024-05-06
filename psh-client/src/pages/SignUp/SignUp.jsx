import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import line from "../../assets/img/Line 127.png";
import facebookIcon from "../../assets/img/facebook.svg";
import googleIcon from "../../assets/img/google.png";
import { AuthContext } from "../../contexts/UserProvider";
import "./SignUp.css";

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [loginError, setLoginError] = useState("");
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const onSubmitRegister = async (data) => {
    const { firstName, email, phone, password, refferCode, photos } = data;

    await registerUser(firstName, email, phone, password, refferCode, photos);
    navigate("/");
  };
  // const onSubmitLogin = async (data) => {
  //   const { email, password } = data;

  //   await loginUser(email, password);
  //   navigate("/");
  // };

  // const onSubmitRegister = async (data) => {
  //   const { name, address, email, phone, password } = data;

  //   await registerUser(name, address, email, phone, password);
  //   navigate("/");
  // };
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
        <div className="flex flex-col items-start col-span-12 sm:col-span-12 lg:col-span-5 left_side mt-[-30px]">
          <div className="  w-full mt-12 px-4 mb-5">
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
                onSubmit={handleSubmit(onSubmitRegister)}
              >
                <div className="form md:px-8 ">
                  <h2 className="text-[36px] font-[600]">Sing Up</h2>
                  <p className="my-2">
                    Welcome Back To{" "}
                    <span className="font-bold">Project Second Home</span>
                  </p>
                  <label htmlFor="Email">Full Name</label>
                  <input
                    type="text"
                    className="infoInput"
                    placeholder="Full Name"
                    {...register("firstName", {
                      required: "Name is Required",
                    })}
                  />
                  {errors.firstName && (
                    <p className="text-red-500">{errors.firstName.message}</p>
                  )}

                  <label htmlFor="Email">Email Address</label>
                  <input
                    type="email"
                    className="infoInput"
                    placeholder="Email Address"
                    {...register("email", {
                      required: true,
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                  <label htmlFor="Email">Phone Number</label>
                  <input
                    type="text"
                    className="infoInput"
                    placeholder="Phone Number"
                    {...register("phone", {
                      required: true,
                    })}
                  />
                  {errors.phone && (
                    <p className="text-red-500">{errors.phone.message}</p>
                  )}

                  <label htmlFor="Email">Password</label>
                  <input
                    type="password"
                    className="infoInput"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be 6 characters long",
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9]+$/,
                        message:
                          "Password must contain at least one uppercase letter and can have both uppercase and lowercase letters and numbers",
                      },
                    })}
                  />

                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                  <label htmlFor="Email">Confirm Password</label>
                  <input
                    type="password"
                    className="infoInput"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be 6 characters long",
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9]+$/,
                        message:
                          "Password must contain at least one uppercase letter and can have both uppercase and lowercase letters and numbers",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                  <label htmlFor="Email">Refers Code</label>
                  <input
                    type="text"
                    className="infoInput"
                    placeholder="Enter Refer Code"
                    {...register("refferCode", {})}
                  />

                  <div>
                    <span className="text-[12px]">
                      By Signing up, you agree the Terms and Conditions and
                      Privacy Policy.
                    </span>
                  </div>
                </div>

                <div className="px-8">
                  <button className="w-full p-3 border-0 rounded uppercase bg-[#00BBB4] text-white">
                    Sign Up
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

                <div className="md:flex social-media-signUp ">
                  <div
                    className="flex px-16 py-5 rounded-lg cursor-pointer"
                    style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
                  >
                    <div>
                      <img src={facebookIcon} alt="" />
                    </div>
                    <div className="ml-3">
                      <span>Facebook</span>
                    </div>
                  </div>
                  <div>
                    <div
                      className="flex px-16 py-5 rounded-lg cursor-pointer"
                      style={{
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                      }}
                    >
                      <div>
                        <img src={googleIcon} alt="" />
                      </div>
                      <div className="ml-3">
                        <span>Google</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex text-[18px]">
                  <div>
                    <span>Do you have an account?</span>
                  </div>
                  <div>
                    <Link to="/signin">
                      <span className="text-[#00A1FF]">Log in </span>
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

export default SignUp;
