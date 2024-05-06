import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography } from "@material-tailwind/react";

import userEndOrder from "../../hooks/userEndOrder";
import { AuthContext } from "../../contexts/UserProvider";
import PaymentDetaislModal from "./PaymentDetaislModal";
import useUserTransactions from "../../hooks/useUserTransactions";

const Payment = () => {
  const { user } = useContext(AuthContext);
  const [endOrder, setEndOrder] = useState("");
  const [userOrder] = userEndOrder();
  const [branch, SetBranch] = useState([]);
  const [seeTransaction, setSeeTransaction] = useState(null);
  const [transactions] = useUserTransactions();

  // modal
  const [detailsShow, setDetailsShow] = useState(false);
  const handleDetailsShow = () => setDetailsShow(!detailsShow);

  useEffect(() => {
    if (userOrder) {
      const lastOrder = userOrder[userOrder?.length - 1];

      setEndOrder(lastOrder);
      const fetchData = async () => {
        try {
          const response = await axios.get("https://api.psh.com.bd/api/branch");
          SetBranch(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, [userOrder, user]);

  return (
    <div className="md:p-0 sm:p-2">
      {/* <div className="md:hidden sm:block">
        <MenuList />
      </div> */}
      <h2 className="mb-5 text-[32px] py-2 font-bold">Transaction History</h2>
      {transactions?.length > 0 ? (
        <Card className="h-full w-full lg:overflow-hidden md:overflow-x-scroll sm:overflow-x-scroll ">
          <table className=" text-center border">
            <thead>
              <tr>
                <th className="border border-blue-gray-100 bg-blue-gray-50 p-2 ">
                  <Typography
                    className="font-normal leading-none opacity-70
                        "
                  >
                    Booking ID
                  </Typography>
                </th>

                <th className="border border-blue-gray-100 bg-blue-gray-50 p-2">
                  <Typography className="font-normal leading-none opacity-70">
                    Transaction Date
                  </Typography>
                </th>
                <th className="border border-blue-gray-100 bg-blue-gray-50 p-2">
                  <Typography className="font-normal leading-none opacity-70">
                    Payment Amount
                  </Typography>
                </th>

                <th className="border border-blue-gray-100 bg-blue-gray-50 p-2">
                  <Typography className="font-normal leading-none opacity-70">
                    Action
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => {
                const formattedDate = new Date(transaction?.createdAt)
                  ?.toLocaleString()
                  ?.split(",")[0];

                return (
                  <tr className="border " key={transaction._id}>
                    <td className="p-3 border">
                      <Typography className="font-normal">
                        {transaction.orderId?.slice(19)}
                      </Typography>
                    </td>

                    <td className="p-2 border">
                      <Typography className="font-normal">
                        {transaction?.paymentDate?.split("T")[0]}
                      </Typography>
                    </td>

                    <td className="p-2 border">
                      <Typography as="span" href="#" className="font-medium">
                        Tk {transaction?.receivedTk?.toLocaleString()}
                      </Typography>
                    </td>

                    <td
                      className="p-2  justify-center border"
                      onClick={() => setSeeTransaction(transaction)}
                    >
                      <button
                        onClick={handleDetailsShow}
                        className="bg-[#35b0a7] text-white px-2 rounded"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      ) : (
        <p className="text-center mt-10 text-red-500 text-xl">
          No Transaction Found
        </p>
      )}
      <PaymentDetaislModal
        handleDetailsShow={handleDetailsShow}
        detailsShow={detailsShow}
        seeTransaction={seeTransaction}
        branch={branch}
      />
    </div>
  );
};
export default Payment;
