import RentRoom from "../models/RentRoom.js";
import Seat from "../models/Seat.js";

const createSeatIntoDB = async (payload) => {
  const result = await Seat.create(payload);
  return result;
};

const getAllSeatsFromDB = async (queries) => {
  const { destination, seatNumber, size, page, isPublished } = queries;
  let query = {};
  if (seatNumber && seatNumber !== "") {
    query.seatNumber = { $regex: `^${seatNumber}`, $options: "i" };
  }
  if (isPublished && isPublished !== "") {
    query.isSeatPublished = isPublished;
  }

  const pipeline = [
    { $match: query },
    {
      $lookup: {
        from: "properties",
        localField: "roomId",
        foreignField: "_id",
        as: "property",
      },
    },
    { $unwind: "$property" },
    {
      $lookup: {
        from: "branches",
        localField: "branch",
        foreignField: "_id",
        as: "branchDetails",
      },
    },
    { $unwind: "$branchDetails" },
    {
      $match: {
        ...(destination ? { "branchDetails.name": destination } : {}),
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    { $unwind: "$categoryDetails" },
    {
      $facet: {
        paginatedResults: [
          { $sort: { createdAt: -1 } },
          ...(page >= 1 && size >= 1
            ? [{ $skip: (page - 1) * size }, { $limit: size }]
            : []),
        ],
        totalCounts: [
          {
            $group: {
              _id: null,
              totalCount: { $sum: 1 },
            },
          },
        ],
      },
    },
    {
      $project: {
        paginatedResults: 1,
        totalCount: {
          $ifNull: [{ $arrayElemAt: ["$totalCounts.totalCount", 0] }, 0],
        },
      },
    },
  ];
  const result = await Seat.aggregate(pipeline);
  return result[0]?.paginatedResults || [];
};

const getSeatByIdFromDB = async (id) => {
  const rentRooms = await RentRoom.find({
    seatId: id,
    bookingStatus: { $in: ["Booked", "Reserved"] },
  }).select({
    bookStartDate: 1,
    bookEndDate: 1,
    bookingStatus: 1,
    roomType: 1,
    seatId: 1,
    seatNumber: 1,
  });
  const seat = await Seat.findById(id).populate("category branch");

  return { seat, rentRooms };
};

export const updateSeatById = async (seatId, payload) => {
  let result;

  if (payload?.isPublished) {
    result = await Seat.findByIdAndUpdate(
      seatId,
      { $set: { isSeatPublished: payload.isPublished } },
      { new: true }
    );
  }
  // Find the property by ID
  const seat = await Seat.findById(seatId);

  // const updateData = {
  //   name: payload.name,
  //   city: payload.city,
  //   floor: payload.floor,
  //   roomNumber: payload.roomNumber,
  //   builtYear: payload.builtYear,
  //   area: payload.area,
  //   totalRoom: payload.totalRoom,
  //   desc: payload.desc,
  //   fulldesc: payload.fulldesc,
  //   perDay: payload.perDay,
  //   perMonth: payload.perMonth,
  //   perYear: payload.perYear,
  //   dAmountForDay: payload.dAmountForDay,
  //   dAmountForMonth: payload.dAmountForMonth,
  //   dAmountForYear: payload.dAmountForYear,
  //   percentOfDiscountDay: payload.percentOfDiscountDay,
  //   percentOfDiscountMonth: payload.percentOfDiscountMonth,
  //   percentOfDiscountYear: payload.percentOfDiscountYear,
  //   bedroom: payload.bedroom,
  //   bathroom: payload.bathroom,
  //   car: payload.car,
  //   bike: payload.bike,
  //   pet: payload.pet,
  //   categoryId: payload.categoryId,
  //   recommended: payload.recommended,
  //   furnitured: payload.furnitured,
  //   branchId: payload.branchId,
  //   facility: payload.facility,
  //   commonfacility: payload.commonfacility,
  //   photos: payload.photos,
  //   meal: payload.meal,
  //   bedType: payload.bedType,
  //   CCTV: payload.CCTV,
  //   WiFi: payload.WiFi,
  //   balcony: payload.balcony,
  //   totalPerson: payload.totalPerson,
  //   rentDate: seat?.rentDate,
  //   type: payload.type,
  //   rules: payload.rules,
  //   roomCategory: payload.roomCategory,
  //   additionalFacility: payload.additionalFacility,
  //   apartmentRent: payload.apartmentRent,
  //   serviceCharge: payload.serviceCharge,
  //   security: payload.security,
  //   faltPolicy: payload.faltPolicy,
  //   seats: payload.seats,
  //   isPublished: payload.isPublished,
  //   isPartner: payload.isPartner,
  // };

  // const result = await Seat.updateOne(
  //   { _id: seatId },
  //   { $set: updateData },
  //   { runValidators: true }
  // );

  return result;
};

export const seatServices = {
  createSeatIntoDB,
  getAllSeatsFromDB,
  getSeatByIdFromDB,
  updateSeatById,
};
