import { Router } from "express";
import { resortControllers } from "../controllers/resort.js";

const resortRoute = Router();

resortRoute.post('/', resortControllers.createResort);
resortRoute.get('/', resortControllers.getAllResorts);
resortRoute.get('/name/:name', resortControllers.getResortByName);
resortRoute.get('/:id', resortControllers.getSingleResortById);
resortRoute.patch('/:id', resortControllers.updateResort);




export default resortRoute;