import express from "express";
import {
  createSubcriptionOrder,
  getSubscriptionHistory,
  getUserSubscriptionHistory,
  updataeSubscriptionHistory,
} from "../controllers/subscriptionOrder.js";

const router = express.Router();

router.post("/", createSubcriptionOrder);

router.get("/:email", getUserSubscriptionHistory);
router.get("/", getSubscriptionHistory);
router.patch("/:id", updataeSubscriptionHistory);

export default router;
