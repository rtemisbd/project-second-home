import { Router } from "express";
import { villaRentDateController } from "../controllers/villaRentDates.js";

const villaRentDateRoute = Router();

villaRentDateRoute.get('/', villaRentDateController.getVillaRentDates);

export default villaRentDateRoute;