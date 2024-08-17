import express from "express";
import { createTeachingForm } from "../controllers/teachingForm.js";

const router = express.Router();

router.post("/", createTeachingForm);

export default router;
