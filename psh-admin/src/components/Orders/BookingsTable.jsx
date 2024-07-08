import React from "react";
import { Table } from "react-bootstrap";
import BookingData from "./BookingData";
import { ToastContainer } from "react-toastify";
import "./BookingsTable.css";

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
  const MAX_PAGE_BUTTONS = 5; // Define the maximum number of page buttons to show

  // Calculate the range of page numbers to display
  const startPage = Math.max(1, page - Math.floor(MAX_PAGE_BUTTONS / 2));
  const endPage = Math.min(startPage + MAX_PAGE_BUTTONS - 1, pageCount);
  const visiblePageNumbers = [...Array(endPage - startPage + 1).keys()].map(
    (i) => startPage + i
  );

  return (
    <div>
      <Table bordered>
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

      {/* <div className="pagination d-flex justify-content-end">
        {[...Array(pageCount).keys()].map((number, index) => (
          <div key={index}>
            <button
              onClick={() => setPage(number)}
              className={page === number ? "page-selected" : ""}
            >
              {number + 1}
            </button>
          </div>
        ))}
      </div> */}
      <div className="pagination d-flex justify-content-end gap-0">
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className="pagination-button"
        >
          First
        </button>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="pagination-button"
        >
          Previous
        </button>
        {visiblePageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setPage(number)}
            className={
              page === number
                ? "page-selected pagination-button"
                : "pagination-button"
            }
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === pageCount || pageCount === 0}
          className="pagination-button"
        >
          Next
        </button>
        <button
          onClick={() => setPage(pageCount)}
          disabled={page === pageCount || pageCount === 0}
          className="pagination-button"
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default BookingsTable;
