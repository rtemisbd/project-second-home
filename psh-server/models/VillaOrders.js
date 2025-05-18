import mongoose from "mongoose";


const rentDateSchema = new mongoose.Schema({
    bookingStartDate: { type: mongoose.Schema.Types.Mixed, required: true},
    bookingEndDate: { type: mongoose.Schema.Types.Mixed , required: true},
    daysDifference : {type : Number, required: true}
})

const villaOrderSchema = new mongoose.Schema({
    bookingId: { type: String},
    villa: { type: mongoose.Schema.Types.ObjectId, ref: "Villa", required: true },
    user: {type : mongoose.Schema.Types.ObjectId, ref : "User", required : true},
    paymentPlatform : {type : String, required : true},
    minimumAmount : {type : Number },
    paymentMethod : {type : String, required :    true, enum : ["online", "cash"], default : "online"},
    paymentProof : {type : String, required : true},
    perNight : {type : Number, required : true},
    sendAmount : {type : Number, required : true},
    senderAccountNumber : {type : String, required : true},
    subTotal : {type : Number, required : true},
    totalAmount : {type : Number, required : true},
    rentDate : rentDateSchema,
    payableAmount : {type : Number, required : true},
    status: {
        type: String,
        enum: ["Pending", "Processing", "Approved", "Canceled"],
        default: "Processing",
      },


}, { timestamps: true });




export default mongoose.model("VillaOrder", villaOrderSchema);