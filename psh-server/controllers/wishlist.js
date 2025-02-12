import Property from "../models/Property.js";
import WishlistModel from "../models/Wishlist.js";
import { wishlistServices } from "../services/wishlist.service.js";
import catchAsync from "../shared/cathAsync.js";
import sendResponse from "../shared/sendResponse.js";

export const createWishlist = catchAsync(async (req, res, next) => {
  const { userName, propertyId, userPhone, roomType } = req.body;
  const payload = {
    userName,
    userPhone,
    roomType,
    property: propertyId,
  };

  const result = await wishlistServices.addNewWishlist(payload);

  // sendResponse(res, {
  //   statusCode: result?.statusCode,
  //   success: result?.success,
  //   data: result?.data,
  //   message: result?.message,
  // });
  return res.status(200).json(result);
});

export const getUserPropertyWishlistAdded = async (req, res, next) => {
  const { userPhone, propertyId } = req.params;
  const result = await wishlistServices.checkPropertyUserWish(
    userPhone,
    propertyId
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
};

export const getWishlist = async (req, res, next) => {
  try {
    const wishlist = await WishlistModel.find({}).populate("property");
    res.status(200).json(wishlist);
  } catch (err) {
    next(err);
  }
};

export const getMyWishlist = catchAsync(async (req, res, next) => {
  const result = await wishlistServices.getMyWishes(req.params.userPhone);

  return res.status(200).json(result);
});

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

export const deleteWishlist = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const result = await wishlistServices.deleteWishById(id);

  return res.status(200).json(result);
});
