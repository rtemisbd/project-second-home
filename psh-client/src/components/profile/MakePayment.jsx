import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { serverBaseUrl } from "../../serverApi/baseUrl";

const MakePayment = ({
  handleMakePaymentShow,
  makePaymentShow,
  order,
  due,
}) => {
  const [showUserInputForPayment, setShowUserInputForPayment] = useState(false);
  const [minimumAmount, setMinimumAMount] = useState(0);

  const [amountForPay, setAmountForPay] = useState(0);

  const [isLessAmount, setIsLessAmount] = useState(false);

  const handleUserInputAmount = async (e) => {
    const value = await e.target.value;
    if ((await value) < minimumAmount) {
      setIsLessAmount(true);
    } else {
      setIsLessAmount(false);
      setAmountForPay(value);
    }
  };

  const handlePayByBkash = async (amount) => {
    try {
      const dataForBackend = {
        orderId: order?._id,
        branch: order?.branch?._id,
        paymentDate: new Date(),
        totalAmount: order?.bookingInfo?.totalAmount,
        payableAmount: order?.payableAmount,
        userId: order?.userId,
        userPhone: order?.phone,
        userName: order?.fullName,
      };

      if (amount) {
        const { data } = await axios.post(
          `${serverBaseUrl}/transaction/user-transaction`,
          { amount, dataForBackend },
          { withCredentials: true }
        );
        console.log(data);

        window.location.href = data?.data?.bkashURL;
      } else {
        toast.error("Something is wrong! Please try again.");
      }
    } catch (error) {
      toast.error("Something is wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    if (due < 500) {
      setMinimumAMount(due);
    } else {
      setMinimumAMount(500);
    }
  }, [due]);

  return (
    <>
      <Dialog open={makePaymentShow} size="md" className="">
        <DialogHeader>
          <h2 className="text-xl font-bold md:py-0 sm:py-2">
            Make New Payment{" "}
          </h2>
        </DialogHeader>
        <DialogBody
          divider
          className="  lg:h-[20rem] xl:h-[30rem] md:h-[20rem] sm:h-[24rem] xs:h-[24rem] overflow-scroll "
        >
          <div>
            <div className="my-4 flex justify-center mx-4">
              <div>
                <h2 className="font-medium text-center mb-4">
                  How much do you want to pay now?
                </h2>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => handlePayByBkash(minimumAmount)}
                    className="border border-[#35B0A7] px-3 py-1 rounded-xl hover:bg-[#35B0A7] hover:text-white"
                  >
                    Minimum - {minimumAmount} ৳
                  </button>
                  <button
                    onClick={() => handlePayByBkash(due)}
                    className="border border-[#35B0A7] px-3 py-1 rounded-xl hover:bg-[#35B0A7] hover:text-white"
                  >
                    Due Amount - {due} ৳
                  </button>
                  <button
                    onClick={() => setShowUserInputForPayment(true)}
                    className="border border-[#35B0A7] px-3 py-1 rounded-xl hover:bg-[#35B0A7] hover:text-white"
                  >
                    Custom Amount
                  </button>
                </div>
                {showUserInputForPayment && (
                  <div>
                    <div className="flex justify-center w-full my-4">
                      <input
                        type="number"
                        placeholder="Enter your amount"
                        className="border px-3 py-2 rounded-l-xl w-[66%] md:w-[80%] "
                        name="amountForPay"
                        onChange={handleUserInputAmount}
                      />
                      <button
                        onClick={() => handlePayByBkash(amountForPay)}
                        className="bg-[#02625a] px-3 py-2 rounded-r-xl text-white"
                        disabled={isLessAmount}
                      >
                        Pay Now
                      </button>
                    </div>
                    {isLessAmount && (
                      <p className="text-sm text-red-600">
                        Please Pay Atleast ৳ {minimumAmount}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogBody>
        <div
          onClick={() => handleMakePaymentShow(null)}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <span>
            <AiOutlineClose style={{ width: "24px", height: "24px" }} />
          </span>
        </div>
        <Toaster
          containerStyle={{ top: 300 }}
          toastOptions={{ position: "top-center" }}
        ></Toaster>
      </Dialog>
    </>
  );
};

export default MakePayment;
