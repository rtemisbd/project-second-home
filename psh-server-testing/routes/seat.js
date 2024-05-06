import express from "express";
import {
  createSeat,
  deleteSeat,
  getSeats,
  getSingleSeat,
  updateSeat,
} from "../controllers/seat.js";

const router = express.Router();

router.post("/", createSeat);
router.get("/", getSeats);
router.get("/:id", getSingleSeat);
router.delete("/:id", deleteSeat);
router.put("/:id", updateSeat);

export default router;
