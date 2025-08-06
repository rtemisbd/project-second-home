import { useSelector } from "react-redux";
import { dateFormatter } from "../../utils/dateFormatter";
import { useEffect, useState } from "react";
import useBranch from "../../hooks/useBranch";
import useCategory from "../../hooks/useCategory";
import { useQuery } from "react-query";
import { baseUrl } from "../../utils/getBaseURL";
import { Table } from "react-bootstrap";
import DetailOverview from "../../components/BookOverview/DetailOverview";

const BookingOverview = () => {
  const { page, size } = useSelector((state) => state.pagination);

  const { months, formatDate, generateDateArray } = dateFormatter;

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [branch, setBranch] = useState("");
  const [category, setCategory] = useState("All");
  const [roomId, setRoomId] = useState("");
  const [seatId, setSeatId] = useState("");

  const [data, setData] = useState([]);
  const [rentDates, setRentDates] = useState([]);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [reserved, setReserved] = useState([]);

  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detail, setDetail] = useState(null);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const { allBranch } = useBranch();
  const { categories } = useCategory();

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

  // Fetch properties
  const { refetch: refetchProperties } = useQuery(
    ["fetchProperties", branch, category, page, size],
    async () => {
      try {
        const queryParams = new URLSearchParams({
          destination: branch,
          category,
          withSharedRoom: true,
          roomId,
          seatId,
          isPublished: "Published",
        });

        const response = await fetch(
          `${baseUrl}/api/property?${queryParams.toString()}`,
          { method: "GET" }
        );

        if (!response.ok) {
          throw new Error(`API error with status: ${response.status}`);
        }

        const json = await response.json();
        setData(json?.properties || []);
        setTotalDataCount(json.totalCount);
      } catch (error) {
        throw new Error(error);
      }
    }
  );

  // Fetch booked dates and room/seat data
  const { refetch: refetchRentDates } = useQuery(
    ["fetchRentDates"],
    async () => {
      try {
        const queryParams = new URLSearchParams({
          // startDate: fromDate,
          // endDate: toDate,
        });
        const response = await fetch(
          `${baseUrl}/api/rent-rooms?${queryParams.toString()}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        // console.log(data);
        setRentDates(data?.data);
      } catch (error) {
        throw new Error(error);
      }
    }
  );

  const changeSelectedMonth = (direction) => {
    let newMonth = monthIndex;
    let newYear = startYear;

    if (direction === "prev") {
      if (newMonth === 0) {
        newMonth = 11;
        newYear = newYear - 1;
      } else {
        newMonth = newMonth - 1;
      }
    } else if (direction === "next") {
      if (newMonth === 11) {
        newMonth = 0;
        newYear = newYear + 1;
      } else {
        newMonth = newMonth + 1;
      }
    }

    setMonthIndex(newMonth);
    setStartMonth(months[newMonth]);
    setStartYear(newYear);
    setEndYear(newYear);

    const startOfMonth = new Date(newYear, newMonth, 1);
    const endOfMonth = new Date(newYear, newMonth + 1, 0);

    setFromDate(formatDate(startOfMonth));
    setToDate(formatDate(endOfMonth));
  };

  // Initial fetching
  useEffect(() => {
    refetchProperties();
    refetchRentDates();
  }, [branch, category, roomId, seatId, refetchProperties, refetchRentDates]);

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

  // Generate array of dates for the table header
  const datesArray =
    fromDate && toDate ? generateDateArray(fromDate, toDate) : [];

  const getBookingStatus = (room, date) => {
    const isPrivateRoom = room?.categoryDetails?.name !== "Shared Room";

    const booking = isPrivateRoom
      ? rentDates.find(
          (br) =>
            br.roomId === room._id &&
            new Date(br.bookStartDate) <= new Date(date) &&
            new Date(br.bookEndDate) >= new Date(date)
        )
      : rentDates.find(
          (bs) =>
            bs.seatId === room._id &&
            new Date(bs.bookStartDate) <= new Date(date) &&
            new Date(bs.bookEndDate) >= new Date(date)
        );

    return booking ? true : false;
  };

  const handleShowDetails = (room, date) => {
    setSelectedDate(date);

    setShowDetailModal(true);
    setDetail(room);
    if (room?.categoryDetails?.name === "Shared Room") {
      getBookingStatus(room, date);
      setBookingInfo(
        rentDates.filter(
          (bs) =>
            bs.seatId === room._id &&
            new Date(bs.bookStartDate) <= new Date(date) &&
            new Date(bs.bookEndDate) >= new Date(date)
        )
      );
    } else {
      getBookingStatus(room, date);
      setBookingInfo(
        rentDates.filter(
          (br) =>
            br.roomId === room._id &&
            new Date(br.bookStartDate) <= new Date(date) &&
            new Date(br.bookEndDate) >= new Date(date)
        )
      );
    }
  };
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
                <label htmlFor="branch">Branch</label> <br />
                <select
                  id="branch"
                  className="rounded py-1 "
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                >
                  <option value="">All</option>
                  {allBranch?.map((branch) => (
                    <option key={branch.name} value={branch.name}>
                      {branch.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="category">Room Type</label> <br />
                <select
                  id="category"
                  className="rounded py-1 "
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="All">All</option>
                  {categories?.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="roomId">Room Number </label> <br />
                <input
                  type="text"
                  className="rounded  "
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="seatId">Seat Number </label> <br />
                <input
                  type="text"
                  className="rounded  "
                  value={seatId}
                  onChange={(e) => setSeatId(e.target.value)}
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
                      <p>Room/Seat</p>
                    </th>
                    {datesArray.map((date) => (
                      <th key={date}>{new Date(date).getDate()}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((room, index) => (
                    <tr key={index}>
                      <td>
                        {room?.categoryDetails?.name === "Home-Stay"
                          ? `${room.name}: ${room.roomNumber}`
                          : room?.categoryDetails?.name !== "Shared Room"
                          ? `Room: ${room.roomNumber}`
                          : `Seat: ${room.seatNumber}`}
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
                            handleShowDetails(room, date);
                          }}
                        >
                          {getBookingStatus(room, date) ? (
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
          <DetailOverview
            detail={detail}
            bookingInfo={bookingInfo}
            date={selectedDate}
            setShowDetailModal={setShowDetailModal}
            handleShowDetails={handleShowDetails}
          />
        )}
      </div>
      {/* <Pagination totalDataCount={totalDataCount} /> */}
    </div>
  );
};

export default BookingOverview;
