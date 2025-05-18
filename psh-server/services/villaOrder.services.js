import { setValue } from "node-global-storage";
import User from "../models/User.js";
import VillaOrders from "../models/VillaOrders.js"
import { generateBookingId } from "../utils/generateBookingId.js";
import TransactionForVilla from "../models/TransactionForVilla.js";
import VillaRentDates from "../models/VillaRentDates.js";

const createVillaOrderIntoDB = async(payload)=>{
    await setValue("userId", payload?.user);

    // Step 1: Update user information
    const userUpdate = {
      firstName: payload?.fullName,
      phone: payload?.phone,
      userAddress: payload?.address,
      emergencyContact: {
        contactName: payload?.emergencyContactName,
        relation: payload?.emergencyRelationC,
        contactNumber: payload?.emergencyContact,
      },
    };
    await User.updateOne(
      { phone: payload?.phone },
      { $set: userUpdate },
      { runValidators: true}
      // { runValidators: true, session }
    );

    // step 2 : generate booking ID
    payload.bookingId = await generateBookingId();

    //step 3 : create booking
      const order = await VillaOrders.create(payload);
   
    // step 4 : create transaction
    const newTransaction ={
      userId : payload.user,
      bookingId : payload.bookingId,
      paymentProof : payload.paymentProof,
      receivedAmount : payload.sendAmount,
      orderId : order?._id,
      senderNumber : payload.senderAccountNumber,
      paymentMethod : payload.paymentMethod,
      paymentPlatform : payload.paymentPlatform,
    };
   await TransactionForVilla.create(newTransaction);
  
    // step 5 : create rentDate
    const newRentDate = {
      bookStartDate:payload.rentDate.bookStartDate,
      bookEndDate:payload.rentDate.bookEndDate,
      daysDifference:payload.rentDate.daysDifference,
      orderId : order?._id,
      bookingId:payload.bookingId,
      villaId:payload.villa,
      userId:payload.user,
    }
    await VillaRentDates.create(newRentDate);
  
  return order;
}

const getVillaOrderByIdFromDB = async (id) => {
  const result = await VillaOrders.findById({ _id: id })
    .populate({
      path: "villa",
      select: "title type villaNumber resortId",
      populate: {
        path: "resortId",
        select: "name", 
      },
    });

  return result;
};




export const villaOrderServices = {
    createVillaOrderIntoDB,
    getVillaOrderByIdFromDB
}