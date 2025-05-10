import { Router } from "express";
import { villaOrdersControllers } from "../controllers/villaOrder.js";


const villaOrderRoute = Router();

villaOrderRoute.post('/', villaOrdersControllers.createVilaOrderIntoDB);



export default villaOrderRoute