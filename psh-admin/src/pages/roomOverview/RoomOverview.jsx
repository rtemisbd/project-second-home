import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useQuery } from "react-query";
import { baseUrl } from "../../utils/getBaseURL";
import useBranch from "../../hooks/useBranch";
import useCategory from "../../hooks/useCategory";

const RoomOverview = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [branch, setBranch] = useState("");
  const [category, setCategory] = useState("");

  const [data, setData] = useState([]);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [bookingStatus, setBookingStatus] = useState("Available");

  const { allBranch } = useBranch();
  const { categories } = useCategory();

  // Helper to format a date into YYYY-MM-DD
  const formatDate = (date) => date.toISOString().split("T")[0];

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

  const handleFromDate = (e) => setFromDate(e.target.value);
  const handleToDate = (e) => setToDate(e.target.value);

  // Fetch properties
  const { refetch: refetchProperties } = useQuery(
    ["fetchProperties", branch, category],
    async () => {
      try {
        const queryParams = new URLSearchParams({
          destination: branch,
          category,
          withSharedRoom: true,
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
        const response = await fetch(`${baseUrl}/api/rent-rooms`, {
          method: "GET",
        });
        const rents = await response.json();
        setBookedRooms(rents?.bookedRooms || []);
        setBookedSeats(rents?.bookedSeats || []);
      } catch (error) {
        throw new Error(error);
      }
    }
  );

  // Initial fetching
  useEffect(() => {
    refetchProperties();
    refetchRentDates();
  }, [branch, category, refetchProperties, refetchRentDates]);

  // Default date range initialization
  useEffect(() => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

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

  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <section className="content customize_list">
          <div className="container-fluid">
            {/* Search Filters */}
            <div className="d-lg-flex justify-content-end gap-2">
              <div>
                <label htmlFor="fromDate">From Date</label>
                <input
                  type="date"
                  id="fromDate"
                  className="rounded"
                  value={fromDate}
                  onChange={handleFromDate}
                />
              </div>
              <div>
                <label htmlFor="toDate">To Date</label>
                <input
                  type="date"
                  id="toDate"
                  className="rounded"
                  value={toDate}
                  onChange={handleToDate}
                />
              </div>
              <div>
                <label htmlFor="branch">Branch</label>
                <select
                  id="branch"
                  className="rounded"
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
                <label htmlFor="category">Room Type</label>
                <select
                  id="category"
                  className="rounded"
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
            </div>

            <hr style={{ height: "1px", background: "rgb(191 173 173)" }} />

            {/* Overview Table */}
            <div>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Room/Seat</th>
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
                        <td key={date}>{getBookingStatus(room, date)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RoomOverview;
