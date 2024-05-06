import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { CardBody } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { placeModalShow } from "../redux/reducers/smProfileMenuSlice";
const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const { id, token } = useParams();
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(
        `https://api.psh.com.bd/api/users/reset_password/${id}/${token}`,
        { newPassword }
      );
      if (response.status === 200) {
        dispatch(placeModalShow(true));
      } else {
        console.error("Password reset failed:", response.data.message);
      }
    } catch (error) {
      console.error(
        "An error occurred while processing password reset:",
        error.message
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleResetPassword();
  };
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <div className="flex justify-center items-center" style={{ height: 600 }}>
        <CardBody className=" border mx-auto w-full max-w-[24rem] rounded-lg">
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

            <form onSubmit={handleSubmit}>
              <div className="flex justify-center">
                <div>
                  <div className="form">
                    <h2 className="text-[20px] font-[600] mb-4 mt-5">
                      Reset Password
                    </h2>
                    <label className="mb-1 label-text" htmlFor="Email">
                      New Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="loginInputModal "
                      placeholder="New Password"
                      onChange={(e) => setNewPassword(e.target.value)}
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

                    <button
                      type="submit"
                      className="w-full md:mt-8 py-2 sm:mt-1 border-0 font-bold rounded uppercase bg-[#00BBB4] text-white text-sm"
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </>
        </CardBody>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
