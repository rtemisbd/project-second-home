import { Router } from "express";
import { villaOrdersControllers } from "../controllers/villaOrder.js";
import auth from "../middleware/auth.js";
import { ENUM_USER_ROLE } from "../enums/user.js";


const villaOrderRoute = Router();

villaOrderRoute.post('/', villaOrdersControllers.createVilaOrderIntoDB);
villaOrderRoute.get('/', auth(ENUM_USER_ROLE.RESORT_ADMIN), villaOrdersControllers.getAllVillaOrders);
villaOrderRoute.get('/:id', villaOrdersControllers.getVillaOrderById);




export default villaOrderRoute