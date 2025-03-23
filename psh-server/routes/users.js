import express from "express";
import {
  createUser,
  deleteUser,
  getAdmin,
  getJWT,
  getUser,
  getUsers,
  loginAdminUser,
  loginUser,
  resetPassword,
  sendOtp,
  sendOtpForForget,
  updatePassword,
  updateUser,
  updateUserAdmin,
  verifyOtp,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import auth from "../middleware/auth.js";
import { ENUM_USER_ROLE } from "../enums/user.js";

const router = express.Router();

// router.get("/check", verifyToken, (req, res) => {
//   res.send("success");
// });
// router.get("/checkUser/:id", verifyUser, (req, res) => {
//   res.send("success & get access");
// });
// router.get("/checkAdmin/:id", verifyAdmin, (req, res) => {
//   res.send("success admin & get access");
// });
router.post("/", createUser);
router.post("/login", loginUser);
router.post("/login-admin", loginAdminUser);
router.post("/send-otp", sendOtp);
router.post("/send-password-recover-otp", sendOtpForForget);
router.post("/verify-otp", verifyOtp);
router.post("/reset_password/:id/", resetPassword);
router.patch("/:id", updateUser);
router.patch("/admin/:id", updateUserAdmin);
router.put("/:email", updatePassword);
router.delete("/:id", deleteUser);

// router.get("/:id", verifyUser, getUser);
router.get("/", getUsers);
router.get("/:id",auth(ENUM_USER_ROLE.USER),  getUser);
router.get("/jwt", getJWT);
router.get("/admin/:email", getAdmin);

export default router;
