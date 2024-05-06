import express from "express";
import {
  CreateEvent,
  deleteEvent,
  getEvent,
  getSingleEvent,
  updateEvent,
} from "../controllers/event.js";

const router = express.Router();

router.post("/", CreateEvent);
router.get("/", getEvent);
router.get("/:id", getSingleEvent);
router.delete("/:id", deleteEvent);
router.put("/:id", updateEvent);

export default router;
