import { MdRefresh } from "react-icons/md";
import img from "../../img/new/style.png";
import { Spinner, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import BookingsTable from "../../components/Orders/BookingsTable";
import { useSelector } from "react-redux";
import { baseUrl } from "../../utils/getBaseURL";
import { getFromLocalStorage } from "../../utils/local-storage";
import { authKey } from "../../utils/storageKey";
import { useQuery } from "react-query";
import axios from "axios";
import { formatDate } from "../../utils/dateConvert";
import { BiSolidEdit } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineEye, AiOutlineFieldTime } from "react-icons/ai";
import Pagination from "../../components/Pagination/Pagination";

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

  const allBookingStatus = ["Pending", "Processing", "Approved", "Canceled"];

  const handleShowDetails = (detailsData) => {
    // setShowDurationModal(true);
    // setShowDetails(true);
    // setBookingDetails(detailsData);
  };

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

        const { data } = await axios.get(
          `${baseUrl}/api/villa-order?${queryParams.toString()}`
        );
        console.log(data);

        setData(data?.data?.orders);
        setTotalDataCount(data?.data?.totalCount);

        // setTotalDataCount(data?.data?.bookingsTotalCount);
      } catch (error) {
        console.error("Error fetching data:", error);
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
                  {allBookingStatus?.map((status, ind) => (
                    <option key={ind} value={status}>
                      {status}
                    </option>
                  ))}
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
                        {/* <th>Payment Status</th> */}
                        <th>Total Receive</th>
                        <th>Due Amount</th>
                        <th>Status</th>
                        {/* <th>Contact</th> */}
                        <th>Details</th>
                        <th>Update Duration</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((booking, index) => (
                        <tr key={index} className="bookings_data">
                          <td>{(page - 1) * size + index + 1}</td>
                          <td
                            style={{
                              width: "140px",
                            }}
                          >
                            {" "}
                            <p>{formatDate(booking?.createdAt)}</p>
                            <p>
                              {
                                new Date(booking?.createdAt)
                                  ?.toLocaleString()
                                  ?.split(",")[1]
                              }
                            </p>
                          </td>
                          <td>
                            <p>#{booking?.bookingId} </p>
                          </td>
                          <td>
                            <p>{booking?.user?.phone}</p>
                            <p>{booking?.user?.firstName}</p>
                          </td>
                          <td> {booking?.villa?.title}</td>
                          <td
                            style={{
                              width: "100px",
                            }}
                          >
                            {" "}
                            <p className="fw-bold">
                              Tk {booking?.totalAmount?.toLocaleString()}
                            </p>
                          </td>
                          <td>
                            {" "}
                            {/* <p className="fw-bold">Tk {discount}</p> */}
                          </td>
                          <td>
                            {" "}
                            <p className="fw-bold">
                              Tk {booking?.payableAmount?.toLocaleString()}
                            </p>
                          </td>
                          {/* <td>
                            <span
                              className=" fw-bold "
                              style={{
                                color:
                                  booking?.paymentStatus === "Paid"
                                    ? "green"
                                    : "red",
                              }}
                            >
                              {" "}
                              {booking?.paymentStatus}
                            </span>
                          </td> */}

                          <td>
                            <p className="fw-bold">Tk {booking?.sendAmount}</p>
                          </td>
                          <td>
                            {" "}
                            <span
                              className=" fw-bold"
                              style={{
                                color:
                                  booking?.payableAmount -
                                    booking?.sendAmount ===
                                  0
                                    ? "green"
                                    : "red",
                              }}
                            >
                              {" "}
                              TK {booking?.payableAmount - booking?.sendAmount}
                            </span>
                          </td>
                          <td>
                            <div className=" d-flex ">
                              <div>
                                <p
                                  className="fw-bold"
                                  style={{
                                    color:
                                      booking?.status === "Approved"
                                        ? "#27b3b1"
                                        : "red",
                                  }}
                                >
                                  {booking?.status}
                                </p>
                              </div>
                              <button
                                type="button"
                                className="d-flex p-0 "
                                style={{
                                  backgroundColor: "transparent",
                                }}
                                // onClick={() => handleStatusShow(booking)}
                              >
                                <BiSolidEdit
                                  style={{
                                    width: "24px",
                                    height: "24px",
                                    color: "black",
                                  }}
                                />
                              </button>
                              {/* Modal Order Status Update */}
                            </div>
                            <div>
                              {/* {statusModalData && (
                                <OrderStatusUpdate
                                  data={statusModalData}
                                  refetch={refetch}
                                  isLoading={isLoading}
                                  showStatusModal={showStatusModal}
                                  setShowStatusModal={setShowStatusModal}
                                />
                              )} */}
                            </div>
                          </td>
                          {/* whats app contact */}
                          {/* <td>
                            <a
                              href={`https://api.whatsapp.com/send?phone=88${booking?.user?.phone}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <button class="btn position-relative">
                                <FaWhatsapp
                                  style={{
                                    width: "32px",
                                    height: "32px",
                                    cursor: "pointer",
                                    color: "#25D366",
                                  }}
                                />
                                <span
                                  class="spinner-grow spinner-grow-sm text-success "
                                  aria-hidden="true"
                                  style={{
                                    position: "absolute",
                                    top: "-5px",
                                    left: "70%",
                                  }}
                                ></span>
                              </button>
                            </a>
                          </td> */}
                          <td>
                            <div>
                              <span onClick={() => handleShowDetails(booking)}>
                                <AiOutlineEye
                                  style={{
                                    width: "24px",
                                    height: "24px",
                                    cursor: "pointer",
                                  }}
                                />
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex justify-content-center">
                              <button
                                title={`${
                                  booking?.status === "Approved"
                                    ? "Sorry ! Your Booking Already Approved"
                                    : ""
                                }`}
                                type="button"
                                className={`rounded ${
                                  booking?.status === "Approved"
                                    ? "bg-white"
                                    : "#35b0a7"
                                }`}
                                disabled={
                                  booking?.status === "Approved" ? true : false
                                }
                                // onClick={() => {
                                //   booking?.bookingInfo?.roomType ===
                                //   "Shared Room"
                                //     ? handleSeatShow(booking)
                                //     : handleDurationShow(booking);
                                // }}
                              >
                                <AiOutlineFieldTime
                                  style={{ width: "24px", height: "24px" }}
                                />
                              </button>
                            </div>
                            {/* Modal order Date Update */}
                            {/* {booking?.bookingInfo?.roomType === "Shared Room" &&
                            durationUpdateDataSeat ? (
                              <div>
                                <BookingSeatDateExtend
                                  data={booking}
                                  refetch={refetch}
                                  extraCharge={extraCharge}
                                  showDurationModal={showDurationModal}
                                  setShowDurationModal={setShowDurationModal}
                                />
                              </div>
                            ) : (
                              ""
                            )} */}
                            {/* {durationUpdatePrivateRoom && (
                              <div>
                                <BookingDatesExtend
                                  data={booking}
                                  refetch={refetch}
                                  extraCharge={extraCharge}
                                  showDurationModal={showDurationModal}
                                  setShowDurationModal={setShowDurationModal}
                                />
                              </div>
                            )} */}
                          </td>
                          <td>
                            <div className="d-flex gap-2 fw-bold">
                              <button
                                type="button"
                                style={{ backgroundColor: "#00BBB4" }}
                                // onClick={() => handlePaymentShow(booking)}
                              >
                                Payment
                              </button>
                              {/* 
              <button className="bg-danger">End</button> */}
                            </div>
                            {/* {paymentModalData && (
                              <Payment
                                data={paymentModalData}
                                refetch={refetch}
                                isLoading={isLoading}
                                showPaymentModal={showPaymentModal}
                                setShowPaymentModal={setShowPaymentModal}
                              />
                            )} */}
                          </td>
                          {/* <td>
                            <p className=" fw-bold">
                              {booking?.specialRequest}
                            </p>
                          </td> */}
                        </tr>
                      ))}
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
