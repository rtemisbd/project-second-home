
import { Router } from "express";
import { loginUser, loginUserWithJWTAuthentication, registerUser } from "../controllers/auth.js";
const authRoute = Router();

authRoute.post("/register", registerUser);
// authRoute.post("/login", loginUser); 
authRoute.post("/login", loginUserWithJWTAuthentication); 

export default authRoute;
