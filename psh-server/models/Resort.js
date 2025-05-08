import mongoose from "mongoose";

const facilitiesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    
});

const villaTypeSchema = new mongoose.Schema({
    name: { type: String, required: true }
});
const contactNumberSchema = new mongoose.Schema({
    number: { type: String }
});

const mobileBankingSchema = new mongoose.Schema({
    resortBkashNumber : {type : String},
    bkashAccountType : {type : String, enum: ["Merchant", "Personal"]},
    bkashAccountHolder : {type : String},
    resortNagadNumber : {type : String},
    nagadAccountType : {type : String, enum: ["Merchant", "Personal"]},
    nagadAccountHolder : {type : String},
})

const bankDetailsSchema = new mongoose.Schema({
    bankName : {type : String},
    accountNumber : {type : String},
    accountHolder : {type : String},
    accountType : {type : String},
    branchName : {type : String},
    routingNumber : {type : String},
})


const resortSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    division: { type: String, required: true },
    district: { type: String, required: true },
    locationLink: { type: String, required: true },
   
    contactNumbers : [contactNumberSchema],
    resortEmail: { type: String, required: true },
    mobileBanking : mobileBankingSchema,
    bankDetails : [bankDetailsSchema],
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
