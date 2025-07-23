import Property from "../models/Property.js";
import Seat from "../models/Seat.js";
import WishlistModel from "../models/Wishlist.js";

const addNewWishlist = async (payload) => {
  const existingWishlistItem = await WishlistModel.findOne({
    userPhone: payload.userPhone,
    property: payload.property,
  });

  if (existingWishlistItem) {
    return {
      error: "Wishlist item already exists for this property and user.",
    };
  }

  // Check if the property exists
  if (payload.roomType !== "Shared Room") {
    const property = await Property.findById(payload.property);
    if (!property) {
      return { error: "Property not found." };
    } else {
      payload.propertyModel = "Property";
    }
  } else {
    const property = await Seat.findById(payload.property);
    if (!property) {
      return { error: "Property not found." };
    } else {
      payload.propertyModel = "Seat";
    }
  }

  const newWishlist = await WishlistModel.create(payload);
  return {
    statusCode: 2200,
    success: true,
    data: newWishlist,
    message: "Property added to your wishlist!",
  };
};

const checkPropertyUserWish = async (userPhone, propertyId) => {
  const isAdded = await WishlistModel.findOne({
    userPhone,
    property: propertyId,
  });
  return isAdded;
};

const getMyWishes = async (userPhone) => {
  const result = await WishlistModel.find({ userPhone }).populate({
    path: "property",
    populate: { path: "branch" },
  });

  return result;
};

const deleteWishById = async (id) => {
  const result = await WishlistModel.findByIdAndDelete(id);

  return result;
};

export const wishlistServices = {
  addNewWishlist,
  checkPropertyUserWish,
  deleteWishById,
  getMyWishes,
};
