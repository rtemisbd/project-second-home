import express from "express";
import {
  createIssue,
  deleteIssue,
  getIssue,
  updateIssue,
} from "../controllers/issue.js";

const router = express.Router();

router.post("/", createIssue);
router.get("/", getIssue);
router.delete("/:id", deleteIssue);
router.put("/:id", updateIssue);

export default router;
