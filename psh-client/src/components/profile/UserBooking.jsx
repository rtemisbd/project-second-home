import React from "react";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useContext } from "react";
import { useRef } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import axios from "axios";
import StarRatings from "react-star-ratings";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { AuthContext } from "../../contexts/UserProvider";

export function UserBooking({
  handleDetailsShow,
  detailsShow,
  endOrder,
  branch,
}) {
  const findOrderBranch = branch.find(
    (branch) => branch?._id === endOrder?.bookingInfo?.branch
  );
  const { user } = useContext(AuthContext);
  const userName = user?.firstName;
  const [rating, setRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  const MySwal = withReactContent(Swal);
  const propertyId =
    endOrder?.bookingInfo?.roomType === "Shared Room"
      ? endOrder?.bookingInfo?.roomId
      : endOrder?.bookingInfo?.data?._id;
  const formRef = useRef(null);
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

      await axios.post("https://api.psh.com.bd/api/review", product);
      toast.success("Thanks ! for Your Review ");
      formRef.current.reset();
      handleDetailsShow();
    } catch (err) {
      toast.error("Something Error Found.", "warning");
    }
  };
  const navigate = useNavigate();

  const getInvoice = () => {
    navigate("/invoice", { state: endOrder });
    window.open(route, "_blank");
  };

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
          <div className="grid grid-cols-12 sm:px-5 gap-x-8 gap-y-16 mt-3 ">
            <div className="present-box  xl:w-[800px] lg:w-[700px]"></div>
          </div>
          {/* booking summary */}
          <div className="ps-4 w-full mt-2">
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
                <Link to={`/room/${propertyId}`} target="_blank">
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
                    {endOrder?._id.slice(19)}
                  </span>
                  <span className="block text-start font-bold">
                    {endOrder?.branch?.name}
                  </span>
                  <span className="block text-start font-bold">
                    {" "}
                    {endOrder?.bookingInfo?.roomType}
                  </span>
                  <span className="block text-start font-bold">
                    {" "}
                    {endOrder?.bookingInfo?.data?.roomNumber
                      ? endOrder?.bookingInfo?.data?.roomNumber
                      : ""}
                    {endOrder?.bookingInfo?.roomNumber
                      ? endOrder?.bookingInfo?.roomNumber
                      : ""}
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
                    {endOrder?.bookingInfo?.rentDate?.bookStartDate}
                  </span>
                  <span className="block font-bold text-start">
                    {endOrder?.bookingInfo?.rentDate?.bookEndDate}
                  </span>
                  <span className="block font-bold text-start">
                    {`${
                      endOrder?.bookingInfo?.customerRent?.daysDifference >= 0
                        ? `${endOrder?.bookingInfo?.customerRent?.daysDifference} Days`
                        : "" ||
                          (endOrder?.bookingInfo?.customerRent?.months &&
                            endOrder?.bookingInfo?.customerRent?.days >= 0 &&
                            !endOrder?.bookingInfo?.customerRent?.years)
                        ? `${endOrder?.bookingInfo?.customerRent?.months} months, ${endOrder?.bookingInfo?.customerRent?.days} Days`
                        : "" ||
                          (endOrder?.bookingInfo?.customerRent?.years &&
                            endOrder?.bookingInfo?.customerRent?.months >= 0 &&
                            endOrder?.bookingInfo?.customerRent?.days >= 0)
                        ? `${endOrder?.bookingInfo?.customerRent?.years} years, ${endOrder?.bookingInfo?.customerRent?.months} months, ${endOrder?.bookingInfo?.customerRent?.days} Days`
                        : ""
                    }`}
                  </span>
                  <span
                    className="block font-bold text-start"
                    style={{
                      color: endOrder?.status === "Approved" ? "green" : "red",
                    }}
                  >
                    {endOrder?.status}
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
                </div>
                <div className="">
                  <span className="block text-start">: </span>
                  <span className="block text-start">:</span>
                </div>
                <div className="">
                  <span
                    className={`block text-start font-bold ${
                      endOrder?.paymentStatus === "Unpaid"
                        ? "text-red-500"
                        : "bg-green-500"
                    }`}
                  >
                    {endOrder?.paymentStatus}
                  </span>
                  <span className="block text-start font-bold">
                    Tk {endOrder?.payableAmount?.toLocaleString()}
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
                </div>
                <div className="">
                  <span className="block font-bold text-start">
                    {" "}
                    {endOrder?.paymentType}
                  </span>
                  <span className="block font-bold text-start text-green-500">
                    {" "}
                    Tk {endOrder?.totalReceiveTk?.toLocaleString()}
                  </span>
                  <span
                    className="block font-bold text-start"
                    style={{
                      color: endOrder?.dueAmount !== 0 ? "red" : "black",
                    }}
                  >
                    {" "}
                    Tk {endOrder?.dueAmount?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Confirmation and contact */}
          {/* <div className="ps-4 w-full mt-5">
            <h2 className="text-start text-2xl text-[#00BBB4] mt-3">
              Confirmation And Contact
            </h2>
            <div className="w-2/3 flex justify-between gap-10 mt-3">
              <span className="block text-start">Confirmation Number :</span>
              <span className="block text-end font-bold">
                [{endOrder?.bookingInfo?.data?._id.slice(19)}]
              </span>
            </div>
            <p className="text-start text-xl mt-2">
              For any inquiries or changes to your booking, please contact our
              customer support at
            </p>
            <p className="text-start text-xl">[Phone Number/Email Address]</p>
          </div> */}
          {/* Cancellation Policy */}
          {/* <div className="ps-4 w-full mt-5">
            <h2 className="text-start text-2xl text-[#00BBB4] mt-3">
              Cancellation Policy
            </h2>
            <p className="text-start text-xl mt-2">
              [Provide information about your cancellation policy, if
              applicable]
            </p>
          </div> */}
          {/* rate your experience */}

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
