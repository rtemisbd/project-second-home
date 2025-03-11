import { Router } from "express";
import { resortControllers } from "../controllers/resort.js";

const resortRoute = Router();

resortRoute.post('/', resortControllers.createResort);


export default resortRoute;