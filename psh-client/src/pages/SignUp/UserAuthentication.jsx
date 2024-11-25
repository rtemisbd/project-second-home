import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/UserProvider";
import { useForm } from "react-hook-form";
import { Switch } from "@material-tailwind/react";
import toast, { Toaster } from "react-hot-toast";
import LoadingState from "../LoadingState/LoadingState";
import { placeLoadingShow } from "../../redux/reducers/smProfileMenuSlice";
import axios from "axios";
import { serverBaseUrl } from "../../serverApi/baseUrl";
import { IoReturnUpBack } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";

const UserAuthentication = () => {
  const dispatch = useDispatch();

  // const isModalShow = useSelector((state) => state?.profileMenu?.isModalShow);
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showOtpPage, setShowOtpPage] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassord] = useState("");
  const [confimrPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [randomCode, setRandomCode] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [userMessage, setUserMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [seconds, setSeconds] = useState(120);
  const { loginUser, registerUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  const generateRandomCode = () => {
    // Generate a random 6-digit number
    const newRandomCode = Math.floor(10000 + Math.random() * 90000);
    setRandomCode(newRandomCode);
  };

  // Format the remaining seconds as minutes:seconds
  const formattedTime = seconds % 60;

  const handleOtpChange = (index, value) => {
    // Validate input to allow only numerical values
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically focus on the next input field
      if (index < 4 && value !== "") {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleOtp = async (e) => {
    e.preventDefault();
    // const parseToJson = JSON.parse(localStorage.getItem("otp"));
    if (Number(otp.join("")) === randomCode) {
      await registerUser(firstName, email, phone, password);

      // dispatch(placeLoadingShow(false));
      // navigate(location.state?.from || "/");
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/");
      }
      // localStorage.removeItem("otp");
    } else {
      return toast.error("Incorrect OTP. Please try again.");
    }
  };

  // handle otp paste

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").split("");

    // Update the OTP array with the pasted data
    const newOtp = [...otp];
    pastedData.forEach((digit, index) => {
      if (index < 5) {
        newOtp[index] = digit;
      }
    });
    setOtp(newOtp);

    // Automatically focus on the next input field
    if (pastedData.length > 0) {
      document.getElementById(`otp-${pastedData.length - 1}`).focus();
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const { phone, password } = data;

    const user = loginUser(phone, password);
    if (user) {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/");
      }
    }
  };

  // Password Validation
  const passwordCheck = (e) => {
    const password = e.target.value;
    setPassord(password);
    if (password.length < 6) {
      setErrorMessage("Password must have at least 6 characters.");
    } else {
      setErrorMessage("");
    }
  };

  const handleSignUp = async (e) => {
    // const { firstName, email, phone, password, refferCode } = data;
    e.preventDefault();
    // Check Phone Number

    if (phone?.length !== 11 || phone?.substring(0, 2) !== "01") {
      return toast.error("Sorry! you gave me wrong phone number");
    }
    if (password !== confimrPassword) {
      return toast.error("Sorry! Password Not Matched");
    }
    // const parseToJson = JSON.parse(localStorage.getItem("otp"));
    const otpData = {
      customerOtp: randomCode,
      email: email,
      phone: phone,
    };

    try {
      dispatch(placeLoadingShow(true));

      await axios.post(`${serverBaseUrl}/users/send-otp`, otpData);

      const intervalId = setInterval(() => {
        // Decrease the remaining seconds by 1
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(intervalId);
      }, 60000);
      dispatch(placeLoadingShow(false));
      toast.success("Please Check Your Phone Number");
      setUserMessage(
        "Enter the OTP (One Time Password) that has been sent to your registered Email"
      );
      setShowSignIn(false);
      setShowSignUp(false);
      setShowOtpPage(true);
    } catch (error) {
      dispatch(placeLoadingShow(false));
      console.log(error);

      return toast.error(error?.response?.data?.message);
    }

    // navigate(location.state?.from || "/");
  };
  const handleResentOtp = async (e) => {
    e.preventDefault();
    setSeconds(120);

    const intervalId = setInterval(() => {
      // Decrease the remaining seconds by 1
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(intervalId);
    }, 60000);
    toast.success("Please Check Your Phone Number");
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="h-[100vh]">
      <div className="flex flex-col lg:flex-row  ">
        <div className="w-[65%] hidden lg:block fixed">
          <div>
            <img
              src="https://i.ibb.co/VBhC76Y/Untitled-design-1.png"
              alt="pharmacy"
              className="img-fluid  w-full object-cover"
            />
          </div>
        </div>
        <div className="w-full  h-full flex justify-end ">
          <div className="lg:w-[35%]">
            <div
              className="flex justify-end px-12 pt-6 items-center"
              onClick={handleBack}
            >
              <button className=" text-black px-5 py-2 rounded hover:underline flex items-center ">
                <IoIosArrowBack size={15} className="text-black " />
                Back
              </button>
            </div>
            <div className="flex items-center w-full ">
              <div className="w-full">
                <div className="flex justify-center ">
                  <Link to={"/"}>
                    <img
                      src={"https://i.ibb.co/RNJjy5X/Layer-1.png"}
                      alt="pharmacy"
                      className="img-fluid h-24"
                    />
                  </Link>
                </div>
                {showSignIn && (
                  <>
                    <h2 className="text-xl lg:text-2xl text-center mt-8 font-[600]">
                      Please Login Here!
                    </h2>
                    <h4 className="mt-2 text-center mb-8 ">
                      Welcome To Project Second Home.
                    </h4>
                    <form
                      className="w-[90%] lg:w-[75%] mx-auto shadow-md px-6 lg:px-0 lg:shadow-none"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="py-8">
                        <div>
                          <div className="form">
                            <span>Phone Number</span>
                            <br />
                            <input
                              type="text"
                              className="mt-3 border w-full p-2 rounded-md shadow-sm mb-4"
                              placeholder="Enter your phone number "
                              {...register("phone")}
                            />

                            {errors.phone && (
                              <p className="text-red-500">
                                {errors.phone.message}
                              </p>
                            )}
                            <span>Password</span>
                            <br />
                            <input
                              type={showPassword ? "text" : "password"}
                              className="mt-3 border w-full p-2 rounded-md shadow-sm mb-4"
                              placeholder="Password"
                              {...register("password", {
                                required: "Password is required",
                                minLength: {
                                  value: 6,
                                  message: "Password must be 6 characters long",
                                },
                              })}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
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
                              <p className="text-red-500">
                                {errors.password.message}
                              </p>
                            )}
                          </div>
                          <div className="flex justify-between mt-4 ">
                            <div className="flex items-center ">
                              <div className="mt-2">
                                <Switch />
                              </div>
                              <div className="">
                                <span className="ml-2 md:text-[14px] sm:text-[12px]">
                                  Remember me
                                </span>
                              </div>
                            </div>

                            <Link
                              to={"/forgot-password"}
                              onClick={() => dispatch(placeModalShow(false))}
                            >
                              <div className="">
                                <span className="text-[#35B0A7] md:text-[14px] sm:text-[12px]">
                                  Forgot Password
                                </span>
                              </div>
                            </Link>
                          </div>
                          <div className="mt-5">
                            <button className="w-full p-3 border-0 rounded-lg uppercase bg-[#00BBB4] text-white font-bold text-sm">
                              Log In
                            </button>
                          </div>
                          <div className="flex divider px-8"></div>

                          <div className="flex justify-center my-4">
                            <div>
                              <span className="text-sm">
                                Don’t have an account?{" "}
                              </span>
                            </div>
                            <div className="ms-2 ">
                              <button
                                className="text-[#00A1FF] text-sm"
                                onClick={() => {
                                  setShowSignIn(false);
                                  setShowSignUp(true);
                                }}
                              >
                                Sign Up
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </>
                )}
                {showSignUp && (
                  <div>
                    <h2 className="text-xl text-center mt-3 font-[600]">
                      Sign Up To Project Second Home!
                    </h2>
                    <form
                      onSubmit={handleSignUp}
                      className="w-[90%] lg:w-[75%] mx-auto shadow-md px-6 lg:px-0 lg:shadow-none mt-4"
                    >
                      <span>Full Name</span>
                      <input
                        type="text"
                        className="mt-2 border w-full p-2 rounded-md shadow-sm mb-2"
                        placeholder="Full Name"
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                        defaultValue={firstName}
                      />
                      <span>Email</span>{" "}
                      <span className="text-sm text-gray-600"> [Optional]</span>
                      <input
                        type="email"
                        className="mt-2 border w-full p-2 rounded-md shadow-sm mb-2"
                        placeholder="Email Address"
                        onChange={(e) => setEmail(e.target.value)}
                        defaultValue={email}
                      />
                      <span>Phone Number</span>
                      <input
                        type="text"
                        className="mt-2 border w-full p-2 rounded-md shadow-sm mb-2"
                        placeholder="Phone Number"
                        required
                        onChange={(e) => setPhone(e.target.value)}
                        defaultValue={phone}
                      />
                      <div>
                        <span>Password</span>

                        <input
                          type={showPassword ? "text" : "password"}
                          className="mt-2 border w-full p-2 rounded-md shadow-sm mb-2"
                          placeholder="Password"
                          required
                          value={password}
                          onChange={passwordCheck}
                          defaultValue={password}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            border: "none",
                            marginLeft: -40,
                            width: 40,
                          }}
                        >
                          {showPassword ? (
                            <i className="fa-solid fa-eye"></i>
                          ) : (
                            <i className="fa-solid fa-eye-slash"></i>
                          )}
                        </button>
                        {errorMessage && (
                          <p className="text-sm text-red-600">{errorMessage}</p>
                        )}
                      </div>
                      <div>
                        <span>Confirm Password</span>

                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          className="mt-2 border w-full p-2 rounded-md shadow-sm mb-2"
                          placeholder="Password"
                          required
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          defaultValue={confimrPassword}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setConfirmPassword(!showConfirmPassword)
                          }
                          style={{
                            border: "none",
                            marginLeft: -40,
                            width: 40,
                          }}
                        >
                          {showConfirmPassword ? (
                            <i className="fa-solid fa-eye"></i>
                          ) : (
                            <i className="fa-solid fa-eye-slash"></i>
                          )}
                        </button>
                        {password && confimrPassword ? (
                          password !== confimrPassword ? (
                            <span className="text-red-500 text-sm">
                              Password not matched
                            </span>
                          ) : (
                            ""
                          )
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="flex mt-0 text-black ">
                        <div>
                          <input type="checkbox" name="terms" required id="" />
                        </div>
                        <p className="text-left pl-3 text-[12px] mt-1">
                          <Link to="/terms" target="_blank">
                            <span className="underline hover:text-[#00bbb4] cursor-pointer">
                              Terms of Use
                            </span>
                          </Link>{" "}
                          &{" "}
                          <Link to="/privacy" target="_blank">
                            <span className="underline hover:text-[#00bbb4] cursor-pointer">
                              Pivacy Policy
                            </span>
                          </Link>
                        </p>
                      </div>
                      <div onClick={generateRandomCode}>
                        <button className="w-full py-2 mb-4 sm:mt-1 border-0 font-bold rounded uppercase bg-[#00BBB4] text-white text-sm">
                          Sign Up
                        </button>
                      </div>
                      <div className="flex justify-center w-full text-center pb-2 mb-12">
                        <div>
                          <span className="text-sm">
                            Do you have an account?
                          </span>
                        </div>
                        <div className="ms-2">
                          <button
                            className="text-[#00A1FF] text-sm"
                            onClick={() => {
                              setShowSignIn(true);
                              setShowSignUp(false);
                            }}
                          >
                            Log in{" "}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {showOtpPage && (
                  <div className="text-center">
                    <h2 className="text-center text-[30px] my-5">
                      Verification
                    </h2>
                    <p className="text-sm text-[#9b9a98] ">{userMessage}</p>
                    <p className="mt-5">{phone}</p>
                    <p
                      className="underline hover:text-[#02625a] text-[#35B0A7] cursor-pointer"
                      onClick={() => {
                        setShowSignIn(false);
                        setShowSignUp(true);
                        setShowOtpPage(false);
                      }}
                    >
                      Change Number
                    </p>
                    <form onSubmit={handleOtp} className="mt-20 ">
                      <div className="flex justify-center gap-x-3">
                        {otp.map((digit, index) => (
                          <div key={index}>
                            <input
                              type="text"
                              id={`otp-${index}`}
                              name={`otp-${index}`}
                              value={digit}
                              onChange={(e) =>
                                handleOtpChange(index, e.target.value)
                              }
                              onPaste={handlePaste}
                              maxLength="1"
                              className="border-2 border-[black] w-[50px] h-[50px] rounded text-center"
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        type="submit"
                        className="w-[80%] md:mt-20 py-2 sm:mt-1 border-0 font-bold rounded uppercase bg-[#00BBB4] text-white text-sm"
                      >
                        Verify
                      </button>
                    </form>
                    <p className="mt-2 text-sm">
                      Didn't receive any OTP?{" "}
                      <div>
                        <form onSubmit={handleResentOtp}>
                          <button
                            // onClick={generateRandomCode}
                            className="underline hover:text-[#02625a] text-[#35B0A7] cursor-pointer"
                            // disabled={formattedTime <= 0 ? false : true}
                          >
                            Re-send{" "}
                            {formattedTime <= 0 ? "" : `(${formattedTime}s)`}
                          </button>
                        </form>
                      </div>
                    </p>

                    <p>{message}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-[#35B0A7] text-white text-center w-full py-1 md:py-2 fixed bottom-0 ">
        <span className="text-[10px] md:text-sm px-5 ">
          Copyrights &copy; Project Second Home 2023.  All rights reserved.
        </span>
      </div>
      <Toaster
        containerStyle={{ top: 200, zIndex: "100000" }}
        toastOptions={{ position: "top-center" }}
      ></Toaster>
      {/* <LoadingState /> */}
    </div>
  );
};
export default UserAuthentication;
