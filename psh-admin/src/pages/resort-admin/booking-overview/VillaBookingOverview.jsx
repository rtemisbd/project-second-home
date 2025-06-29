import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { baseUrl } from "../../../utils/getBaseURL";
import { Table } from "react-bootstrap";
import { AuthContext } from "../../../contexts/UserProvider";
import axios from "axios";
import { dateFormatter } from "../../../utils/dateFormatter";
import VillaBookingOverviewModal from "../../../components/resort-admin/booking-overview/VillaBookingOverviewModal";

const VillaBookingOverview = () => {
  const { page, size } = useSelector((state) => state.pagination);
  const { resort } = useContext(AuthContext);
  const { months, formatDate, generateDateArray, convertToISODate } =
    dateFormatter;

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [villaNumber, setVillaNumber] = useState("");
  const [villaName, setVillaName] = useState("");

  const [data, setData] = useState([]);
  const [bookedDates, setBookedDates] = useState([]);

  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detail, setDetail] = useState(null);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleFromDate = (e) => {
    setFromDate(e.target.value);
    const startDate = new Date(e.target.value);
    setStartMonth(months[startDate.getMonth()]);
    setStartYear(startDate.getFullYear());
  };
  const handleToDate = (e) => {
    setToDate(e.target.value);
    const endDate = new Date(e.target.value);
    setEndMonth(months[endDate.getMonth()]);
    setEndYear(endDate.getFullYear());
  };

  // Generate array of dates for the table header
  const datesArray =
    fromDate && toDate ? generateDateArray(fromDate, toDate) : [];

  const getBookingStatus = (villa, date) => {
    const booking = bookedDates.find(
      (item) =>
        item.villaId === villa._id &&
        new Date(convertToISODate(item.bookStartDate)) <= new Date(date) &&
        new Date(convertToISODate(item.bookEndDate)) >= new Date(date) &&
        item?.bookingStatus === "Booked"
    );

    return booking?.bookingStatus;
  };
  console.log({ bookedDates });

  const handleShowDetails = (villa, date) => {
    setSelectedDate(date);
    setShowDetailModal(true);
    setDetail(villa);

    if (getBookingStatus(villa, date)) {
      // console.log(new Date(bs.bookStartDate));
      console.log(new Date(date));
      setBookingInfo(
        bookedDates.filter(
          (item) =>
            item.villaId === villa._id && item?.bookingStatus === "Booked"
          // && new Date(convertToISODate(item.bookStartDate)) <= new Date(date) &&
          // new Date(convertToISODate(item.bookEndDate)) >= new Date(date)
        )
      );
    }
  };

  const changeSelectedMonth = (payload) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const newMonthIndex = payload === "prev" ? monthIndex - 1 : monthIndex + 1;

    if (newMonthIndex < 0 || newMonthIndex > 11) return;

    setMonthIndex(newMonthIndex);
    setStartMonth(months[newMonthIndex]);

    const startOfMonth = new Date(currentYear, newMonthIndex, 1);
    const endOfMonth = new Date(currentYear, newMonthIndex + 1, 0);

    setFromDate(formatDate(startOfMonth));
    setToDate(formatDate(endOfMonth));
  };

  // Fetch villa
  const { refetch: refetchVilla } = useQuery(
    ["fetchVilla", page, size, resort, villaName, villaNumber],
    async () => {
      try {
        const queryParams = new URLSearchParams({
          resortId: resort?._id,
          villaName,
          villaNumber,
        });
        const { data } = await axios.get(
          `${baseUrl}/api/villa?${queryParams.toString()}`
        );
        // console.log(data);
        setData(data?.data || []);
      } catch (error) {
        throw new Error(error);
      }
    }
  );

  // Fetch booked dates
  const { refetch: refetchRentDates } = useQuery(
    ["fetchRentDates", resort],
    async () => {
      try {
        const queryParams = new URLSearchParams({
          // fromDate,
          // toDate,
          resort: resort?._id,
        });
        const { data } = await axios.get(
          `${baseUrl}/api/villaRentDates?${queryParams.toString()}`
        );

        console.log(data);
        setBookedDates(data?.data);
      } catch (error) {
        throw new Error(error);
      }
    }
  );

  // Initial fetching
  useEffect(() => {
    refetchVilla();
    refetchRentDates();
  }, [refetchVilla, refetchRentDates]);

  // Default date range initialization
  useEffect(() => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    setStartMonth(months[today.getMonth()]);
    setStartYear(today.getFullYear());
    setEndYear(today.getFullYear());
    setFromDate(formatDate(startOfMonth));
    setToDate(formatDate(endOfMonth));
  }, []);

  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <section className="content customize_list">
          <div className="container-fluid">
            {/* Search Filters */}
            <div className="d-lg-flex justify-content-end justify-items-center gap-4">
              <div>
                <label htmlFor="fromDate">From Date</label> <br />
                <input
                  type="date"
                  id="fromDate"
                  className="rounded "
                  value={fromDate}
                  onChange={handleFromDate}
                />
              </div>
              <div>
                <label htmlFor="toDate">To Date</label> <br />
                <input
                  type="date"
                  id="toDate"
                  className="rounded "
                  value={toDate}
                  onChange={handleToDate}
                />
              </div>

              <div>
                <label htmlFor="villaNumber">Villa Number </label> <br />
                <input
                  type="text"
                  className="rounded  "
                  value={villaNumber}
                  onChange={(e) => setVillaNumber(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="villaName">Villa Name </label> <br />
                <input
                  type="text"
                  className="rounded  "
                  value={villaName}
                  onChange={(e) => setVillaName(e.target.value)}
                />
              </div>
            </div>

            <hr style={{ height: "1px", background: "rgb(191 173 173)" }} />

            {/* Overview Table */}
            <div>
              <div className="d-lg-flex justify-content-end justify-items-center gap-4">
                <button
                  onClick={() => changeSelectedMonth("prev")}
                  className="pagination-button"
                >
                  prev
                </button>
                <h4>
                  {startMonth} {startYear}{" "}
                  {endMonth && (
                    <>
                      - {endMonth} {endYear}
                    </>
                  )}
                </h4>
                <button
                  onClick={() => changeSelectedMonth("next")}
                  className="pagination-button"
                >
                  next
                </button>
              </div>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>
                      <p>Dates</p>
                      <hr />
                      <p>Villa Number - Villa Title</p>
                    </th>
                    {datesArray.map((date) => (
                      <th key={date}>{new Date(date).getDate()}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((villa, index) => (
                    <tr key={index}>
                      <td>
                        {villa?.villaNumber} - {villa?.title}
                      </td>
                      {datesArray.map((date) => (
                        <td
                          key={date}
                          style={{
                            width: "44px",
                            height: "44px",
                            padding: "0px",
                            border: "1px solid #35b0a7",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            handleShowDetails(villa, date);
                          }}
                        >
                          {getBookingStatus(villa, date) ? (
                            <div
                              style={{
                                backgroundColor: "#F96167",
                                width: "100%",
                                height: "100%",
                                // margin: "auto",
                              }}
                            >
                              {" "}
                            </div>
                          ) : (
                            <div
                              style={{
                                backgroundColor: "#fbeaeb",
                                width: "100%",
                                height: "100%",
                                // margin: "auto",
                              }}
                            >
                              {" "}
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </section>
        {showDetailModal && (
          <VillaBookingOverviewModal
            detail={detail}
            bookingInfo={bookingInfo}
            date={selectedDate}
            setShowDetailModal={setShowDetailModal}
            handleShowDetails={handleShowDetails}
          />
        )}
      </div>
    </div>
  );
};

export default VillaBookingOverview;
