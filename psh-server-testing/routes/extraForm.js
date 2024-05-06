import express from "express";
import { createExtraForm, getExtraForm } from "../controllers/extraForm.js";

import uploader from "../middleware/uploader.js";

const router = express.Router();

router.post("/", uploader, createExtraForm);
router.get("/", getExtraForm);
export default router;
