import React from "react";
import { Col, Row } from "react-bootstrap";

const AvailableSeats = ({ availableSeats }) => {
  return (
    <>
      <p className="mt-5 fw-bold">Available Seats : </p>
      <Row className="g-3">
        {availableSeats?.map((room, index) => (
          <Col
            key={index}
            sm={12}
            md={3}
            lg={3}
            style={{
              border: "1px solid #35b0a7",
              padding: "15px",
            }}
          >
            <p className="fw-bold">Room No : {room?.roomNumber}</p>
            <div
              style={{
                marginTop: "-10px",
              }}
            >
              <span className="fw-bold "> Seats</span> :{" "}
              <div className="mt-3">
                {room?.seats?.map((seat) => (
                  <p
                    key={seat?._id}
                    style={{
                      lineHeight: "15px",
                    }}
                  >
                    {seat?.seatNumber}
                  </p>
                ))}
              </div>
              <p className="fw-bold">Branch : {room?.branch}</p>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default AvailableSeats;
