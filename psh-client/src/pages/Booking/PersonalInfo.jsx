import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { Tooltip, Typography } from "@material-tailwind/react";
import { FaArrowLeft } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

import cashImg from "../../assets/img/Cash-1.png";
import brachLocationIcon from "../../assets/img/branchLocationIcon.png";
import useExtraCharge from "../../hooks/useExtraCharge";
import "../Payment/PaymentToggle.css";
import "./PersonalInfo.css";
import { useDispatch } from "react-redux";
import { placeLoadingShow } from "../../redux/reducers/smProfileMenuSlice";
import LoadingState from "../LoadingState/LoadingState";
import { AuthContext } from "../../contexts/UserProvider";
import { serverBaseUrl } from "../../serverApi/baseUrl";
import { anchorClickHandler } from "../../utilities/anchorClickHandler";
import { IoCloseCircleOutline } from "react-icons/io5";
import MobileBanking from "../Payment/MobileBanking";
import useUser from "../../hooks/userUser";

const PersonalInfo = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [singleUser] = useUser();
  const [bookingItem, setBookingItem] = useState({});
  // const [bookingItem, setBookingItem] = useState({});
  const [amountForPay, setAmountForPay] = useState(0);
  const [isBlur, setIsBlur] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [selectMethod, setSelectMethod] = useState("app");
  const [requiredMessage, setRequiredMessage] = useState(false);
  const [showUserInputForPayment, setShowUserInputForPayment] = useState(false);
  const [isLessAmount, setIsLessAmount] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const [paymentNumber, setPaymentNumber] = useState(null);
  const [receivedTk, setReceivedTk] = useState(null);

  const [dataForBooking, setDataForBooking] = useState({
    // arrivalTime: "",
    // bookingExtend: false,
  });

  const [extraCharge] = useExtraCharge(bookingItem);
  const { pathname } = useLocation();

  let bkashError;

  useEffect(() => {
    const storedBookingItem = localStorage.getItem("bookingItem");
    if (storedBookingItem) {
      const parseToJson = JSON.parse(localStorage.getItem("bookingItem"));
      setBookingItem(parseToJson);
    }
  }, []);
  // console.log(bookingItem);

  useEffect(() => {
    if (singleUser) {
      setDataForBooking((prevData) => ({
        ...prevData,
        // user Info
        userInfo: {
          userId: singleUser?._id || "",
          fullName: singleUser?.firstName || "",
          phone: singleUser?.phone || "",
          address: singleUser?.userAddress || "",
          validityType: singleUser?.validityType || "",
          emergencyContactName: singleUser?.emergencyContact?.contactName || "",
          emergencyRelationC: singleUser?.emergencyContact?.relation || "",
          emergencyContact: singleUser?.emergencyContact?.contactNumber || "",
        },
        userId: singleUser?._id || "",
        phone: singleUser?.phone,
        arrivalTime: "09 AM To 10 AM",
        // bookingInfo: bookingItem,
        // addMissionFee: bookingItem?.addMissionFee,
        branch: bookingItem?.branch?._id,
        customerRent: bookingItem?.customerRent,
        discount: bookingItem?.discount,
        foodAmount: bookingItem?.foodAmount,
        isIncludeFood: bookingItem?.isIncludeFood,
        minimumPayment: bookingItem?.minimumPayment,
        payableAmount: bookingItem?.payableAmount,
        promoCodeDiscount: bookingItem?.promoCodeDiscount,
        rentDate: bookingItem?.rentDate,
        roomId: bookingItem?.roomId,
        roomType: bookingItem?.roomType,
        seatId: bookingItem?.seatBooking,
        securityFee: bookingItem?.securityFee,
        subTotal: bookingItem?.subTotal,
        totalAmount: bookingItem?.totalAmount,
        usedPromo: bookingItem?.usedPromo,
        // vatTax: bookingItem?.vatTax,
        perDay: bookingItem?.perDay,

        // branch: bookingItem?.branch?._id,
      }));
    }
  }, [singleUser]);

  const anchorClick = (e) => {
    anchorClickHandler(e);
  };

  // get month Last Day
  function getLastDayOfMonth() {
    const today = new Date(bookingItem?.rentDate?.bookStartDate);
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const lastDay = new Date(year, month, 0).getDate();
    return lastDay;
  }

  const handlePaymentOption = () => {
    if (agreeTerms) {
      setIsBlur(true);
      setShowPayment(true);
    } else {
      setRequiredMessage(true);
    }
  };

  const handleUserInputAmount = async (e) => {
    const value = await e.target.value;
    if ((await value) < bookingItem.minimumPayment) {
      setIsLessAmount(true);
    } else {
      setIsLessAmount(false);
      setAmountForPay(value);
    }
  };

  const handlePayByBkash = async (amount) => {
    try {
      dispatch(placeLoadingShow(true));
      if (selectMethod === "manual") {
        dataForBooking.receivedTk = receivedTk;
        dataForBooking.paymentNumber = paymentNumber;
      }

      if (amount && dataForBooking) {
        dataForBooking.receivedTk = amount;
        const { data } = await axios.post(
          `${serverBaseUrl}/bkash/payment/create`,
          { amount, dataForBooking, selectMethod },
          { withCredentials: true }
        );
        // console.log(data);

        window.location.href =
          selectMethod === "manual" ? data?.data?.bkashURL : data?.bkashURL;

        // toast.success("Booking successfully done");
      } else {
        setShowPayment(false);
        setIsBlur(false);
        dispatch(placeLoadingShow(false));
        toast.error("Something is wrong! Please try again.");
      }
      setShowPayment(false);
      setIsBlur(false);
      dispatch(placeLoadingShow(false));
      localStorage.removeItem("bookingItem");
      localStorage.removeItem("seatItem");
      // navigate("/booking-now");
    } catch (error) {
      // console.log(error);

      dispatch(placeLoadingShow(false));
      toast.error("Something is wrong");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // if (name === "validityType" && value === "Select One") {
    //   return toast.error("Sorry! Please Select Verification Type");
    // }
    // if (
    //   (name === "contactNumber" && value?.length !== 11) ||
    //   value?.substring(0, 2) !== "01"
    // ) {
    //   return toast.error("Sorry! you gave a wrong phone number");
    // }
    setDataForBooking((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handle Scrooled
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollY > 230) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, [scrollY]);

  // Page location top to path dependency
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // console.log(bookingItem);

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

          <p>Back to room details</p>
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
                    // defaultValue={singleUser ? singleUser?.userAddress : ""}
                    value={dataForBooking.address}
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                  <label htmlFor="">Choose Your Identity Verification</label>
                  <select
                    className="personal-info lg:w-[350px] md:w-[300px] sm:w-full h-[45px] rounded"
                    name="validityType"
                    onChange={handleInputChange}
                    defaultValue={singleUser?.validityType}
                    // disabled={singleUser?.validityType ? true : false}
                    // required={validityType === "Select One"}
                    required
                  >
                    <option selected>Select One</option>
                    <option
                      selected={singleUser?.validityType === "National ID Card"}
                      value="National ID Card"
                    >
                      National ID Card
                    </option>
                    <option
                      selected={singleUser?.validityType === "Passport"}
                      value="Passport"
                    >
                      Passport
                    </option>
                    <option
                      selected={singleUser?.validityType === "Driving Licence"}
                      value="Driving Licence"
                    >
                      Driving Licence
                    </option>
                    <option
                      selected={
                        singleUser?.validityType === "Birth Certificate"
                      }
                      value="Birth Certificate"
                    >
                      Birth Certificate
                    </option>
                  </select>
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
                    // onChange={(e) => setEmergencyContactName(e.target.value)}
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
                    // onChange={(e) => setEmergencyRelationC(e.target.value)}
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
                    // onChange={(e) => setEmergencyContact(e.target.value)}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="text-black flex justify-left mt-5 font-bold">
                Arrival information
              </p>

              <div>
                <select
                  className="text-black personal-info rounded mt-5 lg:w-[350px] md:w-[300px] sm:w-full"
                  style={{
                    height: "45px",
                    padding: "0px 10px",
                  }}
                  name="arrivalTime"
                  onChange={handleInputChange}
                >
                  <option disabled>Time of Arrival</option>
                  <option>09 AM To 10 AM</option>
                  <option>10 AM To 11 AM</option>
                  <option>11 AM To 12 PM</option>
                </select>
              </div>
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
            {/* <div className="flex items-start mt-20">
              <div>
                <img loading="lazy" src={cashImg} alt="" />
              </div>
              <p className="text-lg ">
                NOTE : You could pay directly in our structure with any kind of
                credit card or cash.
              </p>
            </div> */}
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
                        {bookingItem?.branch?.name}
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
                      {bookingItem?.roomType}
                    </p>
                  </div>
                </div>

                <div className="mx-5">
                  <div className="flex justify-evenly text-sm">
                    <ul className="flex justify-evenly ">
                      <li className="list-none border py-1 h-7">
                        <span
                          className={` duration-select py-1 ${
                            bookingItem?.customerRent?.remainingDays <
                              getLastDayOfMonth() &&
                            bookingItem?.customerRent?.years === undefined
                              ? "dmyActive "
                              : "text-black"
                          }`}
                        >
                          Day
                        </span>
                      </li>
                      <li className="list-none border py-1 h-7">
                        <span
                          className={` duration-select py-1 ${
                            bookingItem?.customerRent?.remainingDays >=
                              getLastDayOfMonth() &&
                            bookingItem?.customerRent?.years === undefined
                              ? "dmyActive "
                              : "text-black"
                          }`}
                        >
                          Month
                        </span>
                      </li>
                      <li className="list-none border py-1 h-7">
                        <span
                          className={` duration-select py-1 ${
                            bookingItem?.customerRent?.years >= 1
                              ? "dmyActive "
                              : "text-black"
                          }`}
                        >
                          Year
                        </span>
                      </li>
                    </ul>
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
                        type="date"
                        defaultValue={bookingItem?.rentDate?.bookStartDate}
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
                        type="date"
                        defaultValue={bookingItem?.rentDate?.bookEndDate}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="mt-1.5 w-full px-1 py-[0.5px] sm:hidden md:block duration_large_screen">
                    <p className="text-center font-bold mb-2 mt-[-5px]">
                      Duration
                    </p>
                    <p className=" duraion-count font-normal ps-1 text-sm ">
                      {bookingItem?.customerRent?.daysDifference >= 0
                        ? `${bookingItem?.customerRent?.daysDifference} Days`
                        : "" ||
                          (bookingItem?.customerRent?.months &&
                            bookingItem?.customerRent?.days >= 0 &&
                            !bookingItem?.customerRent?.years)
                        ? `${bookingItem?.customerRent?.months} months, ${bookingItem?.customerRent?.days} Days`
                        : "" ||
                          (bookingItem?.customerRent?.years &&
                            bookingItem?.customerRent?.months >= 0 &&
                            bookingItem?.customerRent?.days >= 0)
                        ? `${bookingItem?.customerRent?.years} years, ${bookingItem?.customerRent?.months} months, ${bookingItem?.customerRent?.days} Days`
                        : ""}
                    </p>
                  </div>
                </div>
                <div className=" mt-2 text-sm duration_small">
                  <div className="flex ms-[65px]">
                    <p className="font-bold mb-1">Duration = </p>

                    <div>
                      <input
                        className=""
                        type="text"
                        value={`${
                          bookingItem?.customerRent?.daysDifference >= 0
                            ? `${bookingItem?.customerRent?.daysDifference} Days`
                            : "" ||
                              (bookingItem?.customerRent?.months &&
                                bookingItem?.customerRent?.days >= 0 &&
                                !bookingItem?.customerRent?.years)
                            ? `${bookingItem?.customerRent?.months} months, ${bookingItem?.customerRent?.days} Days`
                            : "" ||
                              (bookingItem?.customerRent?.years &&
                                bookingItem?.customerRent?.months >= 0 &&
                                bookingItem?.customerRent?.days >= 0)
                            ? `${bookingItem?.customerRent?.years} years, ${bookingItem?.customerRent?.months} months, ${bookingItem?.customerRent?.days} Days`
                            : ""
                        }`}
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
                        {bookingItem?.roomType === "Shared Room" ? (
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
                                  {bookingItem?.customerRent?.months ===
                                    undefined &&
                                  bookingItem?.customerRent?.years ===
                                    undefined ? (
                                    <span>
                                      {bookingItem?.customerRent
                                        ?.remainingDays + " day"}{" "}
                                      X {bookingItem?.perDay} = {""}
                                      {bookingItem?.perDay *
                                        bookingItem?.customerRent
                                          ?.remainingDays +
                                        " Tk"}
                                    </span>
                                  ) : (
                                    ""
                                  )}

                                  {bookingItem?.customerRent?.months >= 1 &&
                                  bookingItem?.customerRent?.years ===
                                    undefined ? (
                                    <span>
                                      {bookingItem?.customerRent.months +
                                        " month"}{" "}
                                      = {""}
                                      {bookingItem?.seatBooking?.perMonth *
                                        bookingItem?.customerRent.months +
                                        " Tk"}
                                      {bookingItem?.customerRent?.days > 0 ? (
                                        <span>
                                          +{" "}
                                          {bookingItem?.customerRent?.days +
                                            " Days"}{" "}
                                          = {""}
                                          {bookingItem?.perDay *
                                            bookingItem?.customerRent?.days +
                                            " Tk"}
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </span>
                                  ) : (
                                    ""
                                  )}

                                  {bookingItem?.customerRent?.years === 1 ? (
                                    <span>
                                      {bookingItem?.customerRent?.years +
                                        " Year"}{" "}
                                      = {""}
                                      {bookingItem?.seatBooking?.perYear *
                                        bookingItem?.customerRent?.years +
                                        " Tk"}
                                    </span>
                                  ) : (
                                    ""
                                  )}
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
                        ) : (
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
                                  {bookingItem?.customerRent?.months ===
                                    undefined &&
                                  bookingItem?.customerRent?.years ===
                                    undefined ? (
                                    <span>
                                      {bookingItem?.customerRent
                                        ?.remainingDays + " day"}{" "}
                                      X {bookingItem?.data?.perDay} = {""}
                                      {bookingItem?.data?.perDay *
                                        bookingItem?.customerRent
                                          ?.remainingDays +
                                        " Tk"}
                                    </span>
                                  ) : (
                                    ""
                                  )}

                                  {bookingItem?.customerRent?.months >= 1 &&
                                  bookingItem?.customerRent?.years ===
                                    undefined ? (
                                    <span>
                                      {bookingItem?.customerRent.months +
                                        " month"}{" "}
                                      = {""}
                                      {bookingItem?.data?.perMonth *
                                        bookingItem?.customerRent.months +
                                        " Tk"}
                                      {bookingItem?.customerRent?.days > 0 ? (
                                        <span>
                                          +{" "}
                                          {bookingItem?.customerRent?.days +
                                            " Days"}{" "}
                                          = {""}
                                          {bookingItem?.data?.perDay *
                                            bookingItem?.customerRent?.days +
                                            " Tk"}
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </span>
                                  ) : (
                                    ""
                                  )}

                                  {bookingItem?.customerRent?.years === 1 ? (
                                    <span>
                                      {bookingItem?.customerRent?.years +
                                        " Year"}{" "}
                                      = {""}
                                      {bookingItem?.data?.perYear *
                                        bookingItem?.customerRent?.years +
                                        " Tk"}
                                    </span>
                                  ) : (
                                    ""
                                  )}
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
                        )}
                      </div>
                    </div>
                    <p>BDT {bookingItem?.subTotal?.toLocaleString()}</p>
                  </div>
                  {bookingItem?.foodAmount ? (
                    <div className="flex justify-between ">
                      <div className="ml-16 flex items-center">
                        <p>Food</p>
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
                                  Including Complementary Breakfast with Lunch
                                  and dinner (
                                  {bookingItem?.customerRent.remainingDays} Day
                                  X 300 ={" "}
                                  {300 *
                                    bookingItem?.customerRent.remainingDays}
                                  )
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
                      <p>BDT {bookingItem?.foodAmount?.toLocaleString()}</p>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="flex justify-between">
                    <div className="ml-16 flex items-center">
                      <p>VAT</p>
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
                                {extraCharge[0]?.vatTax?.toLocaleString()}% VAT
                                added based on subtotal
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

                    <p> + BDT {bookingItem?.vatTax?.toLocaleString() || 0}</p>
                  </div>
                  {bookingItem?.customerRent?.months >= 1 ||
                  bookingItem?.customerRent?.years ? (
                    <div className="flex justify-between ">
                      <div className="ml-16 flex items-center">
                        <p>Admission Fee</p>
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
                                  This amount will not be refunded
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
                        BDT{" "}
                        {bookingItem?.customerRent?.months >= 2 ||
                        bookingItem?.customerRent?.years
                          ? bookingItem?.addMissionFee
                          : 0}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                  {bookingItem?.customerRent?.months >= 1 ||
                  bookingItem?.customerRent?.years ? (
                    <div className="flex justify-between ">
                      <div className="ml-16 flex items-center">
                        <p>Security Fee</p>
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
                                  className="font-normal opacity-80 px-5 py-2 rounded"
                                >
                                  This amount will be refunded Or Adjust last
                                  Month when you leave the Room
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
                        BDT{" "}
                        {bookingItem?.customerRent?.months >= 2 ||
                        bookingItem?.customerRent?.years
                          ? bookingItem?.securityFee?.toLocaleString()
                          : 0}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                  <hr className="mt-3 ml-5 text-black" />
                  <div className="flex justify-between mt-2">
                    <p className="ml-16">Total Amount</p>
                    <p>BDT {bookingItem?.totalAmount?.toLocaleString()}</p>
                  </div>

                  {bookingItem?.discount ? (
                    <div className="flex justify-between">
                      <div className="ml-16 flex items-center">
                        <p>Discount</p>
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
                                  This is Just Our Offer
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
                      <p> - BDT {bookingItem?.discount?.toLocaleString()}</p>
                    </div>
                  ) : (
                    ""
                  )}
                  {bookingItem?.discount ? (
                    <div className="flex justify-between mt-2">
                      <p className="ml-16">Payable Amount</p>
                      <p>BDT {bookingItem?.payableAmount?.toLocaleString()}</p>
                    </div>
                  ) : (
                    ""
                  )}

                  {(bookingItem?.customerRent?.months >= 1 &&
                    bookingItem?.customerRent?.years === undefined) ||
                  (bookingItem?.customerRent?.months === 0 &&
                    bookingItem?.customerRent?.years !== undefined) ? (
                    <div className="flex justify-between">
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
                                  {bookingItem?.customerRent?.months >= 2 ||
                                  bookingItem?.customerRent?.years ? (
                                    <p>
                                      If you want to confirm the booking, you
                                      have to pay the minimum Security Fee ={" "}
                                      {bookingItem?.minimumPayment
                                        ? bookingItem?.minimumPayment?.toLocaleString()
                                        : 0}
                                      , (It will be adjust in your Final
                                      Payment)
                                    </p>
                                  ) : (
                                    <p>
                                      Non-refundable (It will be adjust in your
                                      Final Payment)
                                    </p>
                                  )}
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
                  ) : (
                    ""
                  )}

                  <div
                    className={`flex justify-between ${
                      (bookingItem?.customerRent?.months >= 1 &&
                        bookingItem?.customerRent?.years === undefined) ||
                      (bookingItem?.customerRent?.months === 0 &&
                        bookingItem?.customerRent?.years >= 1)
                        ? "hidden"
                        : "block"
                    }`}
                  >
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
                  Continue Payment
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
                className="px-3 py-2"
              >
                <span
                  style={{
                    fontSize: "18px",
                    color: "red",
                  }}
                >
                  Attention :
                </span>
                <span>
                  {" "}
                  Please bring two{" "}
                  <span className="text-black">Passport-Size Photos</span> and
                  one copy of your <span className="text-black"> NID Card</span>{" "}
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
          className="bg-white z-50 absolute top-[15%] lg:top-[20%] w-[96%] lg:w-[50%] left-2 md:left-4 lg:left-1/4 lg:right-1/2"
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
          <div className="my-4 flex items-center mx-4">
            <input
              type="radio"
              id="app"
              name="method"
              value="app"
              defaultChecked
              className=" mr-1"
              onChange={(e) => setSelectMethod(e.target.value)}
            />
            <span className="text-[15px] mr-2">Pay By BKash</span>
            <input
              type="radio"
              id="manual"
              name="method"
              value="manual"
              // defaultChecked
              // className="mr-1"
              onChange={(e) => setSelectMethod(e.target.value)}
            />
            <span className="text-[15px]">Manual BKash</span>
          </div>
          <div>
            {selectMethod === "app" ? (
              <div className="my-4 flex justify-center mx-4">
                <div>
                  <h2 className="font-medium text-center mb-4">
                    How much do you want to pay now?
                  </h2>
                  {bkashError && bkashError}
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() =>
                        handlePayByBkash(bookingItem?.minimumPayment)
                      }
                      className="border border-[#35B0A7] px-3 py-1 rounded-xl hover:bg-[#35B0A7] hover:text-white"
                    >
                      Minimum - {bookingItem?.minimumPayment} ৳
                    </button>
                    <button
                      onClick={() => handlePayByBkash(bookingItem?.totalAmount)}
                      className="border border-[#35B0A7] px-3 py-1 rounded-xl hover:bg-[#35B0A7] hover:text-white"
                    >
                      Total Amount - {bookingItem?.totalAmount} ৳
                    </button>
                    <button
                      onClick={() => setShowUserInputForPayment(true)}
                      className="border border-[#35B0A7] px-3 py-1 rounded-xl hover:bg-[#35B0A7] hover:text-white"
                    >
                      Custom Amount
                    </button>
                  </div>
                  {showUserInputForPayment && (
                    <div>
                      <div className="flex justify-center w-full my-4">
                        <input
                          type="number"
                          placeholder="Enter your amount"
                          className="border px-3 py-2 rounded-l-xl w-[66%] md:w-[80%] "
                          name="amountForPay"
                          onChange={handleUserInputAmount}
                        />
                        <button
                          onClick={() => handlePayByBkash(amountForPay)}
                          className="bg-[#02625a] px-3 py-2 rounded-r-xl text-white"
                          disabled={isLessAmount}
                        >
                          Pay Now
                        </button>
                      </div>
                      {isLessAmount && (
                        <p className="text-sm text-red-600">
                          Please Pay Atleast ৳ {bookingItem.minimumPayment}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
