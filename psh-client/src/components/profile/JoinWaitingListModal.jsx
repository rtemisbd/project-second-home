import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const JoinWaitingListModal = ({
  handleDetailsShow,
  detailsShow,
  endOrder,
  branch,
}) => {
  const findOrderBranch = branch.find(
    (branch) => branch?._id === endOrder?.bookingInfo?.data?.branch
  );

  return (
    <>
      <Dialog
        open={detailsShow}
        handler={handleDetailsShow}
        size="md"
        className="px-5"
      >
        <DialogHeader>
          {" "}
          <h2 className="text-[32px] font-bold" style={{ fontFamily: "inter" }}>
            Join Waiting
          </h2>
        </DialogHeader>
        <DialogBody
          divider
          className=" lg:h-[33rem] xl:h-[50rem] md:h-[30rem] sm:h-[30rem] xs:h-[30rem] overflow-y-scroll overflow-x-hidden"
        >
          <div className="grid grid-cols-12 sm:px-5 gap-x-8 gap-y-16 mt-3">
            <div className="present-box  xl:w-[800px] lg:w-[700px]">
              <img
                src={endOrder?.bookingInfo?.data?.photos[0]}
                alt=""
                className="xl:w-4/5 lg:w-full h-[300px] rounded"
              />
              {/* <div className="room-text w-1/2 h-full p-3 bg-[#FCFCFC]">
                <h2 className="text-start text-2xl ">
                  {endOrder?.bookingInfo?.data?.name}
                </h2>
                <h5 className="text-start text-xl mt-5">
                  {endOrder?.bookingInfo?.data?.category?.name}
                </h5>
                <span className="block text-start">
                  {findOrderBranch?.name}
                </span>
              </div> */}
            </div>
          </div>
          {/* booking summary */}
          <div className="ps-4 w-full mt-5">
            <h2 className="text-start text-2xl text-[#00BBB4]">
              Booking Summary
            </h2>
            <div className="w-full flex justify-between mt-4">
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
                    {endOrder?.bookingInfo?.data?._id.slice(19)}
                  </span>
                  <span className="block text-start font-bold">
                    {findOrderBranch?.name}
                  </span>
                  <span className="block text-start font-bold">
                    {" "}
                    {endOrder?.bookingInfo?.data?.category?.name}
                  </span>
                  <span className="block text-start font-bold"> 125</span>
                </div>
              </div>
              <div className="flex justify-between w-[250px]">
                <div className="">
                  <span className="block text-start">Check In Date</span>
                  <span className="block text-start">Check Out Date</span>
                  <span className="block text-start">Duration of Stay</span>
                  <span className="block text-start">Booking Status</span>
                </div>
                <div className="">
                  <span className="block text-start">: </span>
                  <span className="block text-start">:</span>
                  <span className="block text-start">:</span>
                  <span className="block text-start">: </span>
                </div>
                <div className="">
                  <span className="block font-bold text-start">
                    {/* {format(
                      new Date(endOrder?.bookingInfo?.rentDate?.bookStartDate),
                      "dd-MMMM-yy"
                    )} */}
                    {endOrder?.bookingInfo?.rentDate?.bookStartDate}
                  </span>
                  <span className="block font-bold text-start">
                    {/* {format(
                      new Date(endOrder?.bookingInfo?.rentDate?.bookEndDate),
                      "dd-MMMM-yy"
                    )} */}
                    {endOrder?.bookingInfo?.rentDate?.bookEndDate}
                  </span>
                  <span className="block font-bold text-start">
                    {`${
                      endOrder?.bookingInfo?.customerRent?.daysDifference >= 0
                        ? `${endOrder?.bookingInfo?.customerRent?.daysDifference} nights`
                        : "" ||
                          (endOrder?.bookingInfo?.customerRent?.months &&
                            endOrder?.bookingInfo?.customerRent?.days >= 0 &&
                            !endOrder?.bookingInfo?.customerRent?.years)
                        ? `${endOrder?.bookingInfo?.customerRent?.months} months, ${endOrder?.bookingInfo?.customerRent?.days} nights`
                        : "" ||
                          (endOrder?.bookingInfo?.customerRent?.years &&
                            endOrder?.bookingInfo?.customerRent?.months >= 0 &&
                            endOrder?.bookingInfo?.customerRent?.days >= 0)
                        ? `${endOrder?.bookingInfo?.customerRent?.years} years, ${endOrder?.bookingInfo?.customerRent?.months} months, ${endOrder?.bookingInfo?.customerRent?.days} nights`
                        : ""
                    }`}
                  </span>
                  <span className="block font-bold text-start">
                    {endOrder?.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* payment summary */}
          <div className="ps-4 w-full mt-5">
            <h2 className="text-start text-2xl text-[#00BBB4] mt-4">
              Payment Summary
            </h2>
            <div className="w-2/3 flex justify-between gap-10 mt-3">
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
                  <span className="block text-start font-bold">Paid</span>
                  <span className="block text-start font-bold">
                    {endOrder?.bookingInfo?.totalAmount}
                  </span>
                </div>
              </div>
              <div className="flex justify-between w-[250px]">
                <div className="">
                  <span className="block text-start">Payment Method</span>
                  <span className="block text-start">Balance Due</span>
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
                  <span className="block font-bold text-start"> 0</span>
                </div>
              </div>
            </div>
          </div>
          {/* Confirmation and contact */}
          <div className="ps-4 w-full mt-5">
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
          </div>
          {/* Cancellation Policy */}
          <div className="ps-4 w-full mt-5">
            <h2 className="text-start text-2xl text-[#00BBB4] mt-3">
              Cancellation Policy
            </h2>
            <p className="text-start text-xl mt-2">
              [Provide information about your cancellation policy, if
              applicable]
            </p>
          </div>
          {/* rate your experience */}
          <div className="ps-4 w-full mt-5">
            <h2 className="text-start text-2xl text-[#00BBB4] mt-3">
              Rate Your Experience
            </h2>
            <div className=" text-start flex gap-4 mt-3">
              <i class="fa-solid fa-star text-xl text-yellow-600"></i>
              <i class="fa-regular fa-star text-xl"></i>
              <i class="fa-regular fa-star text-xl"></i>
              <i class="fa-regular fa-star text-xl"></i>
              <i class="fa-regular fa-star text-xl"></i>
            </div>
            <h3 className="font-bold text-start my-2">What Did You Like?</h3>
            <div className="flex gap-5 my-3">
              <button class="rounded-md outline px-3 py-1">Room</button>
              <button class="rounded-md outline px-3 py-1">Food</button>
              <button class="rounded-md outline px-3 py-1">Service</button>
              <button class="rounded-md outline px-3 py-1">Facilities</button>
            </div>
            <h3 className="font-bold text-start my-2">Review</h3>
            <textarea
              name=""
              id=""
              rows="5"
              placeholder="Tell us what you liked...or didn’t"
              className=" w-full mb-4 rounded pl-4 pt-4 user-review-input"
            ></textarea>
            <div className="flex justify-end ">
              <div className="bg-[#00BBB4] rounded text-white px-5 py-1">
                <button>Submit</button>
              </div>
            </div>
          </div>
        </DialogBody>

        <div
          onClick={() => handleDetailsShow(null)}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <span>
            <AiOutlineClose style={{ width: "30px", height: "30px" }} />
          </span>
        </div>
      </Dialog>
    </>
  );
};

export default JoinWaitingListModal;
