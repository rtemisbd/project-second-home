import React, { useRef, useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import "jspdf-autotable";

import { useLocation } from "react-router-dom";
import right from "../../assets/img/Right.png";
import logo from "../../assets/img/logo.png";

import "./invoice.css";
import { BlobProvider, View } from "@react-pdf/renderer";
import DownlaodInvoice from "./DownlaodInvoice";
import useUserTransactions from "../../hooks/useUserTransactions";

const Invoice = () => {
  const ref = useRef();
  const pdfRef = useRef();
  const currentDate = new Date().toISOString().split("T")[0];
  const location = useLocation();
  const userEndOrder = location.state;
  const [transactions] = useUserTransactions();
  const { pathname } = useLocation();

  console.log(userEndOrder);

  const [discount, setDiscount] = useState(0);
  const [payableAmount, setPayableAmount] = useState(0);

  useEffect(() => {
    const totalDiscount =
      userEndOrder?.adjustments?.[0]?.totatAdjustmentAmount || 0;
    const updatedDiscount = userEndOrder?.discount || 0;

    const newDiscount = updatedDiscount + totalDiscount;
    setDiscount(newDiscount);

    const newPayableAmount = (userEndOrder?.totalAmount || 0) - newDiscount;

    if (userEndOrder?.discount > 0) {
      setPayableAmount(userEndOrder?.payableAmount);
    } else {
      setPayableAmount(newPayableAmount);
    }
  }, [userEndOrder]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="  md:flex md:justify-center">
      <div className=" ">
        <div className=" ">
          <div className="flex items-center mt-[50px] ">
            <div className="flex bg-[#A5F8F2] p-[20px] ">
              <div>
                <img loading="lazy" src={right} alt="" />
              </div>
              <h2 className="text-xl tracking-[0.1px] ml-2">
                Thank you. Your reservation has been received! Please check your
                email for the reservation information
              </h2>
            </div>
          </div>
          {/* Invoice */}

          <div
            ref={ref}
            id="invoice "
            className="md:overflow-hidden sm:overflow-scroll "
          >
            <div ref={pdfRef} className="">
              <div className=" px-10 py-6 mt-5 payment-info  md:w-auto sm:w-[952px] border">
                <div className="flex justify-between  gap-x-0  ">
                  <div>
                    <img loading="lazy" src={logo} alt="" />
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
                      <p className="">
                        {" "}
                        {userEndOrder?.transactions[0]?.allProperties[
                          userEndOrder?.transactions[0]?.allProperties.length -
                            1
                        ]?.paymentType
                          ? userEndOrder?.transactions[0]?.allProperties[
                              userEndOrder?.transactions[0]?.allProperties
                                .length - 1
                            ]?.paymentType
                          : " null"}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Booking Location */}
                <div className="flex justify-between mt-10 text-left">
                  <div>
                    <p className="text-[#35B0A7] font-bold">
                      Booking Location,
                    </p>
                    <p>
                      <span className="font-bold">Branch :</span>{" "}
                      {userEndOrder?.branchDetails?.name}
                    </p>
                    <p>
                      <span className="font-bold">Address :</span>

                      {userEndOrder?.branchDetails?.branchAddress}
                    </p>
                    <p>
                      <span className="font-bold">Mobile :</span>{" "}
                      {userEndOrder?.branchDetails?.branchMobileNumber}
                    </p>
                    <p>
                      <span className="font-bold">Email :</span>{" "}
                      {userEndOrder?.branchDetails?.branchEmail}
                    </p>
                  </div>
                  <div>
                    <div className="text-left ">
                      <p className="text-[#35B0A7] font-bold ">Bill To,</p>
                      <p className="">
                        <span className="font-bold">Name :</span>{" "}
                        {userEndOrder?.userInfo?.firstName}
                      </p>
                      <p className="w-[180px]">
                        <span className="font-bold">Address :</span>{" "}
                        {userEndOrder?.userInfo?.userAddress}
                      </p>
                      <p className="">
                        <span className="font-bold">Mobile :</span>{" "}
                        {userEndOrder?.userInfo?.phone}
                      </p>
                      <p>
                        <span className="font-bold">Email :</span>{" "}
                        {userEndOrder?.userInfo?.email}
                      </p>

                      <div className="mt-2.5">
                        <p>
                          Check in Time :{" "}
                          {userEndOrder?.rentDate?.bookStartDate}
                        </p>
                        <p>
                          Check Out Time : {userEndOrder?.rentDate?.bookEndDate}
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
                        {userEndOrder?.roomType === "Shared Room" ? (
                          <p className="ml-10">
                            {userEndOrder?.room?.name +
                              ", Room Number : " +
                              userEndOrder?.room?.roomNumber +
                              ", Seat Number : " +
                              userEndOrder?.seat?.seatNumber}
                          </p>
                        ) : (
                          <p className="ml-10">
                            {userEndOrder?.room?.name +
                              ", Room Number : " +
                              userEndOrder?.room?.roomNumber}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <p>
                          {userEndOrder?.customerRent?.daysDifference >= 0
                            ? `${userEndOrder?.customerRent?.daysDifference} days`
                            : "" ||
                              (userEndOrder?.customerRent?.months &&
                                userEndOrder?.customerRent?.days >= 0 &&
                                !userEndOrder?.customerRent?.years)
                            ? `${userEndOrder?.customerRent?.months} months, ${userEndOrder?.customerRent?.days} days`
                            : "" ||
                              (userEndOrder?.customerRent?.years &&
                                userEndOrder?.customerRent?.months >= 0 &&
                                userEndOrder?.customerRent?.days >= 0)
                            ? `${userEndOrder?.customerRent?.years} year`
                            : ""}
                        </p>
                        <p>BDT {userEndOrder?.subTotal?.toLocaleString()}</p>
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
                      <p className=" font-bold mb-2 ">
                        <span className="text-[#35B0A7] p-1 rounded-sm">
                          Payment History
                        </span>
                      </p>
                      <p>
                        <span className="font-bold mr-3">
                          Payment Method :{" "}
                        </span>{" "}
                        {userEndOrder?.transactions[0]?.allProperties[
                          userEndOrder?.transactions[0]?.allProperties.length -
                            1
                        ]?.paymentType
                          ? userEndOrder?.transactions[0]?.allProperties[
                              userEndOrder?.transactions[0]?.allProperties
                                .length - 1
                            ]?.paymentType
                          : " null"}
                      </p>
                      <p>
                        <span className="font-bold mr-3">Account Number :</span>{" "}
                        {userEndOrder?.paymentNumber
                          ? userEndOrder.paymentNumber
                          : transactions[transactions?.length - 1]
                              ?.paymentNumber}
                      </p>

                      <p>
                        <span className="font-bold mr-3">
                          Transaction ID <span className="ml-[10px]">:</span>
                        </span>{" "}
                        {transactions[transactions?.length - 1]?.transactionId}
                      </p>
                    </div>
                    <div>
                      <div className="text-right total-amount-right font-[600] ">
                        <div className="flex justify-between">
                          <p className="font-bold">Subtotal</p>{" "}
                          <p className="ml-[55px]">:</p>{" "}
                          <p className="">
                            BDT {userEndOrder?.subTotal?.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="font-bold">Food</p>{" "}
                          <p className="ml-[55px]">:</p>{" "}
                          <p className="">
                            BDT {userEndOrder?.foodAmount?.toLocaleString()}
                          </p>
                        </div>

                        <div className="flex justify-between">
                          <p className="font-bold">VAT </p>{" "}
                          <p className="ml-[70px]">:</p>
                          <p className="">
                            BDT {userEndOrder?.vatTax?.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="font-bold">Admission Fee</p>
                          <p className="mx-5">:</p>
                          <p className="">
                            BDT{" "}
                            {userEndOrder?.addMissionFee > 0
                              ? userEndOrder?.addMissionFee?.toLocaleString()
                              : 0}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="font-bold">Security Fee </p>{" "}
                          <p className="ml-4">:</p>
                          <p className="">
                            BDT{" "}
                            {userEndOrder?.securityFee > 0
                              ? userEndOrder?.securityFee?.toLocaleString()
                              : 0}
                          </p>
                        </div>
                        <hr className="mt-1" />
                        <div className="flex justify-between">
                          <p className="font-bold">Total </p>
                          <p className="ml-[68px]">:</p>
                          <p className="">
                            BDT {userEndOrder?.totalAmount?.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="font-bold">Discount</p>
                          <p className="ml-8">:</p>
                          <p className="">BDT {discount}</p>
                        </div>
                        <hr className="mt-1" />
                        <div className="paid-amount flex justify-between">
                          <p className="font-bold text-[12px]">Payable</p>{" "}
                          <p className="ml-[55px]">:</p>
                          <p className=" text-[12px]">BDT {payableAmount}</p>
                        </div>
                        <hr className="mt-1" />
                        <div className="paid-amount flex justify-between">
                          <p className="font-bold text-[12px]">Paid</p>{" "}
                          <p className="ml-[55px]">:</p>
                          {transactions?.length >= 1 ? (
                            <p className=" text-[12px]">
                              BDT{" "}
                              {userEndOrder?.transactions[0]?.totalReceiveTk}
                            </p>
                          ) : (
                            <p className="text-red-500">Pending</p>
                          )}
                        </div>
                        <hr className="mt-1" />
                        <div className="paid-amount flex justify-between">
                          <p
                            className="font-bold text-[12px]"
                            style={{
                              color: userEndOrder?.dueAmount > 0 ? "red" : "",
                            }}
                          >
                            Due
                          </p>
                          <p className="ml-[75px]">:</p>
                          <p className=" text-[12px]">
                            BDT{" "}
                            {payableAmount -
                              userEndOrder?.transactions[0]?.totalReceiveTk}
                            {/* {transactions[transactions?.length - 1]?.payableAmount -
                              transactions[transactions?.length - 1]?.receivedTk}{" "} */}
                            {/* {userEndOrder?.dueAmount?.toLocaleString()} */}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Note */}
                  <div className="flex justify-between items-center">
                    <div className="note-area">
                      <label className="text-left text-[#35b0a7]">Note:</label>
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
                {/* Invoice Footer */}
                <div className="flex justify-between bg-[#35B0A7] px-10 py-2 text-white invoice-footer mt-2">
                  <p>Head Office : House-23, Road-03, Dhanmondi, Dhaka</p>
                  <p>Mobile: +8801647647404</p>
                  <p>www.psh.com.bd</p>
                </div>
              </div>

              <h3
                className="text-xl px-8 py-4 font-[550] text-[#35B0A7]"
                style={{ marginTop: "50px" }}
              >
                Terms And Condition :
              </h3>
              <div className="mt-3 px-8 md:w-auto sm:w-[952px] mb-20">
                <p>
                  1.Booking and Reservation: All bookings are subject to
                  availability.
                </p>
                <p>
                  2.Cancellation Policy: Cancellations made [X days/hours] prior
                  to the check-in date will receive a full refund.
                </p>
                <p>
                  3.Check-In and Check-Out: Check-in time is at 3:00 PM, and
                  check-out time is at 11:00 AM.
                </p>
                <p>
                  4.Room Occupancy: Each room is designed to accommodate a
                  specific number of guests.
                </p>
                <p>
                  5.Payment and Fees: Payment can be made through [accepted
                  payment methods].
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className=" text-center ">
          <div className="hidden md:block my-10">
            <ReactToPrint
              trigger={() => (
                <button className=" bg-[#399] px-5 py-2 rounded text-white font-medium text-xl">
                  Print
                </button>
              )}
              content={() => ref.current}
            />
          </div>
          {/* <div className="md:hidden sm:block mb-20">
            <ReactToPrint
              trigger={() => (
                <button className=" bg-[#399] px-5 py-2 rounded text-white font-medium text-xl">
                  Download
                </button>
              )}
              content={() => ref.current}
            />
          </div> */}
          {/* <div className="mt-5 mb-28 hidden md:block">
            <button
              onClick={downloadPDF}
              className="bg-[#399] px-5 py-2 rounded text-white font-medium text-xl"
            >
              Download Invoice
            </button>
          </div> */}
        </div>
        <div className="text-center mb-10">
          <View>
            <BlobProvider
              document={
                <DownlaodInvoice
                  data={userEndOrder}
                  transactions={transactions}
                />
              }
            >
              {({ url }) => (
                <a
                  href={url}
                  download="invoice.pdf"
                  className="bg-[#399] px-5 py-2 rounded text-white font-medium text-xl hover:text-white "
                >
                  Download
                </a>
              )}
            </BlobProvider>
          </View>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
