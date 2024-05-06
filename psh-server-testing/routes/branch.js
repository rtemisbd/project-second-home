import express from "express";
import {
  CreateBranch,
  deleteBranch,
  getBranch,
  getSingleBranch,
  updateBranch,
} from "../controllers/branch.js";

const router = express.Router();

router.post("/", CreateBranch);
router.get("/", getBranch);
router.get("/:id", getSingleBranch);
router.delete("/:id", deleteBranch);
router.put("/:id", updateBranch);

export default router;
