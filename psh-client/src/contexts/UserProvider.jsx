import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { placeModalShow } from "../redux/reducers/smProfileMenuSlice";
import { serverBaseUrl } from "../serverApi/baseUrl";
export const AuthContext = createContext();

export const UserProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  }, [user, token]);

  const loginUser = async (phone, password) => {
    try {
      const response = await axios.post(`${serverBaseUrl}/users/login`, {
        phone,
        password,
      });

      if (response.status === 200) {
        toast.success("Login Success");
        const { data } = response;
        setUser(data?.user);
        setToken(data?.token);
        setLoading(false);
        setTimeout(() => {
          dispatch(placeModalShow(false));
        }, 1000);
      } else {
        throw new Error("Invalid phone or password");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data.message;

        toast.error(errorMessage);
      } else if (error.response && error.response.status === 404) {
        const errorMessage = error.response.data.message;

        toast.error(errorMessage);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
    return user;
  };

  const registerUser = async (
    firstName,
    email,
    phone,
    password
    // refferCode,
    // photos,
    // role
  ) => {
    try {
      const response = await axios.post(`${serverBaseUrl}/users`, {
        firstName,
        email,
        phone,
        password,
        // refferCode,
        // photos,
      });
      console.log(response);

      if (response.status === 200) {
        toast.success("Congratulations! Your account has been created.");
        const { data } = response;

        setUser(data.user);
        setToken(data.token);

        setLoading(false);
        setTimeout(() => {
          dispatch(placeModalShow(false));
        }, 1000);
      } else if (response.status === 400) {
        setErrorMessage("User already exists for this phone or email");
      } else {
        setErrorMessage("Registration failed");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.message);
      } else if (error.response && error.response.status === 400) {
        setErrorMessage("User already exists for this phone or email");
      } else if (error.response && error.response.status === 404) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
    return { user, errorMessage };
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loginUser, registerUser, logoutUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
