import express from "express";
import {
  createTeachingForm,
  getAllTeachingData,
} from "../controllers/teachingForm.js";

const router = express.Router();

router.post("/", createTeachingForm);
router.get("/", getAllTeachingData);

export default router;
