import Property from "../models/Property.js";
import RentRoom from "../models/RentRoom.js";

export const getRentRooms = async (req, res, next) => {
  try {
    // const { checkingDate } = req.query;
    // const today = new Date(checkingDate).toISOString()?.split("T")[0];
    const today = new Date().toISOString()?.split("T")[0];
    const rentRooms = await RentRoom.find({
      bookStartDate: { $lte: today },
      bookEndDate: { $gte: today },
    });
    // Today Check in
    const todayCheckIn = await RentRoom.find({
      bookStartDate: today,
    }).populate([
      {
        path: "userId",
        select: {
          _id: 0,
          firstName: 1,
          phone: 1,
        },
      },
      {
        path: "branch",
        select: {
          _id: 0,
          name: 1,
        },
      },
    ]);

    // Today Check out
    const todayCheckOut = await RentRoom.find({
      bookEndDate: today,
    }).populate([
      {
        path: "userId",
        select: {
          _id: 0,
          firstName: 1,
          phone: 1,
        },
      },
      {
        path: "branch",
        select: {
          _id: 0,
          name: 1,
        },
      },
    ]);

    // Update bookingStatus to "booked" for the found rent rooms
    await RentRoom.updateMany(
      {
        _id: { $in: rentRooms.map((room) => room._id) },
      },
      {
        $set: { bookingStatus: "Booked" },
      }
    );

    const upcomingRentRooms = await RentRoom.find({
      bookStartDate: { $gt: today },
    }).populate([
      {
        path: "userId",
        select: {
          _id: 0,
          firstName: 1,
          phone: 1,
        },
      },
      {
        path: "branch",
        select: {
          _id: 0,
          name: 1,
        },
      },
    ]);

    // Update bookingStatus to "reserved" for upcoming rent rooms
    await RentRoom.updateMany(
      {
        _id: { $in: upcomingRentRooms.map((room) => room._id) },
      },
      {
        $set: { bookingStatus: "Reserved" },
      }
    );

    // Update bookingStatus to "complete" for past rent rooms
    await RentRoom.updateMany(
      {
        bookEndDate: { $lt: today },
      },
      {
        $set: { bookingStatus: "Complete" },
      }
    );

    // Find Available Rooms
    const availableRooms = await Property.find({
      roomNumber: { $nin: rentRooms.map((room) => room.roomNumber) },
      isPublished: "Published",
    })
      .populate([
        {
          path: "category",
          match: { name: "Private Room" },
          select: {
            name: 1,
            _id: 0,
          },
        },
        {
          path: "branch",
          select: {
            _id: 0,
            name: 1,
          },
        },
      ])
      .select({ _id: 0, roomNumber: 1 });

    const filteredAvailableRooms = availableRooms.filter(
      (room) => room.category
    );

    // Fine Booked Privet Roomscd
    const bookedRooms = await RentRoom.find({
      _id: {
        $in: rentRooms
          .filter((room) => room.roomType === "Private Room")
          .map((room) => room._id),
      },
    }).populate([
      {
        path: "userId",
        select: {
          _id: 0,
          firstName: 1,
          phone: 1,
        },
      },
      {
        path: "branch",
        select: {
          _id: 0,
          name: 1,
        },
      },
    ]);

    // Fine Booked Seats
    const bookedSeats = await RentRoom.find({
      _id: {
        $in: rentRooms
          .filter((room) => room.roomType === "Shared Room")
          .map((room) => room._id),
      },
    }).populate([
      {
        path: "userId",
        select: {
          _id: 0,
          firstName: 1,
          phone: 1,
        },
      },
      {
        path: "branch",
        select: {
          _id: 0,
          name: 1,
        },
      },
    ]);

    // Fine Available Seats
    const bookedSeatNumbers = bookedSeats.map((seat) => seat.seatNumber);
    const availableSeatsWithCount = await Property.aggregate([
      {
        $match: {
          isPublished: "Published",
        },
      },
      {
        $lookup: {
          from: "categories", // The collection name for categories
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: "$categoryDetails",
      },
      {
        $match: {
          "categoryDetails.name": "Shared Room",
        },
      },
      {
        $project: {
          _id: 0,
          roomNumber: 1,
          seats: {
            $filter: {
              input: "$seats",
              as: "seat",
              cond: {
                $not: [{ $in: ["$$seat.seatNumber", bookedSeatNumbers] }],
              },
            },
          },
          category: "$categoryDetails.name",
          branch: 1, // Keep branch field for later population
        },
      },
      {
        $lookup: {
          from: "branches", // Assuming the collection name for branches is "branches"
          localField: "branch",
          foreignField: "_id",
          as: "branchDetails",
        },
      },
      {
        $unwind: "$branchDetails",
      },
      {
        $project: {
          roomNumber: 1,
          seats: {
            $map: {
              input: "$seats",
              as: "seat",
              in: {
                _id: "$$seat._id",
                seatNumber: "$$seat.seatNumber",
              },
            },
          },
          category: 1,
          branch: "$branchDetails.name", // Select only the branch name
        },
      },
      {
        $addFields: {
          availableSeatsCount: { $size: "$seats" }, // Add count of available seats for each property
        },
      },
      {
        $group: {
          _id: null,
          totalAvailableSeats: { $sum: "$availableSeatsCount" }, // Sum of available seats across all properties
          availableSeats: {
            $push: {
              roomNumber: "$roomNumber",
              seats: "$seats",
              category: "$category",
              branch: "$branch", // Include branch name in the final output
            },
          },
        },
      },
    ]);

    const totalAvailableSeats =
      availableSeatsWithCount[0]?.totalAvailableSeats || 0;
    const availableSeats = availableSeatsWithCount[0]?.availableSeats || [];
    // Filter out properties where the category did not match "Shared Room"

    res.status(200).json({
      status: "Success",
      message: "Bookings retrieved successfully",
      bookedRooms,
      upcomingRentRooms,
      availableRooms: filteredAvailableRooms,
      bookedSeats,
      todayCheckIn,
      todayCheckOut,
      availableSeats,
      totalAvailableSeats,
    });
  } catch (err) {
    next(err);
  }
};
