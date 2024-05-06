import express from "express";
import {
  CreateTerms,
  deleteTerms,
  getTerms,
  getSingleTerms,
  updateTerms,
} from "../controllers/terms.js";

const router = express.Router();

router.post("/", CreateTerms);
router.get("/", getTerms);
router.get("/:id", getSingleTerms);
router.delete("/:id", deleteTerms);
router.put("/:id", updateTerms);

export default router;
