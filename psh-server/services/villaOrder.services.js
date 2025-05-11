import { setValue } from "node-global-storage";
import User from "../models/User.js";
import VillaOrders from "../models/VillaOrders.js"
import { generateBookingId } from "../utils/generateBookingId.js";

const createVillaOrderIntoDB = async(payload)=>{
    console.log(payload);
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
      { runValidators: true, session }
    );

    // step 2 : generate booking ID
    payload.bookingId = await generateBookingId();
    // step 3 : create transaction
    const newTransaction ={
      userId : payload.user,
      bookingId : payload.bookingId,
      paymentProof : payload.paymentProof,
      receivedAmount : payload.sendAmount,
      // orderId : ,
      senderNumber : payload.senderNumber,
      paymentMethod : payload.paymentMethod,
      paymentPlatform : payload.paymentPlatform,
    };
    // step 4 : create rentDate
    
    
    //step 5 : create booking
    
    const result = await VillaOrders.create(payload);
    return result;
}



export const villaOrderServices = {
    createVillaOrderIntoDB
}