import { Router } from "express";
import { villaControllers } from "../controllers/villa.js";

const villaRoute = Router();

villaRoute.post('/', villaControllers.createVilla);
villaRoute.get('/', villaControllers.getAllVilla);
villaRoute.get('/:id', villaControllers.getVillaById);
villaRoute.patch('/:id', villaControllers.updateVilla);



export default villaRoute