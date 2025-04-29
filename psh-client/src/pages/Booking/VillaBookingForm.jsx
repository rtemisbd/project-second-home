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
import { format, parseISO } from "date-fns";

const VillaBookingForm = () => {
  const [singleUser] = useUser();

  const [isBlur, setIsBlur] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [requiredMessage, setRequiredMessage] = useState(false);

  const [dataForBooking, setDataForBooking] = useState({
    arrivalTime: "",
    bookingExtend: false,
  });
  const [bookingItem, setBookingItem] = useState({});
  const [villa, setVilla] = useState({});

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

  const formatToInputDate = (dateStr) => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("-");
    return `${year}-${month}-${day}`; // "16-05-2025" → "2025-05-16"
  };

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
                        type="date"
                        dateFormat="dd/MM/yyyy"
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
                        type="date"
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
                      {bookingItem?.rentDate?.daysDifference >= 0
                        ? `${bookingItem?.rentDate?.daysDifference} Days`
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
                                      X {bookingItem?.seatBooking?.perDay} ={" "}
                                      {""}
                                      {bookingItem?.seatBooking?.perDay *
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
                                          {bookingItem?.seatBooking?.perDay *
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

                  <hr className="mt-3 ml-5 text-black" />
                  <div className="flex justify-between mt-2">
                    <p className="ml-16">Total Amount</p>
                    <p>BDT {bookingItem?.payableAmount?.toLocaleString()}</p>
                  </div>

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
                  //   onClick={handlePaymentOption}
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
    </div>
  );
};

export default VillaBookingForm;
