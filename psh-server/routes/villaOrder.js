import { Router } from "express";
import { villaOrdersControllers } from "../controllers/villaOrder.js";


const villaOrderRoute = Router();

villaOrderRoute.post('/', villaOrdersControllers.createVilaOrderIntoDB);
villaOrderRoute.get('/', villaOrdersControllers.getAllVillaOrders);
villaOrderRoute.get('/:id', villaOrdersControllers.getVillaOrderById);




export default villaOrderRoute