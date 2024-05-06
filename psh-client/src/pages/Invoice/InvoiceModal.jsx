import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import ReactToPrint from "react-to-print";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";

import logo from "../../assets/img/logo.png";
import "./invoice.css";

const InvoiceModal = ({ handleOpen, size }) => {
  const ref = useRef();
  const pdfRef = useRef();
  const currentDate = new Date().toISOString().split("T")[0];
  const location = useLocation();
  const userEndOrder = location.state;

  const [branch, SetBranch] = useState([]);
  const [bookingBranch, SetBookingBranch] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.psh.com.bd/api/branch");
        SetBranch(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const findOrderBranch = branch.find(
      (branch) => branch?._id === userEndOrder?.bookingInfo?.branch
    );
    SetBookingBranch(findOrderBranch);
    fetchData();
  }, [userEndOrder?.bookingInfo?.branch, branch]);

  const downloadPDF = () => {
    let downloadInput = ref.current;

    html2canvas(downloadInput).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;

      const imgHeight = canvas.height;

      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      const imgX = (pdfWidth - imgWidth * ratio) / 2;

      const imgY = 0;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("invoice.pdf");
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Dialog
        className="overflow-scroll"
        open={
          size === "xs" ||
          size === "sm" ||
          size === "md" ||
          size === "lg" ||
          size === "xl" ||
          size === "xxl"
        }
        size={size || "md"}
        handler={handleOpen}
      >
        <DialogBody className="w-[952px] h-[600px] flex justify-center">
          <div className=" ">
            <div className=" ">
              <div className=" ">
                {/* <div className="flex items-center  ">
                  <div className="flex bg-[#A5F8F2] p-[10px] ">
                    <div>
                      <img src={right} alt="" />
                    </div>
                    <h2 className="text-xl tracking-[0.1px] ml-2">
                      Thank you. Your reservation has been received! Please
                      check your email for the reservation information
                    </h2>
                  </div>
                </div> */}
                {/* Invoice */}

                <div ref={ref} id="invoice">
                  <div ref={pdfRef} className="">
                    <div className=" p-10 mt-5 payment-info border  ">
                      <div className="flex justify-between  gap-x-0  ">
                        <div>
                          <img src={logo} alt="" />
                        </div>
                        <div className="text-right">
                          <h2 className="text-[28px] font-[500] text-[#35B0A7]">
                            INVOICE
                          </h2>
                          <p className="text-[1rem] text-[#35B0A7]">
                            #{userEndOrder?.phone?.slice(1)}
                          </p>
                          <div className="flex justify-between mt-5">
                            <p>Date:</p> <p>{currentDate}</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="ml-[-49px]">Payment Method:</p>{" "}
                            <p className="">{userEndOrder?.paymentType}</p>
                          </div>
                        </div>
                      </div>
                      {/* Booking Location */}
                      <div className="flex justify-between   mt-10 text-left">
                        <div>
                          <p className="text-[#35B0A7] font-bold">
                            Booking Location,
                          </p>
                          <p>
                            <span className="font-bold">Branch :</span>{" "}
                            {userEndOrder?.branch?.name}
                          </p>
                          <p>
                            <span className="font-bold">Address :</span>

                            {userEndOrder?.branch?.branchAddress}
                          </p>
                          <p>
                            <span className="font-bold">Mobile :</span>{" "}
                            {userEndOrder?.branch?.branchMobileNumber}
                          </p>
                          <p>
                            <span className="font-bold">Email :</span>{" "}
                            {userEndOrder?.branch?.branchEmail}
                          </p>
                        </div>
                        <div>
                          <div className="text-left ">
                            <p className="text-[#35B0A7] font-bold ">
                              Bill To,
                            </p>
                            <p className="">
                              <span className="font-bold">Name :</span>{" "}
                              {userEndOrder?.fullName}
                            </p>
                            <p className="w-[180px]">
                              <span className="font-bold">Address :</span>{" "}
                              {userEndOrder?.address}
                            </p>
                            <p className="">
                              <span className="font-bold">Mobile :</span>{" "}
                              {userEndOrder?.phone}
                            </p>
                            <p>
                              <span className="font-bold">Email :</span>{" "}
                              {userEndOrder?.email}
                            </p>

                            <div className="mt-2.5">
                              <p>
                                Check in Time :{" "}
                                {
                                  userEndOrder?.bookingInfo?.rentDate
                                    ?.bookStartDate
                                }
                              </p>
                              <p>
                                Check Out Time :{" "}
                                {
                                  userEndOrder?.bookingInfo?.rentDate
                                    ?.bookEndDate
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Booking Table */}

                      <div>
                        <div className="bg-[#35B0A7] booking-table mt-3 text-white">
                          <div className="grid xl:gird-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 py-1.5 px-3">
                            <div className="flex col-span-1 items-center font-medium">
                              <p>No</p>
                              <p className="ml-10">Service Name</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <p>Total Duration</p>
                              <p>Amount</p>
                            </div>
                          </div>
                        </div>
                        <div
                          className=" booking-table"
                          style={{
                            backgroundColor: "rgba(53, 176, 167, 0.10)",
                          }}
                        >
                          <div className="grid xl:gird-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 py-1.5 px-3">
                            <div className="flex col-span-1 items-center font-medium">
                              <p>01.</p>
                              {userEndOrder?.bookingInfo?.roomType ===
                              "Shared Room" ? (
                                <p className="ml-10">
                                  {userEndOrder?.bookingInfo?.roomName +
                                    ", Room Number : " +
                                    userEndOrder?.bookingInfo?.roomNumber +
                                    ", Seat Number : " +
                                    userEndOrder?.bookingInfo?.seatBooking
                                      ?.seatNumber}
                                </p>
                              ) : (
                                <p className="ml-10">
                                  {userEndOrder?.bookingInfo?.data?.name +
                                    ", Room Number : " +
                                    userEndOrder?.bookingInfo?.data?.roomNumber}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              <p>
                                {userEndOrder?.bookingInfo?.customerRent
                                  ?.daysDifference >= 0
                                  ? `${userEndOrder?.bookingInfo?.customerRent?.daysDifference} days`
                                  : "" ||
                                    (userEndOrder?.bookingInfo?.customerRent
                                      ?.months &&
                                      userEndOrder?.bookingInfo?.customerRent
                                        ?.days >= 0 &&
                                      !userEndOrder?.bookingInfo?.customerRent
                                        ?.years)
                                  ? `${userEndOrder?.bookingInfo?.customerRent?.months} months, ${userEndOrder?.bookingInfo?.customerRent?.days} days`
                                  : "" ||
                                    (userEndOrder?.bookingInfo?.customerRent
                                      ?.years &&
                                      userEndOrder?.bookingInfo?.customerRent
                                        ?.months >= 0 &&
                                      userEndOrder?.bookingInfo?.customerRent
                                        ?.days >= 0)
                                  ? `${userEndOrder?.bookingInfo?.customerRent?.years} year`
                                  : ""}
                              </p>
                              <p>
                                BDT {userEndOrder?.bookingInfo?.totalAmount}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className=" booking-table bg-white"
                          style={{
                            height: "30px",
                          }}
                        >
                          <div className="grid xl:gird-cols-2 lg:grid-cols-2 md:grid-cols-2 py-1.5 px-3">
                            <div className="flex col-span-1 items-center font-medium"></div>
                            <div className="flex items-center justify-between"></div>
                          </div>
                        </div>
                        <div
                          className=" booking-table "
                          style={{
                            backgroundColor: "rgba(53, 176, 167, 0.10)",
                            height: "30px",
                          }}
                        >
                          <div className="grid xl:gird-cols-2 lg:grid-cols-2 md:grid-cols-2 py-1.5 px-3">
                            <div className="flex col-span-1 items-center font-medium"></div>
                            <div className="flex items-center justify-between"></div>
                          </div>
                        </div>
                        <div
                          className=" booking-table bg-white"
                          style={{
                            height: "30px",
                          }}
                        >
                          <div className="grid xl:gird-cols-2 lg:grid-cols-2 md:grid-cols-2 py-1.5 px-3">
                            <div className="flex col-span-1 items-center font-medium"></div>
                            <div className="flex items-center justify-between"></div>
                          </div>
                        </div>
                        <div
                          className=" booking-table bg-white"
                          style={{
                            backgroundColor: "rgba(53, 176, 167, 0.10)",
                            height: "30px",
                          }}
                        >
                          <div className="grid xl:gird-cols-2 lg:grid-cols-2 md:grid-cols-2 py-1.5 px-3">
                            <div className="flex col-span-1 items-center font-medium"></div>
                            <div className="flex items-center justify-between"></div>
                          </div>
                        </div>
                        <div
                          className=" booking-table bg-white"
                          style={{
                            height: "30px",
                          }}
                        >
                          <div className="grid xl:gird-cols-2 lg:grid-cols-2 md:grid-cols-2 py-1.5 px-3">
                            <div className="flex col-span-1 items-center font-medium"></div>
                            <div className="flex items-center justify-between"></div>
                          </div>
                        </div>
                        <div
                          className=" booking-table bg-white"
                          style={{
                            backgroundColor: "rgba(53, 176, 167, 0.10)",
                            height: "30px",
                          }}
                        >
                          <div className="grid xl:gird-cols-2 lg:grid-cols-2 md:grid-cols-2 py-1.5 px-3">
                            <div className="flex col-span-1 items-center font-medium"></div>
                            <div className="flex items-center justify-between"></div>
                          </div>
                        </div>
                        {/* Booking Total Tk */}

                        <div className="flex justify-between mt-10 text-left">
                          <div className="total-amount-left">
                            <p className="text-white font-bold mb-2 ">
                              <span className="bg-[#35B0A7] p-1 rounded-sm">
                                Payment Received By
                              </span>
                            </p>
                            <p>
                              <span className="font-bold mr-3">
                                Payment Method :{" "}
                              </span>{" "}
                              {userEndOrder?.paymentType}
                            </p>
                            <p>
                              <span className="font-bold mr-3">
                                Account Number :
                              </span>{" "}
                              {userEndOrder?.paymentNumber}
                            </p>

                            <p>
                              <span className="font-bold mr-3">
                                Transaction ID{" "}
                                <span className="ml-[10px]">:</span>
                              </span>{" "}
                              {userEndOrder?.transactionId}
                            </p>
                          </div>
                          <div>
                            <div className="text-right total-amount-right font-[600] ">
                              <div className="flex justify-between">
                                <p className="font-bold">Subtotal</p>{" "}
                                <p className="ml-[55px]">:</p>{" "}
                                <p className="">
                                  BDT {userEndOrder?.bookingInfo?.subTotal}
                                </p>
                              </div>

                              <div className="flex justify-between">
                                <p className="font-bold">VAT </p>{" "}
                                <p className="ml-[70px]">:</p>
                                <p className="">
                                  BDT {userEndOrder?.bookingInfo?.vatTax}
                                </p>
                              </div>
                              <div className="flex justify-between">
                                <p className="font-bold">Addmission Fee</p>
                                <p className="mx-5">:</p>
                                <p className="">
                                  BDT{" "}
                                  {userEndOrder?.bookingInfo?.addMissionFee > 0
                                    ? userEndOrder?.bookingInfo?.addMissionFee
                                    : 0}
                                </p>
                              </div>
                              <div className="flex justify-between">
                                <p className="font-bold">Security Fee </p>{" "}
                                <p className="ml-4">:</p>
                                <p className="">
                                  BDT{" "}
                                  {userEndOrder?.bookingInfo?.securityFee > 0
                                    ? userEndOrder?.bookingInfo?.securityFee
                                    : 0}
                                </p>
                              </div>
                              <hr className="mt-1" />
                              <div className="flex justify-between">
                                <p className="font-bold">Total </p>
                                <p className="ml-[68px]">:</p>
                                <p className="">
                                  BDT {userEndOrder?.bookingInfo?.totalAmount}
                                </p>
                              </div>
                              <div className="flex justify-between">
                                <p className="font-bold">Discount</p>
                                <p className="ml-8">:</p>
                                <p className="">
                                  BDT {userEndOrder?.bookingInfo?.discount}
                                </p>
                              </div>
                              <hr className="mt-1" />
                              <div className="paid-amount flex justify-between">
                                <p className="font-bold text-[12px]">Paid</p>{" "}
                                <p className="ml-[55px]">:</p>
                                <p className=" text-[12px]">
                                  BDT {userEndOrder?.totalReceiveTk}
                                </p>
                              </div>
                              <hr className="mt-1" />
                              <div className="paid-amount flex justify-between">
                                <p
                                  className="font-bold text-[12px]"
                                  style={{
                                    color:
                                      userEndOrder?.dueAmount > 0 ? "red" : "",
                                  }}
                                >
                                  Due
                                </p>
                                <p className="ml-[75px]">:</p>
                                <p className=" text-[12px]">
                                  BDT {userEndOrder?.dueAmount}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Note */}
                        <div className="flex justify-between items-center">
                          <div className="note-area">
                            <label className="text-left text-[#35b0a7]">
                              Note:
                            </label>
                            <textarea
                              name=""
                              id=""
                              cols="50"
                              rows="3"
                              className="rounded pl-2 sm:w-full"
                              disabled
                            ></textarea>
                          </div>
                          <div className="pr-5 signature mt-[50px] font-[500]">
                            <p>Authorized Signature</p>
                            <hr className="mt-6" style={{ width: "200px" }} />
                          </div>
                        </div>
                        {/* Term and Condition */}
                        <div className="text-left mt-5">
                          <p>Terms:</p>
                          <p className="font-medium">
                            Please Read All Terms and Conditions
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Invoice Footer */}
                    <div className="flex justify-between bg-[#35B0A7] px-10 py-2 text-white invoice-footer md:w-auto sm:w-[952px]">
                      <p>Head Office : House-23, Road-03, Dhanmondi, Dhaka</p>
                      <p>Mobile: +880123456789</p>
                      <p>www.psh.com.bd</p>
                    </div>
                    <h3
                      className="text-xl px-5 py-2"
                      style={{ marginTop: "50px" }}
                    >
                      Terms And Condition
                    </h3>
                    <div className="mt-3 px-5 md:w-auto sm:w-[952px] mb-5">
                      <p>
                        1.Booking and Reservation: All bookings are subject to
                        availability.
                      </p>
                      <p>
                        2.Cancellation Policy: Cancellations made [X days/hours]
                        prior to the check-in date will receive a full refund.
                      </p>
                      <p>
                        3.Check-In and Check-Out: Check-in time is at 3:00 PM,
                        and check-out time is at 11:00 AM.
                      </p>
                      <p>
                        4.Room Occupancy: Each room is designed to accommodate a
                        specific number of guests.
                      </p>
                      <p>
                        5.Payment and Fees: Payment can be made through
                        [accepted payment methods].
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 text-center ">
                <div>
                  <ReactToPrint
                    trigger={() => (
                      <button className=" bg-[#399] px-5 py-2 rounded text-white font-medium text-xl">
                        Print
                      </button>
                    )}
                    content={() => ref.current}
                  />
                </div>
                <div className="mt-5 mb-10">
                  <button
                    onClick={downloadPDF}
                    className="bg-[#399] px-5 py-2 rounded text-white font-medium text-xl"
                  >
                    Download Invoice
                  </button>
                </div>
                {/* <div className="mb-5">
                  <Button
                    variant="text"
                    color="red"
                    onClick={() => handleOpen(null)}
                    className="mr-1 text-xl"
                  >
                    <span>Cancel</span>
                  </Button>
                </div> */}
                <div
                  onClick={() => handleOpen(null)}
                  className="absolute top-0 right-1 cursor-pointer"
                >
                  <span>
                    <AiOutlineClose style={{ width: "24px", height: "24px" }} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};
export default InvoiceModal;
