import express from "express";
import { getRentRooms } from "../controllers/rentRooms.js";
import { rentRoomController } from "../controllers/rentRooms.controller.js";

const router = express.Router();

// router.get("/", getRentRooms);
router.get("/", rentRoomController.getRentRoomCollection);

export default router;
