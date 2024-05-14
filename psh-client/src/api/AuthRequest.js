import axios from "axios";
import { serverBaseUrl } from "../serverApi/baseUrl";

const API = axios.create({
  baseURL: `${serverBaseUrl}`,
});

export const logIn = (formData) => API.post("/auth/login", formData);
export const signUp = (formData) => API.post("/auth/register", formData);
