import express from "express";
import {
  getLeaseProperty,
  getMyLeaseProperty,
  leasePropertyControllers,
} from "../controllers/leaseProperty.js";

const router = express.Router();

router.post("/", leasePropertyControllers.createLeaseProperty);
router.get("/", getLeaseProperty);
router.route("/:user").get(getMyLeaseProperty);
export default router;
