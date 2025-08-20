import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/UserProvider";
import userEndOrder from "../../hooks/userEndOrder";
const BookNow = () => {
  const { user } = useContext(AuthContext);
  const [endOrder, setEndOrder] = useState("");
  const [userOrder] = userEndOrder();

  const navigate = useNavigate();

  useEffect(() => {
    if (userOrder) {
      const lastOrder = userOrder?.data?.orders[0];
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
            <span>Name</span>
          </p>
          <p>{endOrder?.userInfo?.firstName}</p>
        </div>
        {/* <hr className="mt-2" /> */}
        {/* <div className="flex justify-between mt-4">
          <p className="flex ">
            <span>Email</span> <span className="md:ml-[130px] sm:ml-2">:</span>
          </p>
          <p>{endOrder?.email}</p>
        </div> */}
        <hr className="mt-2" />
        <div className="flex justify-between mt-4">
          <p className="flex ">
            <span>Phone Number</span>{" "}
          </p>
          <p>{endOrder?.userInfo?.phone}</p>
        </div>
        <hr className="mt-2" />
        <div className="flex justify-between mt-4">
          <p className="flex ">
            <span>Address</span>{" "}
          </p>
          <p>{endOrder?.userInfo?.userAddress}</p>
        </div>
        <hr className="mt-2" />
        <div className="flex justify-between mt-4">
          <p className="flex ">
            <span>Coupon</span>
          </p>
          <p>None</p>
        </div>
        <hr className="mt-2" />
        <div className="flex justify-between mt-4">
          <p className="flex ">
            <span>Arrival Time</span>{" "}
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
            <span>Room Type</span>
          </p>
          <p>{endOrder?.roomType}</p>
        </div>
        <hr className="mt-2" />
        {endOrder?.roomType === "Shared Room" ? (
          <div className="flex justify-between mt-4">
            <p className="flex ">
              <span>Seat Number</span>{" "}
            </p>
            <p>{endOrder?.seat?.seatNumber}</p>
          </div>
        ) : (
          <div className="flex justify-between mt-4">
            <p className="flex ">
              <span>Room Number</span>{" "}
            </p>
            <p>{endOrder?.room?.roomNumber}</p>
          </div>
        )}

        <hr className="mt-2" />
        <div className="flex justify-between mt-4">
          <p className="flex ">
            <span>Check-In</span>{" "}
          </p>
          <p>{endOrder?.rentDate?.bookStartDate}</p>
        </div>
        <hr className="mt-2" />
        <div className="flex justify-between mt-4">
          <p className="flex ">
            <span>Check-Out</span>{" "}
          </p>
          <p>{endOrder?.rentDate?.bookEndDate}</p>
        </div>
        <hr className="mt-2" />
        <div className="flex justify-between mt-4">
          <p className="flex ">
            <span>Total Duration</span>{" "}
          </p>
          <p>
            {endOrder?.customerRent?.daysDifference >= 0
              ? `${endOrder?.customerRent?.daysDifference} days`
              : "" ||
                (endOrder?.customerRent?.months &&
                  endOrder?.customerRent?.days >= 0 &&
                  !endOrder?.customerRent?.years)
              ? `${endOrder?.customerRent?.months} months, ${endOrder?.customerRent?.days} days`
              : "" ||
                (endOrder?.customerRent?.years &&
                  endOrder?.customerRent?.months >= 0 &&
                  endOrder?.customerRent?.days >= 0)
              ? `${endOrder?.customerRent?.years} year`
              : ""}
          </p>
        </div>
        <hr className="mt-2" />
        <div className="flex justify-between mt-4">
          <p className="flex ">
            <span>Total Amount</span>{" "}
          </p>
          <p>Tk {endOrder?.totalAmount}</p>
        </div>
      </div>

      <div className="flex justify-center  mt-20">
        <div
          onClick={getInvoice}
          className="bg-[#35B0A7] md:px-[120px] sm:px-[60px] py-[8px] rounded"
        >
          <button className="text-xl text-white text-center">
            Get Invoice
          </button>
        </div>
        {/* <Link to={"/"}>
          <button className="bg-[#35B0A7] md:px-[120px] sm:px-[60px] py-[8px] rounded">
            HOME PAGE
          </button>
        </Link> */}
      </div>
    </div>
  );
};

export default BookNow;
