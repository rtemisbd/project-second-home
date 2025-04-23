import { useEffect, useState } from "react";
import brachLocationIcon from "../../assets/img/branchLocationIcon.png";
import { anchorClickHandler } from "../../utilities/anchorClickHandler";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { leftDate, rightDate, toTalRent } from "../../redux/reducers/dateSlice";

import { placeBooking } from "../../redux/reducers/bookingSlice";
import { addDays, addMonths, addYears, subDays } from "date-fns";
import promoIcon from "../../assets/img/coupon.png";
import { Typography, Tooltip } from "@material-tailwind/react";

const VillaBookingBox = ({ villa }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const startDate = useSelector((state) => state.dateCount.startDate);
  const endDate = useSelector((state) => state.dateCount.endDate);
  const customerRent = useSelector((state) => state.dateCount.customerRent);

  const [promoCode, setPromoCode] = useState(null);
  const [promoCodeCheck, setPromoCodeCheck] = useState(false);

  const [subTotal, setSubTotal] = useState(villa?.pricing?.perNight || 0);

  // handle Scrolled
  const [scrollY, setScrollY] = useState(0);

  const anchorClick = (e) => {
    anchorClickHandler(e);
  };

  useEffect(() => {
    setSubTotal(villa?.pricing?.perNight * customerRent?.daysDifference);
  }, [customerRent]);

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
              {customerRent?.daysDifference >= 0
                ? `${customerRent?.daysDifference} days`
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
                    : ""
                }`}
                disabled
              />
            </div>
          </div>
        </div>

        <form
        // onSubmit={handlePromoCode}
        >
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
                <img loading="lazy" src={promoIcon} alt="" />
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
                          {customerRent?.remainingDays + " day"} X{" "}
                          {villa?.pricing?.perNight} = {""}
                          {villa?.pricing?.perNight *
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
                        {/* {extraCharge[0]?.vatTax?.toLocaleString()} */}% VAT
                        added based on Rent
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

            {/* <p> + BDT {isNaN(vatTax) ? 0 : vatTax?.toLocaleString()}</p> */}
          </div>

          <hr className="mt-1 ml-5 text-black" />
          <div className="flex justify-between mt-2">
            <p className="ml-16">Total Amount</p>
            <p>
              BDT{" "}
              {/* {isNaN(totalRentAmount) ? 0 : totalRentAmount?.toLocaleString()} */}
            </p>
          </div>
        </div>

        <div
          className={`bg-[#35B0A7] h-[35px] flex justify-center items-center hover:bg-[#02625a] mt-2  `}
          // onClick={handleAddItem}
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
            <span className="text-black">Passport-Size Photos</span> and one
            copy of your <span className="text-black"> NID Card</span> at the
            time of check-in.
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

      {/* <Toaster
        containerStyle={{ top: 300 }}
        toastOptions={{ position: "top-center" }}
      ></Toaster> */}
    </div>
  );
};

export default VillaBookingBox;
