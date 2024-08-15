import React from "react";
import { Col, Row } from "react-bootstrap";
import { formatDate } from "../../utils/dateConvert";

const BookedSeats = ({ bookedSeats }) => {
  return (
    <>
      <p className="mt-5 fw-bold">Booked Seats : </p>
      <Row className="g-3">
        {bookedSeats?.map((room, index) => (
          <Col
            key={index}
            sm={12}
            md={3}
            lg={3}
            style={{
              border: "1px solid #35b0a7",
            }}
          >
            <p>Room No : {room?.roomNumber}</p>
            <p>Seat No : {room?.seatNumber}</p>
            <p className="fw-bold">
              Dates : {formatDate(room?.bookStartDate)} -{" "}
              {formatDate(room?.bookEndDate)}
            </p>
            <p>Name : {room?.userId?.firstName}</p>
            <p>Phone : {room?.userId?.phone}</p>
            <p>Branch : {room?.branch?.name}</p>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default BookedSeats;
