import express from "express";
import {
  CreateRequestRent,
  getRequestRent,
  getMyRequestRent,
} from "../controllers/requestRent.js";

const router = express.Router();

router.post("/", CreateRequestRent);
router.get("/", getRequestRent);
router.route("/:user").get(getMyRequestRent);
export default router;
