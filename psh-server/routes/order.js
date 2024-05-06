import express from "express";
import {
  createOrder,
  getMyBooking,
  getOrder,
  getSingleOrder,
  updateBooking,
} from "../controllers/order.js";

import uploader from "../middleware/uploader.js";

const router = express.Router();

router.post("/", uploader, createOrder);

router.get("/", getOrder);
router.route("/:user").get(getMyBooking);
router.get("/:id", getSingleOrder);

router.route("/:id").patch(updateBooking);

export default router;
