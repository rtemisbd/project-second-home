import VillaOrders from "../models/VillaOrders.js"
import { generateBookingId } from "../utils/generateBookingId.js";

const createVillaOrderIntoDB = async(payload)=>{
    payload.bookingId = await generateBookingId();
    console.log(payload);
    
    const result = await VillaOrders.create(payload);
    return result;
}



export const villaOrderServices = {
    createVillaOrderIntoDB
}