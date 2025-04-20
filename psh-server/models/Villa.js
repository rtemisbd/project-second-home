import mongoose from "mongoose";

// const featureSchema = new mongoose.Schema(
//     { type: String, required: true });

const villaSchema = new mongoose.Schema({
    resortId: { type: mongoose.Schema.Types.ObjectId, ref: "Resort", required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    villaNumber: { type: String, required: true },
    view: { type: String, required: true },
    area: { type: String, required: true },
    totalFloor: { type: Number, required: true },
    totalRoom: { type: Number, required: true },
    totalBalcony: { type: Number, required: true },
    totalBathroom: { type: Number, required: true },
    occupancy: {
        adults: { type: Number, required: true },
        kids: { type: Number, required: true },
        policy: { type: String, required: true }
    },
    features: [{ type: String, required: true }],
    // features: [featureSchema],
    pricing: {
        perNight: { type: Number, required: true },
        securityDeposit: { type: Number, required: true },
        adultAddition: { type: Number, required: true },
        kidAddition: { type: Number, required: true },
    },
    media: {
        photos: [{ type: String }],
        video: { type: String }
    },
    houseRules: { type: String, required: true },  
}, { timestamps: true });




export default mongoose.model("Villa", villaSchema);

