import { useEffect, useRef, useState } from "react";
import right from "../../assets/img/Right.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverBaseUrl } from "../../serverApi/baseUrl";
import { format, parseISO } from "date-fns";
import logo from "../../assets/img/logo.png";
import ReactToPrint from "react-to-print";
import { usePDF } from "react-to-pdf";

const VillaInvoice = () => {
  const ref = useRef();
  const pdfRef = useRef();
  const { id } = useParams();
  const [booking, setBooking] = useState({});
  const [dueAmount, setDueAmount] = useState(0);
  const { toPDF, targetRef } = usePDF({ filename: "invoice.pdf" });

  useEffect(() => {
    const fetchBooking = async () => {
      const { data } = await axios.get(`${serverBaseUrl}/villa-order/${id}`);
      setBooking(data?.data);
      setDueAmount(data?.data?.totalAmount - data?.data?.sendAmount);
    };
    fetchBooking();
  }, [id]);

  console.log(booking);

  return (
    <div className=" md:flex md:justify-center">
      <div className=" ">
        <div className=" ">
          <div className="flex items-center mt-[50px] mb-10">
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
            // className="md:overflow-hidden sm:overflow-scroll "
          >
            <div ref={targetRef} className="">
              <div className=" pt-6  payment-info  md:w-auto sm:w-[952px] border flex flex-col">
                <div className=" px-10 flex justify-between  gap-x-0">
                  <div>
                    <img
                      loading="lazy"
                      src={booking?.villa?.resortId?.logo}
                      alt={booking?.villa?.resortId?.name}
                      className="h-24 w-24 "
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
                <div className=" px-10 flex justify-between my-12 text-left">
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
                          Check in Time : {booking?.rentDate?.bookStartDate}
                        </p>
                        <p>Check Out Time : {booking?.rentDate?.bookEndDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Booking Table */}

                <div className="relative ">
                  <div className="bg-[#35B0A7] booking-table mt-3 text-white grid grid-cols-4 py-2 mx-10  justify-items-center">
                    <p>Villa Number</p>
                    <p>Villa Name</p>
                    <p>Total Duration</p>
                    <p>Amount</p>
                  </div>
                  <div className="absolute left-[45%] top-[12%] opacity-20 ">
                    <img src={logo} className="w-120 h-40 " />
                  </div>
                  <div
                    style={{
                      backgroundColor: "rgba(53, 176, 167, 0.10)",
                    }}
                    className="booking-table grid grid-cols-4 py-2  justify-items-center mx-10"
                  >
                    <p>{booking?.villa?.villaNumber}</p>
                    <p>{booking?.villa?.title}</p>
                    <p>
                      {booking?.rentDate?.daysDifference}{" "}
                      {booking?.rentDate?.daysDifference === 1
                        ? "Night"
                        : "Nights"}
                    </p>
                    <p>BDT {booking?.totalAmount}</p>
                  </div>

                  <div
                    className=" booking-table bg-white "
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
                    className=" booking-table mx-10 "
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
                    className=" booking-table bg-white mx-10"
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
                    className=" booking-table bg-white mx-10"
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

                  {/*  Payment History */}

                  <div className="flex justify-between my-10 text-left px-10">
                    <div className="total-amount-left">
                      <p className=" font-bold mb-2 ">
                        <span className="text-[#35B0A7]  rounded-sm">
                          Payment History
                        </span>
                      </p>
                      <p>
                        <span className="font-bold mr-3">
                          Payment Method :{" "}
                        </span>{" "}
                        {booking?.paymentPlatform}
                      </p>
                      <p>
                        <span className="font-bold mr-3">Account Number :</span>{" "}
                        {booking?.senderAccountNumber}
                      </p>
                    </div>
                    <div>
                      <div className="text-right total-amount-right font-[600] ">
                        <div className="flex justify-between w-32">
                          <p className="font-bold">Total </p>
                          <p>:</p>
                          <p className="">
                            BDT {booking?.totalAmount?.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex justify-between w-32">
                          <p className="font-bold ">Paid</p>
                          <p className="-ml-2">:</p>
                          <p>BDT {booking?.sendAmount}</p>
                        </div>
                        <hr className="mt-1" />
                        <div className="paid-amount flex justify-between w-32">
                          <p
                            className="font-bold"
                            style={{
                              color: dueAmount > 0 ? "red" : "",
                            }}
                          >
                            Due
                          </p>
                          <p>:</p>
                          <p>BDT {dueAmount}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Note */}
                  <div className="flex  justify-between items-end px-10 ">
                    <div className="note-area w-1/2">
                      <label className="text-left text-[#35b0a7]">Note:</label>
                      <textarea
                        name=""
                        id=""
                        cols="50"
                        rows="6"
                        className="rounded pl-2 sm:w-full"
                        disabled
                      ></textarea>
                    </div>
                    <div className=" signature  font-[500] ">
                      <p>Authorized Signature</p>
                      <hr className="my-6" style={{ width: "200px" }} />
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-end">
                  <div className="w-full flex justify-between bg-[#35B0A7] px-10 py-2 text-white invoice-footer mt-6 ">
                    <p>Head Office : House-23, Road-03, Dhanmondi, Dhaka</p>
                    <p>Mobile: +8801647647404</p>
                    <p>www.psh.com.bd</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* print and download */}
        <div className="w-full flex justify-end items-center gap-12 my-10  ">
          {/* print */}
          <div className="hidden md:block ">
            <ReactToPrint
              trigger={() => (
                <button className=" bg-[#399] px-5 py-2 rounded text-white font-medium text-xl">
                  Print
                </button>
              )}
              content={() => targetRef.current}
            />
          </div>
          {/* download */}
          <div>
            <button
              onClick={() => toPDF()}
              className="bg-[#399] px-5 py-2 rounded text-white font-medium text-xl hover:text-white "
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaInvoice;
