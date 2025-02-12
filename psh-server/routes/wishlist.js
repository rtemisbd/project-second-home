import express from "express";
import {
  checkMyWishlist,
  createWishlist,
  deleteWishlist,
  getMyWishlist,
  getUserPropertyWishlistAdded,
  getWishlist,
} from "../controllers/wishlist.js";

const router = express.Router();

router.post("/", createWishlist);
router.get("/user/:userPhone", getMyWishlist);
router.get("/:userPhone/:propertyId", getUserPropertyWishlistAdded);
router.delete("/:id", deleteWishlist);

router.get("/", getWishlist);
router.get("/wishlist/check", checkMyWishlist);

export default router;
