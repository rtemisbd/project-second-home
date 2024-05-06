import { useEffect } from "react";
import { useState } from "react";
import userEndOrder from "../../hooks/userEndOrder";
import { useContext } from "react";
import axios from "axios";
import { Card, Typography } from "@material-tailwind/react";
import { Toaster } from "react-hot-toast";

import { UserBooking } from "./UserBooking";
import { AuthContext } from "../../contexts/UserProvider";
import { CancelBooking } from "./CancelBooking";

export default function Booking() {
  const { user } = useContext(AuthContext);
  const [bookingValue, setBookingValue] = useState(1);
  const [activeTab, setActiveTab] = useState("booking");
  const [active, setActive] = useState(0);
  const [endOrder, setEndOrder] = useState();
  const [userOrder] = userEndOrder();
  const [branch, SetBranch] = useState([]);
  const [bookingBranch, SetBookingBranch] = useState({});
  const [seeBooking, setSeeBooking] = useState(null);

  // modal
  const [detailsShow, setDetailsShow] = useState(false);
  const handleDetailsShow = () => setDetailsShow(!detailsShow);
  // Cancel Modal
  const [cancelShow, setCancelShow] = useState(false);
  const handleCancelShow = () => setCancelShow(!cancelShow);

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

    const findOrderBranch = branch?.find(
      (branch) => branch?._id === endOrder?.bookingInfo?.branch
    );
    SetBookingBranch(findOrderBranch);
  }, [userOrder, user, endOrder?.bookingInfo?.branch]);

  // const profileBookgings = [
  //   {
  //     id: 1,
  //     label: "Present Booking",
  //     value: "Present Booking",
  //   },

  //   {
  //     id: 2,
  //     label: "Upcomming Bookings",
  //     value: "Upcomming Bookings",
  //   },
  //   {
  //     id: 3,
  //     label: "Past Bookings",
  //     value: "Past Bookings",
  //   },
  // ];
  const handleSelectChange = (value) => {
    setActiveTab(value);
  };

  return (
    <div className="md:p-0 sm:p-2">
      {/* <div className="md:hidden sm:block">
        <MenuList />
      </div> */}
      <h2 className="mb-5 text-[32px] py-2 font-bold">Booking History</h2>
      {userOrder?.length > 0 ? (
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
                    Branch
                  </Typography>
                </th>
                <th className="border border-blue-gray-100 bg-blue-gray-50 p-2">
                  <Typography className="font-normal leading-none opacity-70">
                    Booking Date
                  </Typography>
                </th>
                <th className="border border-blue-gray-100 bg-blue-gray-50 p-2">
                  <Typography className="font-normal leading-none opacity-70">
                    Booking Status
                  </Typography>
                </th>

                <th className="border border-blue-gray-100 bg-blue-gray-50 p-2">
                  <Typography className="font-normal leading-none opacity-70">
                    Payable Amount
                  </Typography>
                </th>
                <th className="border border-blue-gray-100 bg-blue-gray-50 p-2">
                  <Typography className="font-normal leading-none opacity-70">
                    Payment Status
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
              {userOrder
                ?.slice()
                ?.reverse()
                .map((order, i) => {
                  const findOrderBranch = branch.find(
                    (branch) => branch?._id === order?.bookingInfo?.branch
                  );
                  const formattedDate = new Date(order?.createdAt)
                    ?.toLocaleString()
                    ?.split(",")[0];

                  return (
                    <tr className="border " key={i}>
                      <td className="p-3 border">
                        <Typography className="font-normal">
                          #{order._id?.slice(19)}
                        </Typography>
                      </td>
                      <td className="p-2 border">
                        <Typography className="font-normal">
                          {order?.branch?.name}
                        </Typography>
                      </td>
                      <td className="p-2 border">
                        <Typography className="font-normal">
                          {/* {format(new Date(formattedDate), "dd MMMM, yyyy")} */}
                          {formattedDate}
                        </Typography>
                      </td>
                      <td className="p-2 border">
                        <Typography
                          as="span"
                          href="#"
                          className="font-bold "
                          style={{
                            color:
                              order?.status === "Approved" ? "#00bbb4" : "red",
                          }}
                        >
                          {order?.status}
                        </Typography>
                      </td>
                      <td className="p-2 border">
                        <Typography as="span" href="#" className="font-medium">
                          Tk {order?.payableAmount?.toLocaleString()}
                        </Typography>
                      </td>
                      <td className="p-2 border">
                        <Typography as="span" href="#" className="font-medium">
                          {order?.paymentStatus}
                        </Typography>
                      </td>
                      <td
                        className="p-2 flex justify-between border"
                        onClick={() => setSeeBooking(order)}
                      >
                        <button
                          onClick={handleDetailsShow}
                          className="bg-[#35b0a7] text-white px-2 rounded"
                        >
                          Details
                        </button>
                        <button
                          onClick={handleCancelShow}
                          className={` text-white px-2 rounded ${
                            order?.status === "Canceled"
                              ? "bg-red-200"
                              : "bg-red-500"
                          }`}
                          disabled={order?.status === "Canceled" ? true : false}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <Toaster
            containerStyle={{ top: 300 }}
            toastOptions={{ position: "top-center" }}
          ></Toaster>
        </Card>
      ) : (
        <div className="text-center mt-10 text-red-500">No Booking Found</div>
      )}
      {/* booking Details Modal */}
      <UserBooking
        handleDetailsShow={handleDetailsShow}
        detailsShow={detailsShow}
        endOrder={seeBooking}
        branch={branch}
      />
      <CancelBooking
        handleCancelShow={handleCancelShow}
        cancelShow={cancelShow}
        endOrder={seeBooking}
        branch={branch}
      />
      {/* Upcomming Booking */}
    </div>
  );
}

// {
/* <Tabs value="Present Booking">
<TabsHeader>
  {profileBookgings.map((data) => (
    <Tab
      key={data.id}
      onClick={() => setBookingValue(data.id)}
      className={`${bookingValue === data.id ? "inset-0" : ""} `}
      value={data.value}
    >
      {data.label}
    </Tab>
  ))}
</TabsHeader>
<TabsBody>
  {endOrder ? (
    <TabPanel value="Present Booking" className="px-0">
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
                  Branch
                </Typography>
              </th>
              <th className="border border-blue-gray-100 bg-blue-gray-50 p-2">
                <Typography className="font-normal leading-none opacity-70">
                  Booking Date
                </Typography>
              </th>
              <th className="border border-blue-gray-100 bg-blue-gray-50 p-2">
                <Typography className="font-normal leading-none opacity-70">
                  Booking Status
                </Typography>
              </th>

              <th className="border border-blue-gray-100 bg-blue-gray-50 p-2">
                <Typography className="font-normal leading-none opacity-70">
                  Total Amount
                </Typography>
              </th>
              <th className="border border-blue-gray-100 bg-blue-gray-50 p-2">
                <Typography className="font-normal leading-none opacity-70">
                  Payment Status
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
            {userOrder.map((order) => {
              const findOrderBranch = branch.find(
                (branch) => branch?._id === order?.bookingInfo?.branch
              );
              const formattedDate = new Date(order?.createdAt)
                ?.toLocaleString()
                ?.split(",")[0];

              return (
                <tr className="border ">
                  <td className="p-3 border">
                    <Typography className="font-normal">
                      {order._id?.slice(19)}
                    </Typography>
                  </td>
                  <td className="p-2 border">
                    <Typography className="font-normal">
                      {findOrderBranch?.name}
                    </Typography>
                  </td>
                  <td className="p-2 border">
                    <Typography className="font-normal">
                      {format(new Date(formattedDate), "dd MMMM, yyyy")}
                    </Typography>
                  </td>
                  <td className="p-2 border">
                    <Typography
                      as="span"
                      href="#"
                      className="font-bold text-red-500"
                    >
                      {order?.status}
                    </Typography>
                  </td>
                  <td className="p-2 border">
                    <Typography
                      as="span"
                      href="#"
                      className="font-medium"
                    >
                      Tk {order?.bookingInfo?.totalAmount}
                    </Typography>
                  </td>
                  <td className="p-2 border">
                    <Typography
                      as="span"
                      href="#"
                      className="font-medium"
                    >
                      {order?.paymentStatus}
                    </Typography>
                  </td>
                  <td
                    className="p-2 flex justify-between border"
                    onClick={() => setSeeBooking(order)}
                  >
                    <button
                      onClick={handleDetailsShow}
                      className="bg-[#35b0a7] text-white px-2 rounded"
                    >
                      Details
                    </button>
                    <button
                      onClick={handleCancelShow}
                      className="bg-red-500 text-white px-2 rounded"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </TabPanel>
  ) : (
    <div className="text-center mt-10">No Booking Found</div>
  )}
  {/* booking Details Modal */
// }
// <UserBooking
//   handleDetailsShow={handleDetailsShow}
//   detailsShow={detailsShow}
//   endOrder={seeBooking}
//   branch={branch}
// />
// <CancelBooking
//   handleCancelShow={handleCancelShow}
//   cancelShow={cancelShow}
//   endOrder={seeBooking}
//   branch={branch}
// />
// {
//   /* Upcomming Booking */
// }

//   {endOrder ? (
//     <TabPanel value="Upcomming Bookings" className="px-0">
//       <Card className="h-full w-full lg:overflow-hidden md:overflow-x-scroll sm:overflow-x-scroll">
//         <table className="w-full min-w-max table-auto text-left border">
//           <thead>
//             <tr>
//               {/* <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 ">
//                 <Typography
//                   className="font-normal leading-none opacity-70
//                   "
//                 >
//                   Booking ID
//                 </Typography>
//               </th> */}
//               <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                 <Typography className="font-normal leading-none opacity-70">
//                   Branch
//                 </Typography>
//               </th>
//               <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                 <Typography className="font-normal leading-none opacity-70">
//                   Booking Date
//                 </Typography>
//               </th>
//               <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                 <Typography className="font-normal leading-none opacity-70">
//                   Booking Status
//                 </Typography>
//               </th>

//               <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                 <Typography className="font-normal leading-none opacity-70">
//                   Total Amount
//                 </Typography>
//               </th>
//               <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                 <Typography className="font-normal leading-none opacity-70">
//                   Payment Status
//                 </Typography>
//               </th>

//               <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                 <Typography className="font-normal leading-none opacity-70">
//                   Action
//                 </Typography>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="even:bg-blue-gray-50/50">
//               {/* <td className="p-4">
//                 <Typography className="font-normal">
//                   {endOrder._id?.slice(15)}
//                 </Typography>
//               </td> */}
//               <td className="p-4">
//                 <Typography className="font-normal">
//                   {bookingBranch?.name}
//                 </Typography>
//               </td>
//               <td className="p-4">
//                 <Typography className="font-normal">
//                   {/* {format(new Date(formattedDate), "dd MMMM, yyyy")} */}
//                 </Typography>
//               </td>
//               <td className="p-4">
//                 <Typography
//                   as="span"
//                   href="#"
//                   className="font-bold text-red-500"
//                 >
//                   {endOrder?.status}
//                 </Typography>
//               </td>
//               <td className="p-4">
//                 <Typography as="span" href="#" className="font-medium">
//                   {endOrder?.bookingInfo?.totalAmount}
//                 </Typography>
//               </td>
//               <td className="p-4">
//                 <Typography as="span" href="#" className="font-medium">
//                   Unpaid
//                 </Typography>
//               </td>
//               <td
//                 className="pr-2"
//                 onClick={() => setSeeBooking(endOrder)}
//               >
//                 <button onClick={handleDetailsShow}>View Details</button>
//                 <button onClick={handleDetailsShow}>Cancel</button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </Card>
//     </TabPanel>
//   ) : (
//     <div className="text-center mt-10">No Booking Found</div>
//   )}
//   {/* booking Details Modal */}
//   <UserBooking
//     handleDetailsShow={handleDetailsShow}
//     detailsShow={detailsShow}
//     endOrder={seeBooking}
//     branch={branch}
//   />
//   {endOrder ? (
//     <TabPanel value="Past Bookings" className="px-0">
//       <Card className="h-full w-full lg:overflow-hidden md:overflow-x-scroll sm:overflow-x-scroll">
//         <table className="w-full min-w-max table-auto text-left border">
//           <thead>
//             <tr>
//               {/* <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 ">
//                 <Typography
//                   className="font-normal leading-none opacity-70
//                   "
//                 >
//                   Booking ID
//                 </Typography>
//               </th> */}
//               <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                 <Typography className="font-normal leading-none opacity-70">
//                   Branch
//                 </Typography>
//               </th>
//               <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                 <Typography className="font-normal leading-none opacity-70">
//                   Booking Date
//                 </Typography>
//               </th>
//               <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                 <Typography className="font-normal leading-none opacity-70">
//                   Booking Status
//                 </Typography>
//               </th>

//               <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                 <Typography className="font-normal leading-none opacity-70">
//                   Total Amount
//                 </Typography>
//               </th>
//               <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                 <Typography className="font-normal leading-none opacity-70">
//                   Payment Status
//                 </Typography>
//               </th>
//               <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                 <Typography className="font-normal leading-none opacity-70">
//                   Action
//                 </Typography>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="even:bg-blue-gray-50/50">
//               {/* <td className="p-4">
//                 <Typography className="font-normal">
//                   {endOrder._id?.slice(15)}
//                 </Typography>
//               </td> */}
//               <td className="p-4">
//                 <Typography className="font-normal">
//                   {bookingBranch?.name}
//                 </Typography>
//               </td>
//               <td className="p-4">
//                 <Typography className="font-normal">
//                   {/* {format(new Date(formattedDate), "dd MMMM, yyyy")} */}
//                 </Typography>
//               </td>
//               <td className="p-4">
//                 <Typography
//                   as="span"
//                   href="#"
//                   className="font-medium text-red-500"
//                 >
//                   {endOrder?.status}
//                 </Typography>
//               </td>
//               <td className="p-4">
//                 <Typography as="span" href="#" className="font-medium">
//                   {endOrder?.bookingInfo?.totalAmount}
//                 </Typography>
//               </td>
//               <td className="p-4">
//                 <Typography as="span" href="#" className="font-medium">
//                   Unpaid
//                 </Typography>
//               </td>
//               <td
//                 className="pr-2"
//                 onClick={() => setSeeBooking(endOrder)}
//               >
//                 <button onClick={handleDetailsShow}>View Details</button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </Card>
//     </TabPanel>
//   ) : (
//     <div className="text-center mt-10">No Booking Found</div>
//   )}
//   {/* booking Details Modal */}
//   <UserBooking
//     handleDetailsShow={handleDetailsShow}
//     detailsShow={detailsShow}
//     endOrder={seeBooking}
//     branch={branch}
//   />
// </TabsBody>
// </Tabs> */}
