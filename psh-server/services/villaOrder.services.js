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
   const updatedUser = await User.updateOne(
      { phone: payload?.phone },
      { $set: userUpdate },
      { runValidators: true}
      // { runValidators: true, session }
    );
    console.log({updatedUser});
    

    // step 2 : generate booking ID
    payload.bookingId = await generateBookingId();

    //step 3 : create booking
    const order = await VillaOrders.create(payload);
    console.log({order});
    

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
   const transaction = await TransactionForVilla.create(newTransaction);
   console.log({transaction});
   

    // step 5 : create rentDate
    const newRentDate = {
      bookingStartDate:payload.rentDate.bookingStartDate,
      bookingEndDate:payload.rentDate.bookingEndDate,
      daysDifference:payload.rentDate.daysDifference,
      orderId : order?._id,
      bookingId:payload.bookingId,
      villaId:payload.villa,
      userId:payload.user,
    }

   const rent =  await VillaRentDates.create(newRentDate);
   console.log({rent});
   
  return order;
}



export const villaOrderServices = {
    createVillaOrderIntoDB
}