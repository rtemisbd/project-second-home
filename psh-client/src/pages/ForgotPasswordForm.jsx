import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CardBody } from "@material-tailwind/react";
import toast, { Toaster } from "react-hot-toast";
import { serverBaseUrl } from "../serverApi/baseUrl";
import OtpForm from "../components/shared/OtpForm";
import { useDispatch } from "react-redux";
import { placeLoadingShow } from "../redux/reducers/smProfileMenuSlice";

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState("");
  const [userMessage, setUserMessage] = useState("");

  const [showForgotForm, setShowForgotForm] = useState(true);
  const [showOtpPage, setShowOtpPage] = useState(false);

  const [seconds, setSeconds] = useState(120);
  const [otp, setOtp] = useState(["", "", "", "", ""]);

  const navigate = useNavigate();

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

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (phone?.length !== 11 || phone?.substring(0, 2) !== "01") {
      return toast.error("Sorry! you gave me wrong phone number");
    }
    try {
      dispatch(placeLoadingShow(true));

      await axios.post(`${serverBaseUrl}/users/send-password-recover-otp`, {
        phone,
      });

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
      setShowForgotForm(false);
      setShowOtpPage(true);
    } catch (error) {
      dispatch(placeLoadingShow(false));
      console.log(error);

      return toast.error(error?.response?.data?.message);
    }
  };

  const handleResentOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${serverBaseUrl}/users/send-password-recover-otp`, {
        phone,
      });
      toast.success("OTP sent to your phone.");
      setSeconds(120);
      setShowForgotForm(false);
      setShowOtpPage(true);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error sending OTP.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const data = { phone, otp };
    try {
      dispatch(placeLoadingShow(true));

      const response = await axios.post(
        `${serverBaseUrl}/users/verify-otp`,
        data
      );
      const verifiedUser = response.data.verifiedUser;

      if (verifiedUser) {
        dispatch(placeLoadingShow(false));
        navigate(`/reset_password/${verifiedUser._id}`);
      }
    } catch (error) {
      console.log(error);

      dispatch(placeLoadingShow(false));
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div>
      <div
        className="flex justify-center items-center mx-4"
        style={{ height: 600 }}
      >
        <CardBody className=" border mx-auto w-full max-w-[24rem] rounded-lg">
          <>
            <div className="flex justify-center">
              <div className="flex items-center gap-x-5">
                <Link to={"/"}>
                  <img
                    src={"https://i.ibb.co/RNJjy5X/Layer-1.png"}
                    alt="pharmacy"
                    className="img-fluid sm:w-[44px] md:w-[60px]"
                  />
                </Link>
              </div>
            </div>

            {showForgotForm && (
              <form onSubmit={handleSendOtp}>
                <div className="flex justify-center">
                  <div>
                    <div className="form">
                      <h2 className="text-[20px] font-[600] mb-4 mt-5">
                        Forgot Password
                      </h2>
                      <span>Phone Number</span>
                      <br />
                      <input
                        type="text"
                        className="mt-2 border w-full p-2 rounded-md shadow-sm mb-4"
                        placeholder="Enter your phone number"
                        onChange={(e) => setPhone(e.target.value)}
                      />

                      <button
                        type="submit"
                        className="w-full md:mt-8 py-2 sm:mt-1 border-0 font-bold rounded uppercase bg-[#00BBB4] text-white text-sm"
                      >
                        Send OTP
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
            {showOtpPage && (
              <div className="text-center">
                <h2 className="text-center text-[30px] my-3">Verification</h2>
                <p className="text-sm text-[#9b9a98] ">{userMessage}</p>
                <p className="mt-5">{phone}</p>
                <p
                  className="underline hover:text-[#02625a] text-[#35B0A7] cursor-pointer"
                  onClick={() => {
                    setShowOtpPage(false);
                    setShowForgotForm(true);
                  }}
                >
                  Change Number
                </p>
                <form onSubmit={handleVerifyOtp} className="mt-8 ">
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
                          className="border-2 border-[black] w-[36px] h-[36px] md:w-[50px] md:h-[50px] rounded text-center mb-4"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="w-[80%] mt-4 md:mt-8 py-2 sm:mt-1 border-0 font-bold rounded uppercase bg-[#00BBB4] text-white text-sm"
                  >
                    Verify
                  </button>
                </form>
                <p className="mt-2 text-sm">
                  Didn't receive any OTP?{" "}
                  <div>
                    <form onSubmit={handleResentOtp}>
                      <button className="underline hover:text-[#02625a] text-[#35B0A7] cursor-pointer">
                        Re-send{" "}
                        {formattedTime <= 0 ? "" : `(${formattedTime}s)`}
                      </button>
                    </form>
                  </div>
                </p>

                <p className="text-sm">{userMessage}</p>
              </div>
            )}
          </>
        </CardBody>
      </div>
      <Toaster
        containerStyle={{ top: 200 }}
        toastOptions={{ position: "top-center" }}
      ></Toaster>
    </div>
  );
};

export default ForgotPasswordForm;
