import VillaRentDates from "../models/VillaRentDates.js"

const createRentDatesIntoDB = async(payload) =>{
    const result = await VillaRentDates.create(payload)
    return result;
}


export const villaRentDatesServices = {
    createRentDatesIntoDB
}