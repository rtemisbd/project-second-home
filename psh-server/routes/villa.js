import { Router } from "express";
import { villaControllers } from "../controllers/villa.js";

const villaRoute = Router();

villaRoute.post('/', villaControllers.createVilla)

export default villaRoute