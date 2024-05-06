import express from "express";
import {
  createCommonFacility,
  deleteCommonFacility,
  getCommonFacility,
  getSingleCommonFacility,
  updateCommonFacility,
} from "../controllers/commonFacility.js";

const router = express.Router();

router.post("/", createCommonFacility);
router.get("/", getCommonFacility);
router.get("/:id", getSingleCommonFacility);
router.delete("/:id", deleteCommonFacility);
router.put("/:id", updateCommonFacility);

export default router;
