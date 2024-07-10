import RentRoom from "../models/RentRoom.js";

export const getRentRooms = async (req, res, next) => {
  try {
    const today = new Date().toISOString()?.split("T")[0];

    const rentRooms = await RentRoom.find({
      bookStartDate: { $lte: today },
      bookEndDate: { $gte: today },
    });

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
    });

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

    const bookedRentRooms = await RentRoom.find({
      _id: { $in: rentRooms.map((room) => room._id) },
    }).populate("userId");

    res.status(200).json({
      status: "Success",
      message: "Orders retrieved successfully",
      bookedRentRooms,
      upcomingRentRooms,
    });
  } catch (err) {
    next(err);
  }
};
