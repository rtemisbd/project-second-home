import mongoose from "mongoose";

// Define the LeaseProperty Schema
const LeaseProperty = new mongoose.Schema(
  {
    // purpose: {
    //   type: String,
    //   enum: ["rent", "franchising", "lease", "partnership"],
    //   default: "pending",
    // },
    // firstName: {
    //   type: String,
    //   required: true,
    // },
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    propertyType: {
      type: String,
      // enum: ["Building", "Flat", "Villa", "Apartment"],
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    // availabilityForVisit: {
    //   type: Date,
    //   required: true,
    // },
    // availabilityForVisitTime: {
    //   type: String,
    //   required: true,
    // },
    status: {
      type: String,
      enum: ["pending", "process", "success"],
      default: "pending",
    },

    // propertyName: {
    //   type: String,
    //   required: true,
    // },

    // propertySize: {
    //   type: String,
    //   required: true,
    // },
    // floorNumber: {
    //   type: String,
    //   required: true,
    // },
    // totalRooms: {
    //   type: Number,
    //   required: true,
    // },
    // totalBathrooms: {
    //   type: Number,
    //   required: true,
    // },
    // parking: {
    //   type: String,
    //   enum: ["Yes", "No"],
    //   required: true,
    // },
    // elevator: {
    //   type: String,
    //   enum: ["Yes", "No"],
    //   required: true,
    // },

    // city: {
    //   type: String,
    //   required: true,
    // },
    // stateRegion: {
    //   type: String,
    //   required: true,
    // },
    // postCode: {
    //   type: String,
    //   required: true,
    // },
    // district: {
    //   type: String,
    //   required: true,
    // },
    // division: {
    //   type: String,
    //   required: true,
    // },
    // country: {
    //   type: String,
    //   required: true,
    //   default: "Bangladesh",
    // },
  },

  {
    timestamps: true,
  }
);
export default mongoose.model("LeaseProperty", LeaseProperty);
