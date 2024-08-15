import React from "react";
import { Col, Row } from "react-bootstrap";
import { formatDate } from "../../utils/dateConvert";

const ToDayCheckOut = ({ todayCheckOut }) => {
  return (
    <>
      <p className="mt-5 fw-bold">To Day Check In : </p>
      <Row className="g-3">
        {todayCheckOut?.map((room, index) => (
          <Col
            key={index}
            sm={12}
            md={3}
            lg={3}
            style={{
              border: "1px solid #35b0a7",
            }}
          >
            <p>Room Number : {room?.roomNumber}</p>
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

export default ToDayCheckOut;
