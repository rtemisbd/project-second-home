import VillaOrders from "../models/VillaOrders.js"

const createVillaOrderIntoDB = async(payload)=>{
    const result = await VillaOrders.create(payload);
    return result;
}



export const villaOrderServices = {
    createVillaOrderIntoDB
}