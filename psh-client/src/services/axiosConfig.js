import axios from "axios";

// Access the environment variable
// const baseURL = `${import.meta.env.VITE_API_URL}/api`;

// // Set the default base URL for Axios
// axios.defaults.baseURL = baseURL;

// // Export the configured instance
// export const apiClient = axios;

// Create an Axios instance with a specific base URL
export const apiClient = axios.create({
  baseURL: `/api`,
});
