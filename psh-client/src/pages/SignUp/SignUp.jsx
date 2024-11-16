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
    console.log(data);
    const { firstName, email, phone, password, refferCode, photos } = data;

    await registerUser(
      firstName,
      email || "",
      phone,
      password,
      refferCode,
      photos
    );
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
    <div className=" h-[100vh] flex justify-center items-center ">
      <div className="flex w-[85%] rounded-3xl shadow-2xl">
        <div className="w-1/2 min-h-full ">
          <div>
            <img
              src="https://i.ibb.co/VBhC76Y/Untitled-design-1.png"
              alt="pharmacy"
              className="img-fluid min-h-[88vh] w-full rounded-l-3xl object-fill"
            />
          </div>
        </div>
        <div className="w-1/2">
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
              <form className="" onSubmit={handleSubmit(onSubmitRegister)}>
                <div className="form md:px-8 space-y-4  ">
                  <h2 className="text-2xl text-center my-4 font-[600]">
                    Sign Up To <span>Project Second Home</span>
                  </h2>

                  <label htmlFor="Name">Full Name</label>
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
                    {...register("email")}
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

                  <label htmlFor="Password">Password</label>
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
                  <label htmlFor="Confirm Password">Confirm Password</label>
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

                  <div className="flex items-center gap-2 pb-4">
                    <input type="checkbox" name="terms" required id="" />
                    <span>
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

                <div className="flex text-[18px] justify-center py-4 text-center">
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
      {/* <div className="bg-[#35B0A7] text-white">
        <span className="text-sm px-5">
          Copyrights &copy; Project Second Home 2023.  All rights reserved.
        </span>
      </div> */}
    </div>
  );
};

export default SignUp;
