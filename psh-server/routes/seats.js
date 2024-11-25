import express from "express";
import { getAllSeats, getSeatById } from "../controllers/seat.js";

const seatsRoute = express.Router();

seatsRoute.get("/", getAllSeats);
seatsRoute.get("/:id", getSeatById);

export default seatsRoute;
