import Transaction from "../models/Transaction.js";
import OrderModel from "../models/Order.js";
import catchAsync2 from "../shared/catchAsync2.js";
import sendResponse from "../shared/sendResponse.js";
import { transactionServices } from "../services/transaction.service.js";
import catchAsync from "../utils/catchAsync.js";
import responseSend from "../utils/responseSend.js";

export const createTransaction = catchAsync2(async (req, res, next) => {
  const result = await transactionServices.createTransactionIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Transaction created successfully!",
    data: result,
  });
});

export const createTransactionByUser = catchAsync2(async (req, res, next) => {
  const result = await transactionServices.createTransactionByUserBkash(
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: "Your transaction has been added successfully!",
  });
});

export const getTransaction = catchAsync2(async (req, res, next) => {
  const transactions = await transactionServices.getAllTransactionFromDB(
    req.query
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Transactions retrieved successfully",
    data: transactions,
  });
});

// get single transaction
export const getTransactionById = catchAsync(async (req, res, next) => {
  const result = await transactionServices.getTransactionByIdFromDB(
    req.params.id
  );

  responseSend(res, {
    statusCode: 200,
    success: true,
    message: "Transaction retrieved successfully",
    data: result,
  });
});
// get transaction by orderId
export const getTransactionByOrderId = catchAsync2(async (req, res, next) => {
  const result = await transactionServices.getTransactionByOrderIdFromDB(
    req.params.orderId
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Transaction retrieved successfully",
    data: result,
  });
});

