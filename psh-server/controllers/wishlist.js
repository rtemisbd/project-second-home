import Property from "../models/Property.js";
import WishlistModel from "../models/Wishlist.js";

export const createWishlist = async (req, res, next) => {
  try {
    const { userName, propertyId, email } = req.body;

    // Check if there's an existing wishlist item for this user and property
    const existingWishlistItem = await WishlistModel.findOne({
      userName,
      property: propertyId,
    });

    if (existingWishlistItem) {
      return res.status(400).json({
        error: "Wishlist item already exists for this property and user.",
      });
    }

    // Check if the property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Create a new wishlist item
    const wishlistItem = new WishlistModel({
      userName,
      property: property._id,
      email,
    });

    // Save the new wishlist item
    await wishlistItem.save();

    res.status(201).json(wishlistItem);
  } catch (err) {
    next(err);
  }
};

export const getWishlist = async (req, res, next) => {
  try {
    const wishlist = await WishlistModel.find({}).populate("property");
    res.status(200).json(wishlist);
  } catch (err) {
    next(err);
  }
};
export const getMyWishlist = async (req, res, next) => {
  try {
    const user = req.params.user;
    const order = await WishlistModel.find({ email: user }).populate(
      "property"
    );
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};
export const checkMyWishlist = async (req, res, next) => {
  try {
    const { propertyId, userName } = req.query;
    const isInWishlist = await WishlistModel.exists({
      property: propertyId,
      userName,
    });

    res.json({ isInWishlist });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteWishlist = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const wishlist = await WishlistModel.findById(reviewId);
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }
    await WishlistModel.findByIdAndDelete(reviewId);

    res.status(200).json({ message: "Wishlist deleted successfully" });
  } catch (err) {
    next(err);
  }
};
