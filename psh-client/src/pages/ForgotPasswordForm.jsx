import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CardBody } from "@material-tailwind/react";
import toast, { Toaster } from "react-hot-toast";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    try {
      await axios.post("https://api.psh.com.bd/api/users/forgot-password", {
        email,
      });
      toast.success("Please Check Your Email");
    } catch (error) {
      return toast.error("something went wrong");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleForgotPassword();
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
                      Forgot Password
                    </h2>
                    <label className="mb-1 label-text" htmlFor="Email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="loginInputModal "
                      placeholder="Username or Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <button
                      type="submit"
                      className="w-full md:mt-8 py-2 sm:mt-1 border-0 font-bold rounded uppercase bg-[#00BBB4] text-white text-sm"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              </div>
            </form>
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
