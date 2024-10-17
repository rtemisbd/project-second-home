import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import useTransaction from "../../hooks/useTransaction";
import useExtraCharge from "../../hooks/useExtraCharge";
import img from "../../img/new/style.png";

import { Spinner } from "react-bootstrap";
import BookingsTable from "./BookingsTable";
import { getFromLocalStorage } from "../../utils/local-storage";
import { authKey } from "../../utils/storageKey";

const NewOrders = () => {
  const [transactions] = useTransaction();
  const [extraCharge] = useExtraCharge();

  const [isLoading, setIsLoading] = useState(false);

  const [pageCount, setPageCount] = useState(0);

  const [page, setPage] = useState(1);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [branch, setBranch] = useState("All");
  const [paymentStatus, setPaymentStatus] = useState("All");
  const [bookingStatus, setBookingStatus] = useState("All");

  const [data, setData] = useState([]);
  const [allBranch, setAllBranch] = useState([]);
  const [allBookings, setAllBookings] = useState([]);

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
    ],
    async () => {
      try {
        const queryParams = new URLSearchParams({
          fromDate: fromDate,
          toDate: toDate,
          branch: branch,
          paymentStatus: paymentStatus,
          status: bookingStatus,
          page: page,
          size: 10,
        });

        // Get the access token
        const accessToken = getFromLocalStorage(authKey);
        // Set the headers
        const headers = {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        };

        const response = await fetch(
          `http://localhost:8000/api/order?${queryParams.toString()}`,
          {
            method: "GET",
            headers: headers,
          }
        );

        if (!response.ok) {
          throw new Error("Network Error");
        }

        const data = await response.json();
        setData(data);

        setAllBookings(
          data?.orders?.filter((booking) => booking?.status === "Approved")
        );
        const totalPageCount = Math.ceil(data?.bookingsTotalCount / 10);
        setPageCount(totalPageCount);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  // Get All Branch
  useEffect(() => {
    fetch(`https://api.psh.com.bd/api/branch`)
      .then((res) => res.json())
      .then((data) => setAllBranch(data));
  }, []);

  // Get All Status Bookings

  const handleBranch = (e) => {
    setBranch(e.target.value);
  };

  const handlePaymentStatus = (e) => {
    setPaymentStatus(e.target.value);
  };

  const handleBookingStatus = (e) => {
    setBookingStatus(e.target.value);
  };

  // const handleSearch = async () => {
  //   setStatus(bookingStatus);
  //   const withIdBooking = data?.find(
  //     (booking) => booking?._id?.slice(-5) === bookingId.toLowerCase()
  //   );
  //   const withUserIdBooking = data?.filter(
  //     (booking) => booking?.userId?.slice(-5) === userId.toLowerCase()
  //   );

  //   if (bookingId.toLowerCase() && !withIdBooking) {
  //     return toast.error("Sorry! Wrong Id ");
  //   }

  //   setIsLoading(true);
  //   setIsFilter(true);
  //   const orderId = withIdBooking?._id ? withIdBooking?._id : "All";
  //   const bookingUserId = withUserIdBooking[0]?.userId
  //     ? withUserIdBooking[0]?.userId
  //     : "All";

  //   try {
  //     const response = await axios.get(`https://api.psh.com.bd/api/order`, {
  //       params: {
  //         orderId: orderId,
  //         userId: bookingUserId,
  //         fromDate: fromDate,
  //         toDate: toDate,
  //         branch: branch,
  //         paymentStatus: paymentStatus,
  //         status: bookingStatus,
  //         page: page,
  //         size: 10,
  //       },
  //     });

  //     if (response.status !== 200) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = response.data;
  //     setFilterData(data?.orders);
  //     console.log(data);
  //     const totalPageCount = Math.ceil(data?.bookingsTotalCount / 10);
  //     setPageCount2(totalPageCount);
  //   } catch (error) {
  //     setError(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="wrapper">
      <div>
        <div className="wrapper">
          {/* Content Wrapper. Contains page content */}

          <div className="content-wrapper h-0" style={{ background: "unset" }}>
            <h4 className="customize mx-lg-5 mb-3">Booking Deatails</h4>
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
            <div className="d-lg-flex justify-content-end gap-4 ">
              <div className="">
                <label htmlFor="">From Date </label>
                <br />
                <div>
                  <input
                    type="date"
                    onChange={(e) => setFromDate(e.target.value)}
                    name=""
                    id=""
                  />
                </div>
              </div>
              <div className="">
                <label htmlFor="">To Date </label> <br />
                <div>
                  <input
                    type="date"
                    name=""
                    id=""
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="">Branch </label> <br />
                <select
                  className="rounded"
                  style={{ height: "30px" }}
                  onChange={handleBranch}
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
                  onChange={handlePaymentStatus}
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
                  onChange={handleBookingStatus}
                >
                  <option>All</option>

                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Canceled</option>
                  <option>Processing</option>
                </select>
              </div>
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
                    pageCount={pageCount}
                    setPage={setPage}
                    isLoading={isLoading}
                    transactions={transactions}
                    refetch={refetch}
                    extraCharge={extraCharge}
                  />
                </div>
              </div>
            ) : (
              <p className="text-center text-danger fw-bold">
                Find Bookings... <Spinner size="sm" animation="grow" />
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewOrders;
