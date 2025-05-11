import TransactionForVilla from "../models/TransactionForVilla.js"

const createTransactionIntoDB = async(payload)=>{
    const result =  await TransactionForVilla.create(payload);
    return result ;
}



export const transactionForVillaServices = {
    createTransactionIntoDB
}