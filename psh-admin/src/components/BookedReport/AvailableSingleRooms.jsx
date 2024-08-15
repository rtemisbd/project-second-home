import React from "react";
import { Col, Row } from "react-bootstrap";

const AvailableSingleRooms = ({ availableRooms }) => {
  return (
    <>
      <p className="mt-5 fw-bold">Available Rooms : </p>
      <Row className="g-2">
        {availableRooms?.map((room, index) => (
          <Col
            sm={1}
            md={3}
            lg={3}
            key={index}
            style={{
              border: "1px solid #35b0a7",
              padding: "0px 15px",
            }}
          >
            <p>
              <span className="fw-bold">Room Number</span> : {room?.roomNumber}
            </p>
            <p>
              <span className="fw-bold">Branch</span> : {room?.branch?.name}
            </p>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default AvailableSingleRooms;
