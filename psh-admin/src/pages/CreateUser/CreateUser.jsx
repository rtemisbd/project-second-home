import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../../utils/getBaseURL";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import CreateNewOrder from "../../components/Orders/CreateNewOrder";

const CreateUser = () => {
  const { roomId: id } = useParams();
  const [showOtpPage, setShowOtpPage] = useState(false);
  const [createNewOrder, setCreateNewOrder] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");

  const [user, setUser] = useState(null);

  const [randomCode, setRandomCode] = useState(null);

  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [seconds, setSeconds] = useState(120);

  // Generate a random 5-digit number
  const generateRandomCode = () => {
    const newRandomCode = Math.floor(10000 + Math.random() * 90000);
    return newRandomCode;
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

    if (Number(otp.join("")) === randomCode) {
      try {
        const response = await axios.post(`${baseUrl}/api/users`, {
          firstName,
          phone,
        });

        if (response.status === 200) {
          toast.success("Congratulations! Your account has been created.");
          setUser(response?.data?.user);
          setCreateNewOrder(true);
        } else if (response.status === 400) {
          toast.error("User already exists for this phone.");
        } else {
          toast.error("Registration failed");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error(error.response.data.message);
        } else if (error.response && error.response.status === 400) {
          toast.error("User already exists for this phone.");
          setShowOtpPage(false);
          return;
        } else if (error.response && error.response.status === 404) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      }
      setShowOtpPage(false);
    } else {
      return toast.error("Incorrect OTP. Please try again.");
    }
  };

  const handleResentOtp = async (e) => {
    e.preventDefault();
    setSeconds(120);
    const generatedOtTP = generateRandomCode();

    setRandomCode(generatedOtTP);

    // const parseToJson = JSON.parse(localStorage.getItem("otp"));
    const otpData = {
      customerOtp: generatedOtTP,
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
      setShowOtpPage(true);
    } catch (error) {
      // console.log(error);

      return toast.error(error?.response?.data?.message);
    }

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
    if (phone?.length !== 11 || phone?.substring(0, 2) !== "01") {
      return toast.error(
        "This number is wrong! Please enter a valid phone number."
      );
    }
    const generatedOtTP = generateRandomCode();

    setRandomCode(generatedOtTP);

    // const parseToJson = JSON.parse(localStorage.getItem("otp"));
    const otpData = {
      customerOtp: generatedOtTP,
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
      setShowOtpPage(true);
    } catch (error) {
      // console.log(error);

      return toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        {createNewOrder ? (
          <CreateNewOrder id={id} user={user} />
        ) : (
          <section
            className="content customize_list"
            style={{
              // border: "3px solid white",
              background: "white",
              width: "60%",
              margin: "auto",
              padding: "32px 0px",
            }}
          >
            <div className="content customize_list">
              <h2>Create New User</h2>
              <form onSubmit={handleSendOTP}>
                <div
                  style={{ display: "flex", gap: "20px", justifyItems: "end" }}
                >
                  <div>
                    <span>Full Name </span>
                    <br />
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Enter user name "
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
                  <div>
                    <button
                      style={{
                        height: "30px",
                        marginTop: "23px",
                        padding: "0px 6px",
                        borderRadius: "2px",
                      }}
                    >
                      Create User
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {/* otp form */}
            {showOtpPage ? (
              <div
                className="content customize_list mt-5"
                // style={{ marginTop: "28px" }}
              >
                <h2>Verification</h2>
                <p>Enter the OTP (One Time Password)</p>

                <form onSubmit={handleOtp}>
                  <div style={{ display: "flex", gap: "3px" }}>
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
                          maxLength="1"
                          style={{
                            border: "2px solid black",
                            height: "48px",
                            width: "48px",
                            marginRight: "2px",
                            borderRadius: "6px",
                            textAlign: "center",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    type="submit"
                    style={{
                      height: "36px",
                      marginTop: "23px",
                      padding: "0px 12px",
                      borderRadius: "4px",
                    }}
                  >
                    Verify
                  </button>
                </form>
                <p>
                  Didn't receive any OTP?{" "}
                  <div>
                    <form onSubmit={handleResentOtp}>
                      <button
                        style={{
                          background: "none",
                          color: "#35B0A7",
                          padding: "0px",
                          textDecoration: "underline",
                          marginTop: "-8px",
                        }}
                      >
                        Re-send{" "}
                        {formattedTime <= 0 ? "" : `(${formattedTime}s)`}
                      </button>
                    </form>
                  </div>
                </p>
              </div>
            ) : (
              <></>
            )}
            <Toaster
              containerStyle={{ top: 200, zIndex: "100000" }}
              toastOptions={{ position: "top-center" }}
            ></Toaster>
          </section>
        )}
      </div>
    </div>
  );
};

export default CreateUser;
