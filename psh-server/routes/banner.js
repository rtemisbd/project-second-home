import express from "express";
import {
  CreateBanner,
  deleteBanner,
  getBanner,
  getSingleBanner,
  updateBanner,
} from "../controllers/banner.js";

const router = express.Router();

router.post("/", CreateBanner);
router.get("/", getBanner);
router.get("/:id", getSingleBanner);
router.delete("/:id", deleteBanner);
router.put("/:id", updateBanner);

export default router;
