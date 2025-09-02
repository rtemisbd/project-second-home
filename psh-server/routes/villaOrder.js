import { Router } from "express";
import { villaOrdersControllers } from "../controllers/villaOrder.js";
import auth from "../middleware/auth.js";
import { ENUM_USER_ROLE } from "../enums/user.js";

const villaOrderRoute = Router();

villaOrderRoute.post("/", villaOrdersControllers.createVilaOrderIntoDB);
villaOrderRoute.get(
  "/",
  auth(ENUM_USER_ROLE.RESORT_ADMIN),
  villaOrdersControllers.getAllVillaOrders
);
villaOrderRoute.get("/user/:user", villaOrdersControllers.getUserVillaOrders);
villaOrderRoute.get("/:id", villaOrdersControllers.getVillaOrderById);
villaOrderRoute.patch(
  "/:id",
  auth(ENUM_USER_ROLE.RESORT_ADMIN),
  villaOrdersControllers.updateSingleVillaOrder
);

export default villaOrderRoute;
