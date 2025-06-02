import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../utils/getBaseURL";

// Create the context
export const AuthContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [resort, setResort] = useState(localStorage.getItem("resort") ||null);

  const [token, setToken] = useState( JSON.parse(localStorage.getItem("resort")) || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Store the user and token in localStorage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("resort", JSON.stringify(resort));
  }, [user, token, resort]);

  useEffect(()=>{
    const fetchResort = async()=>{
       try {
        const { data } = await axios.get(
          `${baseUrl}/api/resort/name/${user?.firstName}`
        );
        setResort(data?.data);
      } catch (error) {
        console.error("Failed to fetch resort by name:", error);
      }
    };
     if (user?.firstName) {
    fetchResort();
  }
 
  }, [user?.firstName])

  const loginUser = async (email, password) => {
    try {
      // Make your API call here to login the user using Axios
      const response = await axios.post(`${baseUrl}/api/users/login-admin`, {
        email,
        password,
      });

      if (response.status === 200) {
        const { data } = response;
        
        setUser(data.user);
        setToken(data.token);
        setLoading(false);
      } else {
        throw new Error("Login failed");
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
  };
  const registerUser = async (
    firstName,
    lastName,
    address,
    email,
    phone,
    password,
    role,
    branch
  ) => {
    try {
      const response = await axios.post(`${baseUrl}/api/users`, {
        firstName,
        lastName,
        address,
        email,
        phone,
        password,
        role,
        branch,
      });

      if (response.status === 200) {
        const { data } = response;
        setUser(data.result);
        setToken(data.token);
        setLoading(false);
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      // console.error(error);
    }
  };
  
const logoutUser = () => {
  setUser(null);
  setToken(null);
  setResort(null); // clear resort
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("resort");
};




  // const isAuthenticated = () => {
  //   return token !== null && user !== null;
  // };
  // Provide the user and token to the components
  return (
    <AuthContext.Provider
      value={{ user, token, loginUser, logoutUser, loading, registerUser, resort }}
    >
      {children}
    </AuthContext.Provider>
  );
};
