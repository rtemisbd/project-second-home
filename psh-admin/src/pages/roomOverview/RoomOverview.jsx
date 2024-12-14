import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useQuery } from "react-query";
import { baseUrl } from "../../utils/getBaseURL";
import useBranch from "../../hooks/useBranch";
import useCategory from "../../hooks/useCategory";
import { useSelector } from "react-redux";
import Pagination from "../../components/Pagination/Pagination";

const RoomOverview = () => {
  const { page, size } = useSelector((state) => state.pagination);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [branch, setBranch] = useState("");
  const [category, setCategory] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [seatNumber, setSeatNumber] = useState("");

  const [data, setData] = useState([]);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [reserved, setReserved] = useState([]);

  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [monthIndex, setMonthIndex] = useState(null);

  const { allBranch } = useBranch();
  const { categories } = useCategory();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Helper to format a date into YYYY-MM-DD
  // const formatDate = (date) => date.toLocaleString();
  const formatDate = (date) => date.toLocaleDateString("en-CA");

  // Generate array of dates between two dates
  const generateDateArray = (start, end) => {
    let startDate = new Date(start);
    let endDate = new Date(end);

    let dates = [];
    while (startDate <= endDate) {
      dates.push(formatDate(new Date(startDate)));
      startDate.setDate(startDate.getDate() + 1);
    }
    return dates;
  };

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
          roomNumber,
          seatNumber,
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
          fromDate,
          toDate,
        });
        const response = await fetch(
          `${baseUrl}/api/rent-rooms?${queryParams.toString()}`,
          {
            method: "GET",
          }
        );
        const rents = await response.json();
        // console.log(rents);

        setBookedRooms(rents?.bookedRooms || []);
        setBookedSeats(rents?.bookedSeats || []);
        setReserved(rents?.upcomingRentRooms || []);
      } catch (error) {
        throw new Error(error);
      }
    }
  );

  // useEffect(() => {
  //   const initializeCurrentMonth = () => {
  //     const today = new Date();
  //     const currentMonthIndex = today.getMonth();
  //     const year = today.getFullYear();

  //     // Set the first and last day of the current month
  //     const startOfMonth = new Date(year, currentMonthIndex, 1);
  //     const endOfMonth = new Date(year, currentMonthIndex + 1, 0);
  //     setMonthIndex(today.getMonth());
  //     setStartMonth(months[monthIndex]);
  //     setSelectedYear(year);
  //     setFromDate(startOfMonth.toISOString().split("T")[0]);
  //     setToDate(endOfMonth.toISOString().split("T")[0]);
  //   };

  //   initializeCurrentMonth();
  // }, [months]);
  // console.log(monthIndex);

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

  // Initial fetching
  useEffect(() => {
    refetchProperties();
    refetchRentDates();
  }, [
    branch,
    category,
    roomNumber,
    seatNumber,
    refetchProperties,
    refetchRentDates,
  ]);

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
    const isPrivateRoom = room?.categoryDetails?.name === "Private Room";

    const booking = isPrivateRoom
      ? bookedRooms.find(
          (br) =>
            br.roomNumber === room.roomNumber &&
            new Date(br.bookStartDate) <= new Date(date) &&
            new Date(br.bookEndDate) >= new Date(date)
        )
      : bookedSeats.find(
          (bs) =>
            bs.seatNumber === room.seatNumber &&
            new Date(bs.bookStartDate) <= new Date(date) &&
            new Date(bs.bookEndDate) >= new Date(date)
        );

    return booking?.bookingStatus;
  };
  const getReservedStatus = (room, date) => {
    const isPrivateRoom = room?.categoryDetails?.name === "Private Room";

    const booking = isPrivateRoom
      ? reserved.find(
          (br) =>
            br.roomNumber === room.roomNumber &&
            new Date(br.bookStartDate) <= new Date(date) &&
            new Date(br.bookEndDate) >= new Date(date)
        )
      : reserved.find(
          (bs) =>
            bs.seatNumber === room.seatNumber &&
            new Date(bs.bookStartDate) <= new Date(date) &&
            new Date(bs.bookEndDate) >= new Date(date)
        );

    return booking?.bookingStatus;
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
                  <option value="">All</option>
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
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="seatId">Seat Number </label> <br />
                <input
                  type="text"
                  className="rounded  "
                  value={seatNumber}
                  onChange={(e) => setSeatNumber(e.target.value)}
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
                        {room?.categoryDetails?.name === "Private Room"
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
                          ) : getReservedStatus(room, date) ? (
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
      </div>
      {/* <Pagination totalDataCount={totalDataCount} /> */}
    </div>
  );
};

export default RoomOverview;
