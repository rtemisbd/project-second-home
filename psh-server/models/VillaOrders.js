import mongoose from "mongoose";


const rentDateSchema = new mongoose.Schema({
    bookStartDate: { type: mongoose.Schema.Types.Mixed, required: true},
    bookEndDate: { type: mongoose.Schema.Types.Mixed , required: true},
    dayDifference : {type : Number, required: true}
})

const villaOrderSchema = new mongoose.Schema({
    bookingId: { type: String,},
    villa: { type: mongoose.Schema.Types.ObjectId, ref: "Villa", required: true },
    user: {type : mongoose.Schema.Types.ObjectId, ref : "User", required : true},
    subTotal : {type : Number, required : true},
    totalAmount : {type : Number, required : true},
    payableAmount : {type : Number, required : true},
    paidAmount : {type : Number, required : true},
    status: {
        type: String,
        enum: ["Pending", "Processing", "Approved", "Canceled"],
        default: "Pending",
      },
      rentDate : rentDateSchema


}, { timestamps: true });




export default mongoose.model("VillaOrder", villaOrderSchema);