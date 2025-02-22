import express from "express";
import {
  createOrder,
  getMyBooking,
  getOrder,
  getSingleOrder,
  getUserOrders,
  orderCorrection,
  updateBooking,
  updateBookingOrder,
} from "../controllers/order.js";

import uploader from "../middleware/uploader.js";
import auth from "../middleware/auth.js";
import { ENUM_USER_ROLE } from "../enums/user.js";
import bkash_auth from "../middleware/payment.js";

const router = express.Router();

// router.post("/", createOrder);
// router.get("/order-correction", orderCorrection);
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
router.get("/:user", getUserOrders);
// router.route("/:user").get(getMyBooking);
router.get("/:id", getSingleOrder);

// router.route("/:id").patch(updateBooking);
router.route("/:id").patch(updateBookingOrder);

export default router;
