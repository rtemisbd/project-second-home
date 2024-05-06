import express from "express";
import {
  CreateRequestVisit,
  getRequestVisit,
  getMyRequestVisit,
} from "../controllers/requestVisit.js";

const router = express.Router();

router.post("/", CreateRequestVisit);
router.get("/", getRequestVisit);
router.route("/:user").get(getMyRequestVisit);
export default router;
