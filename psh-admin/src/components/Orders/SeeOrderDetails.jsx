import React, { useEffect, useRef, useState } from "react";

import "./styles/SeeOrderDetails.css";
import { Table } from "react-bootstrap";

import ReactToPrint from "react-to-print";
import Modal from "react-bootstrap/Modal";
import { BlobProvider, View } from "@react-pdf/renderer";
import DownlaodInvoice from "../Invoice/DownlaodInvoice";
import ImageViewer from "./ImageViewer";
import { formatDate } from "../../utils/dateConvert";

const SeeOrderDetails = ({ data, showDetails, setShowDetails }) => {
  const ref = useRef();
  // console.log(data);

  const [discount, setDiscount] = useState(data?.discount || 0);
  const [payableAmount, setPayableAmount] = useState(data?.payableAmount || 0);
  useEffect(() => {
    if (data.adjustments.length) {
      setPayableAmount(
        data.payableAmount - data.adjustments[0]?.totatAdjustmentAmount
      );
    }
  }, [data.adjustments, data.payableAmount, data.totalAmount, discount]);

  const handleClose = () => setShowDetails(false);

  const reversTransaction = data?.transactions?.[0]?.allProperties
    ?.slice()
    .reverse();

  const formattedTime = new Date(data?.createdAt)
    ?.toLocaleString()
    ?.split(",")[1];

  console.log(data);

  return (
    <Modal
      show={showDetails}
      backdrop="static"
      onHide={handleClose}
      // className={styles.modal}
      size="lg"
      // centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Booking Info (
          <span
            className="fw-bold text-right"
            style={{
              color: data.paymentStatus === "Paid" ? "green" : "red",
            }}
          >
            {data.paymentStatus}
          </span>
          )
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          width: "100%",
        }}
      >
        <div>
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
            <div className="col-lg-3">
              <label htmlFor="" className="fw-medium">
                Father Name
              </label>
              <p>{data?.userInfo?.fatherName}</p>
            </div>
            <div className="col-lg-3">
              <label htmlFor="" className="fw-medium">
                Mother Name
              </label>
              <p>{data?.userInfo?.motherName}</p>
            </div>
            <div className="col-lg-3 ">
              {" "}
              <label htmlFor="" className="fw-medium">
                Email
              </label>
              <span className="user_email">{data?.userInfo?.email}</span>
            </div>
            <div className="col-lg-3">
              <label htmlFor="" className="fw-medium">
                Phone Number
              </label>
              <p>{data?.userInfo?.phone}</p>
            </div>
            <div className="col-lg-3">
              <label htmlFor="" className="fw-medium">
                {/* {data?.userInfo?.validityType} */} Identity Number
              </label>
              <p>{data?.userInfo?.validityNumber}</p>
            </div>
            <div className="col-lg-3">
              <label htmlFor="" className="fw-medium">
                Emergency Contact Name :
              </label>
              <p>{data?.userInfo?.emergencyContact?.contactName}</p>
            </div>
            <div className="col-lg-3">
              <label htmlFor="" className="fw-medium">
                Emergency Contact Relationship :
              </label>
              <p>{data?.userInfo?.emergencyContact?.relation}</p>
            </div>
            <div className="col-lg-3">
              <label htmlFor="" className="fw-medium">
                Emergency Contact Number :
              </label>
              <p>{data?.userInfo?.emergencyContact?.contactNumber}</p>
            </div>
            <div className="col-lg-3">
              <label htmlFor="" className="fw-medium">
                National Id
              </label>
              <div
                style={{
                  marginBottom: "100px",
                }}
              >
                <button
                  type="button"
                  className="bg-transparent"
                  data-bs-toggle="modal"
                  data-bs-target={`#image_view${data?._id}`}
                >
                  <img
                    src={`https://api.psh.com.bd/${data?.image}`}
                    alt=""
                    style={{ width: "100px" }}
                  />
                </button>
              </div>
            </div>

            <div className="col-lg-3">
              <label htmlFor="" className="fw-medium">
                Parent National Id
              </label>
              <div>
                <button
                  type="button"
                  className="bg-transparent"
                  data-bs-toggle="modal"
                  data-bs-target={`#image_view${data?._id}`}
                >
                  <img
                    src={`https://api.psh.com.bd/${data?.gardianImg}`}
                    alt=""
                    style={{ width: "100px" }}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Room Details */}
          <h3
            className=" fs-4 mt-3 ps-3 rounded"
            style={{ backgroundColor: "#00bbb4", color: "White" }}
          >
            Room Details
          </h3>
          <div className="row px-5">
            <div className="col-lg-3">
              <label htmlFor="" className="fw-medium">
                Booking Id
              </label>
              <p>#{data?.bookingId}</p>
            </div>
            <div className="col-lg-3">
              {" "}
              <label htmlFor="" className="fw-medium">
                Booking Date & Time
              </label>
              <p>
                {formatDate(data?.createdAt)}
                {formattedTime}
              </p>
            </div>
            <div className="col-lg-3">
              <label htmlFor="" className="fw-medium">
                Branch
              </label>
              <p>{data?.branchDetails?.name}</p>
            </div>
            <div className="col-lg-3">
              {" "}
              <label htmlFor="" className="fw-medium">
                Room Type
              </label>
              <p> {data?.roomType}</p>
            </div>
            {data?.roomType === "Shared Room" ? (
              ""
            ) : (
              <div className="col-lg-3">
                <label htmlFor="" className="fw-medium">
                  Room Title
                </label>
                <p> {data?.room?.name}</p>
              </div>
            )}
            {data?.roomType === "Shared Room" ? (
              <>
                <div className="col-lg-3">
                  {" "}
                  <label htmlFor="" className="fw-medium">
                    Seat Number
                  </label>
                  <p> {data?.seat?.seatNumber} </p>
                </div>
                <div className="col-lg-3">
                  {" "}
                  <label htmlFor="" className="fw-medium">
                    Room Number
                  </label>
                  <p> {data?.room?.roomNumber}</p>
                </div>
              </>
            ) : (
              <div className="col-lg-3">
                {" "}
                <label htmlFor="" className="fw-medium">
                  Room Number
                </label>
                <p> {data?.room?.roomNumber}</p>
              </div>
            )}

            <div className="col-lg-3">
              {" "}
              <label htmlFor="" className="fw-medium">
                Check In{" "}
              </label>
              <p> {formatDate(data?.rentDate?.bookStartDate)}</p>
            </div>
            <div className="col-lg-3">
              {" "}
              <label htmlFor="" className="fw-medium">
                Check Out{" "}
              </label>
              <p> {formatDate(data?.rentDate?.bookEndDate)}</p>
            </div>
            <div className="col-lg-3">
              {" "}
              <label htmlFor="" className="fw-medium">
                {" "}
                Total Duraion{" "}
              </label>
              <p>
                {" "}
                {data?.customerRent?.daysDifference >= 0
                  ? `${data?.customerRent?.daysDifference} days`
                  : "" ||
                    (data?.customerRent?.months &&
                      data?.customerRent?.days >= 0 &&
                      !data?.customerRent?.years)
                  ? `${data?.customerRent?.months} months, ${data?.customerRent?.days} days`
                  : "" ||
                    (data?.customerRent?.years &&
                      data?.customerRent?.months >= 0 &&
                      data?.customerRent?.days >= 0)
                  ? `${data?.customerRent?.years} year`
                  : ""}
              </p>
            </div>

            <div className="col-lg-3">
              {" "}
              <label htmlFor="" className="fw-medium">
                Future Extend{" "}
              </label>
              <p> {data?.bookingExtend === true ? "Yes" : "No"}</p>
            </div>
            <div className="col-lg-3">
              {" "}
              <label htmlFor="" className="fw-medium">
                Food
              </label>
              <p>
                {" "}
                {data?.isIncludeFood === true
                  ? "Yes"
                  : data?.isIncludeFood === false
                  ? "No"
                  : "Yes"}
              </p>
            </div>
          </div>

          <h3
            className=" fs-4 mt-3 ps-3 rounded"
            style={{ backgroundColor: "#00bbb4", color: "White" }}
          >
            Payment Details
          </h3>

          <div className="row px-5">
            <div className="col-lg-3">
              <label htmlFor="" className="fw-medium">
                Payment Status
              </label>
              <p
                className="fw-bold"
                style={{
                  color: data.paymentStatus === "Paid" ? "green" : "red",
                }}
              >
                {data.paymentStatus}
              </p>
            </div>
            <div className="col-lg-3">
              {" "}
              <label htmlFor="" className="fw-medium">
                Total Amount
              </label>
              <p>Tk {data?.totalAmount?.toLocaleString()}</p>
            </div>
            <div className="col-lg-3">
              {" "}
              <label htmlFor="" className="fw-medium">
                Discount
              </label>
              <p>
                Tk{" "}
                {(data?.discount || 0) +
                  (data?.adjustments[0]?.totatAdjustmentAmount || 0)}
              </p>
            </div>
            <div className="col-lg-3">
              {" "}
              <label htmlFor="" className="fw-medium">
                Payable Amount
              </label>
              <p>Tk {payableAmount}</p>
            </div>
            <div className="col-lg-3">
              {" "}
              <label htmlFor="" className="fw-medium">
                Total Payment
              </label>
              <p>
                Tk{" "}
                {data?.transactions[0]?.totalReceiveTk?.toLocaleString() || 0}
                {/* {data?.totalReceiveTk?.toLocaleString()} */}
              </p>
            </div>

            <div className="col-lg-3">
              <label htmlFor="" className="fw-medium">
                Due Amount
              </label>
              <p>
                Tk{" "}
                {/* {payableAmount - (data?.transactions[0]?.totalReceiveTk || 0)} */}
                {data?.dueAmount?.toLocaleString()}
              </p>
            </div>

            <div className="col-lg-3">
              {" "}
              <label htmlFor="" className="fw-medium">
                Minimum Payment
              </label>
              <p>
                Tk{" "}
                {data?.minimumPayment
                  ? data?.minimumPayment?.toLocaleString()
                  : 0}
              </p>
            </div>
            <div className="col-lg-3">
              {" "}
              <label htmlFor="" className="fw-medium">
                Admission Fee
              </label>
              <p>
                Tk{" "}
                {data?.addMissionFee
                  ? data?.addMissionFee?.toLocaleString()
                  : 0}
              </p>
            </div>
            <div className="col-lg-3">
              {" "}
              <label htmlFor="" className="fw-medium">
                Security Fee
              </label>
              <p>
                Tk {data?.securityFee ? data?.securityFee?.toLocaleString() : 0}
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-end ">
            <ReactToPrint
              trigger={() => (
                <button
                  className=" px-3 mr-2 rounded text-white font-medium"
                  style={{ backgroundColor: "#35b0a7" }}
                >
                  Print
                </button>
              )}
              content={() => ref.current}
            />
            <div className="mt-3">
              <View>
                <BlobProvider document={<DownlaodInvoice data={data} />}>
                  {({ url }) => (
                    <a
                      href={url}
                      download="invoice.pdf"
                      style={{
                        backgroundColor: "#399",
                      }}
                      className="  px-3 py-3 rounded text-white font-medium "
                    >
                      Invoice
                    </a>
                  )}
                </BlobProvider>
              </View>
            </div>
          </div>
          <div ref={ref} className="mb-4">
            <h3
              className=" fs-4 mt-3 ps-3 rounded mb-2"
              style={{ backgroundColor: "#00bbb4", color: "White" }}
            >
              Transaction
              {/* <span className="fw-bold"> {data.paymentStatus}</span> */}
            </h3>

            <Table striped responsive bordered>
              <thead>
                <tr>
                  <th>Payment Date</th>

                  <th>Full Name</th>

                  <th>Phone</th>
                  <th>Receive Amount</th>
                  <th>Payment Type</th>
                </tr>
              </thead>
              <tbody>
                {reversTransaction?.map((transaction) => {
                  // Find Total Receive Payment and Due Amount

                  // const transactionDate = new Date(
                  //   transaction?.createdAt
                  // ).toLocaleString();

                  return (
                    <tr key={transaction._id}>
                      <td>{formatDate(transaction?.paymentDate)}</td>

                      <td className="fw-bold">{data?.userInfo?.firstName}</td>

                      <td className="fw-bold">{data?.userInfo?.phone}</td>
                      <td className="fw-bold" style={{ color: "green" }}>
                        Tk {transaction?.receivedTk?.toLocaleString()}
                      </td>
                      <td>
                        {" "}
                        {transaction?.paymentType === "bkash" ||
                        transaction?.paymentType === "nagad" ? (
                          <span>
                            {" "}
                            {transaction?.paymentType} :{" "}
                            {transaction?.paymentNumber}, Trx :{" "}
                            {transaction?.transactionId}
                          </span>
                        ) : (
                          transaction?.paymentType
                        )}
                        {transaction?.paymentType === "bank" ? (
                          <span>
                            {" "}
                            {transaction?.paymentType}, {transaction?.bankName},
                            {transaction?.bankHoldingName}
                          </span>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div className=" d-flex justify-content-end gap-5 ">
              <div className="d-flex">
                <label htmlFor="">Total Amount </label>
                <p> = Tk {payableAmount}</p>
              </div>
              <div className="d-flex">
                <label htmlFor=""> Total Receive </label>
                <p>
                  {" "}
                  = Tk{" "}
                  {data?.transactions[0]?.totalReceiveTk?.toLocaleString() || 0}
                </p>
              </div>
              <div className="d-flex">
                <label htmlFor="">Due Amount </label>
                <p className="text-danger fw-bold">
                  = Tk{" "}
                  {payableAmount - (data?.transactions[0]?.totalReceiveTk || 0)}
                </p>
              </div>
            </div>
          </div>
          {data?.isCancel === "Yes" ? (
            <div>
              <h3
                className=" fs-5 mt-3 ps-3 rounded mb-2"
                style={{ backgroundColor: "red", color: "White" }}
              >
                Customer Cancel Request
              </h3>
              <div className="row px-5">
                <div className="col-lg-3">
                  <label htmlFor="" className="fw-medium">
                    Cancel Reason
                  </label>
                  <p className="fw-bold">{data.userCancel?.cancelReason}</p>
                </div>
                <div className="col-lg-3">
                  <label htmlFor="" className="fw-medium">
                    Cancel Type
                  </label>
                  <p className="fw-bold">{data.userCancel?.cancelType}</p>
                </div>
                {data.userCancel?.cancelDate ? (
                  <div className="col-lg-3">
                    <label htmlFor="" className="fw-medium">
                      Cancel Date
                    </label>
                    <p className="fw-bold">
                      {data.userCancel?.cancelDate?.split("T")[0]}
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <ImageViewer data={data} />
      </Modal.Body>
    </Modal>
  );
};

export default SeeOrderDetails;
