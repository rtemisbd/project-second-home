

const ViewTransactionModal = ({ data }) => {


  const formattedDate = new Date(data?.createdAt).toLocaleString();

  // Find Total Receive Amount
  // const findTotalReceive = totalReceiveAmount.find(
  //   (receive) => receive._id === data?._id
  // );

  return (
    <div className="">
      <div
        className="modal fade "
        id={`details${data._id}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" style={{ maxWidth: "1000px" }}>
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
                style={{ backgroundColor: "#00bbb4", color: "White" }}
              >
                Customer Details
              </h3>

              <div className="row px-5">
                <div className="col-lg-3">
                  <label htmlFor="" className="fw-medium">
                    Customer Name
                  </label>
                  <p>{data?.userInfo?.firstName}</p>
                </div>
                <div className="col-lg-4">
                  <label htmlFor="" className="fw-medium">
                    Customer Email
                  </label>
                  <p>{data?.userInfo?.email}</p>
                </div>
                <div className="col-lg-3">
                  <label htmlFor="" className="fw-medium">
                    Phone Number
                  </label>
                  <p>{data?.userInfo?.phone}</p>
                </div>
                <div className="col-lg-2">
                  <label htmlFor="" className="fw-medium">
                    Branch
                  </label>
                  <p>{data?.branchDetails?.name}</p>
                </div>
              </div>
              {/* Room Details */}

              <h3
                className=" fs-4 mt-3 ps-3 rounded"
                style={{ backgroundColor: "#00bbb4", color: "White" }}
              >
                Payment Details
              </h3>

              <div className="row px-5">
                <div className="col-lg-3">
                  <label htmlFor="" className="fw-medium">
                    Payment Date & Time
                  </label>
                  <p>{formattedDate}</p>
                </div>
                {/* <div className="col-lg-3">
                  <label htmlFor="" className="fw-medium">
                    Payment Status
                  </label>
                  <p
                    className="fw-bold"
                    style={{
                      color:
                        findBookig?.paymentStatus === "Paid" ? "green" : "red",
                    }}
                  >
                    {" "}
                    {findBookig?.paymentStatus}
                  </p>
                </div> */}

                {/* <div className="col-lg-3">
                  {" "}
                  <label htmlFor="" className="fw-medium">
                    Total Amount
                  </label>
                  <p>Tk {data?.totalAmount}</p>
                </div> */}
                <div className="col-lg-3">
                  {" "}
                  <label htmlFor="" className="fw-medium">
                    Received Amount
                  </label>
                  <p>Tk {data?.receivedTk?.toLocaleString()}</p>
                </div>
                {/* <div className="col-lg-3">
                  {" "}
                  <label htmlFor="" className="fw-medium">
                    Total Receive Amount
                  </label>
                  <p>Tk {data?.totalReceive}</p>
                </div> */}

                {/* <div className="col-lg-3">
                  <label htmlFor="" className="fw-medium">
                    Due Amount
                  </label>
            
                </div> */}
                <div className="col-lg-3">
                  {" "}
                  <label htmlFor="" className="fw-medium">
                    Payment info
                  </label>
                  <div>
                    {data?.paymentType === "bkash" ||
                    data?.paymentType === "nagad" ? (
                      <span className="fw-bold">
                        {" "}
                        {data?.paymentType}, {data?.paymentNumber}, Trx :{" "}
                        {data?.transactionId}
                      </span>
                    ) : (
                      data?.paymentType
                    )}
                    {data?.paymentType === "bank" ? (
                      <span>
                        {" "}
                        {data?.paymentType}, {data?.bankName},
                        {data?.bankHoldingName}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTransactionModal;
