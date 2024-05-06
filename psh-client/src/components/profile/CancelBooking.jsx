import React, { useContext } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { subDays } from "date-fns";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import axios from "axios";
import DatePicker from "react-datepicker";

import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../contexts/UserProvider";

export function CancelBooking({
  handleCancelShow,
  cancelShow,
  endOrder,
  branch,
}) {
  //   console.log(endOrder);
  const [isPreArrival, setIsPreArrival] = useState(false);
  const [IsDuringStay, setIsDuringStay] = useState(false);
  const [cancelType, setCancelType] = useState("");

  const [cancelDate, setCancelDate] = useState(new Date());
  const { user } = useContext(AuthContext);
  const userName = user?.firstName;

  const MySwal = withReactContent(Swal);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cancelReason = e.target.cancelReason?.value;

    const cancelData = {
      cancelReason: cancelReason,
      cancelType: cancelType,

      cancelDate: isPreArrival ? "" : cancelDate,
    };

    try {
      await axios.patch(
        `https://api.psh.com.bd/api/order/${endOrder?._id}`,
        cancelData
      );
      toast.success(" Requested ! I will contact You very Soon");
    } catch (err) {
      toast.error("Something Error Found.", "warning");
    }
  };

  return (
    <>
      <Dialog open={cancelShow} size="md" className="px-5">
        <DialogHeader>
          {" "}
          {/* <h2 className="text-[32px] font-bold" style={{ fontFamily: "inter" }}>
            Request For Cancel
          </h2> */}
        </DialogHeader>
        <DialogBody
          divider
          className=" lg:h-[33rem] xl:h-[50rem] md:h-[30rem] sm:h-[30rem] xs:h-[30rem] overflow-y-scroll overflow-x-hidden"
        >
          <div className="ps-4 w-full ">
            <h2 className="text-start text-2xl text-red-500 font-bold mb-2">
              Cancel Request
            </h2>
            <p>
              Please fill out the following details to proceed with your
              cancellation request:
            </p>
            <div className="w-full flex justify-between mt-4">
              <div className="flex justify-between w-[350px]">
                <div className="">
                  <span className="block text-start font-bold">
                    Booking ID{" "}
                  </span>
                  <span className="block text-start font-bold">Full Name </span>
                  <span className="block text-start font-bold">Email </span>
                  <span className="block text-start font-bold">
                    Contact Number{" "}
                  </span>
                </div>
                <div className="">
                  <span className="block text-start">: </span>
                  <span className="block text-start">:</span>
                  <span className="block text-start">:</span>
                  <span className="block text-start">: </span>
                </div>
                <div className="">
                  <span className="block text-start">
                    {" "}
                    PSH - {endOrder?._id?.slice(19)}
                  </span>
                  <span className="block text-start ">
                    {endOrder?.fullName}
                  </span>
                  <span className="block text-start ">{endOrder?.email}</span>
                  <span className="block text-start "> {endOrder?.phone}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Cancellation Reason */}
          <form onSubmit={handleSubmit}>
            <div className="ps-4 w-full mt-5 flex items-center font-bold">
              <h2 className=" text-xl  mt-4 ">Reason for Cancellation:</h2>

              <div className="mt-2 ml-5">
                <select
                  className="border border-black rounded h-8 pl-2"
                  name="cancelReason"
                >
                  <option disabled> Select Your Reason</option>
                  <option>Change of Plans</option>
                  <option> Family Emergency</option>
                  <option> Travel Restrictions</option>
                  <option> Illness or Health Issues</option>
                  <option> Unexpected Commitments</option>
                  <option> Unforeseen Circumstances</option>
                  <option>Flight or Transportation Delays</option>
                  <option> Accommodation Concerns</option>
                  <option> Weather-related Issues</option>
                  <option> Financial Constraints</option>
                  <option> Others</option>
                </select>
              </div>
            </div>
            <div className="ps-4">
              <h2 className="text-xl  mt-4 font-bold">
                Select Cancellation Type:
              </h2>
              <div className="mt-2 ml-5">
                <div onChange={(e) => setCancelType(e.target.value)}>
                  <input
                    type="radio"
                    name="preArrival"
                    id=""
                    value="Pre-Arrival Cancellation"
                    className="mr-2 cancelType cursor-pointer"
                    required={IsDuringStay ? false : true}
                    onChange={() => {
                      setIsPreArrival(true);
                      setIsDuringStay(false);
                    }}
                    checked={isPreArrival ? true : false}
                  />
                  <span>
                    Pre-Arrival Cancellation (Less than 5 days before check-in)
                  </span>
                </div>
                <div onChange={(e) => setCancelType(e.target.value)}>
                  <input
                    type="radio"
                    name="duringStay"
                    value="Mid-Stay Cancellation (During Stay)"
                    className="mr-2 cancelType cursor-pointer"
                    id=""
                    checked={IsDuringStay ? true : false}
                    onChange={() => {
                      setIsDuringStay(true);
                      setIsPreArrival(false);
                    }}
                  />
                  <span>Mid-Stay Cancellation (During Stay)</span>
                </div>
              </div>
            </div>

            {/* Cancellation Date */}
            {IsDuringStay ? (
              <div>
                <div className="mt-2 flex items-center">
                  <h2 className="text-xl  mt-4 font-bold">
                    Select Cancellation Date:
                  </h2>
                  <div className="ml-10 mt-4">
                    <DatePicker
                      selected={new Date(cancelDate)}
                      dateFormat="dd/MM/yyyy"
                      onChange={(date) => setCancelDate(date)}
                      minDate={subDays(new Date(), 0)}
                      className="h-8 border border-black rounded ps-3"
                    />
                  </div>
                </div>
                <p className="text-[14px] mt-3">
                  <span className="font-bold">Note: </span> For Mid-Stay
                  Cancellation requests, please select the date you wish to
                  check out from your booking.
                </p>
              </div>
            ) : (
              ""
            )}
            <div>
              <h2 className="text-xl  mt-4 font-bold">
                Cancellation Terms and Conditions:{" "}
              </h2>
              <h5 className="font-bold mt-2">1. Pre-Arrival Cancellation</h5>
              <ul>
                <li className="text-[14px] ml-8 text-black">
                  <p>
                    * If you cancel your booking less than 5 days before the
                    check-in date, a cancellation fee of 25% of the total
                    booking amount will be applicable.
                  </p>{" "}
                  <p>
                    * Refunds will be processed within 5-7 business days after
                    approval.
                  </p>
                </li>
              </ul>
              <h5 className="font-bold mt-2">2. Mid-Stay Cancellation:</h5>
              <ul>
                <li className="text-[14px] ml-8 text-black">
                  <p>
                    * If you decide to check-out before the originally booked
                    departure date, no refund for the remaining days will be
                    provided.
                  </p>{" "}
                  <p>
                    * Any changes or modifications to this booking must be
                    requested in writing.
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl  mt-4 font-bold">
                Additional Terms and Conditions
              </h2>

              <p className="text-[14px] ml-8 text-black">
                * Guests are responsible for providing accurate and up-to-date
                contact information.
              </p>
              <p className="text-[14px] ml-8 text-black">
                * Requests for cancellation must be submitted at least 24 hours
                before the intended check-in time.
              </p>
            </div>
            <div className="mt-5">
              <input
                type="checkbox"
                name=""
                className="cancelType mr-5"
                required
                id=""
              />
              <span>
                I agree with Project Second Home’s Cancellation Policy and Terms
                & Conditions
              </span>
            </div>
            <div className="mt-5 flex justify-center ">
              <input
                type="submit"
                value="Cancel Request"
                className="bg-[#35b0a7] text-white px-5 py-2 rounded cursor-pointer"
                name=""
                id=""
              />
            </div>
          </form>
        </DialogBody>
        <div
          onClick={() => handleCancelShow(null)}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <span>
            <AiOutlineClose style={{ width: "30px", height: "30px" }} />
          </span>
        </div>
        <Toaster
          containerStyle={{ top: 200 }}
          toastOptions={{ position: "top-center" }}
        ></Toaster>
      </Dialog>
    </>
  );
}
