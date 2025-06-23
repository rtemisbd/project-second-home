import { Modal, Table } from "react-bootstrap";
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import { formatDate } from "../../../utils/dateConvert";
import { BlobProvider, View } from "@react-pdf/renderer";
import DownlaodInvoice from "../../Invoice/DownlaodInvoice";

const VillaBookingDetail = ({ data, showDetail, setShowDetail }) => {
  const ref = useRef();
  const handleClose = () => setShowDetail(false);
  const formattedTime = new Date(data?.createdAt)
    ?.toLocaleString()
    ?.split(",")[1];

  const formatDateOfRent = (dateString) => {
    const [day, month, year] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day); // month is 0-based

    const formattedDay = String(date.getDate()).padStart(2, "0");
    const formattedMonth = date.toLocaleString("default", { month: "long" });
    const formattedYear = String(date.getFullYear()).slice(-2);

    return `${formattedDay} ${formattedMonth} ${formattedYear}`;
  };

  return (
    <Modal
      show={showDetail}
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
              <p>{data?.user?.firstName}</p>
            </div>
            <div className="col-lg-3">
              <label htmlFor="" className="fw-medium">
                Phone Number
              </label>
              <p>{data?.user?.phone}</p>
            </div>

            <div className="col-lg-6">
              <label htmlFor="" className="fw-medium">
                Emergency Contact Name :
              </label>
              <p>{data?.user?.emergencyContact?.contactName}</p>
            </div>
            <div className="col-lg-6">
              <label htmlFor="" className="fw-medium">
                Emergency Contact Relationship :
              </label>
              <p>{data?.user?.emergencyContact?.relation}</p>
            </div>
            <div className="col-lg-6">
              <label htmlFor="" className="fw-medium">
                Emergency Contact Number :
              </label>
              <p>{data?.user?.emergencyContact?.contactNumber}</p>
            </div>
          </div>

          {/* Booking Details */}
          <h3
            className=" fs-4 mt-3 ps-3 rounded"
            style={{ backgroundColor: "#00bbb4", color: "White" }}
          >
            Booking Details
          </h3>
          <div className="row px-5">
            <div className="col-lg-4">
              <label htmlFor="" className="fw-medium">
                Booking Id
              </label>
              <p>#{data?.bookingId}</p>
            </div>
            <div className="col-lg-4">
              {" "}
              <label htmlFor="" className="fw-medium">
                Booking Date & Time
              </label>
              <p>
                {formatDate(data?.createdAt)}
                {formattedTime}
              </p>
            </div>
            <div className="col-lg-4">
              {" "}
              <label htmlFor="" className="fw-medium">
                Villa
              </label>
              <p>
                {data?.villa?.title} - [{data?.villa?.villaNumber}]
              </p>
            </div>

            <div className="col-lg-4">
              {" "}
              <label htmlFor="" className="fw-medium">
                Check In{" "}
              </label>
              <p> {formatDateOfRent(data?.rentDate?.bookStartDate)}</p>
            </div>
            <div className="col-lg-4">
              {" "}
              <label htmlFor="" className="fw-medium">
                Check Out{" "}
              </label>
              <p> {formatDateOfRent(data?.rentDate?.bookEndDate)}</p>
            </div>
            <div className="col-lg-4">
              {" "}
              <label htmlFor="" className="fw-medium">
                {" "}
                Total Duraion{" "}
              </label>
              <p>{data?.rentDate?.daysDifference} Nights</p>
            </div>
            {data?.specialRequest && (
              <div className="col-lg-12">
                <label htmlFor="" className="fw-medium">
                  Special Request
                </label>
                <p>#{data?.specialRequest}</p>
              </div>
            )}
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
              <p>Tk {data?.discount || 0}</p>
            </div>
            <div className="col-lg-3">
              {" "}
              <label htmlFor="" className="fw-medium">
                Payable Amount
              </label>
              <p>Tk {data?.payableAmount}</p>
            </div>
            <div className="col-lg-3">
              {" "}
              <label htmlFor="" className="fw-medium">
                Total Payment
              </label>
              <p>
                Tk{" "}
                {data?.transactions[0]?.totalReceiveTk?.toLocaleString() || 0}
              </p>
            </div>

            <div className="col-lg-3">
              <label htmlFor="" className="fw-medium">
                Due Amount
              </label>
              <p>
                Tk{" "}
                {data?.payableAmount -
                  (data?.transactions[0]?.totalReceiveTk || 0)}
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
              //   content={() => ref.current}
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
              <span className="fw-bold"> [{data.paymentStatus}]</span>
            </h3>

            <Table striped responsive bordered>
              <thead>
                <tr>
                  <th>Payment Date</th>

                  <th>Full Name</th>

                  <th>Phone</th>
                  <th>Payment Platform</th>
                  <th>Account Number</th>
                  <th>Receive Amount</th>
                </tr>
              </thead>
              <tbody>
                {data?.transactions[0]?.allTransactions?.map((transaction) => {
                  // Find Total Receive Payment and Due Amount

                  return (
                    <tr key={transaction._id}>
                      <td>{formatDate(transaction?.createdAt)}</td>

                      <td className="fw-bold">{data?.user?.firstName}</td>

                      <td className="fw-bold">{data?.user?.phone}</td>

                      <td>{transaction?.paymentPlatform}</td>
                      <td>{transaction?.senderNumber}</td>
                      <td className="fw-bold" style={{ color: "green" }}>
                        Tk {transaction?.receivedAmount?.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div className=" d-flex justify-content-end gap-5 ">
              <div className="d-flex">
                <label htmlFor="">Total Payable Amount </label>
                <p> = Tk {data?.payableAmount}</p>
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
                  {data?.payableAmount -
                    (data?.transactions[0]?.totalReceiveTk || 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default VillaBookingDetail;
