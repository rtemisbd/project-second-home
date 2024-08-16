import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AvailableSingleRooms from "./AvailableSingleRooms";
import BookedSingleRoom from "./BookedSingleRoom";
import BookedSeats from "./BookedSeats";
import AvailableSeats from "./AvailableSeats";
import ReservedBooked from "./ReservedBooked";
import ToDayCheckIn1 from "./ToDayCheckIn1";
import ToDayCheckOut from "./ToDayCheckOut";

const BookingReportData = ({ data }) => {
  const [activeView, setActiveView] = useState("availableRooms");

  const {
    bookedRooms,
    upcomingRentRooms,
    availableRooms,
    bookedSeats,
    todayCheckIn,
    todayCheckOut,
    availableSeats,
    totalAvailableSeats,
  } = data;

  const renderActiveView = () => {
    switch (activeView) {
      case "availableRooms":
        return <AvailableSingleRooms availableRooms={availableRooms} />;
      case "bookedRooms":
        return <BookedSingleRoom bookedRooms={bookedRooms} />;
      case "bookedSeats":
        return <BookedSeats bookedSeats={bookedSeats} />;
      case "availableSeats":
        return <AvailableSeats availableSeats={availableSeats} />;
      case "reservedBooked":
        return <ReservedBooked upcomingRentRooms={upcomingRentRooms} />;
      case "checkIn":
        return <ToDayCheckIn1 todayCheckIn={todayCheckIn} />;
      case "checkOut":
        return <ToDayCheckOut todayCheckOut={todayCheckOut} />;
      default:
        return null;
    }
  };

  return (
    <Container className="mt-4">
      <Row className="g-2">
        {/* Available Single Rooms */}
        <Col
          className="booking_report_card"
          sm={12}
          md={3}
          lg={3}
          onClick={() => setActiveView("availableRooms")}
        >
          <div
            style={{
              backgroundColor: "#321f39",
              color: "white",
              borderRadius: "5px",
              padding: "1rem",
            }}
          >
            <p>Available Single Rooms: {availableRooms?.length}</p>
          </div>
        </Col>
        {/* Booked Single Rooms */}
        <Col
          className="booking_report_card"
          sm={12}
          md={3}
          lg={3}
          onClick={() => setActiveView("bookedRooms")}
        >
          <div
            style={{
              backgroundColor: "#321f39",
              color: "white",
              borderRadius: "5px",
              padding: "1rem",
            }}
          >
            <p>Booked Single Room: {bookedRooms?.length}</p>
          </div>
        </Col>
        {/* Booked Seats */}
        <Col
          className="booking_report_card"
          sm={12}
          md={3}
          lg={3}
          onClick={() => setActiveView("bookedSeats")}
        >
          <div
            style={{
              backgroundColor: "#321f39",
              color: "white",
              borderRadius: "5px",
              padding: "1rem",
            }}
          >
            <p>Booked Seats: {bookedSeats?.length}</p>
          </div>
        </Col>
        {/* Available Seats */}
        <Col
          className="booking_report_card"
          sm={12}
          md={3}
          lg={3}
          onClick={() => setActiveView("availableSeats")}
        >
          <div
            style={{
              backgroundColor: "#321f39",
              color: "white",
              borderRadius: "5px",
              padding: "1rem",
            }}
          >
            <p>Available Seats: {totalAvailableSeats}</p>
          </div>
        </Col>
        {/* Upcoming Bookings */}
        <Col
          className="booking_report_card"
          sm={12}
          md={3}
          lg={3}
          onClick={() => setActiveView("reservedBooked")}
        >
          <div
            style={{
              backgroundColor: "#321f39",
              color: "white",
              borderRadius: "5px",
              padding: "1rem",
            }}
          >
            <p>Reserved Booked: {upcomingRentRooms?.length}</p>
          </div>
        </Col>
        {/* Today Check-in */}
        <Col
          className="booking_report_card"
          sm={12}
          md={3}
          lg={3}
          onClick={() => setActiveView("checkIn")}
        >
          <div
            style={{
              backgroundColor: "#321f39",
              color: "white",
              borderRadius: "5px",
              padding: "1rem",
            }}
          >
            <p>Today Check-in: {todayCheckIn?.length}</p>
          </div>
        </Col>
        {/* Today Check-out */}
        <Col
          className="booking_report_card"
          sm={12}
          md={3}
          lg={3}
          onClick={() => setActiveView("checkOut")}
        >
          <div
            style={{
              backgroundColor: "#321f39",
              color: "white",
              borderRadius: "5px",
              padding: "1rem",
            }}
          >
            <p>Today Check-out: {todayCheckOut?.length}</p>
          </div>
        </Col>
      </Row>
      {renderActiveView()}
    </Container>
  );
};

export default BookingReportData;
