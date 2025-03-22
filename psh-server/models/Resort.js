import mongoose from "mongoose";

const facilitiesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    img: { type: String, required: true }, 
});

const villaTypeSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

const nearLocationSchema = new mongoose.Schema({
    nearLocation1: { type: String},
    nearLocation2: { type: String},
    nearLocation3: { type: String},
    nearLocation4: { type: String},
    nearLocation5: { type: String},
    nearLocation6: { type: String},
})

const resortSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    division: { type: String, required: true },
    district: { type: String, required: true },
    locationLink: { type: String, required: true },
    resortMobileNumber: { type: String, required: true },
    resortBkashNumber: { type: String },
    resortNagadNumber: { type: String },
    resortDutchNumber: { type: String },
    resortEmail: { type: String, required: true },
    nearLocation : nearLocationSchema,
    photos: [{ type: String }],
    video: { type: String },
    facilities: [facilitiesSchema],
    villaTypes: [villaTypeSchema],
    policies: {
        bookingPolicy: { type: String, required: true },
        cancellationPolicy: { type: String, required: true }
    }
}, { timestamps: true });

export default mongoose.model("Resort", resortSchema);
