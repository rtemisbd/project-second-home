import express from "express";
import {
  checkMyWishlist,
  createWishlist,
  deleteWishlist,
  getMyWishlist,
  getWishlist,
} from "../controllers/wishlist.js";

const router = express.Router();

router.post("/", createWishlist);
router.get("/", getWishlist);
router.get("/wishlist/check", checkMyWishlist);
router.delete("/:id", deleteWishlist);
router.route("/:user").get(getMyWishlist);
export default router;
