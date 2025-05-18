import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useUser from "../../hooks/userUser";
import axios from "axios";
import { serverBaseUrl } from "../../serverApi/baseUrl";

const VillaBookingConfirmation = () => {
  const location = useLocation();
  const orderId = location.state || {};
  const [singleUser] = useUser();
  const [booking, setBooking] = useState({});

  useEffect(() => {
    const fetchBooking = async () => {
      const { data } = await axios.get(
        `${serverBaseUrl}/villa-order/${orderId}`
      );
      setBooking(data?.data);
    };
    fetchBooking();
  }, [orderId]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-gray-900">
      <div className="flex justify-center items-center">
        <img
          loading="lazy"
          src="https://i.ibb.co/gD2pdvf/Thank-you-PSH-1.png"
          alt=""
        />
      </div>
      <div className=" custom-container  py-20 text-black sm:p-10">
        {/* Personal Info */}
        <h2 className="flex justify-left font-bold mb-5 text-2xl">
          Your Information :
        </h2>

        <div className=" md:text-xl sm:text-sm">
          <div className="flex justify-between ">
            <p className="flex justify-between gap-2 md:w-1/6">
              <span>Name</span> <span>:</span>
            </p>
            <p>{singleUser?.firstName}</p>
          </div>

          <hr className="mt-2" />
          <div className="flex justify-between mt-4">
            <p className="flex justify-between gap-2  md:w-1/6">
              <span>Phone Number</span> <span>:</span>
            </p>
            <p>{singleUser?.phone}</p>
          </div>
          <hr className="mt-2" />
          <div className="flex justify-between mt-4">
            <p className="flex justify-between gap-2 md:w-1/6">
              <span>Address</span> <span>:</span>
            </p>
            <p>{singleUser?.userAddress}</p>
          </div>
        </div>

        {/* Booking Information */}

        <h2 className="flex justify-left font-bold mb-5 text-2xl mt-10">
          Booking Information :
        </h2>
        <div className="md:text-xl sm:text-sm">
          <div className="grid grid-cols-6 mt-4">
            <p className="col-span-2 md:col-span-1">Booking Id</p>
            <p className=" justify-self-start">:</p>
            <p className="col-span-3 md:col-span-4 justify-self-end">
              {booking?.bookingId}
            </p>
          </div>
          <hr className="mt-2" />
          <div className="grid grid-cols-6 mt-4">
            <p>Resort</p>
            <p className=" justify-self-end md:justify-self-start">:</p>
            <p className="col-span-4 justify-self-end">
              {booking?.villa?.resortId?.name}
            </p>
          </div>
          <hr className="mt-2" />
          <div className="grid grid-cols-6 mt-4">
            <p className="col-span-2 md:col-span-1">Villa Name</p>
            <p className=" justify-self-start">:</p>
            <p className="col-span-3 md:col-span-4 justify-self-end">
              {booking?.villa?.title}
            </p>
          </div>
          <hr className="mt-2" />
          <div className="grid grid-cols-6 mt-4">
            <p className="col-span-2 md:col-span-1">Villa Number</p>
            <p className=" justify-self-start">:</p>
            <p className="col-span-3 md:col-span-4 justify-self-end">
              {booking?.villa?.villaNumber}
            </p>
          </div>
          <hr className="mt-2" />
          <div className="grid grid-cols-6 mt-4">
            <p className="col-span-2 md:col-span-1">Villa Type</p>
            <p className=" justify-self-start">:</p>
            <p className="col-span-3 md:col-span-4 justify-self-end">
              {booking?.villa?.type}
            </p>
          </div>
          <hr className="mt-2" />
          <div className="grid grid-cols-6 mt-4">
            <p className="col-span-2 md:col-span-1">Check In</p>
            <p className=" justify-self-start">:</p>
            <p className="col-span-3 md:col-span-4 justify-self-end">
              {booking?.rentDate?.bookStartDate}
            </p>
          </div>
          <hr className="mt-2" />
          <div className="grid grid-cols-6 mt-4">
            <p className="col-span-2 md:col-span-1">Check Out</p>
            <p className=" justify-self-start">:</p>
            <p className="col-span-3 md:col-span-4 justify-self-end">
              {booking?.rentDate?.bookEndDate}
            </p>
          </div>
          <hr className="mt-2" />
          <div className="grid grid-cols-6 mt-4">
            <p className="col-span-2 md:col-span-1">Total Duration</p>
            <p className=" justify-self-start">:</p>
            <p className="col-span-3 md:col-span-4 justify-self-end">
              {booking?.rentDate?.daysDifference}{" "}
              {booking?.rentDate?.daysDifference === 1 ? "Night" : "Nights"}
            </p>
          </div>
          <hr className="mt-2" />
          <div className="grid grid-cols-6 mt-4">
            <p className="col-span-2 md:col-span-1">Total Amount</p>
            <p className=" justify-self-start">:</p>
            <p className="col-span-3 md:col-span-4 justify-self-end">
              BDT {booking?.totalAmount}
            </p>
          </div>
          <hr className="mt-2" />
        </div>

        <div className="flex justify-center  mt-20">
          <div
            // onClick={getInvoice}
            className="bg-[#35B0A7] md:px-[120px] sm:px-[60px] py-[8px] rounded"
          >
            <button className="text-xl text-white text-center">
              Get Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaBookingConfirmation;
