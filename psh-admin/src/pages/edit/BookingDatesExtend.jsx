import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { addDays, addMonths, addYears, subDays } from "date-fns";
import DatePicker from "react-datepicker";
import UseFetch from "../../hooks/useFetch";
import usePromo from "../../hooks/usePromo";
import axios from "axios";
import { baseUrl } from "../../utils/getBaseURL";
import { toast } from "react-toastify";

const BookingDatesExtend = ({
  data,
  refetch,
  extraCharge,
  showDurationModal,
  setShowDurationModal,
}) => {
  const [startDate, setStartDate] = useState(
    data?.bookingInfo?.rentDate?.bookStartDate
  );
  const [endDate, setEndDate] = useState(
    data?.bookingInfo?.rentDate?.bookEndDate
  );
  const [customerRent, setCustomerRent] = useState({});
  const [isAdjustment, setIsAdjustment] = useState(false);
  const [isIncludeFood, setIsIncludeFood] = useState(
    data?.bookingInfo?.isIncludeFood
  );
  const [userPromo, setUserPromo] = useState({});

  const [payableAmount, setPayableAmount] = useState(data?.payableAmount || 0);
  const [subTotal, setSubTotal] = useState(data?.bookingInfo?.subTotal || 0);
  const [foodAmount, setFoodAmount] = useState(data?.bookingInfo?.foodAmount);
  const [vatTax, setVatTax] = useState(
    (subTotal * extraCharge[0]?.vatTax) / 100
  );
  const [addMissionFee, setAddMissionFee] = useState(0);
  const [securityFee, setSecurityFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(
    data?.bookingInfo?.totalAmount
  );
  const [discount, setDiscount] = useState(data?.discount || 0);
  const [minimumPayment, setMinimumPayment] = useState(
    data?.bookingInfo?.minimumPayment || 0
  );
  const [rentRooms, setRentRooms] = useState([]);

  //fetch already booked dates for this specific room
  const { room } = UseFetch(`property/${data?.bookingInfo?.roomId}`);
  const [promos] = usePromo();
  const { bookingInfo } = data;

  // set rent room collection
  useEffect(() => {
    setRentRooms(
      room?.rentRooms?.filter((dates) => dates.bookingId !== data._id)
    );
  }, [data._id, room?.rentRooms]);

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

  //  Calculation Start
  useEffect(() => {
    if (years < 1 && months < 1) {
      setCustomerRent({ daysDifference, remainingDays });
    } else if (years < 1 && months > 0) {
      setCustomerRent({ months, days, remainingDays });
    } else if (years === 1) {
      setCustomerRent({ months: 0, days: 0, years, remainingDays });
    } else {
      setCustomerRent({ months, days, years, remainingDays });
    }

    // amount calculation
    // subtotal
    if (
      customerRent?.remainingDays &&
      customerRent?.months === undefined &&
      customerRent?.years === undefined
    ) {
      setSubTotal(room?.property?.dAmountForDay * customerRent?.remainingDays);
    } else if (customerRent?.months >= 1 && customerRent?.years === undefined) {
      setSubTotal(
        room?.property?.dAmountForMonth * customerRent?.months +
          room?.property?.dAmountForDay * customerRent?.days
      );
    } else {
      setSubTotal(room?.property?.dAmountForYear * customerRent?.years);
    }

    // set promo
    const promo = promos.find(
      (promo) => promo?.promoCode === data?.bookingInfo?.usedPromo?.promo
    );
    setUserPromo(promo);

    // set vat
    if (subTotal) {
      const getVatTax = (subTotal * extraCharge[0]?.vatTax) / 100;
      setVatTax(parseInt(getVatTax));
    }

    // set security, admission, minimum , food amount
    if (
      customerRent.remainingDays &&
      (customerRent?.months === undefined || customerRent?.months <= 1) &&
      customerRent?.years === undefined
    ) {
      const minimum = data?.bookingInfo?.minimumPayment;
      setMinimumPayment((minimum * extraCharge[0]?.vatTax) / 100 + minimum);
      setAddMissionFee(0);
      setSecurityFee(0);
    } else if (
      customerRent?.months >= 2 &&
      customerRent?.months < 6 &&
      customerRent?.years === undefined
    ) {
      setMinimumPayment(extraCharge[0]?.securityFee);
      setAddMissionFee(extraCharge[0]?.admissionFee);
      setSecurityFee(extraCharge[0]?.securityFee);
    } else if (customerRent?.months >= 6 && customerRent?.years === undefined) {
      setMinimumPayment(extraCharge[0]?.upto6MonthsSecurityFee);
      setAddMissionFee(extraCharge[0]?.upto6MonthsAdmissionFee);
      setSecurityFee(extraCharge[0]?.upto6MonthsSecurityFee);
    } else if (customerRent?.years !== undefined) {
      setMinimumPayment(extraCharge[0]?.for1YearSecurityFee);
      setAddMissionFee(extraCharge[0]?.for1YearAdmissionFee);
      setSecurityFee(extraCharge[0]?.for1YearSecurityFee);
    } else {
      setMinimumPayment(data?.bookingInfo?.minimumPayment);
    }

    // set food amount
    if (isIncludeFood) {
      setFoodAmount(
        data?.branchDetails?.foodAmount * customerRent.remainingDays
      );
    } else {
      setFoodAmount(0);
    }
    // set total amount
    setTotalAmount(
      subTotal + foodAmount + vatTax + addMissionFee + securityFee
    );

    // set discount

    if (customerRent?.months >= 2) {
      if (
        userPromo?.minimumDays &&
        customerRent?.remainingDays >= userPromo?.minimumDays
      ) {
        const discount = data?.bookingInfo?.promoCodeDiscount / 100;
        setDiscount(
          customerRent?.remainingDays >= userPromo?.minimumDays
            ? totalAmount * discount
            : data?.adjustmentAmount
        );
      } else {
        setDiscount(data?.adjustmentAmount);

        setIsAdjustment(data?.adjustmentAmount > 0 ? true : false);
      }
    } else if (
      customerRent?.months === 0 &&
      customerRent?.years !== undefined
    ) {
      if (
        userPromo?.minimumDays &&
        customerRent?.remainingDays >= userPromo?.minimumDays
      ) {
        const discount = data?.bookingInfo?.promoCodeDiscount / 100;
        setDiscount(
          customerRent?.remainingDays >= userPromo?.minimumDays
            ? totalAmount * discount
            : data?.adjustmentAmount
        );
      } else {
        setDiscount(data?.adjustmentAmount);
        setIsAdjustment(data?.adjustmentAmount > 0 ? true : false);
      }
    } else {
      if (
        userPromo?.minimumDays &&
        customerRent?.remainingDays >= userPromo?.minimumDays
      ) {
        const discount = data?.bookingInfo?.promoCodeDiscount / 100;
        setDiscount(
          customerRent?.remainingDays >= userPromo?.minimumDays
            ? totalAmount * discount
            : data?.adjustmentAmount
        );
      } else {
        setDiscount(data?.adjustmentAmount);
        setIsAdjustment(data?.adjustmentAmount > 0 ? true : false);
      }
    }
    // set payable amount
    if (discount > 0) {
      setPayableAmount(totalAmount - discount);
    } else {
      setPayableAmount(totalAmount);
    }
  }, [
    days,
    daysDifference,
    months,
    remainingDays,
    years,
    addMissionFee,
    customerRent?.days,
    customerRent?.months,
    customerRent.remainingDays,
    customerRent?.years,
    discount,
    foodAmount,
    promos,
    room?.property?.dAmountForDay,
    room?.property?.dAmountForMonth,
    room?.property?.dAmountForYear,
    isIncludeFood,
    data?.bookingInfo?.minimumPayment,
    securityFee,
    subTotal,
    totalAmount,
    userPromo?.minimumDays,
    vatTax,
    data?.adjustmentAmount,
    data?.bookingInfo?.promoCodeDiscount,
    data?.bookingInfo?.usedPromo?.promo,
    data?.branchDetails?.foodAmount,
    extraCharge,
  ]);

  // date format
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    return `${year}-${month}-${day}`;
  };

  // handle booking update
  const handleBookingDate = async () => {
    const dataForBackend = {
      ...data,
      dueAmount: payableAmount - data?.transactions[0]?.totalReceiveTk,
      discount: discount || 0,
      payableAmount,
      totalAmount,
      bookingInfo: {
        ...bookingInfo,
        addMissionFee,
        customerRent,
        discount,
        foodAmount,
        fullPayment: payableAmount,
        isIncludeFood,
        minimumPayment,
        payableAmount,
        rentDate: {
          bookStartDate: formatDate(startDate),
          bookEndDate: formatDate(endDate),
        },
        securityFee,
        subTotal,
        totalAmount,
        vatTax,
      },
    };

    try {
      const response = await axios.patch(
        `${baseUrl}/api/order/${data._id}`,
        dataForBackend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message);
      refetch();
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  };

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
                    excludeDateIntervals={rentRooms?.map((rent) => {
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
                    excludeDateIntervals={rentRooms?.map((rent) => {
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
              {/* calculation */}
              <div className="text-black pr-3 mt-3 fw-medium">
                <div className="d-flex justify-content-between ">
                  <div className="ml-5 ">
                    <p>Rent</p>
                  </div>
                  <p>BDT {subTotal}</p>
                </div>
                {isIncludeFood ? (
                  <div className="d-flex justify-content-between ">
                    <div className="ml-5 ">
                      <p>Food</p>
                    </div>
                    <p>BDT {foodAmount}</p>
                  </div>
                ) : (
                  ""
                )}
                <div className="d-flex justify-content-between">
                  <div className="ml-5 ">
                    <p>VAT</p>
                  </div>

                  <p> + BDT {vatTax}</p>
                </div>
                {customerRent.months >= 1 || customerRent.years ? (
                  <div className="d-flex justify-content-between ">
                    <div className="ml-5 ">
                      <p>Admission Fee</p>
                    </div>
                    <p>BDT {addMissionFee}</p>
                  </div>
                ) : (
                  ""
                )}
                {customerRent.months >= 1 || customerRent.years ? (
                  <div className="d-flex justify-content-between ">
                    <div className="ml-5">
                      <p>Security Fee</p>
                    </div>
                    <p>BDT {securityFee}</p>
                  </div>
                ) : (
                  ""
                )}

                <hr className="mt-3 ml-5 text-black" />
                <div className="d-flex justify-content-between mt-2">
                  <p className="ml-5">Total Amount</p>
                  <p>BDT {totalAmount}</p>
                </div>

                <div className="d-flex justify-content-between mt-2">
                  <p className="ml-5">
                    {" "}
                    {isAdjustment ? "Previous Adjustment" : "Discount"}{" "}
                  </p>
                  <p>- BDT {discount}</p>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <p className="ml-5">Payable Amount</p>
                  <p>BDT {payableAmount}</p>
                </div>
                {(customerRent?.months >= 2 &&
                  customerRent?.years === undefined) ||
                (customerRent?.months === 0 &&
                  customerRent?.years !== undefined) ? (
                  <div className="d-flex justify-content-between">
                    <div className="ml-5">
                      <p className="text-danger fw-bold">Advance Payment</p>
                    </div>
                    <p> BDT {minimumPayment}</p>
                  </div>
                ) : (
                  ""
                )}

                <div
                  className={`d-flex justify-content-between ${
                    (customerRent?.months >= 2 &&
                      customerRent?.years === undefined) ||
                    (customerRent?.months === 0 && customerRent?.years >= 1)
                      ? "d-none"
                      : "d-block"
                  }`}
                >
                  <div className="ml-5 d-flex justify-items-center ">
                    <p className="text-danger fw-bold">Minimum Payment</p>
                  </div>
                  <p> BDT {minimumPayment}</p>
                </div>
              </div>
              {data?.branchDetails?.foodAmount === 0 ||
              room?.property?.category?.name === "Home-Stay" ? (
                ""
              ) : (
                <div className="d-flex gap-3 ms-3">
                  <input
                    style={{
                      cursor: "pointer",
                    }}
                    type="checkbox"
                    name="terms"
                    id="food"
                    defaultChecked={isIncludeFood}
                    onClick={() => setIsIncludeFood(!isIncludeFood)}
                  />
                  <label
                    htmlFor="food"
                    style={{
                      cursor: "pointer",
                      marginTop: "8px",
                    }}
                  >
                    Including Foods (2 Meals in a Day)
                  </label>
                </div>
              )}

              <div
                className={` d-flex justify-content-center justify-items-center mt-5 `}
                style={{
                  backgroundColor: "#35B0A7",
                }}
              >
                <div>
                  <button
                    className={`fs-5 p-2 text-white bg-transparent `}
                    onClick={handleBookingDate}
                    disabled={
                      data?.endDate === endDate ||
                      data?.endDate > endDate ||
                      data?.endDate > startDate
                        ? true
                        : false
                    }
                  >
                    Update Booking Duration
                  </button>
                </div>

                {/* end */}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BookingDatesExtend;
