import axios from "axios";
import { addDays, addMonths, format, parse, subDays } from "date-fns";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { baseUrl } from "../../../utils/getBaseURL";
import { getFromLocalStorage } from "../../../utils/local-storage";
import { authKey } from "../../../utils/storageKey";
import toast from "react-hot-toast";

const VillaBookingDateExtend = ({
  data,
  refetch,
  showExtendModal,
  setShowExtendModal,
}) => {
  const [startDate, setStartDate] = useState(data?.rentDate?.bookStartDate);
  const [endDate, setEndDate] = useState(data?.rentDate?.bookEndDate);
  const [rentVillaDates, setRentVillaDates] = useState([]);
  const [perNight, setPerNight] = useState(
    data?.villa?.pricing?.afterDiscountPerNight
  );
  const [totalAmount, setTotalAmount] = useState(data?.pricing?.totalAmount || 0);
  const [initialAmount, setInitialAmount] = useState(data?.pricing?.initialAmount);
  const [discount, setDiscount] = useState(data?.pricing?.discount || 0);
  const [alreadyPaid, setAlreadyPaid] = useState(
    data?.transactions[0]?.totalReceiveTk || 0
  );

  const [customerRent, setCustomerRent] = useState(
    data?.rentDate?.daysDifference
  );

  const parseDate = (dateStr) => {
    if (typeof dateStr === "string") {
      const [day, month, year] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, day); // Month is 0-indexed
    } else if (dateStr instanceof Date) {
      return dateStr;
    } else {
      return new Date(); // fallback
    }
  };

  const handleBookingDateExtend = async () => {
    try {
      const payload = {
        pricing: {
          initialAmount,
          totalAmount,
        },
        rentDate: {
          bookStartDate: format(parseDate(startDate), "dd-MM-yyyy"),
          bookEndDate: format(parseDate(endDate), "dd-MM-yyyy"),
          daysDifference: customerRent,
        },
        // initialAmount,
        // totalAmount,
      };
      // Get the access token
      const accessToken = getFromLocalStorage(authKey);
      // Set the headers
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      };

      const updatedData = await axios.patch(
        `${baseUrl}/api/villa-order/${data?._id}`,
        payload,
        { headers }
      );
      if (updatedData?.data?.success) {
        toast.success(updatedData?.data?.message);
        setShowExtendModal(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: villaData } = await axios.get(
        `${baseUrl}/api/villa/${data?.villa?._id}`
      );
      setRentVillaDates(villaData?.data?.bookedDates);
    };
    fetchData();
  }, [data]);

  // durations
  useEffect(() => {
    if (startDate && endDate) {
      const start = parseDate(startDate);
      const end = parseDate(endDate);

      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      setCustomerRent(diffDays);
    }
  }, [startDate, endDate]);

  // calculations

  useEffect(() => {
    if (customerRent && perNight) {
      const total = customerRent * perNight;
      setTotalAmount(total);

      const initialAmount = total - discount;
      setInitialAmount(initialAmount);

      const payable = initialAmount;
      setTotalAmount(payable);
    }
  }, [customerRent, perNight, discount]);

  return (
    <Modal show={showExtendModal} onHide={() => setShowExtendModal(false)}>
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
            {/* about villa*/}
            <div
              className="px-3 py-2 m-3"
              style={{
                boxShadow: "0px 0px 5px 3px #CCC",
                borderRadius: "5px",
              }}
            >
              <h4 className="text-left " style={{ color: "#212A42" }}>
                {data?.villa?.title}
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
                Villa Number - [{data?.villa?.villaNumber}]
              </p>
            </div>

            {/* check in check out */}
            <div className="d-flex justify-content-between gap-3 total-area text-black px-2 mt-3">
              <div>
                <p className="text-left font-bold mb-1">Check-In</p>
                <DatePicker
                  selected={parseDate(startDate)}
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => setStartDate(date)}
                  // showIcon
                  excludeDateIntervals={rentVillaDates?.map((rent) => {
                    return {
                      start: subDays(parseDate(rent?.bookStartDate), 0),
                      end: addDays(parseDate(rent?.bookEndDate), 0),
                    };
                  })}
                  // minDate={subDays(new Date(), 0)}
                />
              </div>
              <div>
                <p className="text-left font-bold mb-1">Check-Out</p>
                <DatePicker
                  selected={parseDate(endDate)}
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => setEndDate(date)}
                  // showIcon
                  excludeDateIntervals={rentVillaDates?.map((rent) => {
                    return {
                      start: subDays(parseDate(rent?.bookStartDate), 0),
                      end: addDays(parseDate(rent?.bookEndDate), 0),
                    };
                  })}
                  minDate={subDays(parseDate(startDate), -1)}
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
                  value={`${customerRent || 0} Nights`}
                  disabled
                />
              </div>
            </div>

            {/* calculation */}
            <div className="text-black pr-3 mt-3 fw-medium">
              <div className="d-flex justify-content-between ">
                <div className="ml-5 ">
                  <p>Rent Per Night</p>
                </div>
                <p>BDT {perNight}</p>
              </div>

              <hr className="mt-3 ml-5 text-black" />
              <div className="d-flex justify-content-between mt-2">
                <p className="ml-5">Total Amount</p>
                <p>BDT {totalAmount}</p>
              </div>

              <div className="d-flex justify-content-between mt-2">
                <p className="ml-5">
                  {" "}
                  {discount ? "Previous Adjustment" : "Discount"}{" "}
                </p>
                <p>BDT {discount}</p>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <p className="ml-5">Sub Total</p>
                <p>BDT {initialAmount}</p>
              </div>

              <div className="d-flex justify-content-between">
                <div className="ml-5">
                  <p className="text-success fw-bold">Advance Paid</p>
                </div>
                <p> BDT {alreadyPaid}</p>
              </div>

              <div className="d-flex justify-content-between">
                <div className="ml-5">
                  <p className="text-danger fw-bold">Due Amount</p>
                </div>
                <p> BDT {totalAmount - alreadyPaid}</p>
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
                  onClick={handleBookingDateExtend}
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
  );
};

export default VillaBookingDateExtend;
