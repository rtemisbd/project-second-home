import React, { useEffect } from "react";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useContext } from "react";
import { useRef } from "react";

import axios from "axios";
import StarRatings from "react-star-ratings";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { AuthContext } from "../../contexts/UserProvider";
import { serverBaseUrl } from "../../serverApi/baseUrl";

export function UserBooking({ handleDetailsShow, detailsShow, order }) {
  const { user } = useContext(AuthContext);
  const userName = user?.firstName;
  const navigate = useNavigate();
  const propertyId =
    order?.roomType === "Shared Room" ? order?.seatBooking?._id : order?.roomId;
  const formRef = useRef(null);

  const [roomCategory, setRoomCategory] = useState(null);
  const [rating, setRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");


  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data2 = {
      comment: formData.get("comment"),
      category: selectedCategory,
    };
    try {
      const product = {
        ...data2,
        userName,
        propertyId,
        rating,
      };

      await axios.post(`${serverBaseUrl}/review`, product);
      toast.success("Thanks ! for Your Review ");
      formRef.current.reset();
      handleDetailsShow();
    } catch (err) {
      toast.error("Something Error Found.", "warning");
    }
  };

  const getInvoice = () => {
    navigate("/invoice", { state: order });
    window.open(route, "_blank");
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const { data } = await axios.get(`${serverBaseUrl}/category`);

      const selected = data?.find((item) => item?.name === order?.roomType);
      setRoomCategory(selected?._id);
    };
    fetchCategory();
  }, [order?.roomType]);


 

  return (
    <>
      <Dialog open={detailsShow} size="md" className="">
        <DialogHeader>
          <h2 className="text-xl font-bold md:py-0 sm:py-2">Booking Details</h2>
        </DialogHeader>
        <DialogBody
          divider
          className="  lg:h-[33rem] xl:h-[50rem] md:h-[30rem] sm:h-[30rem] xs:h-[30rem] overflow-scroll "
        >
          {/* booking summary */}
          <div className="ps-4 w-full mt-5">
            <div className="flex justify-between items-center">
              <h2 className="text-start text-xl text-[#00BBB4]">
                Booking Summary
              </h2>
              <div className="flex">
                {" "}
                <p
                  className="text-sm bg-[#00BBB4] text-white px-2 py-1 rounded cursor-pointer"
                  onClick={getInvoice}
                >
                  {" "}
                  Get Invoice
                </p>
                <Link
                  to={`/${roomCategory}/${order?.roomName}/${propertyId}`}
                  target="_blank"
                >
                  <p className="text-sm pt-1  px-3 rounded hover:text-[#00BBB4]">
                    {" "}
                    Visit Room
                  </p>
                </Link>
              </div>
            </div>
            <div className="w-full flex justify-between mt-4 text-sm">
              <div className="flex justify-between w-[250px]">
                <div className="">
                  <span className="block text-start">Booking ID </span>
                  <span className="block text-start">Branch Name</span>
                  <span className="block text-start">Room Type</span>
                  <span className="block text-start">Room Number </span>
                </div>
                <div className="">
                  <span className="block text-start">: </span>
                  <span className="block text-start">:</span>
                  <span className="block text-start">:</span>
                  <span className="block text-start">: </span>
                </div>
                <div className="">
                  <span className="block text-start font-bold">
                    {" "}
                    {order?.bookingId}
                  </span>
                  <span className="block text-start font-bold">
                    {order?.branchDetails?.name}
                  </span>
                  <span className="block text-start font-bold">
                    {" "}
                    {order?.roomType}
                  </span>
                  <span className="block text-start font-bold">
                    {" "}
                    {order?.room?.roomNumber}
                  </span>
                </div>
              </div>
              <div className="flex justify-between md:w-[250px] sm:w-full">
                <div className="">
                  <span className="block ">Check In</span>
                  <span className="block ">Check Out</span>
                  <span className="block ">Duration</span>
                  <span className="block ">Booking Status</span>
                </div>
                <div className="">
                  <span className="block text-start">: </span>
                  <span className="block text-start">:</span>
                  <span className="block text-start">:</span>
                  <span className="block text-start">: </span>
                </div>
                <div className="">
                  <span className="block font-bold text-start">
                    {order?.rentDate?.bookStartDate}
                  </span>
                  <span className="block font-bold text-start">
                    {order?.rentDate?.bookEndDate}
                  </span>
                  <span className="block font-bold text-start">
                    {`${
                      order?.customerRent?.daysDifference >= 0
                        ? `${order?.customerRent?.daysDifference} Days`
                        : "" ||
                          (order?.customerRent?.months &&
                            order?.customerRent?.days >= 0 &&
                            !order?.customerRent?.years)
                        ? `${order?.customerRent?.months} months, ${order?.customerRent?.days} Days`
                        : "" ||
                          (order?.customerRent?.years &&
                            order?.customerRent?.months >= 0 &&
                            order?.customerRent?.days >= 0)
                        ? `${order?.customerRent?.years} years, ${order?.customerRent?.months} months, ${order?.customerRent?.days} Days`
                        : ""
                    }`}
                  </span>
                  <span
                    className="block font-bold text-start"
                    style={{
                      color: order?.status === "Approved" ? "green" : "red",
                    }}
                  >
                    {order?.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* payment summary */}
          <div className="ps-4 w-full mt-5">
            <h2 className="text-start text-xl text-[#00BBB4] mt-4 ">
              Payment Summary
            </h2>
            <div className="w-2/3 flex justify-between gap-10 mt-3 text-sm">
              <div className="flex justify-between w-[250px]">
                <div className="">
                  <span className="block text-start">Payment Status</span>
                  <span className="block text-start">Total Amount</span>
                  <span className="block text-start">Total Discount</span>
                  <span className="block text-start">Payable Amount</span>
                </div>
                <div className="">
                  <span className="block text-start">: </span>
                  <span className="block text-start">:</span>
                  <span className="block text-start">:</span>
                  <span className="block text-start">:</span>
                </div>
                <div className="">
                  <span
                    className={`block text-start font-bold ${
                      order?.paymentStatus === "Unpaid"
                        ? "text-red-500"
                        : "bg-green-500"
                    }`}
                  >
                    {order?.paymentStatus}
                  </span>
                  <span className="block text-start font-bold">
                    Tk {order?.payableAmount?.toLocaleString()}
                  </span>
                  <span className="block text-start font-bold">
                    Tk {order?.discount}
                  </span>
                  <span className="block text-start font-bold">
                    Tk {order?.payableAmount}
                  </span>
                </div>
              </div>
              <div className="flex justify-between w-[250px]">
                <div className="">
                  <span className="block text-start">Payment Method</span>
                  <span className="block text-start">Total Paid</span>
                  <span className="block text-start">Due</span>
                </div>
                <div className="">
                  <span className="block text-start">: </span>
                  <span className="block text-start">:</span>
                  <span className="block text-start">:</span>
                </div>
                <div className="">
                  <span className="block font-bold text-start">
                    {" "}
                    {order?.transactions[0]?.allProperties[
                      order?.transactions[0]?.allProperties.length - 1
                    ]?.paymentType
                      ? order?.transactions[0]?.allProperties[
                          order?.transactions[0]?.allProperties.length - 1
                        ]?.paymentType
                      : " null"}
                  </span>
                  <span className="block font-bold text-start text-green-500">
                    {" "}
                    Tk {order?.transactions[0]?.totalReceiveTk || 0}
                  </span>
                  <span
                    className="block font-bold text-start"
                    style={{
                      color: order?.dueAmount !== 0 ? "red" : "green",
                    }}
                  >
                    {" "}
                    Tk {order?.dueAmount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="ps-4 w-full mt-5">
            <h2 className="text-start text-xl text-[#00BBB4] mt-3">
              Rate Your Experience
            </h2>
            <div className="text-start flex gap-4 mt-3">
              <StarRatings
                rating={rating}
                starRatedColor="#ffb800" // Color for the rated stars
                starHoverColor="#ffb800" // Color for hovered stars
                changeRating={handleRatingChange}
                numberOfStars={5}
                starDimension="30px" // Size of the stars
              />
            </div>

            <h3 className="font-bold text-start my-2">What Did You Like?</h3>
            <div className="flex gap-5 my-3">
              <button
                className={`rounded-md outline px-3 py-1 ${
                  selectedCategory === "Room" ? "bg-[#35B0A7] text-white" : ""
                }`}
                onClick={() => handleCategorySelect("Room")}
              >
                Room
              </button>
              <button
                className={`rounded-md outline px-3 py-1 ${
                  selectedCategory === "Food" ? "bg-[#35B0A7] text-white" : ""
                }`}
                onClick={() => handleCategorySelect("Food")}
              >
                Food
              </button>
              <button
                className={`rounded-md outline px-3 py-1 ${
                  selectedCategory === "Service"
                    ? "bg-[#35B0A7] text-white"
                    : ""
                }`}
                onClick={() => handleCategorySelect("Service")}
              >
                Service
              </button>
              <button
                className={`rounded-md outline px-3 py-1 ${
                  selectedCategory === "Facilities"
                    ? "bg-[#35B0A7] text-white"
                    : ""
                }`}
                onClick={() => handleCategorySelect("Facilities")}
              >
                Facilities
              </button>
            </div>
            <h3 className="font-bold text-start my-2">Review</h3>
            <div>
              <form ref={formRef} onSubmit={handleSubmit}>
                <textarea
                  name="comment"
                  rows="5"
                  placeholder="Tell us what you liked...or didn’t"
                  required
                  className=" w-full mb-4 rounded pl-4 pt-4 user-review-input"
                />
                <div
                  className="flex justify-end"
                  // onClick={handleDetailsShow}
                >
                  <button
                    type="submit"
                    className="bg-[#35B0A7] rounded px-10 py-3 text-white mt-2"
                  >
                    SEND
                  </button>
                </div>
              </form>
            </div>
          </div>
        </DialogBody>
        <div
          onClick={() => handleDetailsShow(null)}
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
}
