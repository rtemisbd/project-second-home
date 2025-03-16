import { Router } from "express";
import { districtControllers } from "../controllers/district.js";


const districtRoute = Router();

districtRoute.post('/', districtControllers.createDistrict);

export default districtRoute;