import React, { useContext, useEffect, useState } from "react";

import { UserBooking } from "./UserBooking";
import { CancelBooking } from "./CancelBooking";
import MakePayment from "./MakePayment";
import { useQuery } from "react-query";
import { serverBaseUrl } from "../../serverApi/baseUrl";
import { AuthContext } from "../../contexts/UserProvider";
import Pagination from "../pagination/Pagination";
import { useSelector } from "react-redux";
import { MdRefresh } from "react-icons/md";

const BookingHistory = () => {
  const { user } = useContext(AuthContext);
  const [userOrder, setUserOrder] = useState(null);
  const [detailsShow, setDetailsShow] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const [makePaymentShow, setMakePaymentShow] = useState(false);
  const [order, setOrder] = useState(null);
  const [totalCount, setTotalCount] = useState();
  const [paymentStatus, setPaymentStatus] = useState("All");
  const [bookingStatus, setBookingStatus] = useState("All");

  const { page, size } = useSelector((state) => state.pagination);

  const handleDetailsShow = (order) => {
    setOrder(order);
    setDetailsShow(!detailsShow);
  };
  const handleCancelShow = (order) => {
    setOrder(order);
    setCancelShow(!cancelShow);
  };
  const handleMakePaymentShow = (order) => {
    setOrder(order);
    setMakePaymentShow(!makePaymentShow);
  };

  const handleRefreshQuery = () => {
    setPaymentStatus("All");
    document.getElementById("paymentStatusId").value = "All";
    setBookingStatus("All");
    document.getElementById("bookingStatusId").value = "All";
  };

  const { refetch } = useQuery(
    ["fetchBookings"],
    async () => {
      try {
        const queryParams = new URLSearchParams({
          page,
          size,
          bookingStatus,
          paymentStatus,
        });

        const response = await fetch(
          `${serverBaseUrl}/order/${user?.phone}?${queryParams.toString()}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Network Error");
        }

        const { data } = await response.json();

        setUserOrder(data?.orders);
        setTotalCount(data?.totalCount);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  // // Re-fetch data whenever size changes
  useEffect(() => {
    refetch();
  }, [page, size, bookingStatus, paymentStatus]);

  return (
    <div className="md:p-0 sm:p-2">
      <h2 className="mb-5 text-[32px] py-2 font-bold">Booking History</h2>
      <div className="flex justify-end items-end text-sm mb-8 font-bold gap-4">
        <div>
          <span htmlFor="">Payment Status </span>
          <br />
          <select
            className="rounded border h-7 w-32 mt-2"
            onChange={(e) => setPaymentStatus(e.target.value)}
            id="paymentStatusId"
            value={paymentStatus}
          >
            <option>All</option>

            <option>Paid</option>
            <option>Unpaid</option>
          </select>
        </div>
        <div>
          <span htmlFor="">Booking Status </span> <br />
          <select
            className="rounded border h-7 w-32 mt-2"
            onChange={(e) => setBookingStatus(e.target.value)}
            id="bookingStatusId"
            value={bookingStatus}
          >
            <option value="All">All</option>

            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Canceled">Canceled</option>
            <option value="Processing">Processing</option>
          </select>
        </div>

        {/* refresh */}
        <button type="button" onClick={handleRefreshQuery}>
          <MdRefresh size={28} color="#00BBB4" />
        </button>
      </div>
      {userOrder?.length > 0 ? (
        <>
          <div className="h-full w-full lg:overflow-hidden md:overflow-x-scroll sm:overflow-x-scroll grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 pb-8">
            {userOrder.map((order) => (
              <div
                key={order?._id}
                className=" border-2 border-opacity-5 border-gray-600 shadow-md rounded-lg"
              >
                <div className="p-3 ">
                  <div className="m-0 rounded-none">
                    <h2 className="font-bold">
                      Booking Id : {order?.bookingId}
                    </h2>
                    <p className="font-bold text-sm">
                      Booking Date :{" "}
                      {
                        new Date(order?.bookingInfo?.rentDate?.bookStartDate)
                          ?.toLocaleString()
                          ?.split(",")[0]
                      }{" "}
                      -{" "}
                      {
                        new Date(order?.bookingInfo?.rentDate?.bookEndDate)
                          ?.toLocaleString()
                          ?.split(",")[0]
                      }
                    </p>
                    <h2 className="font-bold text-sm">
                      Room Category : {order?.bookingInfo?.roomType}
                    </h2>
                    <h2 className="font-bold text-sm">
                      Branch : {order?.branch?.name}
                    </h2>
                    <div className="w-full flex justify-end mb-2 pr-4">
                      <p className="text-sm">
                        Booking Status :{" "}
                        <span
                          className="font-bold "
                          style={{
                            color:
                              order?.status === "Approved" ? "#00bbb4" : "red",
                          }}
                        >
                          {order?.status}
                        </span>
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="p-2 text-sm">
                    <p>
                      Payable Amount :{" "}
                      <span className="font-bold ">
                        BDT {order?.payableAmount}
                      </span>
                    </p>
                    <p>
                      Total Paid :{" "}
                      <span className="font-bold ">
                        BDT{" "}
                        {order?.transactions[0]?.totalReceiveTk
                          ? order?.transactions[0]?.totalReceiveTk
                          : 0}
                      </span>
                    </p>
                    <p>
                      Due Amount :{" "}
                      <span
                        className={`font-bold `}
                        style={{
                          color:
                            order?.payableAmount -
                              order?.transactions[0]?.totalReceiveTk !==
                            0
                              ? "red"
                              : "green",
                        }}
                      >
                        BDT{" "}
                        {order?.transactions[0]?.totalReceiveTk
                          ? order?.payableAmount -
                            order?.transactions[0]?.totalReceiveTk
                          : order?.payableAmount}
                      </span>
                    </p>
                    <p>
                      Payment Status :{" "}
                      <span
                        className="font-bold "
                        style={{
                          color:
                            order?.paymentStatus === "Paid" ? "#00bbb4" : "red",
                        }}
                      >
                        {order?.paymentStatus}
                      </span>
                    </p>
                  </div>
                  <div className="p-0">
                    <div className="p-2 flex justify-end gap-2 ">
                      <button
                        onClick={() => handleDetailsShow(order)}
                        className="bg-[#35b0a7] text-white px-1 py-1 md:px-2 rounded"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleMakePaymentShow(order)}
                        className={` text-white px-1 py-1 md:px-2 rounded ${
                          order?.status === "Canceled"
                            ? "bg-red-200"
                            : "bg-[#FCA22A]"
                        } ${order?.paymentStatus === "Paid" ? "hidden" : ""}`}
                        disabled={order?.status === "Canceled" ? true : false}
                      >
                        Make Payment
                      </button>
                      <button
                        onClick={() => handleCancelShow(order)}
                        className={` text-white px-1 py-1 md:px-2 rounded ${
                          order?.status === "Canceled"
                            ? "bg-red-200"
                            : "bg-red-500"
                        }`}
                        disabled={order?.status === "Canceled" ? true : false}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center mt-10 text-red-500">No Booking Found</div>
      )}
      {totalCount && <Pagination totalCount={totalCount} />}
      <UserBooking
        handleDetailsShow={handleDetailsShow}
        detailsShow={detailsShow}
        order={order}
      />
      <CancelBooking
        handleCancelShow={handleCancelShow}
        cancelShow={cancelShow}
        endOrder={order}
      />
      <MakePayment
        handleMakePaymentShow={handleMakePaymentShow}
        makePaymentShow={makePaymentShow}
        order={order}
      />
    </div>
  );
};

export default BookingHistory;
