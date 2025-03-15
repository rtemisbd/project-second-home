import Villa from "../models/Villa"

const createVillaIntoDB = async(payload)=>{
    const result = await Villa.create(payload);
    return result;
}

export const villaServices = {
    createVillaIntoDB
}