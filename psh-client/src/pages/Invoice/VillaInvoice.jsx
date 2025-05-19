import { useEffect, useRef, useState } from "react";
import right from "../../assets/img/Right.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverBaseUrl } from "../../serverApi/baseUrl";
import { format, parseISO } from "date-fns";

const VillaInvoice = () => {
  const ref = useRef();
  const pdfRef = useRef();
  const { id } = useParams();
  const [booking, setBooking] = useState({});

  useEffect(() => {
    const fetchBooking = async () => {
      const { data } = await axios.get(`${serverBaseUrl}/villa-order/${id}`);
      setBooking(data?.data);
    };
    fetchBooking();
  }, [id]);

  console.log(booking);

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
                    <img
                      loading="lazy"
                      src={booking?.villa?.resortId?.logo}
                      alt={booking?.villa?.resortId?.name}
                      className="h-24 w-24 rounded-full"
                    />{" "}
                  </div>
                  <div className="text-right">
                    <h2 className="text-[28px] font-[500] text-[#35B0A7]">
                      INVOICE
                    </h2>
                    <p className="text-[1rem] text-[#35B0A7]">
                      #{booking?.bookingId}
                    </p>
                    <div className="flex justify-between mt-2">
                      <p>Date :</p>{" "}
                      <p>
                        {booking?.createdAt
                          ? format(parseISO(booking.createdAt), "dd/MM/yyyy")
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Booking Location */}
                <div className="flex justify-between mt-6 text-left">
                  <div>
                    <p className="text-[#35B0A7] font-bold">
                      {booking?.villa?.resortId?.name}
                    </p>
                    <p>
                      <span className="font-bold">Address :</span>{" "}
                      {booking?.villa?.resortId?.address}
                    </p>
                    <p>
                      <span className="font-bold">Contact :</span>{" "}
                      {booking?.villa?.resortId?.contactNumbers?.map(
                        (contact, ind) => (
                          <span key={ind} className="ms-1">
                            {contact?.number}
                            {ind + 1 <
                              booking?.villa?.resortId?.contactNumbers
                                ?.length && <span> ,</span>}
                          </span>
                        )
                      )}
                    </p>
                    <p>
                      <span className="font-bold">Email :</span>{" "}
                      {booking?.villa?.resortId?.resortEmail}
                    </p>
                  </div>
                  <div>
                    <div className="text-left ">
                      <p className="text-[#35B0A7] font-bold ">Bill To,</p>
                      <p className="">
                        <span className="font-bold">Name :</span>{" "}
                        {booking?.user?.firstName}
                      </p>
                      <p className="w-[180px]">
                        <span className="font-bold">Address :</span>{" "}
                        {booking?.user?.userAddress}
                      </p>
                      <p className="">
                        <span className="font-bold">Mobile :</span>{" "}
                        {booking?.user?.phone}
                      </p>
                      

                      <div className="mt-2.5">
                        <p>
                          Check in Time :{" "}
                          {booking?.rentDate?.bookStartDate}
                        </p>
                        <p>
                          Check Out Time :{" "}
                          {booking?.rentDate?.bookEndDate}
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
                        {booking?.bookingInfo?.roomType === "Shared Room" ? (
                          <p className="ml-10">
                            {booking?.bookingInfo?.roomName +
                              ", Room Number : " +
                              booking?.bookingInfo?.roomNumber +
                              ", Seat Number : " +
                              booking?.bookingInfo?.seatBooking?.seatNumber}
                          </p>
                        ) : (
                          <p className="ml-10">
                            {booking?.bookingInfo?.roomName +
                              ", Room Number : " +
                              booking?.bookingInfo?.roomNumber}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <p>
                          {booking?.bookingInfo?.customerRent?.daysDifference >=
                          0
                            ? `${booking?.bookingInfo?.customerRent?.daysDifference} days`
                            : "" ||
                              (booking?.bookingInfo?.customerRent?.months &&
                                booking?.bookingInfo?.customerRent?.days >= 0 &&
                                !booking?.bookingInfo?.customerRent?.years)
                            ? `${booking?.bookingInfo?.customerRent?.months} months, ${booking?.bookingInfo?.customerRent?.days} days`
                            : "" ||
                              (booking?.bookingInfo?.customerRent?.years &&
                                booking?.bookingInfo?.customerRent?.months >=
                                  0 &&
                                booking?.bookingInfo?.customerRent?.days >= 0)
                            ? `${booking?.bookingInfo?.customerRent?.years} year`
                            : ""}
                        </p>
                        <p>
                          BDT {booking?.bookingInfo?.subTotal?.toLocaleString()}
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
                      <p className=" font-bold mb-2 ">
                        <span className="text-[#35B0A7] p-1 rounded-sm">
                          Payment History
                        </span>
                      </p>
                      {/* <p>
                        <span className="font-bold mr-3">
                          Payment Method :{" "}
                        </span>{" "}
                        {booking?.transactions[0]?.allProperties[
                          booking?.transactions[0]?.allProperties.length - 1
                        ]?.paymentType
                          ? booking?.transactions[0]?.allProperties[
                              booking?.transactions[0]?.allProperties.length - 1
                            ]?.paymentType
                          : " null"}
                      </p> */}
                      {/* <p>
                        <span className="font-bold mr-3">Account Number :</span>{" "}
                        {booking?.paymentNumber
                          ? booking.paymentNumber
                          : transactions[transactions?.length - 1]
                              ?.paymentNumber}
                      </p> */}

                      {/* <p>
                        <span className="font-bold mr-3">
                          Transaction ID <span className="ml-[10px]">:</span>
                        </span>{" "}
                        {transactions[transactions?.length - 1]?.transactionId}
                      </p> */}
                    </div>
                    <div>
                      <div className="text-right total-amount-right font-[600] ">
                        <div className="flex justify-between">
                          <p className="font-bold">Subtotal</p>{" "}
                          <p className="ml-[55px]">:</p>{" "}
                          <p className="">
                            BDT{" "}
                            {booking?.bookingInfo?.subTotal?.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="font-bold">Food</p>{" "}
                          <p className="ml-[55px]">:</p>{" "}
                          <p className="">
                            BDT{" "}
                            {booking?.bookingInfo?.foodAmount?.toLocaleString()}
                          </p>
                        </div>

                        <div className="flex justify-between">
                          <p className="font-bold">VAT </p>{" "}
                          <p className="ml-[70px]">:</p>
                          <p className="">
                            BDT {booking?.bookingInfo?.vatTax?.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="font-bold">Admission Fee</p>
                          <p className="mx-5">:</p>
                          <p className="">
                            BDT{" "}
                            {booking?.bookingInfo?.addMissionFee > 0
                              ? booking?.bookingInfo?.addMissionFee?.toLocaleString()
                              : 0}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="font-bold">Security Fee </p>{" "}
                          <p className="ml-4">:</p>
                          <p className="">
                            BDT{" "}
                            {booking?.bookingInfo?.securityFee > 0
                              ? booking?.bookingInfo?.securityFee?.toLocaleString()
                              : 0}
                          </p>
                        </div>
                        <hr className="mt-1" />
                        <div className="flex justify-between">
                          <p className="font-bold">Total </p>
                          <p className="ml-[68px]">:</p>
                          <p className="">
                            BDT {booking?.totalAmount?.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="font-bold">Discount</p>
                          <p className="ml-8">:</p>
                          {/* <p className="">BDT {discount}</p> */}
                        </div>
                        <hr className="mt-1" />
                        <div className="paid-amount flex justify-between">
                          <p className="font-bold text-[12px]">Payable</p>{" "}
                          <p className="ml-[55px]">:</p>
                          {/* <p className=" text-[12px]">BDT {payableAmount}</p> */}
                        </div>
                        <hr className="mt-1" />
                        <div className="paid-amount flex justify-between">
                          <p className="font-bold text-[12px]">Paid</p>{" "}
                          <p className="ml-[55px]">:</p>
                          {/* {transactions?.length >= 1 ? (
                            <p className=" text-[12px]">
                              BDT {booking?.transactions[0]?.totalReceiveTk}
                            </p>
                          ) : (
                            <p className="text-red-500">Pending</p>
                          )} */}
                        </div>
                        <hr className="mt-1" />
                        <div className="paid-amount flex justify-between">
                          <p
                            className="font-bold text-[12px]"
                            style={{
                              color: booking?.dueAmount > 0 ? "red" : "",
                            }}
                          >
                            Due
                          </p>
                          <p className="ml-[75px]">:</p>
                          <p className=" text-[12px]">
                            BDT{" "}
                            {/* {payableAmount -
                              booking?.transactions[0]?.totalReceiveTk} */}
                            {/* {transactions[transactions?.length - 1]?.payableAmount -
                                          transactions[transactions?.length - 1]?.receivedTk}{" "} */}
                            {/* {booking?.dueAmount?.toLocaleString()} */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaInvoice;
