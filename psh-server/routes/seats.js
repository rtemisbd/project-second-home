import express from "express";
import { getAllSeats } from "../controllers/seat.js";

const seatsRoute = express.Router();

seatsRoute.get("/", getAllSeats);

export default seatsRoute;
