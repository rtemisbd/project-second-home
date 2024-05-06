import React, { useState } from "react";
import { Typography, Tooltip } from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import brachLocationIcon from "../../assets/img/branchLocationIcon.png";
import promoIcon from "../../assets/img/coupon.png";
import { leftDate, rightDate, toTalRent } from "../../redux/reducers/dateSlice";
import { useEffect } from "react";
import { placeBooking } from "../../redux/reducers/bookingSlice";
import { addDays, addMonths, addYears, subDays } from "date-fns";
import { toast } from "react-hot-toast";

import usePromos from "../../hooks/usePromos";

import { useContext } from "react";
import { AuthContext } from "../../contexts/UserProvider";
import "../../components/shared/Custom.css";
import "./BookingTotalBox.css";
import FinalLoginModal from "../../components/shared/FinalLoginModal";
import { placeModalShow } from "../../redux/reducers/smProfileMenuSlice";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const BookingTotalBox = ({ data, seats, extraCharge }) => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  // date handle
  const dispatch = useDispatch();
  // const currentDate = new Date().toISOString().split("T")[0];
  const startDate = useSelector((state) => state.dateCount.startDate);

  const endDate = useSelector((state) => state.dateCount.endDate);
  const customerRent = useSelector((state) => state.dateCount.customerRent);

  const [selectedCheckPayment, setSelectedPayment] = useState(null);
  const [promos] = usePromos();
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
  const [userPromo, setUserPromo] = useState({});
  const [discountTk, setDisCountTk] = useState(0);
  const [promoCode, setPromoCode] = useState(null);

  const [promoCodeCheck, setPromoCodeCheck] = useState(false);
  const [showMiniumPayment, setShowMinimumPayment] = useState(false);

  const [subTotal, setSubtotal] = useState(
    data?.seats?.length > 0 ? 0 : data?.perDay * customerRent?.remainingDays
  );

  const [vatTax, setVatTaxt] = useState(
    (subTotal * extraCharge[0]?.vatTax) / 100
  );

  const [addMissionFee, setAddmissionFee] = useState(0);

  const [securityFee, setSecurityFee] = useState(0);

  const [minimumPayment, setMinimumPayment] = useState(0);

  const [totalRentAmount, setTotalRentAmount] = useState(
    parseInt(subTotal + vatTax)
  );
  const [payableAmount, setPayableAmount] = useState(
    parseInt(subTotal + vatTax)
  );

  const [singleUser, setSingleUser] = useState({});

  // Get Single User
  useEffect(() => {
    fetch(`https://api.psh.com.bd/api/users/${user?._id}`)
      .then((res) => res.json())
      .then((data) => setSingleUser(data));
  }, [user?._id]);

  useEffect(() => {
    // set Extra Charge
    // setAddmissionFee(extraCharge[0]?.admissionFee);
    // setSecurityFee(extraCharge[0]?.securityFee);
    setDisCountTk(0);
    setPromoCodeCheck(false);
    setVatTaxt((subTotal * extraCharge[0]?.vatTax) / 100);

    // If User give a Promo
    const promo = promos.find((promo) => promo?.promoCode === promoCode);
    setUserPromo(promo);

    dispatch(toTalRent());
    // if remainingDays under 1 then auto 1 day adding in Checkout Date

    if (customerRent.remainingDays < 1) {
      dispatch(rightDate(addDays(new Date(startDate), 1)));
    }

    if (
      customerRent?.remainingDays &&
      data?.perDay &&
      customerRent?.months === undefined &&
      customerRent?.years === undefined
    ) {
      setSubtotal(() => data?.perDay * customerRent?.remainingDays);
    } else if (
      customerRent?.months !== undefined &&
      customerRent?.years === undefined
    ) {
      setSubtotal(
        () =>
          data?.perMonth * customerRent?.months +
          data?.perDay * customerRent?.days
      );
    } else {
      setSubtotal(() => data?.perYear * customerRent?.years);
    }
    if (subTotal) {
      const getvatTax = (subTotal * extraCharge[0]?.vatTax) / 100;
      setVatTaxt(parseInt(getvatTax));
    }
    // minimum Payment
    if (
      customerRent.remainingDays > 3 &&
      customerRent?.months === undefined &&
      customerRent?.years === undefined
    ) {
      // const minimum = data?.perDay * 3;
      // setMinimumPayment((minimum * extraCharge[0]?.vatTax) / 100 + minimum);
      setMinimumPayment(500);

      setShowMinimumPayment(true);

      setAddmissionFee(0);

      setSecurityFee(0);
    } else if (
      customerRent?.months >= 2 &&
      customerRent?.months < 6 &&
      customerRent?.years === undefined
    ) {
      setMinimumPayment(extraCharge[0]?.securityFee);

      setAddmissionFee(extraCharge[0]?.admissionFee);

      setSecurityFee(extraCharge[0]?.securityFee);

      setShowMinimumPayment(true);
    } else if (customerRent?.months >= 6 && customerRent?.years === undefined) {
      setMinimumPayment(extraCharge[0]?.upto6MonthsSecurityFee);

      setAddmissionFee(extraCharge[0]?.upto6MonthsAdmissionFee);

      setSecurityFee(extraCharge[0]?.upto6MonthsSecurityFee);

      setShowMinimumPayment(true);
    } else if (customerRent?.years !== undefined) {
      setMinimumPayment(extraCharge[0]?.for1YearSecurityFee);

      setAddmissionFee(extraCharge[0]?.for1YearAdmissionFee);

      setSecurityFee(extraCharge[0]?.for1YearSecurityFee);

      setShowMinimumPayment(true);
    } else {
      setMinimumPayment(500);
      setShowMinimumPayment(true);
    }

    // total Amount
    if (customerRent?.months >= 2) {
      const totalAmountForMonths = parseInt(
        subTotal + vatTax + addMissionFee + securityFee
      );
      setTotalRentAmount(parseInt(totalAmountForMonths));
      setPayableAmount(parseInt(totalAmountForMonths));
      // setminimumPayment(addMissionFee);
    } else if (
      customerRent?.months === 0 &&
      customerRent?.years !== undefined
    ) {
      const totalAmountForMonths = parseInt(
        subTotal + vatTax + addMissionFee + securityFee
      );
      setTotalRentAmount(parseInt(totalAmountForMonths));
      setPayableAmount(parseInt(totalAmountForMonths));
      // setminimumPayment(addMissionFee);
    } else {
      const totalAmountForDays = parseInt(subTotal + vatTax);
      setTotalRentAmount(parseInt(totalAmountForDays));
      setPayableAmount(parseInt(totalAmountForDays));
      // setminimumPayment(0);
    }
  }, [
    startDate,
    endDate,
    customerRent?.remainingDays,
    customerRent?.months,
    customerRent?.years,
    data?.perDay,
    data?.perYear,
    data?.perMonth,
    subTotal,
    vatTax,
    extraCharge[0]?.admissionFee,
    extraCharge[0]?.securityFee,
    extraCharge[0]?.vatTax,
    promoCode,
  ]);

  // If Promo Code
  const handlePromoCode = (e) => {
    e.preventDefault();

    if (!user) {
      return toast.error("Login Required");
    }
    const bookingStartDate = new Date(startDate).toISOString().split("T")[0];
    if (userPromo?.promoDiscount === 100) {
      return toast.error("Sorry ! this offer only for Shared Room");
    }

    // Already Used Promo Checking

    const findLastTimeUsedPromo = singleUser?.usedPromo
      ?.slice()
      .reverse()
      .find((usedPromo) => usedPromo?.promo === promoCode);

    const findEnteredPromo = singleUser?.usedPromo?.filter(
      (usedPromo) => usedPromo?.promo === promoCode
    );

    const previousUseMonth =
      new Date(findLastTimeUsedPromo?.usedDate).getMonth() + 1;

    if (userPromo?.useTime === findEnteredPromo?.length) {
      return toast.error(
        `Sorry! This promo code can be used maximum  ${findEnteredPromo?.length} times, You have already used ${findEnteredPromo?.length} times`
      );
    }

    const newMonth = new Date(startDate).getMonth() + 1;

    // Check use month promo code

    if (previousUseMonth === newMonth) {
      return toast.error(
        "Sorry! you have already used this promo code this month"
      );
    }
    // Start Promo Time Checking
    if (userPromo?.promoStart > bookingStartDate) {
      return toast.error(
        `Sorry This Offer Start From ${userPromo?.promoStart}`
      );
    }
    // End Promo Time Checking
    if (userPromo?.promoEnd < bookingStartDate) {
      return toast.error(`Sorry This Offer End ${userPromo?.promoEnd}`);
    }

    // Promo Code Validation Checking

    if (promoCode !== userPromo?.promoCode)
      return toast.error("Sorry! You have Gived the wrong promo code ");
    if (
      customerRent?.remainingDays >= userPromo?.minimumDays &&
      userPromo?.minimumDays !== null
      //    ||
      // customerRent?.months >= promoCodeMonths
    ) {
      if (promoCode === userPromo?.promoCode && !promoCodeCheck) {
        const discount = userPromo?.promoDiscount / 100;
        setDisCountTk(totalRentAmount * discount);
        // setTotalRentAmount(
        //   parseInt(totalRentAmount - totalRentAmount * discount)
        // );
        setPayableAmount(
          parseInt(totalRentAmount - totalRentAmount * discount)
        );
        setPromoCodeCheck(true);
      } else {
        toast.error("Sorry! You have Gived the wrong promo code");
      }
    } else {
      toast.error(
        `Sorry! for this promo code minimum Booking ${userPromo?.minimumDays} days required`
      );
    }
  };

  // customerRent?.remainingDays < userPromo?.minimumDays
  // ? customerRent?.remainingDays + " days We don't have promo codes"
  // : customerRent?.months === undefined
  // ? customerRent?.remainingDays + " days We don't have promo codes"
  // : customerRent?.months + " months We don't have promo codes"

  // if months >1 then this funtionality added

  // get month Last Day
  function getLastDayOfMonth() {
    const today = new Date(startDate);
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-indexed, so we add 1.
    const lastDay = new Date(year, month, 0).getDate(); // Setting day to 0 gets the last day of the previous month.
    return lastDay;
  }

  const bookingData = {
    data: data,

    subTotal: subTotal,
    promoCodeDiscount:
      userPromo?.promoDiscount === undefined ? 0 : userPromo?.promoDiscount,
    discount: discountTk,
    vatTax: vatTax,
    totalAmount: totalRentAmount,
    payableAmount: payableAmount,
    roomName: data?.name,
    roomNumber: data?.roomNumber,
    roomType: data?.category?.name,
    branch: data?.branch,
    rentDate: {
      bookStartDate: new Date(startDate).toISOString().split("T")[0],
      bookEndDate: new Date(endDate).toISOString().split("T")[0],
    },
    usedPromo: {
      promo: userPromo?.promoDiscount === undefined ? "" : promoCode,
      usedDate:
        userPromo?.promoDiscount === undefined
          ? ""
          : new Date().toISOString().split("T")[0],
    },
    customerRent: customerRent,
  };

  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen((cur) => !cur);
  const handleAddItem = () => {
    // If show minimum payment and full Payment Option

    let bookingDataUpdate = {};
    if (showMiniumPayment) {
      bookingDataUpdate = {
        ...bookingData,
        addMissionFee: addMissionFee,
        securityFee: securityFee,
        minimumPayment: minimumPayment,
        fullPayment: payableAmount,
        selectedPaymentType: selectedCheckPayment,
      };
    }

    // Already Booking Handle
    let bookings = data?.rentDate?.map((rent) => new Date(rent?.bookEndDate));
    function validPeriod(startDate, endDate, bookings) {
      let valid = true;

      for (let i = 0; i < bookings.length; i++) {
        const date = bookings[i];
        if (startDate <= date && date <= endDate) {
          valid = false;
          break;
        }
      }

      return valid;
    }

    if (validPeriod(startDate, endDate, bookings)) {
      if (showMiniumPayment) {
        dispatch(placeBooking(bookingDataUpdate));
      } else {
        dispatch(placeBooking(bookingData));
      }
      if (!user) {
        dispatch(placeModalShow(true));
      } else {
        navigate("/personal-info");
      }
    } else {
      toast.error("Sorry ! You Select Already Booking Dates");
    }
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

  const [size, setSize] = React.useState(null);

  const handleOpen = (value) => setSize(value);
  return (
    <>
      <FinalLoginModal />
      <div
        style={{
          // height: "650px",
          boxShadow:
            "0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25) ",
          borderRadius: "3px",
          backgroundColor: "white",
        }}
        className="sticky md:top-20 w-full"
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
          id="cart2"
          className="px-3 py-2 m-3"
          style={{
            boxShadow: "0px 0px 5px 3px #CCC",
            borderRadius: "5px",
          }}
        >
          {/* <h2 className="text-left font-bold" style={{ color: "#212A42" }}>
            {data?.name}
          </h2> */}
          <div className="flex justify-between">
            <div className="flex ">
              <div>
                <img src={brachLocationIcon} alt="" />
              </div>
              <p className="text-black text-sm">{data?.branch?.name}</p>
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
              {data?.category?.name} ({data?.type})
            </p>
          </div>
        </div>
        <div className="mx-2">
          <ul className="flex justify-evenly text-sm">
            <li className="list-none border h-7 py-1 ">
              <span
                onClick={() =>
                  dispatch(rightDate(addDays(new Date(startDate), 1)))
                }
                className={` duration-select cursor-pointer py-1 ${
                  customerRent.remainingDays < getLastDayOfMonth() &&
                  customerRent.years === undefined
                    ? "dmyActive "
                    : "text-black"
                }`}
              >
                Day
              </span>
            </li>
            <li className="list-none border h-7 py-1">
              <span
                onClick={() =>
                  dispatch(rightDate(addMonths(new Date(startDate), 1)))
                }
                className={` duration-select cursor-pointer py-1 ${
                  customerRent.remainingDays >= getLastDayOfMonth() &&
                  customerRent.years === undefined
                    ? "dmyActive "
                    : "text-black"
                }`}
              >
                Month
              </span>
            </li>
            <li className="list-none border h-7 py-1">
              <span
                onClick={() =>
                  customerRent.years === undefined
                    ? dispatch(rightDate(addYears(new Date(endDate), 1)))
                    : ""
                }
                className={` duration-select cursor-pointer py-1 ${
                  customerRent.years >= 1 ? "dmyActive " : "text-black"
                }`}
              >
                Year
              </span>
            </li>
          </ul>
        </div>

        <div className="flex justify-evenly mt-3 total-area text-black text-sm">
          <div>
            <p className="text-center font-bold">Check-In</p>
            <div className="input-filed-area w-full" style={{ marginTop: 10 }}>
              <i
                className="fa-solid fa-calendar-days location-icon"
                style={{ color: "#00bbb4", marginTop: -4 }}
              ></i>
              <DatePicker
                selected={new Date(startDate)}
                dateFormat="dd/MM/yyyy"
                onChange={(date) => dispatch(leftDate(date))}
                excludeDateIntervals={data?.rentDate?.map((rent) => {
                  return {
                    start: subDays(new Date(rent?.bookStartDate), 1),
                    end: addDays(new Date(rent?.bookEndDate), 0),
                  };
                })}
                // minDate={subDays(new Date(), 0)}
                className="ps-7 w-28"
              />
            </div>
          </div>
          <div>
            <p className=" font-bold mb-1 text-center">Check-Out</p>

            <div className="input-filed-area w-full" style={{ marginTop: 10 }}>
              <i
                className="fa-solid fa-calendar-days location-icon"
                style={{ color: "#00bbb4", marginTop: -4 }}
              ></i>
              <DatePicker
                selected={new Date(endDate)}
                dateFormat="dd/MM/yyyy"
                onChange={(date) => dispatch(rightDate(date))}
                // showIcon
                excludeDateIntervals={data?.rentDate?.map((rent) => {
                  return {
                    start: subDays(new Date(rent?.bookStartDate), 1),
                    end: addDays(new Date(rent?.bookEndDate), 0),
                  };
                })}
                // minDate={subDays(new Date(startDate), -1)}
                className="ps-7 w-28"
              />
            </div>
          </div>
          <div className=" mt-1.5 w-full px-1 py-[0.5px] sm:hidden md:block duration_large_screen">
            <p className="text-center font-bold mb-2 mt-[-5px]">Duration</p>
            <p className=" duraion-count font-normal ps-1 text-sm ">
              {customerRent?.daysDifference >= 0
                ? `${customerRent?.daysDifference} days`
                : "" ||
                  (customerRent?.months &&
                    customerRent?.days >= 0 &&
                    !customerRent?.years)
                ? `${customerRent?.months} months, ${customerRent?.days} days`
                : "" ||
                  (customerRent?.years &&
                    customerRent?.months >= 0 &&
                    customerRent?.days >= 0)
                ? `${customerRent?.years} year`
                : ""}
            </p>
          </div>
        </div>
        <div className="duration_small">
          <div className="sm:flex justify-center mt-2 md:ms-16 sm:ms-16 text-sm">
            <p className="font-bold">Duration = </p>
            <div>
              <input
                type="text"
                value={`${
                  customerRent?.daysDifference >= 0
                    ? `${customerRent?.daysDifference} days`
                    : "" ||
                      (customerRent?.months &&
                        customerRent?.days >= 0 &&
                        !customerRent?.years)
                    ? `${customerRent?.months} months, ${customerRent?.days} days`
                    : "" ||
                      (customerRent?.years &&
                        customerRent?.months >= 0 &&
                        customerRent?.days >= 0)
                    ? `${customerRent?.years} year`
                    : ""
                }`}
                disabled
              />
            </div>
          </div>
        </div>

        <form onSubmit={handlePromoCode}>
          <div className="flex total-area relative md:mx-3 sm:mx-2 my-3">
            <div>
              <input
                className="sm:px-5 md:px-6 text-sm"
                type="text"
                name="promoCode"
                onChange={(e) => setPromoCode(e.target.value)}
                style={{ height: "25px", width: "80%" }}
                placeholder="Pormo Code"
                disabled={promoCodeCheck ? true : false}
                required
              />
              <div className="absolute top-1 left-3">
                <img src={promoIcon} alt="" />
              </div>
            </div>
            <div className=" ">
              <button
                type="submit"
                style={{
                  border: "1px solid #399",
                  backgroundColor: promoCodeCheck ? "#9eebe8" : "#35B0A7 ",
                  color: "white",
                  borderRadius: "0px 2px 2px 0px",
                  padding: "1px 5px",
                  fontSize: "14px",
                }}
                disabled={promoCodeCheck ? true : false}
                className="ms-[-40px]"
              >
                Confirm
              </button>
            </div>
            <Link
              to="/promo"
              className="md:text-[14px] sm:text-[12px] ms-5 mt-1 hover:text-[#02625a]  text-[#35B0A7] font-[600] underline"
              target="_blank"
            >
              {" "}
              Your Offers
            </Link>
          </div>
        </form>

        <div className="text-black text-sm pr-5 ">
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
                        {customerRent?.months === undefined &&
                        customerRent?.years === undefined ? (
                          <span>
                            {customerRent?.remainingDays + " day"} X{" "}
                            {data?.perDay} = {""}
                            {data?.perDay * customerRent?.remainingDays + " Tk"}
                          </span>
                        ) : (
                          ""
                        )}

                        {customerRent?.months >= 1 &&
                        customerRent?.years === undefined ? (
                          <span>
                            {customerRent.months + " month"} = {""}
                            {data?.perMonth * customerRent.months + " Tk"}
                            {customerRent?.days > 0 ? (
                              <span>
                                + {customerRent?.days + " Days"} = {""}
                                {data?.perDay * customerRent?.days + " Tk"}
                              </span>
                            ) : (
                              ""
                            )}
                          </span>
                        ) : (
                          ""
                        )}

                        {customerRent?.years === 1 ? (
                          <span>
                            {customerRent?.years + " Year"} = {""}
                            {data?.perYear * customerRent?.years + " Tk"}
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
              </div>
            </div>
            <p>BDT {isNaN(subTotal) ? 0 : subTotal?.toLocaleString()}</p>
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
                        {extraCharge[0]?.vatTax?.toLocaleString()}% VAT added
                        based on Rent
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

            <p> + BDT {isNaN(vatTax) ? 0 : vatTax?.toLocaleString()} </p>
          </div>
          {customerRent.months >= 1 || customerRent.years ? (
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
                {customerRent.months >= 2 || customerRent.years
                  ? addMissionFee
                  : 0}
              </p>
            </div>
          ) : (
            ""
          )}
          {customerRent.months >= 1 || customerRent.years ? (
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
                          This amount will be refunded Or Adjust last Month when
                          you leave the Room
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
                {customerRent.months >= 2 || customerRent.years
                  ? securityFee?.toLocaleString()
                  : 0}
              </p>
            </div>
          ) : (
            ""
          )}

          <hr className="mt-1 ml-5 text-black" />
          <div className="flex justify-between mt-2">
            <p className="ml-16">Total Amount</p>
            <p>
              BDT{" "}
              {isNaN(totalRentAmount) ? 0 : totalRentAmount?.toLocaleString()}
            </p>
          </div>

          {discountTk > 0 ? (
            promoCodeCheck ? (
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
                <p> - BDT {discountTk?.toLocaleString()}</p>
              </div>
            ) : (
              ""
            )
          ) : (
            ""
          )}

          {discountTk > 0 ? (
            <div className="flex justify-between mt-2">
              <p className="ml-16">Payable Amount</p>
              <p>
                BDT {isNaN(payableAmount) ? 0 : payableAmount?.toLocaleString()}
              </p>
            </div>
          ) : (
            ""
          )}
          {(customerRent?.months >= 1 && customerRent?.years === undefined) ||
          (customerRent?.months === 0 && customerRent?.years !== undefined) ? (
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
                          {customerRent?.months >= 2 || customerRent?.years ? (
                            <p>
                              If you want to confirm the booking, you have to
                              pay the minimum Security Fee ={" "}
                              {minimumPayment?.toLocaleString()}, (It will be
                              adjust in your Final Payment)
                            </p>
                          ) : (
                            <p>
                              Non-refundable (It will be adjust in your Final
                              Payment)
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
                {isNaN(minimumPayment)
                  ? 0
                  : minimumPayment?.toLocaleString()}{" "}
              </p>
            </div>
          ) : (
            ""
          )}

          {minimumPayment > 0 ? (
            <div
              className={`flex justify-between ${
                (customerRent?.months >= 1 &&
                  customerRent?.years === undefined) ||
                (customerRent?.months === 0 && customerRent?.years >= 1)
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
                {isNaN(minimumPayment)
                  ? 0
                  : minimumPayment?.toLocaleString()}{" "}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          className={`bg-[#35B0A7] h-[35px] flex justify-center items-center hover:bg-[#02625a] mt-2 ${
            data?.endDate === endDate ||
            data?.endDate > endDate ||
            data?.endDate > startDate
              ? " opacity-75"
              : "opacity-100"
          }cursor-pointer `}
          onClick={handleAddItem}
          style={{ cursor: "pointer" }}
        >
          <div>
            <button
              className={`text-[16px] p-2 text-white bg-transparent   cursor-pointer  ${
                data?.endDate === endDate ||
                data?.endDate > endDate ||
                data?.endDate > startDate
                  ? "opacity-75	"
                  : "opacity-100"
              } `}
              // onClick={() => handleDateSelection("2023-09-19")}
              disabled={
                data?.endDate === endDate ||
                data?.endDate > endDate ||
                data?.endDate > startDate
                  ? true
                  : false
              }
            >
              Apply For Booking
            </button>
          </div>
        </div>
        {scrollY > 2500 ? (
          ""
        ) : (
          <div>
            <div
              className="flex justify-center mb-4 fixed bottom-0 z-40"
              style={{ width: "95%" }}
            >
              <a
                href="#cart2"
                className="md:invisible ms-3 text-white hover:text-white px-14 py-1 rounded-t-lg"
                style={{ backgroundColor: "#00bbb4" }}
                onClick={anchorClickHandler}
              >
                <i className="fas fa-shopping-cart mr-2 mt-2 text-[16px]"></i>
                Apply for Booking
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingTotalBox;
