import { useState } from "react";

const OtpForm = ({
  phone,
  userMessage,
  randomCode,
  fromSignUp,
  fromForgotPassword,
}) => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);

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

  // for forgot password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (Number(otp.join("")) === randomCode) {
      // await registerUser(firstName, email, phone, password);

      navigate(location.state?.from || "/");
    } else {
      return toast.error("Incorrect OTP. Please try again.");
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-center text-[30px] my-5">Verification</h2>
      <p className="text-sm text-[#9b9a98] ">{userMessage}</p>
      <p className="mt-5">{phone}</p>
      <p
        className="underline hover:text-[#02625a] text-[#35B0A7] cursor-pointer"
        onClick={() => {}}
      >
        Change Number
      </p>
      <form
        onSubmit={fromForgotPassword ? handleForgotPassword : handleSignUp}
        className="mt-20 "
      >
        <div className="flex justify-center gap-x-3">
          {otp.map((digit, index) => (
            <div key={index}>
              <input
                type="text"
                id={`otp-${index}`}
                name={`otp-${index}`}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
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
            <button className="underline hover:text-[#02625a] text-[#35B0A7] cursor-pointer">
              Re-send {formattedTime <= 0 ? "" : `(${formattedTime}s)`}
            </button>
          </form>
        </div>
      </p>

      <p>{message}</p>
    </div>
  );
};

export default OtpForm;
