import React, { useContext, useEffect, useRef, useState } from "react";

import { useQuery } from "react-query";

import ReactToPrint from "react-to-print";
import { Spinner, Table } from "react-bootstrap";
import TransactionPrint from "./TransactionPrint";
import { AuthContext } from "../../contexts/UserProvider";
import img from "../../img/new/style.png";
import { useDispatch } from "react-redux";
import { placeLoadingShow } from "../../redux/reducers/loadingStateSlice";
import ExportToExcel from "./ExportToExcel";
import { getFromLocalStorage } from "../../utils/local-storage";
import { authKey } from "../../utils/storageKey";
import useBranch from "../../hooks/useBranch";
import { baseUrl } from "../../utils/getBaseURL";
import ViewTransactionModal from "./ViewTransactionModal";
import UpdateTransaction from "./UpdateTransaction";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import TransactionStatusUpdate from "./TransactionStatusUpdate";
import { formatDate } from "../../utils/dateConvert";

const TransactionAdminDemo = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(placeLoadingShow(false));

  const [transactions, setTransactions] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  const ref = useRef();
  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);
  // get all branches
  const { allBranch, refetch: refetchBranches } = useBranch();

  // get transactions
  const { refetch } = useQuery(["transactions"], async () => {
    try {
      // Get the access token
      const accessToken = getFromLocalStorage(authKey);

      // Set the headers
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(`${baseUrl}/api/transaction`, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Network Error");
      }

      const data = await response.json();

      setTransactions(data?.data);
    } catch (error) {
      // console.error("Error fetching data:", error);
    }
  });
  console.log(transactions);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      <div className="wrapper">
        {/* <LoadingState handleClose={handleClose} /> */}
        <div className="wrapper">
          {/* Content Wrapper. Contains page content */}
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
                        {/* {data?.length > 0 || filtertransactions.length > 0
                          ? mytotalReceiveTk?.toLocaleString()
                          : 0} */}
                      </p>
                    </div>
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
            {/* search fields */}
            <div className=" d-lg-flex gap-4 ">
              <div className="">
                <label htmlFor="">From Date </label>
                <br />
                <div>
                  <input
                    type="date"
                    ref={fromDateRef}
                    onChange={(e) => setFromDate(e.target.value)}
                    name=""
                    id=""
                    onClick={() => fromDateRef.current?.showPicker()}
                  />
                </div>
              </div>
              <div className="">
                <label htmlFor="">To Date </label> <br />
                <div>
                  <input
                    type="date"
                    ref={toDateRef}
                    name=""
                    id=""
                    onChange={(e) => setToDate(e.target.value)}
                    onClick={() => toDateRef.current?.showPicker()}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="">Branch </label> <br />
                <select className="rounded" style={{ height: "30px" }}>
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
                <label htmlFor="">Transaction Id </label> <br />
                <input
                  type="text"
                  list="transactionId"
                  placeholder="Type Transaction Id"
                  style={{
                    width: "150px",
                  }}
                />
              </div>

              <div>
                <label htmlFor="">User Id </label> <br />
                <input
                  type="text"
                  list="userId"
                  placeholder="Type User Id"
                  style={{
                    width: "150px",
                  }}
                />
              </div>

              <div className=" ">
                <label htmlFor="">Booking Id </label> <br />
                <input
                  type="text"
                  list="bookingId"
                  placeholder="Type Booking Id"
                  style={{
                    width: "150px",
                  }}
                />
                <button
                  className="btn text-white"
                  style={{
                    backgroundColor: "#35b0a7",
                    height: "35px",
                    padding: "0 10px",
                  }}
                >
                  Search
                </button>
              </div>
            </div>

            {/* data table */}
            <div>
              <div ref={ref}>
                <h4 className="mt-5 mb-4 ">Transaction History</h4>
                <Table striped bordered responsive>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Booking Id</th>
                      <th>Branch</th>
                      <th>Full Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Received Amount</th>
                      <th>Payment Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <TransactionPrint
                        transaction={transaction}
                        key={transaction?._id}
                      />
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TransactionAdminDemo;
