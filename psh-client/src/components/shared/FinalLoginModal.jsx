import React, { useContext, useEffect, useState } from "react";
import { Dialog, CardBody, Input, Typography } from "@material-tailwind/react";
import ReactModal from "react-modal";
import { Switch } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/UserProvider";
// import facebookIcon from "../../assets/img/facebook.svg";
// import googleIcon from "../../assets/img/google.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  placeLoadingShow,
  placeModalShow,
} from "../../redux/reducers/smProfileMenuSlice";
import axios from "axios";
import LoadingState from "../../pages/LoadingState/LoadingState";

const FinalLoginModal = () => {
  const dispatch = useDispatch();

  const isModalShow = useSelector((state) => state?.profileMenu?.isModalShow);
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showOtpPage, setShowOtpPage] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassord] = useState("");
  const [confimrPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [randomCode, setRandomCode] = useState(null);

  const generateRandomCode = () => {
    // Generate a random 6-digit number
    const newRandomCode = Math.floor(10000 + Math.random() * 90000);
    setRandomCode(newRandomCode);
    // const parseToJson = JSON.parse(localStorage.getItem("otp"));
    // if (parseToJson) {
    //   localStorage.removeItem("otp");
    // }
    // localStorage.setItem("otp", JSON.stringify(newRandomCode));
  };

  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [userMessage, setUserMessage] = useState("");

  const [seconds, setSeconds] = useState(120);

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
      navigate(pathname);
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

  const navigate = useNavigate();
  const location = useLocation();
  const [loginError, setLoginError] = useState("");
  const { loginUser, registerUser } = useContext(AuthContext);
  const { pathname } = useLocation();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      await loginUser(email, password);
      // handleClose();
      // navigate(location.state?.from || "/");
      navigate(pathname);
    } catch (error) {
      // handleOpen(true);
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

      await axios.post("https://api.psh.com.bd/api/users/send-otp", otpData);

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
      return toast.error(error.response.data.message);
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

    // try {
    //   await axios.post("https://api.psh.com.bd/api/users/send-otp", otpData);
    //   const intervalId = setInterval(() => {
    //     // Decrease the remaining seconds by 1
    //     setSeconds((prevSeconds) => prevSeconds - 1);
    //   }, 1000);
    //   setTimeout(() => {
    //     clearInterval(intervalId);
    //   }, 60000);
    //   toast.success("Please Check Your Email");
    //   setUserMessage(
    //     "Enter the OTP (One Time Password) that has been sent to your registered Email"
    //   );
    // } catch (error) {
    //   return toast.error(error.response.data.message);
    // }

    // navigate(location.state?.from || "/");
  };

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <ReactModal
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -45%)",
            padding: 0,
            border: 0,
          },
        }}
        // className=" mt-48"
        ariaHideApp={false}
        isOpen={isModalShow}
      >
        <div>
          <CardBody className=" border mx-auto w-full max-w-[24rem] rounded-lg">
            <div
              className="flex justify-end text-3xl text-black"
              onClick={() => dispatch(placeModalShow(false))}
            >
              <i className="fa-solid fa-circle-xmark cursor-pointer"></i>
            </div>
            {showSignIn && (
              <>
                <div className="flex justify-center">
                  <div className="flex items-center gap-x-5">
                    <Link to={"/"}>
                      <img
                        src={"https://i.ibb.co/RNJjy5X/Layer-1.png"}
                        alt="pharmacy"
                        className="img-fluid sm:w-[50px] md:w-[70px]"
                      />
                    </Link>
                  </div>
                </div>
                <div className="ms-4">
                  <h2 className="text-[20px] font-[600]">Login</h2>
                  <p className="my-2">
                    Welcome Back To{" "}
                    {/* <span className="font-bold">Project Second Home</span> */}
                  </p>
                </div>
                <form className=" " onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex justify-center">
                    <div>
                      <div className="form">
                        <label className="mb-1 label-text" htmlFor="Email">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="loginInputModal "
                          placeholder="Username or Email"
                          {...register("email", {
                            required: true,
                          })}
                        />

                        {errors.email && (
                          <p className="text-red-500">{errors.email.message}</p>
                        )}
                        <label className="mb-0 label-text " htmlFor="Email">
                          Password
                        </label>
                        <input
                          type={showPassword ? "text" : "password"}
                          className="loginInputModal  "
                          placeholder="Password"
                          {...register("password", {
                            required: "Password is required",
                            minLength: {
                              value: 6,
                              message: "Password must be 6 characters long",
                            },
                            // pattern: {
                            //   value: /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9]+$/,
                            //   message:
                            //     "Password must contain at least one uppercase letter and can have both uppercase and lowercase letters and numbers",
                            // },
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
                          <p className="text-red-500">
                            {errors.password.message}
                          </p>
                        )}
                      </div>
                      <div className="flex ">
                        <div className="flex items-center ">
                          <div>
                            <Switch />
                          </div>
                          <div className="mt-[-6px]">
                            <span className="ml-2 md:text-[14px] sm:text-[12px]">
                              Remember me
                            </span>
                          </div>
                        </div>

                        <Link
                          to={"/forgot-password"}
                          onClick={() => dispatch(placeModalShow(false))}
                        >
                          <div className="md:ms-16 sm:ms-5">
                            <span className="text-[#35B0A7] md:text-[14px] sm:text-[12px]">
                              Forgot Password
                            </span>
                          </div>
                        </Link>
                      </div>
                      <div className="mt-5">
                        <button
                          className="w-full p-3 border-0 rounded-lg uppercase bg-[#00BBB4] text-white font-bold w-full text-sm"
                          // onClick={() =>
                          //   user === null
                          //     ? setShowModal(false)
                          //     : setShowModal(true)
                          // }
                        >
                          Log In
                        </button>
                      </div>
                      <div className="flex divider px-8">
                        {/* <div>
                          <span className="text-sm">OR SIGN UP WITH</span>
                        </div> */}
                      </div>
                      {/*
                      <div className="flex">
                        <div className="md:w-[280px] sm:w-[140px]">
                          <div
                            className="flex md:px-14 sm:px-3 md:py-5 sm:py-2 rounded-lg cursor-pointer"
                            style={{
                              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                            }}
                          >
                            <div>
                              <img src={facebookIcon} alt="" />
                            </div>
                            <div className="ml-3 ">
                              <span>Facebook</span>
                            </div>
                          </div>
                        </div>
                        <div className="md:w-[280px] sm:w-[140px]">
                          <div
                            className="flex md:px-14 sm:px-3 md:py-5 sm:py-2 rounded-lg cursor-pointer"
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
                      </div> */}
                      <div className="flex mt-2">
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
                            Signup
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </>
            )}
            {showSignUp && (
              <div className="w-full h-full " style={{ width: "310px" }}>
                <div>
                  <div className="flex justify-around">
                    <div>
                      <h2 className="text-[20px] font-[600] ">Sign Up</h2>
                      {/* <p className="my-2">
                        Welcome Back To{" "}

                      </p> */}
                    </div>
                    {/* <Link to={"/"}>
                      <img
                        src={"https://i.ibb.co/RNJjy5X/Layer-1.png"}
                        alt="pharmacy"
                        className="img-fluid sm:w-[50px] md:w-[70px]"
                      />
                    </Link> */}
                  </div>
                  {/* // onSubmit={handleSubmit(onSubmitRegister)} */}
                  <form onSubmit={handleSignUp}>
                    <div>
                      <div className="grid grid-cols-12 ">
                        <div className="flex flex-col items-start col-span-12 sm:col-span-12 lg:col-span-12 md:inline-block form">
                          <label htmlFor="Email" className="mb-1 label-text">
                            Full Name
                          </label>
                          <input
                            type="text"
                            className="loginInputModal"
                            placeholder="Full Name"
                            required
                            onChange={(e) => setFirstName(e.target.value)}
                            defaultValue={firstName}
                          />
                        </div>
                        <div className="flex flex-col items-start col-span-12  sm:col-span-12 lg:col-span-12 md:inline-block form">
                          <label htmlFor="Email" className="mb-1 label-text">
                            Email Address
                          </label>
                          <input
                            type="email"
                            className="loginInputModal"
                            placeholder="Email Address"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            defaultValue={email}
                          />
                        </div>
                        <div className="flex flex-col items-start col-span-12  sm:col-span-12 lg:col-span-12 md:inline-block form">
                          <label
                            htmlFor="phoneNumber"
                            className="mb-1 label-text"
                          >
                            Phone Number
                          </label>
                          <input
                            type="text"
                            className="loginInputModal"
                            placeholder="Phone Number"
                            required
                            onChange={(e) => setPhone(e.target.value)}
                            defaultValue={phone}
                          />
                        </div>
                        <div className=" items-start col-span-12  sm:col-span-12 lg:col-span-12 md:inline-block form">
                          <label htmlFor="Email" className="mb-1 label-text">
                            Password
                          </label>
                          <input
                            type={showPassword ? "text" : "password"}
                            className="loginInputModal"
                            placeholder="Password"
                            required
                            onChange={(e) => setPassord(e.target.value)}
                            defaultValue={password}
                          />
                          <button
                            type="button"
                            onClick={toggleShowPassword}
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
                        </div>
                        <div className="items-start col-span-12  sm:col-span-12 lg:col-span-12 md:inline-block form">
                          <label htmlFor="Email" className="mb-1 label-text">
                            Confirm Password
                          </label>
                          <input
                            type={showPassword ? "text" : "password"}
                            className="loginInputModal"
                            placeholder="Password"
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            defaultValue={confimrPassword}
                          />

                          <button
                            type="button"
                            onClick={toggleShowPassword}
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
                        {/* <div className=" col-span-12 sm:col-span-12 lg:col-span-12 md:inline-block form ">
                          <label htmlFor="Email" className="mb-1 label-text ">
                            Refers Code
                          </label>
                          <input
                            type="text"
                            className="loginInputModal"
                            placeholder="Enter Refer Code"
                            {...register("refferCode", {})}
                          />
                        </div> */}
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
                          </Link>
                          &{" "}
                          <Link to="/privacy" target="_blank">
                            <span className="underline hover:text-[#00bbb4] cursor-pointer">
                              Pivacy Policy
                            </span>
                          </Link>
                        </p>
                      </div>
                    </div>

                    <div onClick={generateRandomCode}>
                      <button className="w-full py-2 sm:mt-1 border-0 font-bold rounded uppercase bg-[#00BBB4] text-white text-sm">
                        Sign Up
                      </button>
                    </div>
                    {/* <div className="flex divider px-8">
                      <div>
                        <span className="text-sm">OR SIGN UP WITH</span>
                      </div>
                    </div>
                    <div className="flex justify-around py-2">
                      <div className="md:w-[280px] sm:w-[140px]">
                        <div
                          className="flex md:px-14 sm:px-3 md:py-5 sm:py-2 rounded-lg cursor-pointer"
                          style={{
                            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                          }}
                        >
                          <div>
                            <img src={facebookIcon} alt="" />
                          </div>
                          <div className="ml-3">
                            <span>Facebook</span>
                          </div>
                        </div>
                      </div>
                      <div className="md:w-[280px] sm:w-[140px] px-3">
                        <div
                          className="flex md:px-14 sm:px-3 md:py-5 sm:py-2 rounded-lg cursor-pointer"
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
                    </div> */}
                    <div className="flex justify-center w-full text-center">
                      <div>
                        <span className="text-sm">Do you have an account?</span>
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
              </div>
            )}

            {showOtpPage && (
              <div
                style={{ width: "310px", height: "481px" }}
                className="text-center"
              >
                <h2 className="text-center text-[30px] mb-5">Verification</h2>
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
                  <div className="flex gap-x-3">
                    {otp.map((digit, index) => (
                      <div>
                        <input
                          key={index}
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
                    className="w-full md:mt-20 py-2 sm:mt-1 border-0 font-bold rounded uppercase bg-[#00BBB4] text-white text-sm"
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
          </CardBody>
        </div>
      </ReactModal>
      <Toaster
        containerStyle={{ top: 200, zIndex: "100000" }}
        toastOptions={{ position: "top-center" }}
      ></Toaster>
      <LoadingState />
    </div>
  );
};

export default FinalLoginModal;
