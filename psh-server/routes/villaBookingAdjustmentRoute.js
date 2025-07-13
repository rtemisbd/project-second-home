import { Router } from "express";
import { villaBookingAdjustmentController } from "../controllers/villaBookingAdjustment.js";
import auth from "../middleware/auth.js";
import { ENUM_USER_ROLE } from "../enums/user.js";

const villaBookingAdjustmentRoute = Router();

villaBookingAdjustmentRoute.post(
  "/",auth(ENUM_USER_ROLE.RESORT_ADMIN),
  villaBookingAdjustmentController.createNewAdjustment
);

export default villaBookingAdjustmentRoute;
