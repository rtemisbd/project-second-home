import React from "react";
import axios from "axios";

const PaymentPage = () => {
  const pay = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/bkash/payment/create",
        { amount: 1, orderId: 1 },
        { withCredentials: true }
      );
      window.location.href = data.bkashURL;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-[54vh]">
      <button onClick={pay}>Pay bkash</button>
    </div>
  );
};

export default PaymentPage;
