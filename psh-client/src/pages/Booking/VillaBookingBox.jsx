import { useEffect, useState } from "react";
import brachLocationIcon from "../../assets/img/branchLocationIcon.png";
import { anchorClickHandler } from "../../utilities/anchorClickHandler";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { leftDate, rightDate, toTalRent } from "../../redux/reducers/dateSlice";

import { placeBooking } from "../../redux/reducers/bookingSlice";
import { addDays, addMonths, addYears, subDays } from "date-fns";
import { format } from "date-fns";
import { Typography, Tooltip } from "@material-tailwind/react";

import { useContext } from "react";
import { AuthContext } from "../../contexts/UserProvider";
import { isAlreadyBookings } from "../../utilities/bookingChecking";

const VillaBookingBox = ({ villa }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const startDate = useSelector((state) => state.dateCount.startDate);
  const endDate = useSelector((state) => state.dateCount.endDate);
  const customerRent = useSelector((state) => state.dateCount.customerRent);

  const [subTotal, setSubTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [advance, setAdvance] = useState(0);
  
  
  // handle Scrolled
  const [scrollY, setScrollY] = useState(0);

  const anchorClick = (e) => {
    anchorClickHandler(e);
  };

  useEffect(() => {
    setSubTotal(
      villa?.pricing?.afterDiscountPerNight * customerRent?.daysDifference
    );
    setTotalAmount(
      villa?.pricing?.afterDiscountPerNight * customerRent?.daysDifference
    );
    setAdvance(villa?.pricing?.advancePayment);
  }, [customerRent, villa]);

  const handleAddItem = () => {
    if (!user) {
      return navigate("/authentication", { state: location?.pathname });
    }

    let bookingData = {
      villa: villa?._id,
      user: user?._id,
      perNight: villa?.pricing?.perNight,
      subTotal,
      totalAmount,
      minimumPayment: villa?.pricing?.advancePayment,
      rentDate: {
        // bookingStartDate: new Date(startDate).toISOString().split("T")[0],
        // bookingEndDate: new Date(endDate).toISOString().split("T")[0],
        bookingStartDate: format(new Date(startDate), "dd-MM-yyyy"),
        bookingEndDate: format(new Date(endDate), "dd-MM-yyyy"),
        daysDifference: customerRent?.daysDifference,
      },
    };

    // Already Booking Handle
    // if already Bookings Dates select then from startDate - 1 day
    const selectStartDate = new Date(startDate);
    const minus1dFromStartDate = new Date(startDate);
    minus1dFromStartDate.setDate(selectStartDate.getDate() + 1);

    const inputStartDate = new Date(minus1dFromStartDate)
      .toISOString()
      .split("T")[0];

    const inputEndDate = new Date(endDate).toISOString().split("T")[0];
    // const isBooked = isAlreadyBookings(
    //   inputStartDate,
    //   inputEndDate,
    //   bookedDates
    // );

    // if (!isBooked) {
    //   if (showMiniumPayment) {
    //     dispatch(placeBooking(bookingDataUpdate));
    //   } else {
    //     dispatch(placeBooking(bookingData));
    //   }
    //   if (!user) {
    //     dispatch(placeModalShow(true));
    //   } else {
    //     navigate("/personal-info");
    //   }
    // } else {
    //   toast.error("Sorry ! The date you select is already booked.");
    // }

    dispatch(placeBooking(bookingData));
    navigate("/book-villa");
  };

  return (
    <div>
      <div
        style={{
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
          <div className="flex justify-between">
            <div className="flex ">
              <div>
                <img loading="lazy" src={brachLocationIcon} alt="" />
              </div>
              <p className="text-black text-sm">{villa?.resortId?.name}</p>
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

        <div className="flex justify-evenly mt-3 total-area text-black text-sm px-3">
          <div>
            <p className="text-center font-bold">Check-In</p>
            <div className="input-filed-area w-full" style={{ marginTop: 10 }}>
              <i
                className="fa-solid fa-calendar-days location-icon"
                style={{ color: "#00bbb4", marginTop: "-11px" }}
              ></i>
              <DatePicker
                selected={new Date(startDate)}
                dateFormat="dd/MM/yyyy"
                onChange={(date) => dispatch(leftDate(date))}
                //     excludeDateIntervals=
                //     {bookedDates?.map((rent) => {
                //       return {
                //         start: subDays(new Date(rent?.bookStartDate), 1),
                //         end: addDays(new Date(rent?.bookEndDate), -1),
                //       };
                //     }
                //   )
                // }
                // minDate={subDays(new Date(), 0)}
                className={`ps-7 w-[124px] `}
                // dayClassName={(date) =>
                //   bookedDates.some(
                //     (rent) =>
                //       date >= subDays(new Date(rent.bookStartDate), 1) &&
                //       date <= addDays(new Date(rent.bookEndDate), 0)
                //   )
                //     ? "line-through  "
                //     : ""
                // }
              />
            </div>
          </div>
          <div>
            <p className=" font-bold mb-1 text-center">Check-Out</p>

            <div className="input-filed-area w-full" style={{ marginTop: 10 }}>
              <i
                className="fa-solid fa-calendar-days location-icon"
                style={{ color: "#00bbb4", marginTop: "-11px" }}
              ></i>
              <DatePicker
                selected={new Date(endDate)}
                dateFormat="dd/MM/yyyy"
                onChange={(date) => dispatch(rightDate(date))}
                // excludeDateIntervals={bookedDates.map((rent) => ({
                //   start: subDays(new Date(rent.bookStartDate), 1),
                //   end: addDays(new Date(rent.bookEndDate), 0),
                // }))}
                className="ps-7 w-[124px] "
                // dayClassName={(date) =>
                //   bookedDates.some(
                //     (rent) =>
                //       date >= subDays(new Date(rent.bookStartDate), 1) &&
                //       date <= addDays(new Date(rent.bookEndDate), 0)
                //   )
                //     ? "line-through  "
                //     : ""
                // }
              />
            </div>
          </div>
          <div className=" mt-1.5 w-full px-1 py-[0.5px] sm:hidden md:block duration_large_screen ">
            <p className="text-center font-bold mb-2 mt-[-5px]">Duration</p>
            <p className=" duraion-count font-normal ps-1 text-sm ">
              {customerRent?.daysDifference > 1
                ? `${customerRent?.daysDifference} Nights`
                : `${customerRent?.daysDifference} Night`}
            </p>
          </div>
        </div>
        <div className="duration_small">
          <div className="sm:flex justify-center mt-2 md:ms-16 sm:ms-16 text-sm">
            <p className="font-bold">Duration = </p>
            <div>
              <input
                type="text"
                value={
                  customerRent?.daysDifference > 1
                    ? `${customerRent?.daysDifference} Nights`
                    : `${customerRent?.daysDifference} Night`
                }
                disabled
              />
            </div>
          </div>
        </div>

        <div className="text-black text-sm pr-5 my-5">
          <div className="flex justify-between ">
            <div className="ml-16 flex items-center">
              <p>Sub Total</p>
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
                          {customerRent?.remainingDays + " night"} X{" "}
                          {villa?.pricing?.afterDiscountPerNight} = {""}
                          {villa?.pricing?.afterDiscountPerNight *
                            customerRent?.remainingDays +
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
            <p>BDT {isNaN(subTotal) ? 0 : subTotal.toLocaleString()}</p>
            {/* <p>BDT {isNaN(subTotal) ? 0 : subTotal?.toLocaleString()}</p> */}
          </div>

          <hr className="mt-1 ml-5 text-black" />
          <div className="flex justify-between mt-2">
            <p className="ml-16">Total Amount</p>
            <p>BDT {isNaN(totalAmount) ? 0 : totalAmount?.toLocaleString()}</p>
          </div>
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
                        <p>
                          Non-refundable (It will be adjust in your Final
                          Payment)
                        </p>
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
            <p> BDT {advance} </p>
          </div>
        </div>

        <div
          className={`bg-[#35B0A7] h-[35px] flex justify-center items-center hover:bg-[#02625a] mt-2  `}
          onClick={handleAddItem}
          style={{ cursor: "pointer" }}
        >
          <div>
            <button
              className={`text-[16px] p-2 text-white bg-transparent cursor-pointer  `}
              // onClick={() => handleDateSelection("2023-09-19")}
              // disabled={
              //   data?.endDate === endDate ||
              //   data?.endDate > endDate ||
              //   data?.endDate > startDate
              //     ? true
              //     : false
              // }
            >
              Apply For Booking
            </button>
          </div>
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
      {scrollY > 2500 ? (
        ""
      ) : (
        <div>
          <div
            className="flex justify-center mb-4 fixed bottom-0 z-40 cursor-pointer"
            style={{ width: "95%" }}
          >
            <a
              href="#cart2"
              className="md:invisible ms-3 text-white hover:text-white px-14 py-1 rounded-t-lg"
              style={{ backgroundColor: "#00bbb4" }}
              onClick={anchorClick}
            >
              <i className="fas fa-shopping-cart mr-2 mt-2 text-[16px]"></i>
              Apply for Booking
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default VillaBookingBox;
