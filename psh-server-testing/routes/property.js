import express from "express";
import {
  CreatePropertys,
  deletePropertys,
  featuredRoom,
  getBookingReport,
  getPropertys,
  getRecommendedPropertys,
  getSinglePropertys,
  updatePropertys,
} from "../controllers/property.js";

const router = express.Router();

router.post("/", CreatePropertys);
router.get("/", getPropertys);
router.get("/booking-report", getBookingReport);
router.patch("/featured", featuredRoom);
router.get("/:id", getSinglePropertys);
router.delete("/:id", deletePropertys);
router.put("/:id", updatePropertys);

router.get("/properties/recommended", getRecommendedPropertys);

export default router;
