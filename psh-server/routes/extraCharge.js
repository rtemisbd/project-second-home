import express from "express";
import {
  CreateExtraCharge,
  getExtraCharge,
  updateExtraCharge,
} from "../controllers/extraCharge.js";

const router = express.Router();

router.post("/", CreateExtraCharge);
router.get("/", getExtraCharge);
router.put("/:id", updateExtraCharge);

export default router;
