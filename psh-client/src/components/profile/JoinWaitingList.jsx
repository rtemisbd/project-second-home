import { Card, Typography } from "@material-tailwind/react";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import JoinWaitingListModal from "./JoinWaitingListModal";
import userEndOrder from "../../hooks/userEndOrder";
import { AuthContext } from "../../contexts/UserProvider";

const JoinWaitingList = () => {
  const { user } = useContext(AuthContext);
  const [endOrder, setEndOrder] = useState("");
  const [userOrder] = userEndOrder();
  const [branch, SetBranch] = useState([]);
  const [seeBooking, setSeeBooking] = useState(null);

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

  //   const formattedDate = new Date(endOrder?.createdAt)
  //     ?.toLocaleString()
  //     ?.split(",")[0];

  const findOrderBranch = branch.find(
    (branch) => branch?._id === endOrder?.bookingInfo?.data?.branch
  );

  return (
    <div>
      <h2 className="mb-5 text-[32px] py-2 font-bold">Join Waiting List</h2>

      <Card className="h-full w-full lg:overflow-hidden md:overflow-x-scroll sm:overflow-x-scroll">
        <table className="w-full min-w-max table-auto text-left border">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 ">
                <Typography
                  className="font-normal leading-none 
                        "
                >
                  Booking ID
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography className="font-normal leading-none">
                  Branch
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography className="font-normal leading-none ">
                  Booking Date
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography className="font-normal leading-none ">
                  Booking Status
                </Typography>
              </th>

              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography className="font-normal leading-none ">
                  Total Amount
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography className="font-normal leading-none ">
                  Payment Status
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography className="font-normal leading-none ">
                  Action
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography className="font-normal">1240Abc</Typography>
              </td>
              <td className="p-4">
                <Typography className="font-normal">
                  {/* {findOrderBranch?.name} */}
                  Mirpur
                </Typography>
              </td>
              <td className="p-4">
                <Typography className="font-normal">
                  {/* {format(new Date(formattedDate), "dd MMMM, yyyy")} */}
                  14-09-23
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  as="span"
                  href="#"
                  className="font-medium text-red-500"
                >
                  {/* {endOrder?.status} */}
                  Approved
                </Typography>
              </td>
              <td className="p-4">
                <Typography as="span" href="#" className="font-medium">
                  {/* {endOrder?.bookingInfo?.totalAmount} */}
                  25000
                </Typography>
              </td>
              <td className="p-4">
                <Typography as="span" href="#" className="font-medium">
                  Unpaid
                </Typography>
              </td>
              <td className="pr-2" onClick={() => setSeeBooking(endOrder)}>
                <button onClick={handleDetailsShow}>View Details</button>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
      {/* Waiting List Details Modal */}
      <JoinWaitingListModal
        handleDetailsShow={handleDetailsShow}
        detailsShow={detailsShow}
        endOrder={seeBooking}
        branch={branch}
      />
    </div>
  );
};

export default JoinWaitingList;
