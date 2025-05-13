import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const TransactionForVillaSchema = new mongoose.Schema(
  {
    userId : { type: ObjectId,  ref: "User" },
    bookingId : { type : String, required : true },
    paymentProof : { type : String, required : true },
    receivedAmount : {type : Number, required : true},
    orderId : { type: ObjectId,  ref: "VillaOrder" },
    senderNumber : {type : String, required : true},
    paymentMethod : {type : String, required : true, enum : ["online", "cash"], default : "online"},
    paymentPlatform : {type : String, required : true},
    paymentStatus : {type : String , required : true, enum: ["Accepted", "Pending", "Processing", "Rejected"], default: "Processing"}
  }, 
  {
    timestamps: true,
  }
);

const TransactionForVilla = mongoose.model("TransactionForVilla", TransactionForVillaSchema);
export default TransactionForVilla;
