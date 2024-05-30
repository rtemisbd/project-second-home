import React from "react";
import { Table } from "react-bootstrap";
import BookingData from "./BookingData";
import { ToastContainer } from "react-toastify";

const BookingsTable = ({
  data,
  setPage,
  page,
  pageCount,
  refetch,
  transactions,
  extraCharge,
  isLoading,
}) => {
  return (
    <div>
      <Table striped bordered>
        <thead>
          <tr>
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
              extraCharge={extraCharge}
              transactions={transactions}
              isLoading={isLoading}
            />
          ))}
        </tbody>
      </Table>
      <ToastContainer className="toast-position" position="top-center" />
      <div className="pagination d-flex justify-content-end gap-2">
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
          Previous
        </button>
        {[...Array(pageCount).keys()].map((number) => (
          <button
            key={number}
            onClick={() => setPage(number)}
            className={page === number ? "page-selected" : ""}
          >
            {number + 1}
          </button>
        ))}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === pageCount - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookingsTable;
