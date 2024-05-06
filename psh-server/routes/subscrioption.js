import express from "express";
import {
  createSubcription,
  getSubscripion,
  updateSubscription,
} from "../controllers/subscription.js";

const router = express.Router();

router.post("/", createSubcription);

router.get("/", getSubscripion);
router.patch("/:id", updateSubscription);

export default router;
