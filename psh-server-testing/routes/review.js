import express from "express";
import {
  createReview,
  deleteReview,
  getReview,
  replyToReview,
  updateReview,
} from "../controllers/review.js";

const router = express.Router();

router.post("/", createReview);
router.post("/:id", replyToReview);
router.get("/", getReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;
