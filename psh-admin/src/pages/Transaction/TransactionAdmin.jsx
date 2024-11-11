import React, { useContext, useEffect, useRef, useState } from "react";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";

import { useQuery } from "react-query";

import { toast } from "react-toastify";

import ViewTransactionModal from "./ViewTransactionModal";
import UpdateTransaction from "./UpdateTransaction";
import useBooking from "../../hooks/useBooking";

import ReactToPrint from "react-to-print";
import { Spinner, Table } from "react-bootstrap";
import TransactionPrint from "./TransactionPrint";
import { AuthContext } from "../../contexts/UserProvider";
import img from "../../img/new/style.png";
import TransactionStatusUpdate from "./TransactionStatusUpdate";
import axios from "axios";
import LoadingState from "../LoadingState/LoadingState";
import { useDispatch } from "react-redux";
import { placeLoadingShow } from "../../redux/reducers/loadingStateSlice";
import ExportToExcel from "./ExportToExcel";
import { formatDate } from "../../utils/dateConvert";
import { getFromLocalStorage } from "../../utils/local-storage";
import { authKey } from "../../utils/storageKey";
import useBranch from "../../hooks/useBranch";
import { baseUrl } from "../../utils/getBaseURL";
import { MdRefresh } from "react-icons/md";

const TransactionAdmin = () => {
  const ref = useRef();
  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);

  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(placeLoadingShow(false));
  const MySwal = withReactContent(Swal);
  const [bookings] = useBooking();
  const [isLoading, setIsLoading] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [error, setError] = useState(null);
  let orderId = "All";
  let bookingUserId = "All";
  // filter fields
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [branch, setBranch] = useState("All");
  const [paymentType, setPaymentType] = useState("All");
  const [userId, setUserId] = useState("");
  const [bookingId, setBookingId] = useState("");

  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [userAllBooking, setUserAllBooking] = useState([]);

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [pageSizeOptions, setPageSizeOptions] = useState([10]);

  // Page range calculation
  const MAX_PAGE_BUTTONS = 5;
  const startPage = Math.max(1, page - Math.floor(MAX_PAGE_BUTTONS / 2));
  const endPage = Math.min(startPage + MAX_PAGE_BUTTONS - 1, pageCount);

  const visiblePageNumbers = [...Array(endPage - startPage + 1).keys()]?.map(
    (i) => startPage + i
  );

  // Update the `size` and reset to page 1
  const handlePageSizeChange = (e) => {
    setSize(Number(e.target.value));
  };

  // Get All Branch
  const { allBranch, refetch: refetchBranches } = useBranch();

  // Get All Transactions
  const { refetch } = useQuery(
    [data, page, fromDate, toDate, branch, paymentType, userId, bookingId],
    async () => {
      try {
        const queryParams = new URLSearchParams({
          page,
          size,
          fromDate,
          toDate,
          branch,
          paymentType,
          userId,
          bookingId,
        });
        // Get the access token
        const accessToken = getFromLocalStorage(authKey);

        // Set the headers
        const headers = {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        };

        const response = await fetch(
          `${baseUrl}/api/transaction?${queryParams.toString()}`,
          {
            method: "GET",
            headers: headers,
          }
        );

        if (!response.ok) {
          throw new Error("Network Error");
        }

        const data = await response.json();

        setData(data?.data?.transactions);

        // dynamic page size
        const totalPageCount = Math.ceil(data?.data?.totalCount / size);
        setPageCount(totalPageCount);
        const totalCount = data?.data?.totalCount;
        if (totalCount) {
          const dynamicPageSizes = [];
          for (let i = 10; i <= totalCount; i += 10) {
            dynamicPageSizes.push(i);
          }
          if (!dynamicPageSizes.includes(totalCount)) {
            dynamicPageSizes.push(totalCount); // Add totalCount as the largest option
          }
          setPageSizeOptions(dynamicPageSizes);
        }
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  // Find User Booking By Filtering
  let totalBookingAmount = 0;

  if (isFilter) {
    const filterBookings = bookings?.filter((booking) =>
      filterData?.map((data) => data?.orderId).includes(booking?._id)
    );

    for (const item of filterBookings.filter(
      (booking) => booking && booking.status === "Approved"
    )) {
      totalBookingAmount += item.payableAmount;
    }
  } else {
    for (const item of bookings?.filter(
      (booking) => booking && booking.status === "Approved"
    )) {
      totalBookingAmount += item.payableAmount;
    }
  }

  let mytotalReceiveTk = 0;

  for (const item of isFilter ? filterData : data) {
    mytotalReceiveTk += item.receivedTk;
  }

  const handleBranch = (e) => {
    setBranch(e.target.value);
  };
  const handlePaymentType = (e) => {
    setPaymentType(e.target.value);
  };

  // const handleSearch = async () => {
  //   const withIdBooking = bookings?.find(
  //     (data) => data?._id?.slice(-5) === bookingId
  //   );
  //   const withUserIdBooking = bookings?.filter(
  //     (data) => data?.userId?.slice(-5) === userId
  //   );

  //   if (bookingId && !withIdBooking) {
  //     return toast.error("Sorry! Wrong Id ");
  //   }
  //   // if (userId && !withUserIdBooking) {
  //   //   return toast.error("Sorry! Wrong Id ");
  //   // }

  //   setIsLoading(true);
  //   setIsFilter(true);
  //   orderId = withIdBooking?._id ? withIdBooking?._id : "All";
  //   bookingUserId = withUserIdBooking[0]?.userId
  //     ? withUserIdBooking[0]?.userId
  //     : "All";

  //   try {
  //     // Get the access token
  //     const accessToken = getFromLocalStorage(authKey);

  //     // Set the headers
  //     const headers = {
  //       Authorization: `${accessToken}`,
  //       "Content-Type": "application/json",
  //     };

  //     // Make the Axios GET request
  //     const response = await axios.get(`${baseUrl}/api/transaction`, {
  //       params: {
  //         orderId: orderId,
  //         userId: bookingUserId,
  //         fromDate: fromDate,
  //         toDate: toDate,
  //         branch: branch,
  //         paymentType: payementType,
  //         transactionId: transactionId,
  //       },
  //       headers: headers,
  //     });

  //     if (!response.status === 200) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = response.data;
  //     setFilterData(data?.data?.transactions);
  //   } catch (error) {
  //     setError(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Re-fetch data whenever size changes
  useEffect(() => {
    refetch();
  }, [size, refetch, branch]);

  const handleRefreshQuery = () => {
    setFromDate("");
    document.getElementById("fromDateId").value = "";
    setToDate("");
    document.getElementById("toDateId").value = "";
    setBranch("All");
    document.getElementById("branchId").value = "All";
    setPaymentType("");
    document.getElementById("paymentTypeId").value = "";
    setUserId("");
    document.getElementById("userId").value = "";
  };

  const columns = [
    {
      text: "Date",
      formatter: (cellContent, row, index) => {
        // const formattedDate = new Date(row?.paymentDate)
        //   .toISOString()
        //   .split("T")[0];
        // const formattedTime = new Date(row?.createdAt)
        //   ?.toLocaleString()
        //   ?.split(",")[1];

        return (
          <>
            {" "}
            <p style={{ width: "140px" }}>{formatDate(row?.paymentDate)}</p>
            {/* <p>{formattedTime}</p> */}
          </>
        );
      },
    },

    {
      text: "Booking Id",
      formatter: (cellContent, row, index) => {
        return (
          <>
            <p> #{row?.orderId.slice(-5)}</p>
          </>
        );
      },
    },
    {
      text: "Branch",
      formatter: (cellContent, row, index) => {
        return <p>{row?.branch?.name}</p>;
      },
    },
    {
      dataField: `userName`,
      text: "Full Name",
    },
    // {
    //   dataField: `userEmail`,
    //   text: "Email",
    // },
    {
      text: "User Id",
      formatter: (cellContent, row, index) => {
        return (
          <>
            <p> #{row?.userId?.slice(-5)}</p>
          </>
        );
      },
    },
    {
      dataField: `userPhone`,
      text: "Phone",
    },

    {
      text: "Receive Amount",
      formatter: (cellContent, row, index) => {
        return (
          <span className=" fw-bold" style={{ color: "green" }}>
            {" "}
            Tk {row?.receivedTk?.toLocaleString()}
          </span>
        );
      },
    },

    {
      text: "Payment info",
      formatter: (cellContent, row) => {
        return (
          <>
            <div>
              {row?.paymentType === "bkash" || row?.paymentType === "nagad" ? (
                <span className="fw-bold">
                  {" "}
                  {row?.paymentType}, {row?.paymentNumber}, Trx :{" "}
                  {row?.transactionId}
                </span>
              ) : (
                row?.paymentType
              )}
              {row?.paymentType === "bank" ? (
                <span>
                  {" "}
                  {row?.paymentType}, {row?.bankName},{row?.bankHoldingName}
                </span>
              ) : (
                ""
              )}
            </div>
          </>
        );
      },
    },
    {
      text: "Status",
      formatter: (cellContent, row) => {
        return (
          <>
            <div className="d-flex justify-content-center gap-3">
              <p
                style={{
                  color:
                    row?.acceptableStatus === "Accepted" ? "#35b0a7" : "red",
                  fontWeight: 700,
                }}
              >
                {row?.acceptableStatus}
              </p>
              {user?.role === "SuperAdmin" || user?.role === "subAdmin1" ? (
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target={`#transactionStatus${row._id}`}
                  className="d-flex bg-white mt-2"
                >
                  <BiSolidEdit style={{ width: "30px", height: "30px" }} />
                </button>
              ) : (
                ""
              )}
            </div>
            <div>
              <TransactionStatusUpdate
                data={row}
                refetch={refetch}
                handleClose={handleClose}
              />
            </div>
          </>
        );
      },
    },
    {
      text: "Action",
      formatter: (cellContent, row) => {
        return (
          <>
            <div className="d-flex justify-content-center gap-3">
              {user?.role === "SuperAdmin" ? (
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target={`#transaction${row._id}`}
                  className="d-flex bg-white mt-2"
                >
                  <BiSolidEdit style={{ width: "30px", height: "30px" }} />
                </button>
              ) : (
                ""
              )}

              <button
                type="button"
                className="bg-white"
                data-bs-toggle="modal"
                data-bs-target={`#details${row._id}`}
              >
                <span>
                  <AiOutlineEye style={{ width: "30px", height: "30px" }} />
                </span>
              </button>

              {user?.role === "SuperAdmin" ? (
                <div>
                  <AiOutlineDelete
                    onClick={() => handleDelete(row._id)}
                    style={{
                      width: "30px",
                      height: "30px",
                      marginTop: "10px",
                      cursor: "pointer",
                    }}
                  />
                </div>
              ) : (
                ""
              )}
            </div>

            <UpdateTransaction
              data={row}
              refetch={refetch}
              transactions={data}
              bookings={bookings}
              setUserAllBooking={setUserAllBooking}
            />
            {/* Modal Transaction Details */}
            <ViewTransactionModal
              data={row}
              bookings={bookings}
              userAllBooking={userAllBooking}
            />
          </>
        );
      },
    },
  ];

  //delete
  const [products, setProducts] = useState(data);
  const handleDelete = async (id) => {
    const confirmation = window.confirm("Are you Sure?");
    if (confirmation) {
      const url = `${baseUrl}/api/transaction/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          MySwal.fire("Good job!", "successfully deleted", "success");
          refetch();
          if (data.deletedCount === 1) {
            const remainItem = products.filter((item) => item._id !== id);
            setProducts(remainItem);
          }
        });
    }
  };

  return (
    <>
      <div className="wrapper">
        <LoadingState handleClose={handleClose} />
        <div className="wrapper">
          <div className="content-wrapper h-0 " style={{ background: "unset" }}>
            <h4 className="customize mx-lg-5 mb-3">Transactions</h4>
            <div className="row customize mx-5">
              <div className="col-md-4">
                <div className="card_3_transaction">
                  <div className="d-flex p-3">
                    <div className="d-flex justify-content-center align-items-center">
                      <img src={img} alt="" className="img3" />
                    </div>
                    <div className="ms-3 text-white">
                      <p>Total Cash Amount</p>
                      <p className="fw-bold">
                        Tk{" "}
                        {data?.length > 0 || filterData.length > 0
                          ? mytotalReceiveTk?.toLocaleString()
                          : 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-wrapper mt-3 " style={{ background: "unset" }}>
          <section className="content customize_list ">
            <div className="mx-4">
              {/* search bar */}
              <div className=" d-lg-flex justify-content-end gap-3 ">
                <div className="">
                  <label htmlFor="">From Date </label>
                  <br />
                  <div>
                    <input
                      type="date"
                      className="rounded"
                      onChange={(e) => setFromDate(e.target.value)}
                      name=""
                      id="fromDateId"
                      value={fromDate}
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
                      className="rounded"
                      onChange={(e) => setToDate(e.target.value)}
                      value={toDate}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="">Branch </label> <br />
                  <select
                    className="rounded"
                    style={{ height: "30px" }}
                    onChange={handleBranch}
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
                  <label htmlFor="">Payment Type </label> <br />
                  <select
                    className="rounded"
                    style={{ height: "30px", width: "100px" }}
                    onChange={handlePaymentType}
                    id="paymentTypeId"
                    value={paymentType}
                  >
                    <option value="All">All</option>
                    <option value="bkash">Bkash</option>
                    <option value="nagad">Nagad</option>
                    <option value="dutch">dutch-bangla</option>
                    <option value="cash">Cash</option>
                    <option value="bank">Bank</option>
                  </select>
                </div>

                {/* <datalist id="transactionId">
                      {bookings?.map((booking) => {
                        return (
                          <option key={booking._id}>
                            {booking?.userId?.slice(-5)}
                          </option>
                        );
                      })}
                    </datalist> */}

                <div>
                  <label htmlFor="">User Id </label> <br />
                  <input
                    type="text"
                    list="userId"
                    placeholder="Type User Id"
                    name="userId"
                    id="userId"
                    className="rounded"
                    onChange={(e) => setUserId(e.target.value)}
                    style={{
                      width: "160px",
                    }}
                  />
                  {/* <datalist id="userId">
                      {bookings?.map((booking) => {
                        return (
                          <option key={booking._id}>
                            {booking?.userId?.slice(-5)}
                          </option>
                        );
                      })}
                    </datalist> */}
                </div>

                <div className=" ">
                  <label htmlFor="">Booking Id </label> <br />
                  <input
                    type="text"
                    list="bookingId"
                    name="bookingId"
                    id="bookingId"
                    className="rounded"
                    placeholder="Type Booking Id"
                    onChange={(e) => setBookingId(e.target.value)}
                    style={{
                      width: "160px",
                    }}
                  />
                  {/* <datalist id="bookingId">
                      {bookings?.map((booking) => {
                        return (
                          <option key={booking._id} style={{ display: "none" }}>
                            {booking?._id?.slice(-5)}
                          </option>
                        );
                      })}
                    </datalist> */}
                  {/* <button
                    onClick={handleSearch}
                    className="btn text-white"
                    style={{
                      backgroundColor: "#35b0a7",
                      height: "35px",
                      padding: "0 10px",
                    }}
                  >
                    Search
                  </button> */}
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

              {isLoading ? (
                <p
                  style={{ margin: "150px 0" }}
                  className="text-center text-danger fw-bold"
                >
                  Please Wait...
                  <Spinner size="sm" animation="grow" />
                </p>
              ) : (
                <>
                  <div className="d-flex gap-2 justify-content-end justify-items-center mt-3">
                    {data.length > 0 || filterData.length > 0 ? (
                      <>
                        <div className="">
                          <ReactToPrint
                            trigger={() => (
                              <button
                                className=" px-3 rounded text-white font-medium"
                                style={{ backgroundColor: "#35b0a7" }}
                              >
                                Print
                              </button>
                            )}
                            content={() => ref.current}
                          />
                        </div>
                        <div>
                          {isFilter ? (
                            <ExportToExcel data={filterData} />
                          ) : (
                            <ExportToExcel data={data} />
                          )}
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <hr
                    style={{ height: "1px", background: "rgb(191 173 173)" }}
                  />
                </>
              )}
              {/* /.row (main row) */}
            </div>
            <div>
              <div ref={ref}>
                <Table striped bordered responsive>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Booking Id</th>
                      <th>Branch</th>
                      <th>Full Name</th>
                      <th>User Id</th>
                      <th>Phone</th>
                      <th>Receive Amount</th>
                      <th>Payment Type</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isFilter
                      ? filterData.map((transaction) => (
                          <TransactionPrint
                            transaction={transaction}
                            key={transaction?._id}
                          />
                        ))
                      : data.map((transaction) => (
                          <TransactionPrint
                            transaction={transaction}
                            key={transaction?._id}
                          />
                        ))}
                  </tbody>
                </Table>
                {/* <div
                  className="d-flex justify-content-end "
                  style={{ marginRight: "280px" }}
                >
                  <p style={{ color: "green" }} className="fw-bold">
                    {" "}
                    Total Cash ={" "}
                    {data?.length > 0 || filterData?.length > 0
                      ? mytotalReceiveTk?.toLocaleString()
                      : 0}{" "}
                    Tk
                  </p>
                </div> */}
              </div>
            </div>
          </section>
          {/* pagination */}
          <div className="pagination d-flex justify-content-end align-items-center gap-0">
            <label id="size" className="mt-2">
              Show row
            </label>
            <select
              id="size"
              value={size}
              onChange={handlePageSizeChange}
              className="btn border mx-2"
            >
              {pageSizeOptions?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="pagination-button"
            >
              First
            </button>
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="pagination-button"
            >
              Previous
            </button>
            {visiblePageNumbers?.map((number) => (
              <button
                key={number}
                onClick={() => setPage(number)}
                className={
                  page === number
                    ? "page-selected pagination-button"
                    : "pagination-button"
                }
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === pageCount || pageCount === 0}
              className="pagination-button"
            >
              Next
            </button>
            <button
              onClick={() => setPage(pageCount)}
              disabled={page === pageCount || pageCount === 0}
              className="pagination-button"
            >
              Last
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionAdmin;
