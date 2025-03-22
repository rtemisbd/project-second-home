import { Router } from "express";
import { villaControllers } from "../controllers/villa.js";

const villaRoute = Router();

villaRoute.post('/', villaControllers.createVilla);
villaRoute.get('/', villaControllers.getAllVilla);



export default villaRoute