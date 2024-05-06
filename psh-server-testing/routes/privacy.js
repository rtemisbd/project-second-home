import express from "express";
import {
  CreatePrivacy,
  deletePrivacy,
  getPrivacy,
  getSinglePrivacy,
  updatePrivacy,
} from "../controllers/privacy.js";

const router = express.Router();

router.post("/", CreatePrivacy);
router.get("/", getPrivacy);
router.get("/:id", getSinglePrivacy);
router.delete("/:id", deletePrivacy);
router.put("/:id", updatePrivacy);

export default router;
