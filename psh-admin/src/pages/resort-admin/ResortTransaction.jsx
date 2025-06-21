import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contexts/UserProvider";
import { useDispatch, useSelector } from "react-redux";
import { placeLoadingShow } from "../../redux/reducers/loadingStateSlice";
import { useQuery } from "react-query";
import { getFromLocalStorage } from "../../utils/local-storage";
import { authKey } from "../../utils/storageKey";
import { baseUrl } from "../../utils/getBaseURL";
import LoadingState from "../LoadingState/LoadingState";
import ReactToPrint from "react-to-print";
import { MdRefresh } from "react-icons/md";
import ExportToExcel from "../Transaction/ExportToExcel";
import { Spinner, Table } from "react-bootstrap";
import img from "../../img/new/style.png";

import axios from "axios";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { formatDate } from "../../utils/dateConvert";
import { BiSolidEdit } from "react-icons/bi";
import Pagination from "../../components/Pagination/Pagination";
import { Toaster } from "react-hot-toast";
import ResortTransactionStatusUpdate from "../../components/resort-admin/payment/ResortTransactionStatusUpdate";

const ResortTransaction = () => {
  const ref = useRef();
  const { resort } = useContext(AuthContext);

  const dispatch = useDispatch();
  const handleClose = () => dispatch(placeLoadingShow(false));
  const { page, size } = useSelector((state) => state.pagination);

  const [isFilter, setIsFilter] = useState(false);
  // filter fields
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("All");
  const [phone, setPhone] = useState("");
  const [bookingId, setBookingId] = useState("");

  const [data, setData] = useState([]);
  const [totalReceivedAmount, setTotalReceivedAmount] = useState(0);

  const [totalDataCount, setTotalDataCount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [findingStatement, setFindingStatement] = useState(true);

  // Get All Transactions
  const { refetch } = useQuery(
    [page, fromDate, toDate, phone, bookingId, status, resort?._id],
    async () => {
      try {
        const queryParams = new URLSearchParams({
          page,
          size,
          fromDate,
          toDate,
          phone,
          bookingId,
          status,
          resortId: resort._id,
        });
        // Get the access token
        const accessToken = getFromLocalStorage(authKey);

        // Set the headers
        const headers = {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        };

        const { data } = await axios.get(
          `${baseUrl}/api/villaTransaction?${queryParams.toString()}`,
          { headers }
        );

        setData(data?.data?.transactions);
        setTotalDataCount(data?.data?.totalCount);
        setTotalReceivedAmount(data?.data?.totalReceivedAmount);
        setFindingStatement(false);
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
  }, [size, refetch, status]);

  const handleRefreshQuery = () => {
    setStatus("All");
    setFromDate("");
    document.getElementById("fromDateId").value = "";
    setToDate("");
    document.getElementById("toDateId").value = "";
    setBookingId("");
    document.getElementById("bookingId").value = "";
    setPhone("");
    document.getElementById("phoneId").value = "";
  };

  return (
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
                        ? totalReceivedAmount?.toLocaleString()
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
                <label htmlFor="">Status </label> <br />
                <select
                  className="rounded"
                  style={{ height: "30px", width: "100px" }}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                  id="statusId"
                  value={status}
                >
                  <option value="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Processing">Processing</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label htmlFor=""> Phone </label>
                <br />
                <input
                  type="number"
                  name="phone"
                  id="phoneId"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
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
                      <th>Full Name</th>
                      <th>Account Number</th>
                      <th>Receive Amount</th>
                      <th>Platform</th>
                      <th>Payment Proof</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.length ? (
                      data.map((transaction) => (
                        <tr style={{ fontSize: "15px", border: "none" }}>
                          <td>{formatDate(transaction?.createdAt)}</td>
                          <td>#{transaction?.bookingId}</td>
                          <td>
                            <p>{transaction?.user?.firstName}</p>
                            <p>{transaction?.user?.phone}</p>
                          </td>
                          <td>{transaction?.senderNumber}</td>
                          <td style={{ color: "#1d6f42", fontWeight: "bold" }}>
                            {" "}
                            Tk {transaction?.receivedAmount}
                          </td>
                          <td className=" fw-bold">
                            {transaction?.paymentPlatform}
                          </td>
                          <td style={{ height: "80px", width: "120px" }}>
                            <a
                              href={transaction.paymentProof}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={transaction.paymentProof}
                                alt=""
                                style={{
                                  height: "80px",
                                  width: "120px",
                                  cursor: "pointer",
                                }}
                              />
                            </a>
                          </td>

                          <td
                            className="d-flex justify-content-center align-items-center gap-2 fw-bold"
                            style={{
                              color:
                                transaction?.paymentStatus === "Approved"
                                  ? "#35b0a7"
                                  : "#FF0000",
                            }}
                          >
                            <p>{transaction?.paymentStatus}</p>

                            <button
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target={`#transactionStatus${transaction._id}`}
                              className="d-flex btn   "
                              // disabled={
                              //   transaction?.paymentStatus === "Approved" &&
                              //   user?.role === "resortAdmin"
                              // }
                              style={{ border: "none" }}
                            >
                              <BiSolidEdit size={26} />
                            </button>

                            <div>
                              <ResortTransactionStatusUpdate
                                data={transaction}
                                refetch={refetch}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="d-flex justify-content-center gap-3">
                              <button
                                type="button"
                                className="btn"
                                data-bs-toggle="modal"
                                data-bs-target={`#details${transaction._id}`}
                              >
                                <span>
                                  <AiOutlineEye
                                    style={{ width: "30px", height: "30px" }}
                                  />
                                </span>
                              </button>
                              <div>
                                <AiOutlineDelete
                                  // onClick={() => handleDelete(transaction._id)}
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    marginTop: "10px",
                                    cursor: "pointer",
                                  }}
                                />
                              </div>
                            </div>

                            {/* Modal Transaction Details */}

                            <div
                              className="modal fade "
                              id={`details${transaction._id}`}
                              data-bs-backdrop="static"
                              data-bs-keyboard="false"
                              tabIndex="-1"
                              aria-labelledby="staticBackdropLabel"
                              aria-hidden="true"
                            >
                              <div
                                className="modal-dialog"
                                style={{ maxWidth: "1000px" }}
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h3>Transaction Details</h3>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body w-100 ">
                                    <h3
                                      className=" fs-4 mt-3 ps-3 rounded"
                                      style={{
                                        backgroundColor: "#00bbb4",
                                        color: "White",
                                      }}
                                    >
                                      Booking Details
                                    </h3>

                                    <div className="row px-5">
                                      <div className="col-lg-3">
                                        <label htmlFor="" className="fw-medium">
                                          Customer Name
                                        </label>
                                        <p>{transaction?.user?.firstName}</p>
                                      </div>

                                      <div className="col-lg-3">
                                        <label htmlFor="" className="fw-medium">
                                          Phone Number
                                        </label>
                                        <p>{transaction?.user?.phone}</p>
                                      </div>
                                      <div className="col-lg-3">
                                        <label htmlFor="" className="fw-medium">
                                          Villa Name
                                        </label>
                                        <p>{transaction?.villa?.title}</p>
                                      </div>
                                      <div className="col-lg-3">
                                        <label htmlFor="" className="fw-medium">
                                          Villa Number
                                        </label>
                                        <p>{transaction?.villa?.villaNumber}</p>
                                      </div>

                                      <div className="col-lg-12">
                                        <label htmlFor="" className="fw-medium">
                                          Booking Date
                                        </label>
                                        <p>
                                          {
                                            transaction?.order?.rentDate
                                              ?.bookStartDate
                                          }{" "}
                                          to{" "}
                                          {
                                            transaction?.order?.rentDate
                                              ?.bookEndDate
                                          }{" "}
                                          (
                                          {
                                            transaction?.order?.rentDate
                                              ?.daysDifference
                                          }{" "}
                                          Nights)
                                        </p>
                                      </div>
                                      <div className="col-lg-3">
                                        <label htmlFor="" className="fw-medium">
                                          Per Night
                                        </label>
                                        <p>TK {transaction?.order?.perNight}</p>
                                      </div>
                                      <div className="col-lg-3">
                                        <label htmlFor="" className="fw-medium">
                                          Total Payable Amount
                                        </label>
                                        <p>
                                          TK {transaction?.order?.payableAmount}
                                        </p>
                                      </div>
                                    </div>
                                    {/* Payment Details */}

                                    <h3
                                      className=" fs-4 mt-3 ps-3 rounded"
                                      style={{
                                        backgroundColor: "#00bbb4",
                                        color: "White",
                                      }}
                                    >
                                      Payment Details
                                    </h3>

                                    <div className="row px-5">
                                      <div className="col-lg-3">
                                        <label htmlFor="" className="fw-medium">
                                          Payment Date & Time
                                        </label>
                                        <p>
                                          {new Date(
                                            transaction?.createdAt
                                          ).toLocaleString()}
                                        </p>
                                      </div>

                                      <div className="col-lg-3">
                                        {" "}
                                        <label htmlFor="" className="fw-medium">
                                          Received Amount
                                        </label>
                                        <p>
                                          Tk{" "}
                                          {transaction?.receivedAmount.toLocaleString()}
                                        </p>
                                      </div>

                                      <div className="col-lg-3">
                                        {" "}
                                        <label htmlFor="" className="fw-medium">
                                          Payment info
                                        </label>
                                        <div>
                                          <span className="fw-bold">
                                            {transaction?.paymentPlatform},{" "}
                                            {transaction?.senderNumber}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
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

        {/* status update modal */}

        <Toaster
          containerStyle={{ top: 300 }}
          toastOptions={{ position: "top-center" }}
        ></Toaster>
      </div>
    </div>
  );
};

export default ResortTransaction;
