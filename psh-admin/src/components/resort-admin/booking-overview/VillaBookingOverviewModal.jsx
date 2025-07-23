import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

const VillaBookingOverviewModal = ({
  detail,
  bookingInfo,
  date,
  setShowDetailModal,
  handleShowDetails,
}) => {

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed

    const formattedDay = String(date.getDate()).padStart(2, "0");
    const formattedMonth = date.toLocaleString("default", { month: "long" });
    const formattedYear = String(date.getFullYear()).slice(-2);

    return `${formattedDay} ${formattedMonth} ${formattedYear}`;
  };

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
              <h4 className="text-left " style={{ color: "#212A42" }}>
                {detail?.title}
              </h4>
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
              Villa Number - {detail?.villaNumber}
            </p>

            <hr />
            <ul
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
              }}
            >
              <li>Per Night : BDT {detail?.pricing?.afterDiscountPerNight}</li>
            </ul>
            <h4>
              {" "}
              {bookingInfo?.length
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
                  {info?.user?.firstName}
                  <br /> Phone : {info?.user?.phone}
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
            <Link
              to={`/dashboard/resort/create-order/${detail?.category}/${detail?._id}`}
            >
              Book Now
            </Link>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default VillaBookingOverviewModal;
