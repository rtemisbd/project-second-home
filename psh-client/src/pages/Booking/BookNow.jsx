import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/UserProvider";
import userEndOrder from "../../hooks/userEndOrder";
const BookNow = () => {
  const { user } = useContext(AuthContext);
  const [endOrder, setEndOrder] = useState("");
  const [userOrder] = userEndOrder();

  const navigate = useNavigate();

  useEffect(() => {
    if (userOrder) {
      const lastOrder = userOrder[userOrder?.length - 1];
      setEndOrder(lastOrder);
    }
  }, [userOrder, user]);

  const getInvoice = () => {
    navigate("/invoice", { state: endOrder });
  };

  // Page location top to path dependency
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className=" custom-container  py-20 text-black sm:p-10">
      {/* Personal Info */}
      <h2 className="flex justify-left font-bold mb-5 text-2xl">
        Your Information :
      </h2>
      <div className=" md:text-xl sm:text-sm">
        <div className="flex justify-between ">
          <p className="flex">
            <span>Name</span> <span className="md:ml-32 sm:ml-2">:</span>
          </p>
          <p>{endOrder?.fullName}</p>
        </div>
        <hr className="mt-2" />
        <div className="flex justify-between mt-4">
          <p className="flex ">
            <span>Email</span> <span className="md:ml-[130px] sm:ml-2">:</span>
          </p>
          <p>{endOrder?.email}</p>
        </div>
        <hr className="mt-2" />
        <div className="flex justify-between mt-4">
          <p className="flex ">
            <span>Phone Number</span>{" "}
            <span className="md:ml-[45px] sm:ml-2">:</span>
          </p>
          <p>{endOrder?.phone}</p>
        </div>
        <hr className="mt-2" />
        <div className="flex justify-between mt-4">
          <p className="flex ">
            <span>Address</span>{" "}
            <span className="ml-[32px] sm:mr-5 md:mr-0">:</span>
          </p>
          <p>{endOrder?.address}</p>
        </div>
        <hr className="mt-2" />
        <div className="flex justify-between mt-4">
          <p className="flex ">
            <span>Cuopon</span> <span className="md:ml-[110px] sm:ml-2">:</span>
          </p>
          <p>None</p>
        </div>
        <hr className="mt-2" />
        <div className="flex justify-between mt-4">
          <p className="flex ">
            <span>Arrival Time</span>{" "}
            <span className="ml-[75px] sm:ml-2">:</span>
          </p>
          <p>{endOrder?.arrivalTime}</p>
        </div>
      </div>
      {/* Booking Information */}

      <h2 className="flex justify-left font-bold mb-5 text-2xl mt-10">
        Booking Information :
      </h2>
      <div className="md:text-xl sm:text-sm">
        <div className="flex justify-between">
          <p className="flex">
            <span>Room Type</span> <span className="md:ml-20 sm:ml-2">:</span>
          </p>
          <p>{endOrder?.bookingInfo?.roomType}</p>
        </div>
        <hr className="mt-2" />
        {endOrder?.bookingInfo?.roomType === "Shared Room" ? (
          <div className="flex justify-between mt-4">
            <p className="flex ">
              <span>Seat Number</span>{" "}
              <span className="md:ml-[64px] sm:ml-2">:</span>
            </p>
            <p>{endOrder?.bookingInfo?.seatBooking?.seatNumber}</p>
          </div>
        ) : (
          <div className="flex justify-between mt-4">
            <p className="flex ">
              <span>Room Number</span>{" "}
              <span className="md:ml-[64px] sm:ml-2 ">:</span>
            </p>
            <p>{endOrder?.bookingInfo?.data?.roomNumber}</p>
          </div>
        )}

        <hr className="mt-2" />
        <div className="flex justify-between mt-4">
          <p className="flex ">
            <span>Check-In</span>{" "}
            <span className="md:ml-[102px] sm:ml-2">:</span>
          </p>
          <p>{endOrder?.bookingInfo?.rentDate?.bookStartDate}</p>
        </div>
        <hr className="mt-2" />
        <div className="flex justify-between mt-4">
          <p className="flex ">
            <span>Check-Out</span>{" "}
            <span className="md:ml-[85px] sm:ml-2">:</span>
          </p>
          <p>{endOrder?.bookingInfo?.rentDate?.bookEndDate}</p>
        </div>
        <hr className="mt-2" />
        <div className="flex justify-between mt-4">
          <p className="flex ">
            <span>Total Duration</span>{" "}
            <span className="md:ml-[58px] sm:ml-2">:</span>
          </p>
          <p>
            {endOrder?.bookingInfo?.customerRent?.daysDifference >= 0
              ? `${endOrder?.bookingInfo?.customerRent?.daysDifference} days`
              : "" ||
                (endOrder?.bookingInfo?.customerRent?.months &&
                  endOrder?.bookingInfo?.customerRent?.days >= 0 &&
                  !endOrder?.bookingInfo?.customerRent?.years)
              ? `${endOrder?.bookingInfo?.customerRent?.months} months, ${endOrder?.bookingInfo?.customerRent?.days} days`
              : "" ||
                (endOrder?.bookingInfo?.customerRent?.years &&
                  endOrder?.bookingInfo?.customerRent?.months >= 0 &&
                  endOrder?.bookingInfo?.customerRent?.days >= 0)
              ? `${endOrder?.bookingInfo?.customerRent?.years} year`
              : ""}
          </p>
        </div>
        <hr className="mt-2" />
        <div className="flex justify-between mt-4">
          <p className="flex ">
            <span>Total Amount</span>{" "}
            <span className="md:ml-[64px] sm:ml-2">:</span>
          </p>
          <p>Tk {endOrder?.bookingInfo?.totalAmount}</p>
        </div>
      </div>

      <div className="flex justify-center mt-20">
        <div
          onClick={getInvoice}
          className="bg-[#35B0A7] md:px-[120px] sm:px-[60px] py-[8px] rounded"
        >
          <button className="text-xl text-white">Get Invoice</button>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
