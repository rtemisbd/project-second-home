import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { Tooltip, Typography } from "@material-tailwind/react";
import { FaArrowLeft } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

import cashImg from "../../assets/img/Cash-1.png";
import brachLocationIcon from "../../assets/img/branchLocationIcon.png";
import MobileBanking from "../Payment/MobileBanking";
import CashOn from "../Payment/CashOn";
import CreditCard from "../Payment/CreditCard";
import BankTransfer from "../Payment/BankTransfer";
import useBranch from "../../hooks/useBranch";
import useExtraCharge from "../../hooks/useExtraCharge";
import "../Payment/PaymentToggle.css";
import "./PersonalInfo.css";
import { useDispatch } from "react-redux";
import { placeLoadingShow } from "../../redux/reducers/smProfileMenuSlice";
import LoadingState from "../LoadingState/LoadingState";
import { AuthContext } from "../../contexts/UserProvider";

const PersonalInfo = () => {
  const { user } = useContext(AuthContext);

  const [singleUser, setSingleUser] = useState({});

  const dispatch = useDispatch();
  const [bookingItem, setBookingItem] = useState({});

  const [validityType, setValidityType] = useState();

  const [extraCharge] = useExtraCharge(bookingItem);
  // get month Last Day
  function getLastDayOfMonth() {
    const today = new Date(bookingItem?.rentDate?.bookStartDate);
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-indexed, so we add 1.
    const lastDay = new Date(year, month, 0).getDate(); // Setting day to 0 gets the last day of the previous month.
    return lastDay;
  }

  //cart

  const MySwal = withReactContent(Swal);

  const [showMobile, setShowMobile] = useState(true);
  const [showPaymentArrive, setShowPaymentArrive] = useState(false);
  const [showCreditCard, setShowCreditCard] = useState(false);
  const [showBankTransfer, setShowBankTransfer] = useState(false);
  const [bookingExtend, setBookingExtend] = useState(false);
  const [birthDay, setBirthDay] = useState(new Date());

  const [isActive1, setIsActive1] = useState(true);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [isActive4, setIsActive4] = useState(false);

  let toggleClassCheck1 = isActive1 ? "active" : "";
  let toggleClassCheck2 = isActive2 ? "active" : "";
  let toggleClassCheck3 = isActive3 ? "active" : "";
  let toggleClassCheck4 = isActive4 ? "active" : "";

  // Booking Manage
  const navigate = useNavigate();

  // find branch

  useEffect(() => {
    const bookingItem = localStorage.getItem("bookingItem");
    if (bookingItem) {
      const parseToJson = JSON.parse(localStorage.getItem("bookingItem"));
      setBookingItem(parseToJson);
    } else {
      navigate("/");
    }
  }, []);
  // Get Single singleUser
  useEffect(() => {
    fetch(`https://api.psh.com.bd/api/users/${user?._id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleUser(data);
        setValidityType(data?.validityType ? data?.validityType : "Select One");
      });
  }, [user?._id]);

  const [image, setImage] = useState([]);

  const [gardianImg, setGardianImg] = useState([]);
  // anchorClickHandler
  const anchorClickHandler = (e) => {
    e.preventDefault();
    const hash = e.target.getAttribute("href").split("#")[1];
    if (hash === "") return false;

    const targetElement = document.getElementById(hash);
    if (targetElement) {
      const navbarHeight =
        document.querySelector(".navbar_sticky").offsetHeight;
      const targetOffsetTop =
        targetElement.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight;

      window.scrollTo({
        top: targetOffsetTop,
        behavior: "smooth",
      });
    }
  };

  console.log(validityType);
  const bookingOrder = async (e) => {
    e.preventDefault();

    // const fatherName = e.target.fatherName.value;
    // const motherName = e.target.motherName.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    // const gender = e.target.gender.value;
    // const birthDate = e.target.birthDate.value;
    const birthDate = birthDay?.toISOString()?.split("T")[0];
    const emergencyContactName = e.target.ecName.value;
    const emergencyRelationC = e.target.ecRelation.value;
    const emergencyContact = e.target.ecNumber.value;
    // const employeeStatus = e.target.employeeStatus.value;
    // const emplyeeIncome = e.target.emplyeeIncome.value;
    // const nid = e.target.nid.value;
    const validityNumber = e.target.validityNumber.value;

    // const passport = e.target.passport.value;
    const arrivalTime = e.target.arrivalTime.value;
    const request = e.target.request.value;
    const paymentType = e.target?.payment?.value;
    const bkashNumber = e.target?.bkashNumber?.value;
    const bkashTrx = e.target?.bkashTrx?.value;
    const nagadNumber = e.target?.nagadNumber?.value;
    const nagadTrx = e.target?.nagadTrx?.value;
    const dutchNumber = e.target?.dutchNumber?.value;
    const dutchTrx = e.target?.dutchTrx?.value;

    const customerType = "";
    const whichOfMonthPayment = "";
    const adjustmentAmount = 0;
    const receivedTk = Number(e.target?.receivedTk?.value)
      ? Number(e.target?.receivedTk?.value)
      : 0;
    const totalReceiveTk = 0;
    const paymentStatus = "Unpaid";

    // Check Phone Number

    if (validityType === "Select One") {
      return toast.error("Sorry! Please Select Verification Type");
    }

    // Check NID
    // if (nid) {
    //   if (nid?.length !== 10 && nid?.length !== 13) {
    //     return toast.error("Sorry! you gave me the wrong NID number");
    //   }
    // }

    // Check Parent Phone Number

    if (
      emergencyContact?.length !== 11 ||
      emergencyContact?.substring(0, 2) !== "01"
    ) {
      return toast.error("Sorry! you gave me wrong Gardian phone number");
    }
    const formData = new FormData();

    // image Verify check
    const isValidFileUploaded = (file) => {
      const validExtensions = [
        "png",
        "jpeg",
        "jpg",
        "PNG",
        "JPG",
        "jpeg",
        "JPEG",
      ];
      const fileExtension = file?.type?.split("/")[1];
      return validExtensions.includes(fileExtension);
    };

    // Customer Nid
    // if (image?.length > 0) {
    //   if (image?.length > 1) {
    //     return toast.error("please provide 1 Nid File");
    //   }
    //   const file = image[0];
    //   if (file?.size > 5000000) {
    //     return toast.error("NID size 5MB more than not allowed");
    //   } else {
    //     if (isValidFileUploaded(file)) {
    //       Array.from(image).forEach((item) => {
    //         formData.append("image", item);
    //       });
    //     } else {
    //       return toast.error("NID is not valid");
    //     }
    //   }
    // }

    // Gardian Image
    // if (gardianImg.length > 0) {
    //   if (gardianImg.length > 1) {
    //     return toast.error("please provide one pdf file");
    //   }

    //   const gardinaNid = gardianImg[0];

    //   if (gardinaNid?.size > 5000000) {
    //     return toast.error("File size 5MB more than not allowed");
    //   } else {
    //     if (isValidFileUploaded(gardinaNid)) {
    //       Array.from(gardianImg)?.forEach((item) => {
    //         formData.append("gardianImg", item);
    //       });
    //     } else {
    //       return toast.error("Gardian file is not valid");
    //     }
    //   }
    // }

    // Booking Data Append

    formData.append("bookingInfo", JSON.stringify(bookingItem));
    formData.append("fullName", singleUser?.firstName);
    // formData.append("fatherName", fatherName);
    // formData.append("motherName", motherName);
    formData.append("userId", singleUser?._id);
    formData.append("email", singleUser?.email);
    formData.append("phone", singleUser?.phone);
    formData.append("address", address);
    // formData.append("gender", gender);
    formData.append("birthDate", birthDate);
    formData.append("emergencyContactName", emergencyContactName);
    formData.append("emergencyRelationC", emergencyRelationC);
    formData.append("emergencyContact", emergencyContact);
    // formData.append("employeeStatus", employeeStatus);
    // formData.append("emplyeeIncome", emplyeeIncome);
    // formData.append("nid", nid);
    formData.append("validityType", validityType);
    formData.append("validityNumber", validityNumber);
    // formData.append("passport", passport);
    formData.append("arrivalTime", arrivalTime);
    formData.append("request", request);
    formData.append("paymentType", paymentType);
    formData.append(
      "paymentNumber",
      bkashNumber
        ? bkashNumber
        : "" || nagadNumber
        ? nagadNumber
        : "" || dutchNumber
        ? dutchNumber
        : ""
    );
    formData.append(
      "transactionId",
      bkashTrx
        ? bkashTrx
        : "" || nagadTrx
        ? nagadTrx
        : "" || dutchTrx
        ? dutchTrx
        : ""
    );

    formData.append("customerType", customerType);
    formData.append("whichOfMonthPayment", whichOfMonthPayment);
    formData.append("adjustmentAmount", adjustmentAmount);
    formData.append("receivedTk", receivedTk);
    formData.append("totalAmount", bookingItem?.totalAmount);
    formData.append("payableAmount", bookingItem?.payableAmount);
    formData.append("discount", bookingItem?.discount);
    formData.append("totalReceiveTk", totalReceiveTk);
    formData.append("dueAmount", bookingItem?.payableAmount - totalReceiveTk);
    formData.append("paymentStatus", paymentStatus);
    formData.append("bookingExtend", bookingExtend);

    // save order information to the database
    try {
      dispatch(placeLoadingShow(true));

      await axios.post("https://api.psh.com.bd/api/order", formData);
      MySwal.fire({
        icon: "success",
        title: "Booking successfully done",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(placeLoadingShow(false));
      localStorage.removeItem("bookingItem");
      localStorage.removeItem("seatItem");

      navigate("/booking-now");
    } catch (error) {
      dispatch(placeLoadingShow(false));
      toast.error("Something is wrong");
    }
    e.target.reset();
  };

  // handle Scrooled
  const [isScrolled, setIsScrolled] = useState(false);

  const [scrollY, setScrollY] = useState(0);

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
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      <LoadingState />
      <form onSubmit={bookingOrder} className="custom-container user_info_page">
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
                    defaultValue={singleUser ? singleUser.firstName : ""}
                    required
                    disabled={singleUser.firstName ? true : false}
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                  />
                </div>
                {/* <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                  <label htmlFor="Father Name">Father Name</label>
                  <input
                    placeholder="Your Father Name *"
                    type="text"
                    className="text-black personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full"
                    name="fatherName"
                    required
                    defaultValue={singleUser?.fatherName}
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                  />
                </div> */}
                {/* <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                  <label htmlFor="Mother Name">Mother Name</label>
                  <input
                    placeholder="Your Mother Name *"
                    type="text"
                    className="text-black personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full"
                    name="motherName"
                    required
                    defaultValue={singleUser?.motherName}
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                  />
                </div> */}

                <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                  <label htmlFor="Email">Email</label>
                  <input
                    type="email"
                    placeholder="Email *"
                    className="text-black personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full"
                    name="email"
                    required
                    disabled
                    defaultValue={singleUser ? singleUser.email : ""}
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                  />
                </div>

                {/* <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                  <label htmlFor="Gender">Gender</label>
                  <select
                    className="text-black personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full"
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                    defaultValue={singleUser?.gender}
                    name="gender"
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div> */}
                <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                  <label htmlFor="Phone Number">Mobile Number</label>
                  <input
                    type="text"
                    placeholder="Phone Number *"
                    className="text-black personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full"
                    name="phone"
                    required
                    disabled
                    defaultValue={singleUser ? singleUser.phone : ""}
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                  />
                </div>

                {/* <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                  <label htmlFor="Birth Day">Birth Day</label>
           
                  <DatePicker
                    selected={new Date(birthDay)}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => setBirthDay(date)}
                    className="text-black personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full h-[45px] ps-2"
                  />
                </div> */}

                {/* <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                  <label htmlFor="Passport">Passport</label>
                  <input
                    type="text"
                    placeholder="if you have Passport "
                    className="text-black personal-info rounded 
                  lg:w-[350px] md:w-[300px] sm:w-full"
                    name="passport"
                    defaultValue={singleUser?.passport}
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                  />
                </div> */}
                <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                  <label htmlFor="Address">Address</label>

                  <input
                    type="text"
                    placeholder="Address "
                    className="text-black personal-info rounded 
                  lg:w-[350px] md:w-[300px] sm:w-full"
                    name="address"
                    defaultValue={singleUser ? singleUser.userAddress : ""}
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                  />
                  {/* <textarea
                    placeholder="Details Address *"
                    className="text-black personal-info rounded 
                  w-full"
                    name="address"
                    defaultValue={singleUser ? singleUser.singleUserAddress : ""}
                    cols="20"
                    rows="2"
                    maxLength={100}
                    style={{
                      padding: "2px 10px",
                    }}
                  /> */}
                </div>

                <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                  <label htmlFor="">Identity Verification</label>
                  <select
                    className="personal-info lg:w-[350px] md:w-[300px] sm:w-full h-[45px] rounded"
                    onChange={(e) => setValidityType(e.target.value)}
                    defaultValue={singleUser?.validityType}
                    disabled={singleUser?.validityType ? true : false}
                    required={validityType === "Select One"}
                  >
                    <option disabled selected>
                      Select One
                    </option>
                    <option value="National ID Card">National ID Card</option>
                    <option value="Passport">Passport</option>
                    <option value="Driving Licence">Driving Licence</option>
                    <option value="Birth Certificate">Birth Certificate</option>
                  </select>
                </div>

                <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                  <label htmlFor="NID">{`${
                    validityType === "Select One"
                      ? "Identity Verification Number"
                      : `${validityType} Number`
                  }`}</label>
                  <input
                    type="number"
                    placeholder={`${
                      validityType === "Select One"
                        ? "Identity Verification Number"
                        : validityType
                    }`}
                    className="text-black personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full"
                    name="validityNumber"
                    defaultValue={singleUser?.validityNumber}
                    disabled={singleUser?.validityType ? true : false}
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                    required
                  />
                </div>

                {/* <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                  <label htmlFor="">Upload</label>
                  <input
                    multiple
                    onChange={(e) => {
                      setImage(e.target.files);
                    }}
                    type="file"
                    className=" personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full py-2 px-2"
                    required={singleUser?.cardImage ? false : true}
                    name="image"
                    style={{ height: "45px" }}
                    id=""
                  />
                </div> */}
              </div>
            </div>

            <div>
              {/* Uplaod singleUser Id card */}

              {/* Emargency Details */}
              <p className="text-black flex justify-left mt-5 font-bold">
                Gardian Information <span className="text-red-500">*</span>
              </p>

              <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-36 gap-y-3 mt-5 personal-info-page">
                <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                  <label htmlFor="Contact Name">Name</label>
                  <input
                    placeholder="Gardian Contact Name *"
                    type="text"
                    className="text-black personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full"
                    name="ecName"
                    defaultValue={singleUser?.emergencyContact?.contactName}
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                  />
                </div>
                <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                  <label htmlFor="Relationship">Relationship</label>
                  <input
                    placeholder="Relationship *"
                    className="text-black personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full"
                    type="text"
                    name="ecRelation"
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                    defaultValue={singleUser?.emergencyContact?.relation}
                  />
                </div>
                <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                  <label htmlFor="Contact Number">Mobile Number</label>
                  <input
                    type="text"
                    placeholder="Gardian Contact Number *"
                    className="text-black personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full"
                    name="ecNumber"
                    required
                    defaultValue={singleUser?.emergencyContact?.contactNumber}
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                  />
                </div>
              </div>
            </div>
            {/* <div>
              <p className="text-black flex justify-left mt-5 font-bold">
                Gardian Verification
              </p>
            </div>

            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-36 gap-y-3 mt-5">
              <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                <select className="personal-info lg:w-[350px] md:w-[300px] sm:w-full h-[45px] rounded">
                  <option>National Id Card</option>
                  <option>Passport</option>
                  <option>Driving Licence</option>
                  <option>Birth Certificate</option>
                </select>
              </div>
              <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                <input
                  multiple
                  onChange={(e) => {
                    setGardianImg(e.target.files);
                  }}
                  type="file"
                  className=" personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full px-2 py-2"
                  required={singleUser?.gardianImg ? false : true}
                  name="gardianImg"
                  id=""
                  style={{ height: "45px" }}
                />
              </div>
            </div> */}

            {/* Employment details*/}
            {/* <div>
              <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-36  mt-5">
                <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                  <p className="text-black flex justify-left mt-5 font-bold">
                    Employment details
                  </p>
                  <select
                    name="employeeStatus"
                    className="text-black personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full mt-2"
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                    defaultValue={singleUser?.employmentStatus?.workAs}
                  >
                    <option>Student</option>
                    <option>Job</option>
                    <option>Business</option>
                    <option>UnEmpolyee</option>
                  </select>
                </div>
                <div className="lg:col-span-1 md:col-span-2 sm:col-span-2">
                  <p className="text-black flex justify-left mt-5 font-bold">
                    Income Range
                  </p>
                  <select
                    name="emplyeeIncome"
                    className="mt-2 text-black personal-info rounded lg:w-[350px] md:w-[300px] sm:w-full"
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                    defaultValue={singleUser?.employmentStatus?.monthlyIncome}
                  >
                    <option>0-10000</option>
                    <option>10001-20000</option>
                    <option>20001-30000</option>
                    <option>30001-40000</option>
                    <option>Upto 500000+</option>
                  </select>
                </div>
              </div>
            </div> */}
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
                  ></textarea>
                </div>
              </div>
              <p className="flex flex-left text-black mt-2 special-req">
                Special requests cannot be guaranteed but we will do our best to
                meet your needs
              </p>
            </div>
            {/* Payment Option */}
            <h2 className="flex justify-left font-bold mb-5 text-xl mt-10">
              Payment Options :
            </h2>
            <div className="text-left">
              <span
                className={`summary text-sm font-bold ${toggleClassCheck1} `}
                onClick={() => {
                  return (
                    setShowMobile(true),
                    setShowPaymentArrive(false),
                    setShowCreditCard(false),
                    setShowBankTransfer(false),
                    setIsActive1(true),
                    setIsActive2(false),
                    setIsActive3(false),
                    setIsActive4(false)
                  );
                }}
                style={{
                  border: "none",
                  cursor: "pointer",
                }}
              >
                MOBILE BANKING
              </span>
              <span
                className={`specification text-sm font-bold ${toggleClassCheck2}`}
                onClick={() => {
                  return (
                    setShowMobile(false),
                    setShowPaymentArrive(true),
                    setShowCreditCard(false),
                    setShowBankTransfer(false),
                    setIsActive1(false),
                    setIsActive2(true),
                    setIsActive3(false),
                    setIsActive4(false)
                  );
                }}
                style={{
                  border: "none",
                  cursor: "pointer",
                }}
              >
                CASH
              </span>
              <span
                className={`author text-sm font-bold ${toggleClassCheck3}`}
                onClick={() => {
                  return (
                    setShowMobile(false),
                    setShowPaymentArrive(false),
                    setShowCreditCard(true),
                    setShowBankTransfer(false),
                    setIsActive1(false),
                    setIsActive2(false),
                    setIsActive3(true),
                    setIsActive4(false)
                  );
                }}
                style={{
                  border: "none",
                  cursor: "pointer",
                }}
              >
                CREDIT CARD
              </span>
              <span
                className={`customer-review text-sm font-bold ${toggleClassCheck4}`}
                onClick={() => {
                  return (
                    setShowMobile(false),
                    setShowPaymentArrive(false),
                    setShowCreditCard(false),
                    setShowBankTransfer(true),
                    setIsActive1(false),
                    setIsActive2(false),
                    setIsActive3(false),
                    setIsActive4(true)
                  );
                }}
                style={{
                  border: "none",
                  cursor: "pointer",
                }}
              >
                BANK TRANSFER
              </span>

              {showMobile ? (
                <MobileBanking bookingItem={bookingItem}></MobileBanking>
              ) : null}
              {showPaymentArrive ? <CashOn></CashOn> : null}
              {showCreditCard ? <CreditCard></CreditCard> : null}
              {showBankTransfer ? <BankTransfer></BankTransfer> : null}
            </div>

            {/* <div className=" mt-20">
              <p className="text-lg text-[#35B0A7]">
                If sending money by Bkash, Nagad or Rocket, then send money with
                Cash-out charge of per thousand
              </p>
            </div> */}
            <div className="flex items-center mt-20">
              <div>
                <img src={cashImg} alt="" />
              </div>
              <p className="text-lg text-[]">
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
                  // width: "430px",

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
                  {/* <h2
                  className="text-left font-bold"
                  style={{ color: "#212A42" }}
                >
                  {bookingItem?.data?.name}
                </h2> */}
                  <div className="flex justify-between">
                    <div className="flex ">
                      <div>
                        <img src={brachLocationIcon} alt="" />
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
                        style={{ color: "#00bbb4", marginTop: -3 }}
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
                        style={{ color: "#00bbb4", marginTop: -3 }}
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
                {/* <hr className="my-1 ml-5 text-black mr-5" /> */}
                {/* <div className="md:flex mx-5  mt-1 mb-2 total-area relative">
                <div>
                  <input
                    className="sm:px-10 md:px-12"
                    type="text"
                    style={{ height: "27px" }}
                    placeholder="Pormo Code"
                    disabled
                  />
                  <div className="absolute top-2 left-3">
                    <img src={promoIcon} alt="" />
                  </div>
                </div>
                <div className="sm:flex sm:justify-center md:mt-0 sm:mt-3">
                  <button
                    style={{
                      border: "1px solid #399",
                      backgroundColor: "#35B0A7 ",
                      color: "white",
                      borderRadius: "0px 2px 2px 0px",
                      padding: "1px 10px",
                    }}
                    disabled
                  >
                    Confirm
                  </button>
                </div>
              </div> */}

                {/* <div className="text-black font-bold text-lg pr-5">
              <div className="flex justify-between ">
                <p className="ml-16">Sub-Total</p>
                <p>BDT {bookingItem?.subTotal}</p>
              </div>
              <div className="flex justify-between">
                <p className="ml-16">Promo Code</p>
                <p> - BDT {bookingItem?.promoCodeDiscount}</p>
              </div>
              <div className="flex justify-between">
                <p className="ml-16">VAT & TAX</p>
                <p> + BDT {bookingItem?.vatTax}</p>
              </div>
              <hr className="mt-3 ml-5 text-black" />
              <div className="flex justify-between mt-2">
                <p className="ml-16">Total Amount</p>
                <p>BDT {bookingItem?.totalAmount}</p>
              </div>
            </div> */}
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

                    <p> + BDT {bookingItem?.vatTax?.toLocaleString()}</p>
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
                  {/* {promoCodeCheck ? (
                <div className="flex justify-between">
                  <div className="ml-16 flex items-center">
                    <p>Promo Code</p>
               
                  </div>
                  <p> - BDT {promoCodeDiscount}</p>
                </div>
              ) : (
                ""
              )} */}

                  <hr className="mt-3 ml-5 text-black" />
                  <div className="flex justify-between mt-2">
                    <p className="ml-16">Total Amount</p>
                    <p>BDT {bookingItem?.payableAmount?.toLocaleString()}</p>
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
                      name="terms"
                      id=""
                      onClick={() => setBookingExtend(!bookingExtend)}
                    />
                  </div>
                  <p className="text-left pl-3 text-[#35B0A7] font-bold text-[12px]">
                    I Would Like to Extend in Future
                  </p>
                </div>
                <div className="flex px-4 mt-1 text-black  mb-1">
                  <div>
                    <input type="checkbox" name="terms" required id="" />
                  </div>
                  <p className="text-left pl-3 text-[12px]">
                    I agree with our Terms of use and Privacy Policy
                  </p>
                </div>

                <input
                  type="submit"
                  className="text-[1rem] p-2 cursor-pointer bg-[#35B0A7] hover:bg-[#02625a] w-full text-white h-[35px]"
                  value="Confirm Booking"
                  // disabled
                />
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
                onClick={anchorClickHandler}
                className="md:invisible hover:text-white text-white px-14 rounded-t-lg py-1"
                style={{ backgroundColor: "#00bbb4" }}
              >
                <i className="fas fa-shopping-cart mt-2 mr-2"></i>
                Confirm Booking
              </a>
            </div>
          </div>
        )}

        {/* <Toaster
          containerStyle={{ top: 300 }}
          toastOptions={{ position: "top-center" }}
        ></Toaster> */}
      </form>
    </div>
  );
};

export default PersonalInfo;
