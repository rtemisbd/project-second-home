import { useEffect, useRef, useState } from "react";
import right from "../../assets/img/Right.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverBaseUrl } from "../../serverApi/baseUrl";
import { format, parseISO } from "date-fns";
import logo from "../../assets/img/logo.png";
import ReactToPrint from "react-to-print";
import { usePDF } from "react-to-pdf";
import "./invoice.css";

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
              <div className=" pt-6  payment-info  md:w-auto sm:w-[952px] border  flex flex-col">
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
                    <div className="text-[1rem] text-[#35B0A7]">
                      #{booking?.bookingId}
                    </div>
                    <div className="flex justify-between mt-2">
                      <div>Date :</div>{" "}
                      <div>
                        {booking?.createdAt
                          ? format(parseISO(booking.createdAt), "dd/MM/yyyy")
                          : "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Booking Location */}
                <div className=" px-10 flex justify-between my-12 text-left">
                  <div>
                    <div className="text-[#35B0A7] font-bold">
                      {booking?.villa?.resortId?.name}
                    </div>
                    <div>
                      <span className="font-bold">Address :</span>{" "}
                      {booking?.villa?.resortId?.address}
                    </div>
                    <div>
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
                    </div>
                    <div>
                      <span className="font-bold">Email :</span>{" "}
                      {booking?.villa?.resortId?.resortEmail}
                    </div>
                  </div>
                  <div className="">
                    <div className="text-left ">
                      <div className="text-[#35B0A7] font-bold ">Bill To,</div>
                      <div className="">
                        <span className="font-bold">Name :</span>{" "}
                        {booking?.user?.firstName}
                      </div>
                      <div className="">
                        <span className="font-bold">Address :</span>{" "}
                        {booking?.user?.userAddress}
                      </div>
                      <div className="">
                        <span className="font-bold">Mobile :</span>{" "}
                        {booking?.user?.phone}
                      </div>

                      <div className="mt-2.5">
                        <div>
                          Check In  : {booking?.rentDate?.bookStartDate}
                        </div>
                        <div>
                          Check Out  : {booking?.rentDate?.bookEndDate}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Booking Table */}

                <div className="relative ">
                  <div className="bg-[#35B0A7] booking-table mt-3 text-white grid grid-cols-5 py-2 mx-10  justify-items-center text-[18px] ">
                    <span>Villa Number</span>
                    <span>Villa Name</span>
                    <span>Per Night</span>
                    <span>Total Duration</span>
                    <span>Amount</span>
                  </div>
                  <div className="absolute left-[45%] top-[20%] opacity-10 ">
                    <img src={logo} className="w-120 h-40  " />
                  </div>
                  <div
                    style={{
                      backgroundColor: "rgba(53, 176, 167, 0.10)",
                    }}
                    className="booking-table grid grid-cols-5 py-8 h-[276px] text-[18px] justify-items-center mx-10"
                  >
                    <span>{booking?.villa?.villaNumber}</span>
                    <span>{booking?.villa?.title}</span>
                    <span>{booking?.perNight}</span>
                    <span>
                      {booking?.rentDate?.daysDifference}{" "}
                      {booking?.rentDate?.daysDifference === 1
                        ? "Night"
                        : "Nights"}
                    </span>
                    <span>BDT {booking?.totalAmount}</span>
                  </div>

                  {/*  Payment History */}

                  <div className="flex justify-between my-10 text-left px-10">
                    <div className="total-amount-left">
                      <div className=" font-bold mb-2 ">
                        <span className="text-[#35B0A7]  rounded-sm">
                          Payment History
                        </span>
                      </div>
                      <div>
                        <span className="font-bold mr-3">
                          Payment Method :{" "}
                        </span>{" "}
                        {booking?.paymentPlatform}
                      </div>
                      <div>
                        <span className="font-bold mr-3">Account Number :</span>{" "}
                        {booking?.senderAccountNumber}
                      </div>
                    </div>
                    <div>
                      <div className="text-right total-amount-right font-[600] ">
                        <div className="flex justify-between gap-6">
                          <div className="font-bold">Total </div>
                          <div>:</div>
                          <div className="">
                            BDT {booking?.totalAmount?.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex justify-between gap-6 my-2">
                          <div className="font-bold ">Paid</div>
                          <div className="-ml-2">:</div>
                          <div>BDT {booking?.sendAmount}</div>
                        </div>
                        <hr className="mt-2" />
                        <div className=" flex justify-between gap-6 my-2 text-[18px]">
                          <div
                            className="font-bold "
                            style={{
                              color: dueAmount > 0 ? "red" : "",
                            }}
                          >
                            Due
                          </div>
                          <div>:</div>
                          <div>BDT {dueAmount}</div>
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
                      <div>Authorized Signature</div>
                      <hr className="my-6" style={{ width: "200px" }} />
                    </div>
                  </div>
                </div>
                <ul className="w-full  px-10 py-2 invoice-footer mt-6 list-disc">
                  <li>
                    Please bring a hard/soft copy of the Invoice and one hard
                    copy of your NID Card / Passport / Birth Certificate /
                    Driving License at the time of check-in.
                  </li>
                  <li>
                    For any further questions, kindly reach out to{" "}
                    <span className="font-bold">
                      {booking?.villa?.resortId?.name} -{" "}
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
                    </span>{" "}
                  </li>
                </ul>
                <div className="flex w-full items-end">
                  <div className="w-full flex justify-between bg-[#35B0A7] px-10 py-2 text-white invoice-footer mt-6 ">
                    <div>Head Office : House-23, Road-03, Dhanmondi, Dhaka</div>
                    <div>Mobile: +8801647647404</div>
                    <div>www.psh.com.bd</div>
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
