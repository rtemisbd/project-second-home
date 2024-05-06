import express from "express";
import {
  createFacility,
  deleteFacility,
  getFacility,
  getSingleFacility,
  updateFacility,
} from "../controllers/facility.js";

const router = express.Router();

router.post("/", createFacility);
router.get("/", getFacility);
router.get("/:id", getSingleFacility);
router.delete("/:id", deleteFacility);
router.put("/:id", updateFacility);

export default router;
