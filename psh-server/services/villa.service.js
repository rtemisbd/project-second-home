import mongoose from "mongoose";
import Category from "../models/Category.js";
import Villa from "../models/Villa.js";
import VillaRentDates from "../models/VillaRentDates.js";
import Resort from "../models/Resort.js";

const createVillaIntoDB = async (payload) => {
  const category = await Category.findOne({ name: "Villa" });
  payload.category = category._id;

  const result = await Villa.create(payload);

  // Increment the published count in the associated resort
  await Resort.findByIdAndUpdate(payload.resortId, {
    $inc: { "totalVilla.published": 1 },
  });
  return result;
};

const getAllVillaFromDB = async (queries) => {
  const { resortId, villaName, villaNumber, isPublished } = queries;

  let query = {};

  if (resortId && resortId !== "") {
    query.resortId = new mongoose.Types.ObjectId(resortId);
  }

  if (villaName && villaName !== "") {
    query.title = { $regex: `^${villaName}`, $options: "i" };
  }
  if (villaNumber && villaNumber !== "") {
    query.villaNumber = { $regex: `^${villaNumber}`, $options: "i" };
  }
  if (isPublished && isPublished !== "") {
    query.isPublished = isPublished;
  }

  const pipeline = [
    { $match: query },
    {
      $lookup: {
        from: "resorts",
        localField: "resortId",
        foreignField: "_id",
        as: "resort",
        pipeline: [
          {
            $project: { _id: 1, name: 1, address: 1 },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$resort",
        preserveNullAndEmptyArrays: true,
      },
    },
  ];
  const result = await Villa.aggregate(pipeline);

  return result;
};

const getVillaByIdFromDB = async (id) => {
  const bookedDates = await VillaRentDates.find({
    villaId: id,
    bookingStatus: { $in: ["Booked", "Completed"] },
  });

  const villa = await Villa.findOne({ _id: id }).populate("resortId");
  return { villa, bookedDates };
};

const updateVillaById = async (payload, id) => {
  // Step 1: Find the villa
  const villa = await Villa.findById(id);
  if (!villa) {
    return { error: "Villa not found" };
  }

  const resortId = villa.resortId;
  const oldStatus = villa.isPublished; // "Published" or "Unpublished"
  const newStatus = payload.isPublished;

  // Step 2: Update resort villa counts if status changed
  if (newStatus && newStatus !== oldStatus) {
    if (newStatus === "Published" && oldStatus === "Unpublished") {
      await Resort.findByIdAndUpdate(resortId, {
        $inc: {
          "totalVilla.published": 1,
          "totalVilla.unpublished": -1,
        },
      });
    } else if (newStatus === "Unpublished" && oldStatus === "Published") {
      await Resort.findByIdAndUpdate(resortId, {
        $inc: {
          "totalVilla.published": -1,
          "totalVilla.unpublished": 1,
        },
      });
    }
  }

  // Step 3: Update the villa document
  const result = await Villa.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true }
  );

  return result;
};

export const villaServices = {
  createVillaIntoDB,
  getAllVillaFromDB,
  getVillaByIdFromDB,
  updateVillaById,
};
