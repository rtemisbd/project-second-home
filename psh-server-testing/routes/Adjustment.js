import express from "express";
import {
  getAdjustment,
  updateAdjustment,
  deleteAdjustment,
} from "../controllers/adjustment.js";

const router = express.Router();

router.get("/", getAdjustment);

// router.route("/:email").get(getUserTransactions);
router.route("/:id").delete(deleteAdjustment);
router.route("/:id").patch(updateAdjustment);

export default router;