export const getUserTransactions = async (req, res, next) => {
  try {
    const phone = req.params.phone;

    const transaction = await Transaction.find({ userPhone: phone }).sort({
      createdAt: -1,
    });

    // if totalAmount equal totalReceiveTk

    res.status(200).json({
      status: "Success",
      message: "Success",
      transaction,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Sorry Transaciton not found",
      error: error.message,
    });
  }
};
export const UpdateTransaction = async (req, res, next) => {
  try {
    const id = req.params.id;

    const transaction = await Transaction.findById({ _id: id });
    // Order Total Receive Amount and dueAmount Update
    const transactions = await Transaction.find({
      orderId: transaction.orderId,
    });

    const query = {
      orderId: transaction?.orderId,
      acceptableStatus: "Accepted",
    };

    if (req?.body?.acceptableStatus) {
      if (req?.body?.acceptableStatus === "Accepted") {
        const acceptedTransactions = await Transaction.find(query);
        let totalReceiveTk = 0;
        for (const item of acceptedTransactions) {
          totalReceiveTk += item?.receivedTk;
        }

        await OrderModel.findByIdAndUpdate(
          transaction?.orderId,

          {
            $set: {
              dueAmount:
                req.body?.payableAmount -
                (totalReceiveTk + req.body?.receivedTk),
              totalReceiveTk: totalReceiveTk + req.body?.receivedTk,
              customerType: req.body?.customerType,
              whichOfMonthPayment: req.body?.whichOfMonthPayment,
            },
          },
          { new: true }
        );

        await Transaction.updateOne(
          { _id: id },
          {
            $set: req?.body,
          },
          // { runValidators: true },
          { new: true }
        );
        res.status(200).json({ status: "success", message: "Updated" });
      } else {
        if (transaction?.acceptableStatus === "Accepted") {
          // Find Customer Order
          const findThisOrder = await OrderModel.findOne({
            _id: transaction?.orderId,
          });

          await OrderModel.findByIdAndUpdate(
            transaction?.orderId,

            {
              $set: {
                payableAmount:
                  findThisOrder?.payableAmount + transaction?.discount,
                dueAmount:
                  findThisOrder?.dueAmount +
                  transaction?.receivedTk +
                  transaction?.discount,
                totalReceiveTk:
                  findThisOrder?.totalReceiveTk - transaction?.receivedTk,
                discount: findThisOrder?.discount - transaction?.discount,
              },
            },
            { new: true }
          );

          await Transaction.updateOne(
            { _id: id },
            {
              $set: req?.body,
            },
            // { runValidators: true },
            { new: true }
          );

          res.status(200).json({ status: "success", message: "Updated" });
        } else {
          await Transaction.updateOne(
            { _id: id },
            {
              $set: req?.body,
            },
            // { runValidators: true },
            { new: true }
          );

          res.status(200).json({ status: "success", message: "Updated" });
        }
      }
    } else {
      let myTotalReceiveTk = 0;
      for (const item of transactions) {
        myTotalReceiveTk += item.receivedTk;
      }
      const dueAmount =
        req.body?.payableAmount - (myTotalReceiveTk + req.body?.receivedTk);
      const finalTotalReceiveAmount =
        myTotalReceiveTk - transaction?.receivedTk;

      const updatedTransaction = {
        orderId: transaction.orderId,
        branch: transaction?.branch,
        totalAmount: req.body?.totalAmount,
        payableAmount: req.body?.payableAmount,
        paymentDate: req.body?.paymentDate,
        receivedTk: req.body?.receivedTk,
        customerType: req.body?.customerType,
        whichOfMonthPayment: req.body?.whichOfMonthPayment,
        // dueAmount: req.body?.dueAmount,
        // totalReceiveTk: req.body?.totalReceiveTk,
        // discount: req.body?.discount,
        paymentType: req.body?.paymentType,
        userEmail: transaction?.email,
        userId: transaction?.userId,
        userName: transaction?.fullName,
        userPhone: transaction?.phone,
        // paymentStatus: req.body?.paymentStatus,
        paymentNumber: req.body?.paymentNumber,
        transactionId: req.body?.transactionId,
        bankName: req.body?.bankName,
        bankHoldingName: req.body?.bankHoldingName,
        receiverName: req.body?.receiverName,
        receiverName: req.body?.receiverName,
        acceptableStatus: transaction?.acceptableStatus,
      };

      if (transaction?.acceptableStatus === "Accepted") {
        await OrderModel.findByIdAndUpdate(
          transaction.orderId,
          {
            $set: {
              dueAmount: dueAmount + transaction?.receivedTk,
              totalReceiveTk: finalTotalReceiveAmount + req.body?.receivedTk,
            },
          },
          { new: true }
        );

        await Transaction.updateOne(
          { _id: id },
          {
            $set: updatedTransaction,
          },
          // { runValidators: true },
          { new: true }
        );

        res.status(200).json({ status: "success", message: "Updated" });
      } else {
        await Transaction.updateOne(
          { _id: id },
          {
            $set: updatedTransaction,
          },
          // { runValidators: true },
          { new: true }
        );

        res.status(200).json({ status: "success", message: "Updated" });
      }
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Sorry ! Something is wrong",
      error: err.message,
    });
    next(err);
  }
};
export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
    });

    // Find Customer Order
    const findThisOrder = await OrderModel.findOne({
      _id: transaction?.orderId,
    });

    if (transaction?.acceptableStatus === "Accepted") {
      await OrderModel.findByIdAndUpdate(
        transaction?.orderId,

        {
          $set: {
            payableAmount: findThisOrder?.payableAmount + transaction?.discount,
            dueAmount:
              findThisOrder?.dueAmount +
              transaction?.receivedTk +
              transaction?.discount,
            totalReceiveTk:
              findThisOrder?.totalReceiveTk - transaction?.receivedTk,
            discount: findThisOrder?.discount - transaction?.discount,
          },
        },
        { new: true }
      );

      await Transaction.findByIdAndDelete(req.params.id);

      res.status(200).json({ status: "success", message: "Deleted" });
    } else {
      await Transaction.findByIdAndDelete(req.params.id);

      res.status(200).json({ status: "success", message: "Deleted" });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Sorry ! Something is wrong",
      error: err.message,
    });
    next(err);
  }
};
