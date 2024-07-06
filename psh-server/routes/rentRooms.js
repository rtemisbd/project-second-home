import express from "express";
import { getRentRooms } from "../controllers/rentRooms.js";

const router = express.Router();

router.get("/", getRentRooms);

export default router;
