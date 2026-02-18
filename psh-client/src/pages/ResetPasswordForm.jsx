import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { CardBody } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { placeModalShow } from "../redux/reducers/smProfileMenuSlice";
import { serverBaseUrl } from "../serverApi/baseUrl";
import toast, { Toaster } from "react-hot-toast";

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // Password Validation
  const passwordCheck = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    if (password.length < 6) {
      setErrorMessage("Password must have at least 6 characters.");
    } else {
      setErrorMessage("");
    }
  };

  // Handle Password Reset
  const handleResetPassword = async () => {
    try {
    

      const response = await axios.patch(
        `${serverBaseUrl}/users/reset_password/${id}`,
        { newPassword },
      );
      if (response.status === 200) {
        toast.success("Password reset successful!");
        // dispatch(placeModalShow(true));
        navigate("/authentication");
      } else {
        toast.error(response.data.message || "Password reset failed.");
      }
    } catch (error) {
      console.error("Error during password reset:", error.message);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errorMessage) {
      handleResetPassword();
    } else {
      toast.error("Please fix the errors before submitting.");
    }
  };

  // Toggle Password Visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="flex justify-center items-center" style={{ height: 600 }}>
        <CardBody className="border mx-auto w-full max-w-[24rem] rounded-lg">
          <div className="flex justify-center">
            <Link to={"/"}>
              <img
                src="https://i.ibb.co/RNJjy5X/Layer-1.png"
                alt="pharmacy"
                className="img-fluid sm:w-[50px] md:w-[70px]"
              />
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <h2 className="text-[20px] font-[600] mb-4 mt-5">
                Reset Password
              </h2>
              <label className="mb-1 label-text" htmlFor="new-password">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="new-password"
                  className="mt-2 border w-full p-2 rounded-md shadow-sm mb-4"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={passwordCheck}
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? (
                    <i className="fa-solid fa-eye"></i>
                  ) : (
                    <i className="fa-solid fa-eye-slash"></i>
                  )}
                </button>
              </div>
              {errorMessage && (
                <p className="text-sm text-red-600">{errorMessage}</p>
              )}
              <button
                type="submit"
                className="w-full mt-4 py-2 font-bold rounded uppercase bg-[#00BBB4] text-white text-sm"
                disabled={!!errorMessage}
              >
                Reset Password
              </button>
            </div>
          </form>
        </CardBody>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default ResetPasswordForm;
