import { transactionForVillaServices } from "../services/villaTransaction.service.js";
import catchAsync from "../utils/catchAsync.js";
import responseSend from "../utils/responseSend.js";

const getVillaAllTransactions = catchAsync(async (req, res, next) => {
  const transactions = await transactionForVillaServices.getAllTransactionForVilla(req?.query);

  responseSend(res, {
        statusCode : 200,
        success : true,
        data : transactions,
        message : "Villa transactions retrieve successfully"
    })

});

export const villaTransactionControllers = {
    getVillaAllTransactions
}
