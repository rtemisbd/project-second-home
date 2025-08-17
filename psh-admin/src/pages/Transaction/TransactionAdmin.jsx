import React, { useContext, useEffect, useRef, useState } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useQuery } from "react-query";
import ReactToPrint from "react-to-print";
import { Spinner, Table } from "react-bootstrap";
import TransactionPrint from "./TransactionPrint";
import { AuthContext } from "../../contexts/UserProvider";
import img from "../../img/new/style.png";
import LoadingState from "../LoadingState/LoadingState";
import { useDispatch, useSelector } from "react-redux";
import { placeLoadingShow } from "../../redux/reducers/loadingStateSlice";
import ExportToExcel from "./ExportToExcel";
import { getFromLocalStorage } from "../../utils/local-storage";
import { authKey } from "../../utils/storageKey";
import useBranch from "../../hooks/useBranch";
import { baseUrl } from "../../utils/getBaseURL";
import { MdRefresh } from "react-icons/md";
import Pagination from "../../components/Pagination/Pagination";

const TransactionAdmin = () => {
  const ref = useRef();
  const { user } = useContext(AuthContext);

  const dispatch = useDispatch();
  const handleClose = () => dispatch(placeLoadingShow(false));
  const { page, size } = useSelector((state) => state.pagination);

  const MySwal = withReactContent(Swal);
  const [isFilter, setIsFilter] = useState(false);
  // filter fields
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [branch, setBranch] = useState("All");
  const [status, setStatus] = useState("All");
  const [paymentType, setPaymentType] = useState("All");
  const [phone, setPhone] = useState("");
  const [bookingId, setBookingId] = useState("");

  const [data, setData] = useState([]);
  const [totalReceviedAmount, setTotalReceivedAmount] = useState(0);

  const [totalDataCount, setTotalDataCount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [findingStatement, setFindingStatement] = useState(true);
  // const [hasTimeoutRun, setHasTimeoutRun] = useState(false);

  // Get All Branch
  const { allBranch, refetch: refetchBranches } = useBranch();

  // Get All Transactions
  const { refetch } = useQuery(
    [
      data,
      page,
      fromDate,
      toDate,
      branch,
      paymentType,
      phone,
      bookingId,
      status,
    ],
    async () => {
      try {
        const queryParams = new URLSearchParams({
          page,
          size,
          fromDate,
          toDate,
          branch,
          paymentType,
          phone,
          bookingId,
          status,
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
        setTotalDataCount(data?.data?.totalCount);
        setTotalReceivedAmount(data?.data?.totalReceivedAmount);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  // }

  const handleBranch = (e) => {
    setBranch(e.target.value);
  };
  const handlePaymentType = (e) => {
    setPaymentType(e.target.value);
  };
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };
  const handlePhone = (e) => {
    const value = e.target.value;
    setPhone(value);
  };

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
    setBookingId("");
    document.getElementById("bookingId").value = "";
    setPhone("");
    document.getElementById("phoneId").value = "";
  };

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
                        {data?.length > 0
                          ? totalReceviedAmount?.toLocaleString()
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
                  <label htmlFor="">Status </label> <br />
                  <select
                    className="rounded"
                    style={{ height: "30px", width: "100px" }}
                    onChange={handleStatus}
                    id="statusId"
                    value={status}
                  >
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
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

                <div>
                  <label htmlFor=""> Phone </label>
                  <br />
                  <input
                    type="number"
                    name="phone"
                    id="phoneId"
                    onChange={handlePhone}
                    placeholder="Enter phone number"
                    className="rounded"
                    value={phone}
                    disabled={phone.length >= 11}
                  />
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

              <div className="d-flex gap-2 justify-content-end justify-items-center mt-3">
                {data.length > 0 ? (
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
                        <ExportToExcel data={data} />
                      ) : (
                        <ExportToExcel data={data} />
                      )}
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              <hr style={{ height: "1px", background: "rgb(191 173 173)" }} />
            </div>
            {/* /.row (main row) */}
            {isLoading ? (
              <p
                style={{ margin: "150px 0" }}
                className="text-center text-danger fw-bold"
              >
                Please Wait... <Spinner size="sm" animation="grow" />
              </p>
            ) : data?.length > 0 ? (
              <div className="card">
                <div ref={ref} className="card-body card_body_sm">
                  <Table striped bordered>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Booking Id</th>
                        <th>Branch</th>
                        <th>Full Name</th>
                        <th>Phone</th>
                        <th>Receive Amount</th>
                        <th>Payment Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.length ? (
                        data.map((transaction) => (
                          <TransactionPrint
                            transaction={transaction}
                            refetch={refetch}
                            key={transaction?._id}
                          />
                        ))
                      ) : (
                        <p></p>
                      )}
                    </tbody>
                  </Table>
                </div>
              </div>
            ) : findingStatement ? (
              <p className="text-center text-danger fw-bold">
                Finding Transactions... <Spinner size="sm" animation="grow" />
              </p>
            ) : (
              <p className="text-center text-danger fw-bold">No Data Found</p>
            )}
          </section>
          {/* pagination */}
          <Pagination totalDataCount={totalDataCount} />
        </div>
      </div>
    </>
  );
};

export default TransactionAdmin;
