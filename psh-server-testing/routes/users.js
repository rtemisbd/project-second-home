import express from "express";
import {
  createUser,
  deleteUser,
  forgotPassword,
  getAdmin,
  getJWT,
  getUser,
  getUsers,
  loginUser,
  resetPassword,
  sendOtp,
  updatePassword,
  updateUser,
  updateUserAdmin,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

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
router.post("/send-otp", sendOtp);
router.post("/forgot-password", forgotPassword);
router.post("/reset_password/:id/:token", resetPassword);
router.patch("/:id", updateUser);
router.patch("/admin/:id", updateUserAdmin);
router.put("/:email", updatePassword);
router.delete("/:id", deleteUser);

// router.get("/:id", verifyUser, getUser);
// router.get("/", getUsers);
router.get("/", getUsers);
router.get("/:id", getUser);
router.get("/jwt", getJWT);
router.get("/admin/:email", getAdmin);

export default router;
