import express from "express";
import {
  createWishlist,
  deleteWishlist,
  getMyWishlist,
  getUserPropertyWishlistAdded,
} from "../controllers/wishlist.js";

const router = express.Router();

router.post("/", createWishlist);
router.get("/user/:userPhone", getMyWishlist);
router.get("/:userPhone/:propertyId", getUserPropertyWishlistAdded);
router.delete("/:id", deleteWishlist);

export default router;
