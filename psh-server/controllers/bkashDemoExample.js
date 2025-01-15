import createPayment from "../functions/create_payment.js";
import executePayment from "../functions/execute_payment.js";
import grantToken from "../functions/grant_tocken.js";

export const bkashInitially = (req, res) => {
  const { payerReference, callbackURL, amount, merchantInvoiceNumber } =
    req.body;

  grantToken()
    .then((id_token) => {
      const paymentBody = {
        mode: "0011",
        payerReference: payerReference,
        callbackURL: callbackURL,
        amount: amount,
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: merchantInvoiceNumber,
      };
      createPayment(id_token, paymentBody)
        .then((response) => {
          res.send(response);
        })
        .catch((error) => {
          res.send(`Error: ${error.message}`);
        });
    })
    .catch((error) => {
      res.send(`Error: ${error.message}`);
    });
};

export const bkashExecute = (req, res) => {
  const { paymentID } = req.body;

  grantToken()
    .then((id_token) => {
      executePayment(paymentID, id_token)
        .then((response) => {
          res.send(response);
        })
        .catch((error) => {
          res.send(`Error: ${error.message}`);
        });
    })
    .catch((error) => {
      res.send(`Error: ${error.message}`);
    });
};
