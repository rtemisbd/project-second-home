import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import useExtraCharge from "../../hooks/useExtraCharge";
import img from "../../img/new/style.png";

import { Spinner } from "react-bootstrap";
import BookingsTable from "./BookingsTable";
import { getFromLocalStorage } from "../../utils/local-storage";
import { authKey } from "../../utils/storageKey";
import { baseUrl } from "../../utils/getBaseURL";
import { MdRefresh } from "react-icons/md";
import Pagination from "../Pagination/Pagination";
import { useSelector } from "react-redux";
import useBranch from "../../hooks/useBranch";

const NewOrders = () => {
  const { page, size } = useSelector((state) => state.pagination);

  const [extraCharge] = useExtraCharge();

  const [isLoading, setIsLoading] = useState(false);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [branch, setBranch] = useState("All");
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

  // get all branches
  const { allBranch } = useBranch();
  // Get all Bookings
  const { refetch } = useQuery(
    [
      "fetchBookings",
      page,
      extraCharge,
      branch,
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
          branch,
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

        const response = await fetch(
          `${baseUrl}/api/order?${queryParams.toString()}`,
          {
            method: "GET",
            headers: headers,
          }
        );

        if (!response.ok) {
          throw new Error("Network Error");
        }

        const data = await response.json();
        setData(data.data);

        setTotalDataCount(data?.data?.bookingsTotalCount);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  console.log(bookingStatus);

  // Re-fetch data whenever size changes
  useEffect(() => {
    refetch();
  }, [size, refetch]);

  const handleUnknownQuery = (e) => {
    const value = e.target.value;
    setUnknownQuery(value);

    if (!isNaN(Number(value) && value.length === 11)) {
      setFilteredPhone(value);
    }
  };

  const handleRefreshQuery = () => {
    setUnknownQuery("");
    setFilteredPhone("");
    document.getElementById("unknownQueryId").value = "";
    setFromDate("");
    document.getElementById("fromDateId").value = "";
    setToDate("");
    document.getElementById("toDateId").value = "";
    setBranch("All");
    document.getElementById("branchId").value = "All";
    setPaymentStatus("All");
    document.getElementById("paymentStatusId").value = "All";
    setBookingStatus("All");
    document.getElementById("bookingStatusId").value = "All";
    setRunningStatus("All");
    document.getElementById("runningStatusId").value = "All";
    setGuestType("All");
    document.getElementById("guestTypeId").value = "All";
  };

  console.log(data.orders);

  useEffect(() => {
    if (data?.orders?.length === 0 && !hasTimeoutRun) {
      const timeoutId = setTimeout(() => {
        setFindingStatement(!findingStatement);
        setHasTimeoutRun(true);
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [data?.orders?.length, findingStatement, hasTimeoutRun, refetch]);

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
                          {bookingStatus === "All" ? "Approved" : bookingStatus}
                        </span>{" "}
                        (Bookings)
                      </p>
                      <p className="fw-bold text-white">
                        {bookingStatus === "Pending"
                          ? data?.pendingCount
                          : bookingStatus === "Canceled"
                          ? data?.canceledCount
                          : bookingStatus === "Processing"
                          ? data?.processingCount
                          : bookingStatus === "Approved" ||
                            bookingStatus === "All"
                          ? data?.approvedCount
                          : ""}{" "}
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
                        Tk {data?.totalBookingAmount?.toLocaleString()}
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
                        Tk {data?.totalReceiveAmountFilter?.toLocaleString()}
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
                        Tk {data?.totalDueAmount?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* booking summery */}
            <div className="mx-lg-5 customize">
              <div className="d-flex mt-4 fw-bold ">
                <p> Total Bookings : {data?.bookingsTotalCount}</p>
                <p className="ms-2 text-green ">
                  {" "}
                  Approved Bookings : {data?.approvedCount}
                </p>
                <p className="ms-2 text-danger ">
                  {" "}
                  Pending Bookings : {data?.pendingCount}
                </p>
                <p className="ms-2"> Cancel Bookings : {data?.canceledCount}</p>
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
                    onChange={handleUnknownQuery}
                    placeholder="Enter phone number"
                    value={unknownQuery}
                    disabled={unknownQuery.length >= 11}
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
              <div>
                <label htmlFor="">Payment Status </label> <br />
                <select
                  className="rounded"
                  style={{ height: "30px", width: "120px" }}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  id="paymentStatusId"
                  value={paymentStatus}
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
                  onChange={(e) => setBookingStatus(e.target.value)}
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
                  onChange={(e) => setRunningStatus(e.target.value)}
                  id="runningStatusId"
                  value={runningStatus}
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
                  onChange={(e) => setGuestType(e.target.value)}
                  id="guestTypeId"
                  value={guestType}
                >
                  <option>All</option>
                  <option>Walk-in Guest</option>
                  <option>Monthly</option>
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
              {/* <div>
                <label htmlFor="">User Id </label> <br />
                <input
                  type="text"
                  list="userId"
                  placeholder="Type User Id"
                  onChange={(e) => setUserId(e.target.value)}
                  style={{
                    width: "160px",
                  }}
                />
             
              </div> */}
              {/* <div className=" ">
                <label htmlFor="">Booking Id </label> <br />
                <input
                  type="text"
                  list="bookingId"
                  placeholder="Type Booking Id"
                  onChange={(e) => setBookingId(e.target.value)}
                  style={{
                    width: "160px",
                  }}
                />
              
                <button
                  // onClick={handleSearch}
                  className="btn text-white"
                  style={{
                    backgroundColor: "#35b0a7",
                    height: "32px",
                    padding: "0 10px",
                  }}
                >
                  Search
                </button>
              </div> */}
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
            ) : data?.orders?.length > 0 ? (
              <div className="card">
                <div className="card-body card_body_sm">
                  <BookingsTable
                    data={data?.orders}
                    page={page}
                    isLoading={isLoading}
                    refetch={refetch}
                    extraCharge={extraCharge}
                    size={size}
                  />
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

export default NewOrders;
