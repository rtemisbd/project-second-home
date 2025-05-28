import { MdRefresh } from "react-icons/md";
import img from "../../img/new/style.png";
import { Spinner, Table } from "react-bootstrap";
import { Pagination } from "bootstrap-4-react/lib/components";
import { useEffect, useState } from "react";
import BookingsTable from "../../components/Orders/BookingsTable";
import { useSelector } from "react-redux";
import { baseUrl } from "../../utils/getBaseURL";
import { getFromLocalStorage } from "../../utils/local-storage";
import { authKey } from "../../utils/storageKey";
import { useQuery } from "react-query";
import axios from "axios";

const BookingList = () => {
  const { page, size } = useSelector((state) => state.pagination);

  const [isLoading, setIsLoading] = useState(false);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [paymentStatus, setPaymentStatus] = useState("All");
  const [bookingStatus, setBookingStatus] = useState("All");
  const [runningStatus, setRunningStatus] = useState("All");
  const [guestType, setGuestType] = useState("All");
  const [unknownQuery, setUnknownQuery] = useState("");
  const [filteredName, setFilteredName] = useState("");
  const [filteredPhone, setFilteredPhone] = useState("");

  const [data, setData] = useState([]);
  const [totalDataCount, setTotalDataCount] = useState(0);

  const [findingStatement, setFindingStatement] = useState(true);
  const [hasTimeoutRun, setHasTimeoutRun] = useState(false);

  // Get all Bookings
  const { refetch } = useQuery(
    [
      "fetchBookings",
      page,
      paymentStatus,
      bookingStatus,
      fromDate,
      toDate,
      runningStatus,
      guestType,
      filteredName,
      filteredPhone,
    ],
    async () => {
      try {
        const queryParams = new URLSearchParams({
          fromDate,
          toDate,
          paymentStatus,
          page,
          size,
          runningStatus,
          guestType,
          status: bookingStatus,
          filteredName,
          filteredPhone,
        });

        // Get the access token
        const accessToken = getFromLocalStorage(authKey);
        // Set the headers
        const headers = {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        };

        const { data } = await axios.get(`${baseUrl}/api/villa-order`);
        console.log(data);

        setData(data.data);

        // setTotalDataCount(data?.data?.bookingsTotalCount);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  // Re-fetch data whenever size changes
  useEffect(() => {
    refetch();
  }, [size, refetch]);

  console.log(data);

  return (
    <div className="wrapper">
      <div>
        <div className="wrapper">
          {/* Content Wrapper. Contains page content */}

          <div className="content-wrapper h-0" style={{ background: "unset" }}>
            {/* booking details */}
            <h4 className="customize mx-lg-5 mb-3">Booking Details</h4>
            <div className="row customize mx-lg-5">
              <div className="col-md-3 home_card_m">
                <div className="card_1">
                  <div className="d-flex p-3">
                    <div className="d-flex justify-content-center align-items-center">
                      <img src={img} alt="" className="img1" />
                    </div>
                    <div className="ms-3 ">
                      <p className="fw-bold">
                        <span className="text-white">
                          {/* {bookingStatus === "All" ? "Approved" : bookingStatus} */}
                        </span>{" "}
                        (Bookings)
                      </p>
                      <p className="fw-bold text-white">
                        {/* {bookingStatus === "Pending"
                          ? data?.pendingCount
                          : bookingStatus === "Canceled"
                          ? data?.canceledCount
                          : bookingStatus === "Processing"
                          ? data?.processingCount
                          : bookingStatus === "Approved" ||
                            bookingStatus === "All"
                          ? data?.approvedCount
                          : ""}{" "} */}
                        Booking
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 home_card_m">
                <div className="card_2">
                  <div className="d-flex p-3">
                    <div className="d-flex justify-content-center align-items-center">
                      <img src={img} alt="" className="img2" />
                    </div>
                    <div className="ms-3 text-white">
                      <p className="">Total Payable Amount</p>
                      <p className="fw-bold">
                        {/* Tk {data?.totalBookingAmount?.toLocaleString()} */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 home_card_m">
                <div className="card_3">
                  <div className="d-flex p-3">
                    <div className="d-flex justify-content-center align-items-center">
                      <img src={img} alt="" className="img3" />
                    </div>
                    <div className="ms-3 text-white">
                      <p>Total Cash Amount</p>
                      <p className="fw-bold">
                        {/* Tk {data?.totalReceiveAmountFilter?.toLocaleString()} */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 home_card_m">
                <div className="card_4">
                  <div className="d-flex p-3">
                    <div className="d-flex justify-content-center align-items-center">
                      <img src={img} alt="" className="img3" />
                    </div>
                    <div className="ms-3 text-white">
                      <p>Total Due Amount</p>
                      <p className="fw-bold">
                        {/* Tk {data?.totalDueAmount?.toLocaleString()} */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* booking summery */}
            <div className="mx-lg-5 customize">
              <div className="d-flex mt-4 fw-bold ">
                {/* <p> Total Bookings : {data?.bookingsTotalCount}</p> */}
                <p className="ms-2 text-green ">
                  {" "}
                  {/* Approved Bookings : {data?.approvedCount} */}
                </p>
                <p className="ms-2 text-danger ">
                  {" "}
                  {/* Pending Bookings : {data?.pendingCount} */}
                </p>
                {/* <p className="ms-2"> Cancel Bookings : {data?.canceledCount}</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-wrapper" style={{ background: "unset" }}>
        <section className="content customize_list">
          <div className="container-fluid">
            {/* search bar */}
            <div className="d-lg-flex justify-content-end gap-2 ">
              <div className="">
                <label htmlFor=""> Phone </label>
                <br />
                <div>
                  <input
                    type="number"
                    name="unknownQuery"
                    id="unknownQueryId"
                    // onChange={handleUnknownQuery}
                    placeholder="Enter phone number"
                    // value={unknownQuery}
                    // disabled={unknownQuery.length >= 11}
                    className="rounded"
                  />
                </div>
              </div>
              <div className="">
                <label htmlFor="">From Date </label>
                <br />
                <div>
                  <input
                    type="date"
                    // onChange={(e) => setFromDate(e.target.value)}
                    name=""
                    id="fromDateId"
                    // value={fromDate}
                    className="rounded"
                  />
                </div>
              </div>
              <div className="">
                <label htmlFor="">To Date </label> <br />
                <div>
                  <input
                    type="date"
                    name=""
                    id="toDateId"
                    // onChange={(e) => setToDate(e.target.value)}
                    // value={toDate}
                    className="rounded"
                  />
                </div>
              </div>
              {/* {user?.role !== "manager" && (
                <div>
                  <label htmlFor="">Branch </label> <br />
                  <select
                    className="rounded"
                    style={{ height: "30px" }}
                    onChange={(e) => setBranch(e.target.value)}
                    id="branchId"
                    value={branch}
                  >
                    <option value="All">All</option>
                    {allBranch?.map((branch) => (
                      <option value={branch?._id}>{branch?.name}</option>
                    ))}
                  </select>
                </div>
              )} */}
              <div>
                <label htmlFor="">Payment Status </label> <br />
                <select
                  className="rounded"
                  style={{ height: "30px", width: "120px" }}
                  //   onChange={(e) => setPaymentStatus(e.target.value)}
                  id="paymentStatusId"
                  //   value={paymentStatus}
                >
                  <option>All</option>

                  <option>Paid</option>
                  <option>Unpaid</option>
                </select>
              </div>
              <div>
                <label htmlFor="">Booking Status </label> <br />
                <select
                  className="rounded"
                  style={{ height: "30px", width: "120px" }}
                  //   onChange={(e) => setBookingStatus(e.target.value)}
                  id="bookingStatusId"
                  // value={bookingStatus}
                >
                  <option value="All">All</option>

                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Canceled">Canceled</option>
                  <option value="Processing">Processing</option>
                </select>
              </div>
              <div>
                <label htmlFor="">Running / Closed </label> <br />
                <select
                  className="rounded"
                  style={{ height: "30px", width: "120px" }}
                  //   onChange={(e) => setRunningStatus(e.target.value)}
                  id="runningStatusId"
                  //   value={runningStatus}
                >
                  <option>All</option>
                  <option>Running</option>
                  <option>Closed</option>
                </select>
              </div>
              <div>
                <label htmlFor="">Guest Type </label> <br />
                <select
                  className="rounded"
                  style={{ height: "30px", width: "120px" }}
                  //   onChange={(e) => setGuestType(e.target.value)}
                  id="guestTypeId"
                  //   value={guestType}
                >
                  <option>All</option>
                  <option>Walk-in Guest</option>
                  <option>Monthly</option>
                </select>
              </div>

              {/* refresh */}
              <button
                type="button"
                // onClick={handleRefreshQuery}
                style={{ marginTop: "18px" }}
                aria-label="Refresh"
                className="btn btn-sm"
              >
                <MdRefresh size={32} color="#00BBB4" />
              </button>
            </div>

            <hr style={{ height: "1px", background: "rgb(191 173 173)" }} />
            {/* booking table */}
            {isLoading ? (
              <p
                style={{ margin: "150px 0" }}
                className="text-center text-danger fw-bold"
              >
                Please Wait... <Spinner size="sm" animation="grow" />
              </p>
            ) : data?.length > 0 ? (
              <div className="card">
                <div className="card-body card_body_sm">
                  <Table striped bordered>
                    <thead>
                      <tr
                        style={{
                          fontSize: "14px",
                        }}
                      >
                        <th>No.</th>
                        <th>Date & Time</th>
                        <th>Booking Id</th>
                        <th>User</th>
                        <th>Villa </th>
                        <th>Total Tk</th>
                        <th>Discount</th>
                        <th>Payable Tk</th>
                        <th>Payment Status</th>
                        <th>Total Receive</th>
                        <th>Due Amount</th>
                        <th>Status</th>
                        <th>Contact</th>
                        <th>Details</th>
                        <th>Update Duration</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {data?.map((booking, index) => (
                        <BookingData
                          booking={booking}
                          key={booking._id}
                          index={index}
                          refetch={refetch}
                          page={page}
                          extraCharge={extraCharge}
                          isLoading={isLoading}
                          size={size}
                        />
                      ))} */}
                    </tbody>
                  </Table>
                </div>
              </div>
            ) : findingStatement ? (
              <p className="text-center text-danger fw-bold">
                Find Bookings... <Spinner size="sm" animation="grow" />
              </p>
            ) : (
              <p className="text-center text-danger fw-bold">No Data Found</p>
            )}
          </div>
        </section>
        <Pagination totalDataCount={totalDataCount} />
      </div>
    </div>
  );
};

export default BookingList;
