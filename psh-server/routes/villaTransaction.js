import { Router } from "express";
import { villaTransactionControllers } from "../controllers/villaTransaction.js";
import auth from "../middleware/auth.js";
import { ENUM_USER_ROLE } from "../enums/user.js";

const villaTransactionRoute =  Router();

villaTransactionRoute.get("/",auth(ENUM_USER_ROLE.RESORT_ADMIN), villaTransactionControllers.getVillaAllTransactions);

villaTransactionRoute.patch("/:id",auth(ENUM_USER_ROLE.RESORT_ADMIN), villaTransactionControllers.updateSingleVillaTransaction);


export default villaTransactionRoute;