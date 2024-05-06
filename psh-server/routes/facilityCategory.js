import express from "express";
import {
  CreateFacilityCategory,
  deleteFacilityCategory,
  getFacilityCategory,
  getSingleFacilityCategory,
  updateFacilityCategory,
} from "../controllers/facilityCategory.js";

const router = express.Router();

router.post("/", CreateFacilityCategory);
router.get("/", getFacilityCategory);
router.get("/:id", getSingleFacilityCategory);
router.delete("/:id", deleteFacilityCategory);
router.put("/:id", updateFacilityCategory);

export default router;
