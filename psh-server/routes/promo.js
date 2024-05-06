import express from "express";
import {
  CreatePromo,
  deletePromo,
  getPromo,
  getSinglePromo,
  updatePromo,
} from "../controllers/promo.js";

const router = express.Router();

router.post("/", CreatePromo);
router.get("/", getPromo);
router.get("/:id", getSinglePromo);
router.delete("/:id", deletePromo);
router.put("/:id", updatePromo);

export default router;
