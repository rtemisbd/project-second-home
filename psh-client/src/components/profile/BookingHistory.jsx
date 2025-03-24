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
import BookingCard from "./BookingCard";
import getHeader from "../../helpers/utils/getHeaders";

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
  const [due, setDue] = useState(0);

  const { page, size } = useSelector((state) => state.pagination);

  const handleDetailsShow = (order) => {
    setOrder(order);
    setDetailsShow(!detailsShow);
  };
  const handleCancelShow = (order) => {
    setOrder(order);
    setCancelShow(!cancelShow);
  };
  const handleMakePaymentShow = (order, payableAmount) => {
    setOrder(order);
    if (order?.transactions[0]?.totalReceiveTk) {
      setDue(payableAmount - order?.transactions[0]?.totalReceiveTk);
    } else {
      setDue(payableAmount);
    }
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
        const headers = getHeader();
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
            headers,
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
              <BookingCard
                key={order?._id}
                order={order}
                handleMakePaymentShow={handleMakePaymentShow}
                handleCancelShow={handleCancelShow}
                handleDetailsShow={handleDetailsShow}
                setOrder
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center mt-10 text-red-500">No Booking Found</div>
      )}
      {totalCount ? <Pagination totalCount={totalCount} /> : <></>}
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
        due={due}
      />
    </div>
  );
};

export default BookingHistory;
