import Property from "../models/Property.js";
import Seat from "../models/Seat.js";
import Villa from "../models/Villa.js";
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
  if (payload.roomType === "Shared Room") {
    const property = await Seat.findById(payload.property);
    if (!property) {
      return { error: "Property not found." };
    } else {
      payload.propertyModel = "Seat";
    }
  } else if (payload.roomType === "Villa") {
    const property = await Villa.findById(payload.property);
    if (!property) {
      return { error: "Property not found." };
    } else {
      payload.propertyModel = "Villa";
    }
  } else {
    const property = await Property.findById(payload.property);
    if (!property) {
      return { error: "Property not found." };
    } else {
      payload.propertyModel = "Property";
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
  const pipeline = [
    { $match: { userPhone } },

    // Lookup based on propertyModel
    {
      $lookup: {
        from: "properties", // default collection (will filter by propertyModel)
        let: { propId: "$property", model: "$propertyModel" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$_id", "$$propId"] },
                  { $eq: ["$$model", "Property"] }, // only match if model=Property
                ],
              },
            },
          },
          { $project: { name: 1, branch: 1, photos: 1, category: 1 } },
          {
            $lookup: {
              from: "branches",
              localField: "branch",
              foreignField: "_id",
              as: "branch",
            },
          },
          { $unwind: { path: "$branch", preserveNullAndEmptyArrays: true } },
          {
            $project: {
              name: 1,
              photos: 1,
              category: 1,
              "branch._id": 1,
              "branch.name": 1,
            },
          },
        ],
        as: "propertyData",
      },
    },

    {
      $lookup: {
        from: "seats",
        let: { propId: "$property", model: "$propertyModel" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$_id", "$$propId"] },
                  { $eq: ["$$model", "Seat"] },
                ],
              },
            },
          },
          { $project: { name: 1, branch: 1, photos: 1, category: 1 } },
          {
            $lookup: {
              from: "branches",
              localField: "branch",
              foreignField: "_id",
              as: "branch",
            },
          },
          { $unwind: { path: "$branch", preserveNullAndEmptyArrays: true } },
          {
            $project: {
              name: 1,
              photos: 1,
              category: 1,
              "branch._id": 1,
              "branch.name": 1,
            },
          },
        ],
        as: "seatData",
      },
    },

    {
      $lookup: {
        from: "villas",
        let: { propId: "$property", model: "$propertyModel" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$_id", "$$propId"] },
                  { $eq: ["$$model", "Villa"] },
                ],
              },
            },
          },
          { $project: { title: 1, villaNumber: 1, media: 1, resortId: 1 } },
          {
            $lookup: {
              from: "resorts",
              localField: "resortId",
              foreignField: "_id",
              as: "resort",
            },
          },
          { $unwind: { path: "$resort", preserveNullAndEmptyArrays: true } },
          {
            $project: {
              title: 1,
              villaNumber: 1,
              media: 1,
              "resort._id": 1,
              "resort.name": 1,
            },
          },
        ],
        as: "villaData",
      },
    },

    // Merge all possible results into one field
    {
      $addFields: {
        propertyData: {
          $cond: [
            { $eq: ["$propertyModel", "Property"] },
            { $arrayElemAt: ["$propertyData", 0] },
            {
              $cond: [
                { $eq: ["$propertyModel", "Seat"] },
                { $arrayElemAt: ["$seatData", 0] },
                { $arrayElemAt: ["$villaData", 0] },
              ],
            },
          ],
        },
      },
    },

    // Cleanup temporary arrays
    { $project: { seatData: 0, villaData: 0 } },

    // Sort newest first
    { $sort: { createdAt: -1 } },
  ];

  const result = await WishlistModel.aggregate(pipeline);
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
