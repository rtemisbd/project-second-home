import express from "express";
import {
  CreateDynamic,
  deleteDynamic,
  getDynamic,
  getSingleDynamic,
  updateDynamic,
} from "../controllers/dynamic.js";

const router = express.Router();

router.post("/", CreateDynamic);
router.get("/", getDynamic);
router.get("/:id", getSingleDynamic);
router.delete("/:id", deleteDynamic);
router.put("/:id", updateDynamic);

export default router;
