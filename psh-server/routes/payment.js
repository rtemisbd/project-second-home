import express from "express";
import { PaymentController } from "../controllers/payment.js";
import bkash_auth from "../middleware/payment.js";
import { PaymentController2 } from "../controllers/payment2.js";

const router = express.Router();
router.post("/create", bkash_auth, PaymentController2.paymentCreate);

router.get("/callback", bkash_auth, PaymentController2.callBack);

// router.get("/refund/:trxID", bkash_auth, PaymentController2.refund);

export default router;
