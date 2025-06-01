import { Router } from "express";
import { resortControllers } from "../controllers/resort.js";

const resortRoute = Router();

resortRoute.post('/', resortControllers.createResort);
resortRoute.get('/', resortControllers.getAllResorts);
resortRoute.get('/name/:name', resortControllers.getResortByName);
resortRoute.get('/:id', resortControllers.getSingleResortById);


export default resortRoute;