import { transactionForVillaServices } from "../services/villaTransaction.service.js";
import catchAsync from "../utils/catchAsync.js";
import responseSend from "../utils/responseSend.js";

const createTransaction = catchAsync(async (req, res, next) => {
  const transactions = await transactionForVillaServices.createTransactionIntoDB(req?.body);

  responseSend(res, {
        statusCode : 200,
        success : true,
        data : transactions,
        message : "Your transaction has submitted successfully"
    })

});

const getVillaAllTransactions = catchAsync(async (req, res, next) => {
  const transactions = await transactionForVillaServices.getAllTransactionForVilla(req?.query);

  responseSend(res, {
        statusCode : 200,
        success : true,
        data : transactions,
        message : "Villa transactions retrieve successfully"
    })

});


const updateSingleVillaTransaction = catchAsync(async(req, res, next)=>{
    const transaction = await transactionForVillaServices.updateVillaTransactionByID(req.params.id, req.body);

    responseSend(res, {
        statusCode : 200,
        success : true,
        data : transaction,
        message : "Transactions updated successfully"
    })
})



export const villaTransactionControllers = {
    createTransaction,
    getVillaAllTransactions,
    updateSingleVillaTransaction
}
