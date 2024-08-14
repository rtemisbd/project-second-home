import Property from "../models/Property.js";
import RentRoom from "../models/RentRoom.js";

export const getRentRooms = async (req, res, next) => {
  try {
    const today = new Date().toISOString()?.split("T")[0];

    const rentRooms = await RentRoom.find({
      bookStartDate: { $lte: today },
      bookEndDate: { $gte: today },
    });
    // Today Check in
    const todayCheckIn = await RentRoom.find({
      bookStartDate: today,
    }).populate("userId");

    // Today Check out
    const todayCheckOut = await RentRoom.find({
      bookEndDate: today,
    }).populate("userId");

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
    }).populate("userId");

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
    }).select({ _id: 0, roomNumber: 1 });

    // Booked Rooms
    const bookedRentRooms = await RentRoom.find({
      _id: { $in: rentRooms.map((room) => room._id) },
    }).populate("userId");

    res.status(200).json({
      status: "Success",
      message: "Bookings retrieved successfully",
      bookedRentRooms,
      upcomingRentRooms,
      availableRooms,
      todayCheckIn,
      todayCheckOut,
    });
  } catch (err) {
    next(err);
  }
};
