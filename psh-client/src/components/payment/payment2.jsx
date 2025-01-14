import React from "react";
import axios from "axios";
import { serverBaseUrl } from "../../serverApi/baseUrl";

const PaymentPage = () => {
  const pay = async () => {
    const bookingData = {
      amount: 1,
      orderId: 1,
      userName: "Alamin",
    };
    try {
      const { data } = await axios.post(
        `${serverBaseUrl}/bkash/payment/create`,
        bookingData,
        { withCredentials: true }
      );
      console.log(data);
      window.location.href = data?.data?.bkashURL;
      // window.location.href = data.bkashURL;
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-[54vh]">
      <button onClick={pay}>Pay bkash..</button>
    </div>
  );
};

export default PaymentPage;
