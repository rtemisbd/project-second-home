import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../utils/getBaseURL";
import { useDispatch, useSelector } from "react-redux";
import { leftDate, rightDate, toTalRent } from "../../redux/reducers/dateSlice";
import { addDays, addMonths, addYears, subDays } from "date-fns";
import DatePicker from "react-datepicker";

const CreateNewOrder = ({ id, user }) => {
  const [room, setRoom] = useState(null);
  const [rentDates, setRentDate] = useState(null);
  const dispatch = useDispatch();
  const startDate = useSelector((state) => state.dateCount.startDate);
  const endDate = useSelector((state) => state.dateCount.endDate);
  const customerRent = useSelector((state) => state.dateCount.customerRent);

  // get month Last Day
  function getLastDayOfMonth() {
    const today = new Date(startDate);
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-indexed, so we add 1.
    const lastDay = new Date(year, month, 0).getDate(); // Setting day to 0 gets the last day of the previous month.
    return lastDay;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/property/${id}`);
        setRoom(data?.property);
        setRentDate(data?.rentRooms);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  console.log({ room, rentDates });

  useEffect(() => {
    dispatch(toTalRent());
    if (customerRent.remainingDays < 1) {
      dispatch(rightDate(addDays(new Date(startDate), 1)));
    }
  }, [customerRent.remainingDays, dispatch, startDate]);

  return (
    <div className="content customize_list">
      <h2>Create new order</h2>
      <div className="d-flex">
        {/* about booking name */}
        <div
          className="px-3 py-2 m-3"
          style={{
            boxShadow: "0px 0px 5px 3px #CCC",
            borderRadius: "5px",
            width: "60%",
          }}
        >
          <h4 className="text-left " style={{ color: "#212A42" }}>
            {room?.name} - {room?.roomNumber}
          </h4>

          <p
            className=" d-flex justify-content-start "
            style={{
              backgroundColor: "#FCA22A",
              color: "white",
              padding: "3px 5px ",
              borderRadius: "5px",
              width: "25%",
            }}
          >
            {room?.category?.name}-[{room?.branch?.name}]
          </p>
          <hr />

          {/* day month year */}
          <div className="mx-2">
            <ul className="d-flex justify-content-evenly list-unstyled calcaulation">
              <li className=" border py-1">
                <span
                  onClick={() =>
                    dispatch(rightDate(addDays(new Date(startDate), 1)))
                  }
                  className={` px-5 py-2 ${
                    customerRent.remainingDays < getLastDayOfMonth() &&
                    customerRent.years === undefined
                      ? "dmyActive "
                      : "text-black"
                  }`}
                >
                  Day
                </span>
              </li>
              <li className=" border py-1">
                <span
                  onClick={() =>
                    dispatch(rightDate(addMonths(new Date(startDate), 1)))
                  }
                  className={` px-5 py-2 ${
                    customerRent.remainingDays >= getLastDayOfMonth() &&
                    customerRent.years === undefined
                      ? "dmyActive "
                      : "text-black"
                  }`}
                >
                  Month
                </span>
              </li>
              <li className=" border py-1">
                <span
                  onClick={() =>
                    customerRent.years === undefined
                      ? dispatch(rightDate(addYears(new Date(endDate), 1)))
                      : ""
                  }
                  className={` px-5 py-2 ${
                    customerRent.years >= 1 ? "dmyActive " : "text-black"
                  }`}
                >
                  Year
                </span>
              </li>
            </ul>
          </div>
          {/* check in check out */}
          <div className="d-flex justify-content-between gap-3 total-area text-black px-2 mt-3">
            <div>
              <p className="text-left font-bold mb-1">Check-In</p>
              <DatePicker
                selected={new Date(startDate)}
                dateFormat="dd/MM/yyyy"
                onChange={(date) => dispatch(leftDate(date))}
                excludeDateIntervals={rentDates?.map((rent) => {
                  return {
                    start: subDays(new Date(rent?.bookStartDate), 1),
                    end: addDays(new Date(rent?.bookEndDate), -1),
                  };
                })}
                // minDate={subDays(new Date(), 0)}
              />
            </div>
            <div>
              <p className="text-left font-bold mb-1">Check-Out</p>
              <DatePicker
                selected={new Date(endDate)}
                dateFormat="dd/MM/yyyy"
                onChange={(date) => dispatch(rightDate(date))}
                // showIcon
                excludeDateIntervals={rentDates?.map((rent) => {
                  return {
                    start: subDays(new Date(rent?.bookStartDate), 1),
                    end: addDays(new Date(rent?.bookEndDate), 0),
                  };
                })}
              />
            </div>
          </div>
          {/* total duration */}
          <div className="d-flex justify-content-between mt-5 justify-items-center px-5">
            <p className="text-left fw-bold mb-1 ">Total Duration = </p>
            <div>
              <input
                className="pl-2"
                type="text"
                style={{ width: "100%", height: "30px" }}
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

          <div
            className={` d-flex justify-content-center justify-items-center mt-5 `}
            style={{
              backgroundColor: "#35B0A7",
            }}
          >
            <div>
              <button
                className={`fs-5 p-2 text-white bg-transparent `}
                // onClick={handleBookingDate}
                // disabled={
                //   data?.endDate === endDate ||
                //   data?.endDate > endDate ||
                //   data?.endDate > startDate
                //     ? true
                //     : false
                // }
              >
                Confirm Booking
              </button>
            </div>

            {/* end */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewOrder;
