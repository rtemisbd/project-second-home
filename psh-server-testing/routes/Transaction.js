import express from "express";
import {
  getTransaction,
  getUserTransactions,
  deleteTransaction,
  UpdateTransaction,
} from "../controllers/transaction.js";

const router = express.Router();

router.get("/", getTransaction);

router.route("/:email").get(getUserTransactions);
router.route("/:id").delete(deleteTransaction);
router.route("/:id").patch(UpdateTransaction);

export default router;
