import express from "express";
import {
  getAllSeats,
  getSeatById,
  updateSingleSeat,
} from "../controllers/seat.js";

const seatsRoute = express.Router();

seatsRoute.get("/", getAllSeats);
seatsRoute.get("/:id", getSeatById);
seatsRoute.patch("/:id", updateSingleSeat);

export default seatsRoute;
