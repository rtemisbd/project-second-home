import React from "react";
import { Col, Row } from "react-bootstrap";

const AvailableSingleRooms = ({ availableRooms }) => {
  return (
    <>
      <p className="mt-5 fw-bold">Available Single Rooms:</p>
      <Row className="gx-2">
        {availableRooms?.map((room, index) => (
          <Col
            sm={12}
            md={6}
            lg={3}
            key={index}
            style={{
              border: "1px solid White",
              padding: "15px",
              backgroundColor: "#35b0a7",
              color: "white",
              borderRadius: "5px",
            }}
          >
            <p>
              <span className="fw-bold">Room Number</span>: {room?.roomNumber}
            </p>
            <p>
              <span
                className="fw-bold"
                style={{
                  color: "#321f39",
                }}
              >
                Branch{" "}
              </span>
              : {room?.branch?.name}
            </p>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default AvailableSingleRooms;
