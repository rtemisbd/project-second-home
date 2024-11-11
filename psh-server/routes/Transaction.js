import express from "express";
import {
  getTransaction,
  getUserTransactions,
  deleteTransaction,
  UpdateTransaction,
  getTransactionById,
} from "../controllers/transaction.js";
import auth from "../middleware/auth.js";
import { ENUM_USER_ROLE } from "../enums/user.js";

const router = express.Router();

router.get(
  "/",
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.SUB_ADMIN_1,
    ENUM_USER_ROLE.SUB_ADMIN_2
  ),
  getTransaction
);

router.route("/:id").get(getTransactionById);
router.route("/:email").get(getUserTransactions);
router.route("/:id").delete(deleteTransaction);
router.route("/:id").patch(UpdateTransaction);

export default router;
