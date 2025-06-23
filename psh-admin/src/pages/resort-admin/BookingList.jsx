import { MdRefresh } from "react-icons/md";
import img from "../../img/new/style.png";
import { Spinner, Table } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../utils/getBaseURL";
import { getFromLocalStorage } from "../../utils/local-storage";
import { authKey } from "../../utils/storageKey";
import { useQuery } from "react-query";
import axios from "axios";
import { formatDate } from "../../utils/dateConvert";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineEye, AiOutlineFieldTime } from "react-icons/ai";
import Pagination from "../../components/Pagination/Pagination";
import { AuthContext } from "../../contexts/UserProvider";
import VillaBookingStatusUpdate from "../../components/resort-admin/booking-list/VillaBookingStatusUpdate";
import { Toaster } from "react-hot-toast";
import VillaBookingDetail from "../../components/resort-admin/booking-list/VillaBookingDetail";

const BookingList = () => {
  const { resort } = useContext(AuthContext);
  const { page, size } = useSelector((state) => state.pagination);

  const [isLoading, setIsLoading] = useState(false);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState(new Date());

  const [paymentStatus, setPaymentStatus] = useState("All");
  const [bookingStatus, setBookingStatus] = useState("All");
  const [runningStatus, setRunningStatus] = useState("All");

  const [phone, setPhone] = useState("");

  const [data, setData] = useState([]);
  const [totalDataCount, setTotalDataCount] = useState(0);

  const [showDetail, setShowDetail] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const [findingStatement, setFindingStatement] = useState(true);
  const [hasTimeoutRun, setHasTimeoutRun] = useState(false);

  const allBookingStatus = ["Pending", "Processing", "Approved", "Canceled"];

  const handleShowDetails = (payload) => {
    setShowDetail(true);
    setSelectedData(payload);
  };

  const handleRefreshQuery = () => {
    setPhone("");
    document.getElementById("phone").value = "";
    setFromDate("");
    document.getElementById("fromDateId").value = "";
    setToDate("");
    document.getElementById("toDateId").value = "";
    setPaymentStatus("All");
    document.getElementById("paymentStatusId").value = "All";
    setBookingStatus("All");
    document.getElementById("bookingStatusId").value = "All";
    setRunningStatus("All");
    document.getElementById("runningStatusId").value = "All";
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
      phone,
      resort._id,
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
          status: bookingStatus,
          phone: phone,
          resort: resort._id,
        });

        // Get the access token
        const accessToken = getFromLocalStorage(authKey);
        // Set the headers
        const headers = {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        };

        const { data } = await axios.get(
          `${baseUrl}/api/villa-order?${queryParams.toString()}`,
          { headers }
        );

        setData(data?.data?.orders);
        setTotalDataCount(data?.data?.totalCount);
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

  useEffect(() => {
    if (data?.length === 0 && !hasTimeoutRun) {
      const timeoutId = setTimeout(() => {
        setFindingStatement(!findingStatement);
        setHasTimeoutRun(true);
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [data?.length, findingStatement, hasTimeoutRun, refetch]);

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
                    name="phone"
                    id="phoneId"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
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
                    onChange={(e) => setFromDate(e.target.value)}
                    name=""
                    id="fromDateId"
                    value={fromDate}
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
                    onChange={(e) => setToDate(e.target.value)}
                    value={toDate}
                    className="rounded"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="">Payment Status </label> <br />
                <select
                  className="rounded"
                  style={{ height: "30px", width: "120px" }}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  id="paymentStatusId"
                  value={paymentStatus}
                >
                  <option value="All">All</option>

                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>
              <div>
                <label htmlFor="">Booking Status </label> <br />
                <select
                  className="rounded"
                  style={{ height: "30px", width: "120px" }}
                  onChange={(e) => setBookingStatus(e.target.value)}
                  id="bookingStatusId"
                  value={bookingStatus}
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
                  onChange={(e) => setRunningStatus(e.target.value)}
                  id="runningStatusId"
                  value={runningStatus}
                >
                  <option>All</option>
                  <option>Running</option>
                  <option>Closed</option>
                </select>
              </div>

              {/* refresh */}
              <button
                type="button"
                onClick={handleRefreshQuery}
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
                            <p className="fw-bold">Tk {booking?.discount}</p>
                          </td>
                          <td>
                            {" "}
                            <p className="fw-bold">
                              Tk {booking?.payableAmount?.toLocaleString()}
                            </p>
                          </td>
                          <td>
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
                          </td>

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
                                data-bs-toggle="modal"
                                data-bs-target={`#bookingStatus${booking._id}`}
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
                              <VillaBookingStatusUpdate
                                data={booking}
                                refetch={refetch}
                              />
                            </div>
                          </td>

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
                          {showDetail && (
                            <VillaBookingDetail
                              data={selectedData}
                              showDetail={showDetail}
                              setShowDetail={setShowDetail}
                            />
                          )}
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
        <Toaster
          containerStyle={{ top: 300 }}
          toastOptions={{ position: "top-center" }}
        />
      </div>
    </div>
  );
};

export default BookingList;
