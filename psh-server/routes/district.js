import { Router } from "express";
import { districtControllers } from "../controllers/district.js";


const districtRoute = Router();

districtRoute.post('/', districtControllers.createDistrict);
districtRoute.get('/', districtControllers.getAllDistrict);

export default districtRoute;