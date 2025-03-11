import Resort from "../models/Resort.js"

const createResortIntoDB = async(payload) =>{
    const result = await Resort.create(payload);
    return result;
}


export const resortServices  = {
    createResortIntoDB
}