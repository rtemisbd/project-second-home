import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { baseUrl } from "../../utils/getBaseURL";

const CreateOrder = () => {
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showOtpPage, setShowOtpPage] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");

  const [randomCode, setRandomCode] = useState(null);

  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [userMessage, setUserMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [seconds, setSeconds] = useState(120);

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
    // if (Number(otp.join("")) === randomCode) {
    //   await registerUser(firstName, email, phone, password);

    //   // dispatch(placeLoadingShow(false));
    //   // navigate(location.state?.from || "/");
    //   if (window.history.length > 1) {
    //     navigate(-1);
    //   } else {
    //     navigate("/");
    //   }
    //   // localStorage.removeItem("otp");
    // } else {
    //   return toast.error("Incorrect OTP. Please try again.");
    // }
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

  const handleSendOTP = async (e) => {
    e.preventDefault();
    generateRandomCode();
    setShowOtpPage(true);

    // const parseToJson = JSON.parse(localStorage.getItem("otp"));
    const otpData = {
      customerOtp: randomCode,
      phone: phone,
    };

    try {
      await axios.post(`${baseUrl}/api/users/send-otp`, otpData);

      const intervalId = setInterval(() => {
        // Decrease the remaining seconds by 1
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(intervalId);
      }, 60000);

      toast.success("Please Check Your Phone Number");
    } catch (error) {
      console.log(error);

      return toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <section className="content customize_list">
          <div>
            <h2>Create New User</h2>
            <form onSubmit={handleSendOTP}>
              <div style={{ display: "flex", gap: "20px" }}>
                <div>
                  <span>Full Name </span>
                  <br />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter phone number "
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <span>Phone Number</span>
                  <br />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter phone number "
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-2">
                <button style={{ padding: "2px 16px" }}>Create User</button>
              </div>
            </form>
          </div>
          {/* otp form */}
          {showOtpPage && (
            <div>
              <h2>Verification</h2>
              <p>Enter the OTP (One Time Password)</p>
              <p className="mt-5">{phone}</p>

              <form onSubmit={handleOtp}>
                <div style={{ display: "flex", gap: "3px" }}>
                  {otp.map((digit, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        id={`otp-${index}`}
                        name={`otp-${index}`}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        maxLength="1"
                        style={{
                          border: "2px solid black",
                          height: "50px",
                          width: "50px",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <button type="submit">Verify</button>
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
                      Re-send {formattedTime <= 0 ? "" : `(${formattedTime}s)`}
                    </button>
                  </form>
                </div>
              </p>

              <p>{message}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CreateOrder;
