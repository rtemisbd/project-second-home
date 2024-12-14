import express from "express";
import { PaymentController } from "../controllers/payment.js";
import bkash_auth from "../middleware/payment.js";

const router = express.Router();
router.post("/create", bkash_auth, PaymentController.payment_create);

router.get("/callback", bkash_auth, PaymentController.call_back);

router.get("/callback", bkash_auth, PaymentController.call_back);

router.get("/refund/:trxID", bkash_auth, PaymentController.refund);

export default router;
