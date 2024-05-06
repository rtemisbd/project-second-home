import express from "express";
import {
  CreateCategory,
  deleteCategory,
  getCategory,
  getSingleCategory,
  updateCategory,
} from "../controllers/category.js";

const router = express.Router();

router.post("/", CreateCategory);
router.get("/", getCategory);
router.get("/:id", getSingleCategory);
router.delete("/:id", deleteCategory);
router.put("/:id", updateCategory);

export default router;
