import { Toaster } from "react-hot-toast";
import LoadingState from "../LoadingState/LoadingState";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import useUser from "../../hooks/userUser";

import cashImg from "../../assets/img/Cash-1.png";
import brachLocationIcon from "../../assets/img/branchLocationIcon.png";
import { Tooltip, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverBaseUrl } from "../../serverApi/baseUrl";
import { IoCloseCircleOutline } from "react-icons/io5";

const VillaBookingForm = () => {
  const [singleUser] = useUser();

  const [isBlur, setIsBlur] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [requiredMessage, setRequiredMessage] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [dataForBooking, setDataForBooking] = useState({
    bookingExtend: false,
  });
  const [bookingItem, setBookingItem] = useState({});
  const [villa, setVilla] = useState({});

  const [selectMethod, setSelectMethod] = useState("bkash");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataForBooking((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handle Scrooled
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  const anchorClick = (e) => {
    anchorClickHandler(e);
  };

  const formatToInputDate = (dateStr) => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("-");
    return `${day}/${month}/${year}`; // "16-05-2025" → "16/05/2025"
  };

  const handlePaymentOption = () => {
    if (agreeTerms) {
      setIsBlur(true);
      setShowPayment(true);
    } else {
      setRequiredMessage(true);
    }
  };

  useEffect(() => {
    const storedBookingItem = localStorage.getItem("bookingItem");
    if (storedBookingItem) {
      const parseToJson = JSON.parse(localStorage.getItem("bookingItem"));
      setBookingItem(parseToJson);
    }
  }, []);

  useEffect(() => {
    const fetchVilla = async () => {
      const { data } = await axios.get(
        `${serverBaseUrl}/villa/${bookingItem?.villa}`
      );
      setVilla(data?.data);
    };
    fetchVilla();
  }, [bookingItem.villa]);
  console.log(bookingItem);

  return (
    <div>
      <LoadingState />
      <form
        // onSubmit={bookingOrder}
        className={`custom-container user_info_page ${
          isBlur ? "blur-lg relative h-[100vh] md:h-[80vh] overflow-hidden" : ""
        }`}
      >
        <div
          className="flex items-center gap-x-3 mt-3  cursor-pointer"
          onClick={() => {
            window.history.back();
          }}
        >
          <p>
            <FaArrowLeft className="w-[20px] h-[20px]" />
          </p>

          <p>Back to villa details</p>
        </div>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 mb-20">
          <div className="">
            <h2 className="text-black flex justify-left font-bold mt-4 text-[20px]">
              Please Fill this information{" "}
            </h2>
            <div>
              <p className="text-black flex justify-left mt-5 font-bold">
                Personal Information <span className="text-red-500">*</span>
              </p>

              <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-36 gap-y-3 mt-5 personal-info-page">
                <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                  <label htmlFor="Full Name">Name</label>
                  <input
                    placeholder="Your Full Name *"
                    type="text"
                    className="text-black personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full"
                    name="firstName"
                    defaultValue={singleUser ? singleUser?.firstName : ""}
                    required
                    disabled={singleUser?.firstName ? true : false}
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                  <label htmlFor="Phone Number">Mobile Number</label>
                  <input
                    type="text"
                    placeholder="Phone Number *"
                    className="text-black personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full"
                    name="phone"
                    required
                    disabled
                    defaultValue={singleUser ? singleUser?.phone : ""}
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                  <label htmlFor="Address">Address</label>
                  <input
                    type="text"
                    placeholder="Address "
                    className="text-black personal-info rounded 
                      lg:w-[350px] md:w-[300px] sm:w-full"
                    name="address"
                    defaultValue={singleUser ? singleUser?.userAddress : ""}
                    // value={dataForBooking.address}
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div>
              {/* Uplaod singleUser Id card */}

              {/* Emargency Details */}
              <p className="text-black flex justify-left mt-5 font-bold">
                Guardian Information <span className="text-red-500">*</span>
              </p>

              <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-36 gap-y-3 mt-5 personal-info-page">
                <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                  <label htmlFor="Contact Name">Name</label>
                  <input
                    placeholder="Guardian Contact Name *"
                    type="text"
                    className="text-black personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full"
                    name="emergencyContactName"
                    defaultValue={singleUser?.emergencyContact?.contactName}
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                  <label htmlFor="Relationship">Relationship</label>
                  <input
                    placeholder="Relationship *"
                    className="text-black personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full"
                    type="text"
                    name="emergencyRelationC"
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                    defaultValue={singleUser?.emergencyContact?.relation}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                  <label htmlFor="Contact Number">Mobile Number</label>
                  <input
                    type="text"
                    placeholder="Guardian Contact Number *"
                    className="text-black personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full"
                    name="contactNumber"
                    required
                    defaultValue={singleUser?.emergencyContact?.contactNumber}
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-36 gap-y-3 mt-5">
                <div>
                  <p className="mb-2">Special Request</p>
                  <textarea
                    placeholder="Special Request Optional"
                    className="personal-info rounded pl-3 lg:w-[750px] md:w-[300px] sm:w-full"
                    name="request"
                    cols="30"
                    rows="3"
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              <p className="flex flex-left text-black mt-2 special-req">
                Special requests cannot be guaranteed but we will do our best to
                meet your needs
              </p>
            </div>
            <div className="flex items-start mt-20">
              <div>
                <img loading="lazy" src={cashImg} alt="" />
              </div>
              <p className="text-lg ">
                NOTE : You could pay directly in our structure with any kind of
                credit card or cash.
              </p>
            </div>
          </div>

          {/* Cart for Lg */}
          <div id="keyDetails">
            <div className="mt-2 lg:ml-44 md:ml-0 sticky md:top-20">
              <div
                style={{
                  boxShadow:
                    "0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25) ",
                  borderRadius: "3px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#35B0A7",
                    // width: "430px",
                    height: "35px",
                    borderRadius: "3px 3px 0px 0px",
                  }}
                ></div>
                <div
                  className="px-3 py-2 m-3"
                  style={{
                    boxShadow: "0px 0px 5px 3px #CCC",
                    borderRadius: "5px",
                  }}
                >
                  <div className="flex justify-between">
                    <div className="flex ">
                      <div>
                        <img loading="lazy" src={brachLocationIcon} alt="" />
                      </div>

                      <p className="text-black text-sm">
                        {villa?.resortId?.name}
                      </p>
                    </div>
                    <p
                      className=" flex justify-start text-sm"
                      style={{
                        backgroundColor: "#FCA22A",
                        color: "white",
                        padding: "3px 5px ",
                        borderRadius: "5px",
                      }}
                    >
                      ({villa?.type})
                    </p>
                  </div>
                </div>

                <div className="flex justify-between mt-3 total-area text-black text-sm">
                  <div>
                    <p className="text-center font-bold">Check-In</p>
                    <div
                      className="input-filed-area w-full"
                      style={{ marginTop: 10 }}
                    >
                      <i
                        className="fa-solid fa-calendar-days location-icon"
                        style={{ color: "#00bbb4", marginTop: -10 }}
                      ></i>
                      <input
                        className="ps-7 w-36"
                        type="text"
                        defaultValue={formatToInputDate(
                          bookingItem?.rentDate?.bookingStartDate
                        )}
                        disabled
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-center font-bold mb-1">Check-Out</p>
                    <div
                      className="input-filed-area w-full"
                      style={{ marginTop: 10 }}
                    >
                      <i
                        className="fa-solid fa-calendar-days location-icon"
                        style={{ color: "#00bbb4", marginTop: -10 }}
                      ></i>
                      <input
                        className="ps-7 w-36"
                        type="text"
                        defaultValue={formatToInputDate(
                          bookingItem?.rentDate?.bookingEndDate
                        )}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="mt-1.5 w-full px-1 py-[0.5px] sm:hidden md:block duration_large_screen">
                    <p className="text-center font-bold mb-2 mt-[-5px]">
                      Duration
                    </p>
                    <p className=" duraion-count font-normal ps-1 text-sm ">
                      {bookingItem?.rentDate?.daysDifference > 1
                        ? `${bookingItem?.rentDate?.daysDifference} Nights`
                        : `${bookingItem?.rentDate?.daysDifference} Night`}
                    </p>
                  </div>
                </div>
                <div className=" mt-2 text-sm duration_small">
                  <div className="flex ms-[65px]">
                    <p className="font-bold mb-1">Duration = </p>

                    <div>
                      <input
                        type="text"
                        value={
                          bookingItem?.bookingItem?.rentDate?.daysDifference > 1
                            ? `${bookingItem?.rentDate?.daysDifference} Nights`
                            : `${bookingItem?.rentDate?.daysDifference} Night`
                        }
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="text-black text-sm pr-5 mt-5">
                  <div className="flex justify-between ">
                    <div className="ml-16 flex items-center">
                      <p>Rent</p>
                      <div className="ml-2">
                        <Tooltip
                          content={
                            <div>
                              <Typography
                                variant="small"
                                style={{
                                  color: "white",
                                  backgroundColor: "black",
                                  width: "200px",
                                }}
                                className="font-normal opacity-75 px-5 py-2 rounded"
                              >
                                <span>
                                  {bookingItem?.rentDate?.daysDifference +
                                    " night"}{" "}
                                  X {bookingItem?.perNight} = {""}
                                  {bookingItem?.perNight *
                                    bookingItem?.rentDate?.daysDifference +
                                    " Tk"}
                                </span>
                              </Typography>
                            </div>
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-5 w-5 cursor-pointer text-blue-gray-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                            />
                          </svg>
                        </Tooltip>
                      </div>
                    </div>
                    <p>BDT {bookingItem?.subTotal?.toLocaleString()}</p>
                  </div>

                  <hr className="mt-3 ml-5 text-black" />
                  <div className="flex justify-between mt-2">
                    <p className="ml-16">Total Amount</p>
                    <p>BDT {bookingItem?.totalAmount?.toLocaleString()}</p>
                  </div>

                  <div className={`flex justify-between `}>
                    <div className="ml-16 flex items-center payment-check">
                      <p className="text-red-500">Advance Payment</p>
                      <div className="ml-2">
                        <Tooltip
                          content={
                            <div>
                              <Typography
                                variant="small"
                                style={{
                                  color: "white",
                                  backgroundColor: "black",
                                  width: "200px",
                                }}
                                className="font-normal opacity-75 px-5 py-2 rounded"
                              >
                                Non-refundable (It will be adjust in your Final
                                Payment)
                              </Typography>
                            </div>
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-5 w-5 cursor-pointer text-blue-gray-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                            />
                          </svg>
                        </Tooltip>
                      </div>
                    </div>
                    <p>
                      {" "}
                      BDT{" "}
                      {bookingItem?.minimumPayment
                        ? bookingItem?.minimumPayment?.toLocaleString()
                        : 0}
                    </p>
                  </div>
                </div>
                <div className="flex items-center px-4 text-black">
                  <div>
                    <input
                      type="checkbox"
                      name="bookingExtend"
                      id=""
                      value={true}
                      onClick={handleInputChange}
                    />
                  </div>
                  <p className="text-left pl-3 text-[#35B0A7] font-bold text-[12px]">
                    I Would Like to Extend in Future
                  </p>
                </div>
                <div className="flex px-4 mt-1 text-black  mb-1">
                  <div>
                    <input
                      type="checkbox"
                      name="terms"
                      required
                      id="terms"
                      // checked={agreeTerms}
                      onChange={() => {
                        setAgreeTerms(!agreeTerms);
                        setRequiredMessage(false);
                      }}
                    />
                  </div>
                  <p className="text-left pl-3 text-[12px]">
                    I agree with our{" "}
                    <Link
                      to="/terms"
                      className="underline hover:text-[#02625a]"
                    >
                      {" "}
                      Terms of use
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="underline hover:text-[#02625a]"
                    >
                      {" "}
                      Privacy Policy
                    </Link>
                  </p>
                </div>
                {requiredMessage && (
                  <p className="text-sm text-red-600 font-medium px-4">
                    Please check the box for agree our Terms of use and Privacy
                    Policy
                  </p>
                )}
                <button
                  type="button"
                  onClick={handlePaymentOption}
                  className="text-[1rem] p-2 cursor-pointer bg-[#35B0A7] hover:bg-[#02625a] w-full text-white h-[35px]"
                >
                  Confirm Booking
                </button>
              </div>
              <div
                style={{
                  backgroundColor: "#FDF6B1",
                  borderLeft: "4px solid #02625a",
                  fontSize: "14px",
                  color: "#02625a",
                  fontWeight: "bolder",
                }}
                className="px-2 py-2"
              >
                <span
                  style={{
                    fontSize: "16px",
                    color: "red",
                  }}
                >
                  Attention :
                </span>
                <span>
                  {" "}
                  Please bring one copy of your{" "}
                  <span className="text-black">
                    {" "}
                    NID Card / Passport / Birth Certificate / Driving License
                  </span>{" "}
                  at the time of check-in.
                </span>
              </div>
            </div>
          </div>
        </div>
        {scrollY > 2700 ? (
          ""
        ) : (
          <div>
            <div
              className="flex justify-center items-center mb-4 fixed bottom-0"
              style={{ zIndex: 9999, width: "100%" }}
            >
              <a
                href="#keyDetails"
                onClick={anchorClick}
                className="md:invisible hover:text-white text-white px-14 rounded-t-lg py-1"
                style={{ backgroundColor: "#00bbb4" }}
              >
                <i className="fas fa-shopping-cart mt-2 mr-2"></i>
                Confirm Booking
              </a>
            </div>
          </div>
        )}

        <Toaster
          containerStyle={{ top: 300 }}
          toastOptions={{ position: "top-center" }}
        ></Toaster>
      </form>

      {showPayment && (
        <div
          style={{
            boxShadow:
              "0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25) ",
            borderRadius: "3px",
            backgroundColor: "white",
          }}
          className="bg-white z-50 absolute top-[10%] lg:top-[15%] w-[96%] lg:w-[50%] left-2 md:left-4 lg:left-1/4 lg:right-1/2"
        >
          <div
            style={{
              backgroundColor: "#35B0A7",
              height: "35px",
              borderRadius: "3px 3px 0px 0px",
            }}
            className="flex justify-end items-center pr-2"
          >
            <button
              onClick={() => {
                setShowPayment(false);
                setIsBlur(false);
              }}
            >
              <IoCloseCircleOutline color="white" size={28} />
            </button>
          </div>
          <div className="flex items-end gap-2 p-5">
            <div className="hidden md:block">
              <img loading="lazy" src={cashImg} alt="" />
            </div>
            <p className="text-lg ">
              NOTE : You can pay directly in our structure with any kind of
              credit card or cash.
            </p>
          </div>
          <div className=" md:my-6 flex items-center mx-4">
            <input
              type="radio"
              id="bkash"
              name="method"
              value="bkash"
              defaultChecked
              className=" mr-1"
              onChange={(e) => setSelectMethod(e.target.value)}
            />
            <span className="text-[15px] mr-2">Pay Via Online</span>
            <input
              type="radio"
              id="cash"
              name="method"
              value="cash"
              // defaultChecked
              // className="mr-1"
              onChange={(e) => setSelectMethod(e.target.value)}
            />
            <span className="text-[15px] ml-1">Cash / Card</span>
          </div>
          {selectMethod === "bkash" ? (
            <div className="mx-4 mb-4">
              <p className="text-left font-bold my-2">
                bkash (Merchant) :{" "}
                {bookingItem?.branch?.branchBkashNumber
                  ? bookingItem?.branch?.branchBkashNumber
                  : ""}{" "}
              </p>
              <p>1. Select Make Payment</p>
              <p>2. Enter The Merchant Number (01407001410)</p>
              <p>
                3. Enter The Amount You Want To Pay{" "}
                <span className="text-[#35B0A7]">
                  (minimum amount to pay : ৳{bookingItem?.minimumPayment})
                </span>
              </p>
              <p className="text-left my-2">
                Please fill the form to submit your booking
              </p>

              <div className="mt-3">
                <div>
                  <p className="text-[1rem]">
                    bKash Number (from which you make payment) :{" "}
                  </p>
                </div>
                <div className="w-[250px]">
                  <input
                    className="mt-2 ps-2  border h-8 w-[250px]"
                    name="bkashNumber"
                    required
                    type="text"
                    placeholder="017xxxxxxxx"
                    onChange={(e) => setPaymentNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-3">
                <div>
                  <p>How much money have you send :</p>
                </div>
                <div className="w-[250px]">
                  <input
                    className=" mt-2 ps-2 border h-8 w-[250px]"
                    name="receivedTk"
                    required
                    type="text"
                    placeholder="Sending Amount"
                    onChange={(e) => setReceivedTk(e.target.value)}
                  />
                </div>
              </div>
              <button
                onClick={() => handlePayByBkash(receivedTk)}
                className=" bg-[#35B0A7] py-1 rounded  text-white my-4 w-[250px] hover:bg-[#02625a]"
              >
                Place Booking Now
              </button>
            </div>
          ) : (
            <div  className="mx-4 mb-4">
              <button
                onClick={() => handlePayByBkash(receivedTk)}
                className=" bg-[#35B0A7] py-1 rounded  text-white my-4 w-[250px] hover:bg-[#02625a]"
              >
                Place Booking Now
              </button>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default VillaBookingForm;
