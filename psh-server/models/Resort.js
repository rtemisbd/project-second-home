import mongoose from "mongoose";

const facilitiesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    
});

const villaTypeSchema = new mongoose.Schema({
    name: { type: String, required: true }
});


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
    welcomeNote : {type : String},
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
