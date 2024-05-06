import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import UseFetch from "../../hooks/useFetch";
import AllRecoondedSingle from "./AllRecoondedSingle";
import "./SingleCard.css";

const AllRecomonded = ({ item }) => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(Number.MAX_VALUE);
  const [totalPages, setTotalPages] = useState(1);
  const handleItemsPerPageChange = (event) => {
    const selectedItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(
      selectedItemsPerPage === -1 ? Number.MAX_VALUE : selectedItemsPerPage
    );
    setPage(1);
  };
  const handlePageChange = (event) => {
    const selectedPage = parseInt(event.target.value);
    setPage(selectedPage);
  };

  const {
    data: recomendedData,
    loading,
    error,
    reFetch,
  } = UseFetch(
    `property/properties/recommended?page=${page}&pageSize=${itemsPerPage}`
  );
  // find Published Recommended Property
  const publishedData = recomendedData.filter(
    (property) => property?.isPublished === "Published"
  );
  useEffect(() => {
    if (publishedData && publishedData.length > 0) {
      setTotalPages(Math.ceil(publishedData.length / itemsPerPage));
    } else {
      setTotalPages(1);
    }
  }, [publishedData, itemsPerPage]);
  const paginatedData = publishedData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  return (
    <>
      <div className=" mt-3 flex justify-between items-center sm:px-5 sm:pt-1 md:px-0 md:pt-0 custom-container">
        <p className="ms-0">{paginatedData?.length} Results Found</p>
        <p className="">
          Search Number{" "}
          <select
            className="border border-black rounded ml-2"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            style={{ width: 50, height: 32 }}
          >
            <option value={-1}>All</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
          </select>
        </p>
      </div>
      {paginatedData?.length > 0 ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-x-5 custom-container mt-5 sm:px-5 sm:pt-2 md:px-0 md:pt-0">
          {paginatedData?.map((item) => {
            // Checking Booking Dates for privet room and apartment
            const currentDate = new Date().toISOString().split("T")[0];
            // Check if the target date falls within any of the date ranges
            let isIntoDate = false;

            for (const range of item?.rentDate) {
              if (currentDate <= range.bookEndDate) {
                isIntoDate = true;
                break; // No need to continue checking once a match is found
              }
            }

            // Find Already Seat Booked

            const isAlreadySeatBook = [];

            let isSeatIntoDate = false;
            for (const range of item?.seats) {
              for (const rentDate of range?.rentDate) {
                isAlreadySeatBook.push(rentDate);
                if (currentDate <= rentDate.bookEndDate) {
                  isSeatIntoDate = true;
                  break; // No need to continue checking once a match is found
                }
              }
            }
            return (
              <Link
                to={`/room/${item._id}`}
                className="single-card "
                key={item?._id}
              >
                <AllRecoondedSingle
                  item={item}
                  isSeatIntoDate={isSeatIntoDate}
                />
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-center mt-20 mb-20"> Loading...</p>
      )}
      <div className="mt-10 flex justify-center items-center mb-10">
        <div className="bg-[#399] text-white rounded px-2 py-2">
          <div>
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="text-sm"
            >
              Previous
            </button>
          </div>
        </div>
        <div className="flex ml-2 mx-2 text-sm">
          <p className="mt-1">Page</p>
          <select
            className="border border-black rounded ml-2 px-2"
            value={page}
            onChange={handlePageChange}
            style={{ width: 50, height: 26 }}
          >
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNum) => (
                <option key={pageNum} value={pageNum}>
                  {pageNum}
                </option>
              )
            )}
          </select>
          <p className="ml-2 mt-1"> of {totalPages}</p>
        </div>
        <div className="flex justify-center bg-[#399] text-white rounded px-5 py-2">
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="text-sm"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default AllRecomonded;
