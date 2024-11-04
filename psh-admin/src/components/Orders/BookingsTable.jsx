import React from "react";
import { Table } from "react-bootstrap";
import BookingData from "./BookingData";
import { ToastContainer } from "react-toastify";
// import "./BookingsTable.css";
import "./styles/BookingsTable.css";

const BookingsTable = ({
  data,
  page,
  refetch,
  transactions,
  extraCharge,
  isLoading,
  size,
}) => {
  return (
    <div>
      <Table bordered>
        <thead>
          <tr
            style={{
              fontSize: "14px",
            }}
          >
            <th>No.</th>
            <th>Date & Time</th>
            <th>Booking Id</th>
            <th>User Id</th>
            <th>Room / Seat No</th>
            <th>Total Tk</th>
            <th>Discount</th>
            <th>Payable Tk</th>
            <th>Payment Status</th>
            <th>Due Amount</th>
            <th>Total Receive</th>
            <th>Status</th>
            <th>Contact</th>
            <th>Details</th>
            <th>Update Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((booking, index) => (
            <BookingData
              booking={booking}
              key={booking._id}
              index={index}
              refetch={refetch}
              page={page}
              extraCharge={extraCharge}
              transactions={transactions}
              isLoading={isLoading}
              size={size}
            />
          ))}
        </tbody>
      </Table>
      <ToastContainer className="toast-position" position="top-center" />
    </div>
  );
};

export default BookingsTable;
