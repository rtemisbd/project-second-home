import { useDispatch, useSelector } from "react-redux";
import brachLocationIcon from "../../assets/img/branchLocationIcon.png";
import promoIcon from "../../assets/img/coupon.png";
import "../../components/shared/Custom.css";
import "./BookingTotalBox.css";
import { rightDate } from "../../redux/reducers/dateSlice";
import { addDays, addMonths, addYears, subDays } from "date-fns";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { Link } from "react-router-dom";

const BookingBox = ({ data, bookedDates, seat }) => {
  const dispatch = useDispatch();
  const startDate = useSelector((state) => state.dateCount.startDate);
  const endDate = useSelector((state) => state.dateCount.endDate);
  const customerRent = useSelector((state) => state.dateCount.customerRent);

  const [promoCode, setPromoCode] = useState(null);
  const [promoCodeCheck, setPromoCodeCheck] = useState(false);

  // get month Last Day
  function getLastDayOfMonth() {
    const today = new Date(startDate);
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-indexed, so we add 1.
    const lastDay = new Date(year, month, 0).getDate(); // Setting day to 0 gets the last day of the previous month.
    return lastDay;
  }

  return (
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
              excludeDateIntervals={bookedDates?.map((rent) => {
                return {
                  start: subDays(new Date(rent?.bookStartDate), 1),
                  end: addDays(new Date(rent?.bookEndDate), -1),
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
              excludeDateIntervals={bookedDates?.map((rent) => {
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
              placeholder="Promo Code"
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
    </div>
  );
};

export default BookingBox;
