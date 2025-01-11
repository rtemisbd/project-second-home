import React from "react";
import { Modal } from "react-bootstrap";
import { formatDate } from "../../utils/dateConvert";
import { Link } from "react-router-dom";

const DetailOverview = ({
  detail,
  bookingInfo,
  date,
  setShowDetailModal,
  handleShowDetails,
}) => {
  return (
    <Modal show={handleShowDetails} onHide={() => setShowDetailModal(false)}>
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "#35B0A7",
          height: "36px",
          borderRadius: "3px 3px 0px 0px",
        }}
      >
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            width: "470px",
            borderRadius: "3px",
            backgroundColor: "white",
          }}
        >
          <div
            className="px-3 py-2 m-3"
            style={{
              boxShadow: "0px 0px 5px 3px #CCC",
              borderRadius: "5px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyItems: "end",
                gap: "4px",
              }}
            >
              <h5 className="text-left " style={{ color: "#212A42" }}>
                {detail?.categoryDetails?.name === "Shared Room"
                  ? detail?.property?.name
                  : detail?.name}{" "}
                - {detail?.roomNumber}
              </h5>
              {detail?.categoryDetails?.name === "Shared Room" && (
                <span style={{ marginTop: "4px" }}>
                  [Seat : {detail?.seatNumber}]
                </span>
              )}
            </div>
            <p
              className=" d-flex justify-content-start "
              style={{
                backgroundColor: "#FCA22A",
                color: "white",
                padding: "3px 5px ",
                borderRadius: "5px",
              }}
            >
              {detail?.categoryDetails?.name}-[
              {detail?.branchDetails?.name}]
            </p>
            <hr />
            <ul
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
              }}
            >
              <li>Per Day : BDT {detail?.dAmountForDay}</li>
              <li>Per Month : BDT {detail?.dAmountForMonth}</li>
            </ul>
            <h4>
              {" "}
              {bookingInfo.length
                ? "Booked for:"
                : `Available for : ${formatDate(date)}`}
            </h4>

            {bookingInfo?.map((info) => (
              <div
                key={info._id}
                className="px-3 py-2 mb-2"
                style={{
                  boxShadow: "0px 0px 3px 0px #CCC",
                  borderRadius: "5px",
                }}
              >
                <p>
                  {info?.userId?.firstName}
                  <br /> Phone : {info?.userId?.phone}
                </p>
                <p style={{ fontWeight: "semibold" }}>
                  Duration : {formatDate(info?.bookStartDate)} -{" "}
                  {formatDate(info?.bookEndDate)}
                </p>
              </div>
            ))}
          </div>
          {/* for new booking */}
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginRight: "20px",
            }}
          >
            <Link to="/dashboard/create-booking">Book Now</Link>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DetailOverview;
