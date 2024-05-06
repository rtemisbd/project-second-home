import express from "express";
import {
  CreateLeaseProperty,
  getLeaseProperty,
  getMyLeaseProperty,
} from "../controllers/leaseProperty.js";

const router = express.Router();

router.post("/", CreateLeaseProperty);
router.get("/", getLeaseProperty);
router.route("/:user").get(getMyLeaseProperty);
export default router;
