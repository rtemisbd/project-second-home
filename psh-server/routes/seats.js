import express from "express";
import {
  createSeat,
  getAllSeats,
  getSeatById,
  updateSingleSeat,
} from "../controllers/seat.js";

const seatsRoute = express.Router();

seatsRoute.post("/", createSeat);
seatsRoute.get("/", getAllSeats);
seatsRoute.get("/:id", getSeatById);
seatsRoute.patch("/:id", updateSingleSeat);

export default seatsRoute;
