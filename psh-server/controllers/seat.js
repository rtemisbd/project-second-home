import Seat from "../models/Seat.js";
import Property from "../models/Property.js";

export const createSeat = async (req, res, next) => {
  try {
    const { name, seatNumber, desc, propertyId, photos } = req.body;

    // Find the property by ID
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Create the seat and assign it to the property
    const product = new Seat({
      name,
      seatNumber,
      desc,
      photos,
      property: property._id,
    });
    await product.save();

    // Add the seat to the property's seats array
    property.seat.push(product._id);
    await property.save();

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const getSeats = async (req, res, next) => {
  try {
    const seats = await Seat.find({}).populate({
      path: "property",
      populate: {
        path: "branch seat",
      },
    });
    res.status(200).json(seats);
  } catch (err) {
    next(err);
  }
};

export const getSingleSeat = async (req, res, next) => {
  try {
    const result = await Seat.findById(req.params.id).populate("property");
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteSeat = async (req, res, next) => {
  try {
    const seatId = req.params.id;

    // Find the seat by ID
    const seat = await Seat.findById(seatId);
    if (!seat) {
      return res.status(404).json({ error: "Seat not found" });
    }

    // Find the associated product
    const product = await Property.findById(seat.property);
    if (!product) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Remove the seat from the product's seats array
    product.seat.pull(seatId);
    await product.save();

    // Delete the seat
    await Seat.findByIdAndDelete(seatId);

    res.status(200).json(seat);
  } catch (err) {
    next(err);
  }
};

export const updateSeat = async (req, res, next) => {
  try {
    const { propertyId, name, photos, seatNumber, desc } = req.body;
    const seatId = req.params.id;

    // Find the seat by ID
    const seat = await Seat.findById(seatId);
    if (!seat) {
      return res.status(404).json({ error: "Seat not found" });
    }

    // Check if the product has changed
    if (seat.property.toString() === propertyId) {
      // Product remains the same, no need to update
      return res.json(seat);
    }

    // Find the previous product
    const previousProduct = await Property.findById(seat.property);
    if (!previousProduct) {
      return res.status(404).json({ error: "Previous product not found" });
    }

    // Remove the seat from the previous product's seats array
    previousProduct.seat.pull(seatId);
    await previousProduct.save();

    // Find the new product
    const newProduct = await Property.findById(propertyId);
    if (!newProduct) {
      return res.status(404).json({ error: "New product not found" });
    }

    // Update the seat's product
    seat.property = propertyId;

    // Add the seat to the new product's seats array
    newProduct.seat.push(seatId);
    await newProduct.save();

    // Update other fields if provided
    if (name) {
      seat.name = name;
    }
    if (photos) {
      seat.photos = photos;
    }
    if (desc) {
      seat.desc = desc;
    }
    if (photos) {
      seat.seatNumber = seatNumber;
    }
    await seat.save();

    res.json(seat);
  } catch (err) {
    next(err);
  }
};
