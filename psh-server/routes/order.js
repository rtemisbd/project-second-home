import express from "express";
import {
  createOrder,
  getMyBooking,
  getOrder,
  getSingleOrder,
  updateBooking,
} from "../controllers/order.js";

import uploader from "../middleware/uploader.js";
import auth from "../middleware/auth.js";
import { ENUM_USER_ROLE } from "../enums/user.js";
import bkash_auth from "../middleware/payment.js";

const router = express.Router();

// router.post("/", createOrder);
router.post("/", bkash_auth, createOrder);

router.get(
  "/",
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.SUB_ADMIN_1,
    ENUM_USER_ROLE.SUB_ADMIN_2
  ),
  getOrder
);
// router.get("/", getOrder);
router.route("/:user").get(getMyBooking);
router.get("/:id", getSingleOrder);

router.route("/:id").patch(updateBooking);

export default router;
