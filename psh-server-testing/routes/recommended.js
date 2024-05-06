import express from "express";
import {
  CreateRecommended,
  deleteRecommended,
  getRecommended,
  getSingleRecommended,
  updateRecommended,
} from "../controllers/recommended.js";

const router = express.Router();

router.post("/", CreateRecommended);
router.get("/", getRecommended);
router.get("/:id", getSingleRecommended);
router.delete("/:id", deleteRecommended);
router.put("/:id", updateRecommended);

export default router;
