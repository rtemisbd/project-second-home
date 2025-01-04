import React, { useRef } from "react";

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

  const handleClose = () => setShowDetails(false);

  const reversTransaction = data?.transactions?.[0]?.allProperties
    ?.slice()
    .reverse();

  const formattedTime = new Date(data?.createdAt)
    ?.toLocaleString()
    ?.split(",")[1];

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
              <p>{data?.fullName}</p>
            </div>
            <div className="col-lg-3">
              <label htmlFor="" className="fw-medium">
                Father Name
              </label>
              <p>{data?.fatherName}</p>
            </div>
            <div className="col-lg-3">
              <label htmlFor="" className="fw-medium">
                Mother Name
              </label>
              <p>{data?.motherName}</p>
            </div>
            <div className="col-lg-3 ">
              {" "}
              <label htmlFor="" className="fw-medium">
                Email
              </label>
              <span className="user_email">{data?.email}</span>
            </div>
            <div className="col-lg-3">
              <label htmlFor="" className="fw-medium">
                Phone Number
              </label>
              <p>{data?.phone}</p>
            </div>
            <div className="col-lg-3">
              <label htmlFor="" className="fw-medium">
                {/* {data?.validityType} */} Identity Number
              </label>
              <p>{data?.validityNumber}</p>
            </div>
            <div className="col-lg-3">
              <label htmlFor="" className="fw-medium">
                Emergency Contact Name :
              </label>
              <p>{data?.emergencyContactName}</p>
            </div>
            <div className="col-lg-3">
              <label htmlFor="" className="fw-medium">
                Emergency Contact Relationship :
              </label>
              <p>{data?.emergencyRelationC}</p>
            </div>
            <div className="col-lg-3">
              <label htmlFor="" className="fw-medium">
                Emergency Contact Number :
              </label>
              <p>{data?.emergencyContact}</p>
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
              <p>{data?.bookingInfo?.branch?.name}</p>
            </div>
            <div className="col-lg-3">
              {" "}
              <label htmlFor="" className="fw-medium">
                Room Type
              </label>
              <p> {data?.bookingInfo?.roomType}</p>
            </div>
            {data?.bookingInfo?.roomType === "Shared Room" ? (
              ""
            ) : (
              <div className="col-lg-3">
                <label htmlFor="" className="fw-medium">
                  Room Title
                </label>
                <p> {data?.bookingInfo?.roomName}</p>
              </div>
            )}
            {data?.bookingInfo?.roomType === "Shared Room" ? (
              <>
                <div className="col-lg-3">
                  {" "}
                  <label htmlFor="" className="fw-medium">
                    Seat Number
                  </label>
                  <p> {data?.bookingInfo?.seatBooking?.seatNumber}</p>
                </div>
                <div className="col-lg-3">
                  {" "}
                  <label htmlFor="" className="fw-medium">
                    Room Number
                  </label>
                  <p> {data?.bookingInfo?.roomNumber}</p>
                </div>
              </>
            ) : (
              <div className="col-lg-3">
                {" "}
                <label htmlFor="" className="fw-medium">
                  Room Number
                </label>
                <p> {data?.bookingInfo?.roomNumber}</p>
              </div>
            )}

            <div className="col-lg-3">
              {" "}
              <label htmlFor="" className="fw-medium">
                Check In{" "}
              </label>
              <p> {formatDate(data?.bookingInfo?.rentDate?.bookStartDate)}</p>
            </div>
            <div className="col-lg-3">
              {" "}
              <label htmlFor="" className="fw-medium">
                Check Out{" "}
              </label>
              <p> {formatDate(data?.bookingInfo?.rentDate?.bookEndDate)}</p>
            </div>
            <div className="col-lg-3">
              {" "}
              <label htmlFor="" className="fw-medium">
                {" "}
                Total Duraion{" "}
              </label>
              <p>
                {" "}
                {data?.bookingInfo?.customerRent?.daysDifference >= 0
                  ? `${data?.bookingInfo?.customerRent?.daysDifference} days`
                  : "" ||
                    (data?.bookingInfo?.customerRent?.months &&
                      data?.bookingInfo?.customerRent?.days >= 0 &&
                      !data?.bookingInfo?.customerRent?.years)
                  ? `${data?.bookingInfo?.customerRent?.months} months, ${data?.bookingInfo?.customerRent?.days} days`
                  : "" ||
                    (data?.bookingInfo?.customerRent?.years &&
                      data?.bookingInfo?.customerRent?.months >= 0 &&
                      data?.bookingInfo?.customerRent?.days >= 0)
                  ? `${data?.bookingInfo?.customerRent?.years} year`
                  : ""}
              </p>
            </div>

            <div className="col-lg-3">
              {" "}
              <label htmlFor="" className="fw-medium">
                Future Extend{" "}
              </label>
              <p> {data?.bookingInfo?.bookingExtend === true ? "Yes" : "No"}</p>
            </div>
            <div className="col-lg-3">
              {" "}
              <label htmlFor="" className="fw-medium">
                Food
              </label>
              <p>
                {" "}
                {data?.bookingInfo.isIncludeFood === true
                  ? "Yes"
                  : data?.bookingInfo?.isIncludeFood === false
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
              <p>Tk {data?.discount?.toLocaleString()}</p>
            </div>
            <div className="col-lg-3">
              {" "}
              <label htmlFor="" className="fw-medium">
                Payable Amount
              </label>
              <p>Tk {data?.payableAmount?.toLocaleString()}</p>
            </div>
            <div className="col-lg-3">
              {" "}
              <label htmlFor="" className="fw-medium">
                Total Payment
              </label>
              <p>
                Tk {data?.transactions[0]?.totalReceiveTk?.toLocaleString()}
                {/* {data?.totalReceiveTk?.toLocaleString()} */}
              </p>
            </div>

            <div className="col-lg-3">
              <label htmlFor="" className="fw-medium">
                Due Amount
              </label>
              <p>
                Tk {data?.payableAmount - data?.transactions[0]?.totalReceiveTk}
                {/* {data?.dueAmount?.toLocaleString()} */}
              </p>
            </div>

            <div className="col-lg-3">
              {" "}
              <label htmlFor="" className="fw-medium">
                Minimum Payment
              </label>
              <p>
                Tk{" "}
                {data?.bookingInfo?.minimumPayment
                  ? data?.bookingInfo?.minimumPayment?.toLocaleString()
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
                {data?.bookingInfo?.addMissionFee
                  ? data?.bookingInfo?.addMissionFee?.toLocaleString()
                  : 0}
              </p>
            </div>
            <div className="col-lg-3">
              {" "}
              <label htmlFor="" className="fw-medium">
                Security Fee
              </label>
              <p>
                Tk{" "}
                {data?.bookingInfo?.securityFee
                  ? data?.bookingInfo?.securityFee?.toLocaleString()
                  : 0}
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

                      <td className="fw-bold">{transaction?.userName}</td>

                      <td className="fw-bold">{transaction?.userPhone}</td>
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
                <p> = Tk {data?.payableAmount?.toLocaleString()}</p>
              </div>
              <div className="d-flex">
                <label htmlFor=""> Total Receive </label>
                <p> = Tk {data?.totalReceiveTk?.toLocaleString()}</p>
              </div>
              <div className="d-flex">
                <label htmlFor="">Due Amount </label>
                <p className="text-danger fw-bold">
                  = Tk {data?.dueAmount?.toLocaleString()}
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
