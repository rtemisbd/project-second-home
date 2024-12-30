import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { addDays, addMonths, addYears, subDays } from "date-fns";
import DatePicker from "react-datepicker";
import UseFetch from "../../hooks/useFetch";

const BookingDatesExtend = ({
  data,
  showDurationModal,
  setShowDurationModal,
}) => {
  console.log(data);
  const [startDate, setStartDate] = useState(
    data?.bookingInfo?.rentDate?.bookStartDate
  );
  const [endDate, setEndDate] = useState(
    data?.bookingInfo?.rentDate?.bookEndDate
  );
  const [customerRent, setCustomerRent] = useState({});

  //fetch already booked dates for this specific room
  const { room } = UseFetch(`property/${data?.bookingInfo?.roomId}`);

  console.log(room);

  const handleDurationClose = () => setShowDurationModal(false);
  // Get Total Days this Year
  function getDaysInCurrentYear() {
    const currentDate = new Date(startDate);
    const currentYear = currentDate.getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 11, 31);
    // Calculate the difference in days
    const differenceInDays = (endOfYear - startOfYear) / (1000 * 60 * 60 * 24);
    return differenceInDays + 1; // Add 1 to include both start and end dates
  }

  // Last Day in current Month
  function getLastDayOfMonth() {
    const today = new Date(startDate);
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-indexed, so we add 1.
    const lastDay = new Date(year, month, 0).getDate(); // Setting day to 0 gets the last day of the previous month.
    return lastDay;
  }
  const firstDate = new Date(startDate);
  const lastDate = new Date(endDate);
  const timeDifferenceInMs = lastDate - firstDate;
  const daysDifference = timeDifferenceInMs / (1000 * 60 * 60 * 24);

  const years = Math.floor(daysDifference / getDaysInCurrentYear());
  const remainingDays = Math.floor(daysDifference % getDaysInCurrentYear());

  const months = Math.floor(remainingDays / getLastDayOfMonth());
  const days = remainingDays % getLastDayOfMonth();

  useEffect(() => {
    // Date Calculation Start
    if (years < 1 && months < 1) {
      setCustomerRent({ daysDifference, remainingDays });
    } else if (years < 1 && months > 0) {
      setCustomerRent({ months, days, remainingDays });
    } else if (years === 1) {
      setCustomerRent({ months: 0, days: 0, years, remainingDays });
    } else {
      setCustomerRent({ months, days, years, remainingDays });
    }
  }, []);

  return (
    <>
      <Modal show={showDurationModal} onHide={handleDurationClose}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Update Duration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=" ml-3">
            <div
              style={{
                width: "430px",
                // height: "650px",
                boxShadow:
                  "0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25) ",
                borderRadius: "3px",
                backgroundColor: "white",
              }}
            >
              <div
                style={{
                  backgroundColor: "#35B0A7",
                  width: "430px",
                  height: "55px",
                  borderRadius: "3px 3px 0px 0px",
                }}
              ></div>
              {/* about booking name */}
              <div
                className="px-3 py-2 m-3"
                style={{
                  boxShadow: "0px 0px 5px 3px #CCC",
                  borderRadius: "5px",
                }}
              >
                <h4 className="text-left " style={{ color: "#212A42" }}>
                  {data?.bookingInfo?.roomName} -{" "}
                  {data?.bookingInfo?.roomNumber}
                </h4>

                <p
                  className=" d-flex justify-content-start "
                  style={{
                    backgroundColor: "#FCA22A",
                    color: "white",
                    padding: "3px 5px ",
                    borderRadius: "5px",
                  }}
                >
                  {data?.bookingInfo?.roomType}-[{data?.branchDetails?.name}]
                </p>
              </div>
              {/* day month year */}
              <div className="mx-2">
                <ul className="d-flex justify-content-evenly list-unstyled calcaulation">
                  <li className=" border py-1">
                    <span
                      onClick={() =>
                        setEndDate(addDays(new Date(startDate), 1))
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
                        setEndDate(addMonths(new Date(startDate), 1))
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
                          ? setEndDate(addYears(new Date(endDate), 1))
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
                    onChange={(date) => setStartDate(date)}
                    // showIcon
                    excludeDateIntervals={room?.rentRooms?.map((rent) => {
                      return {
                        start: subDays(new Date(rent?.bookStartDate), 1),
                        end: addDays(new Date(rent?.bookEndDate), 0),
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
                    onChange={(date) => setEndDate(date)}
                    // showIcon
                    excludeDateIntervals={room?.rentRooms?.map((rent) => {
                      return {
                        start: subDays(new Date(rent?.bookStartDate), 1),
                        end: addDays(new Date(rent?.bookEndDate), 0),
                      };
                    })}
                    minDate={subDays(new Date(startDate), -1)}
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
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BookingDatesExtend;
