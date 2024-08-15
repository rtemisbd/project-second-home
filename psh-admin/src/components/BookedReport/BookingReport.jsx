import React, { useContext, useRef, useState } from "react";

import { useQuery } from "react-query";
import BookingReportData from "./BookingReportsData";

// import { Spinner, Table } from "react-bootstrap";
// import ReactToPrint from "react-to-print";
// import ReportPrint from "./ReportPrint";

const PropertyReports = (props) => {
  const ref = useRef();

  //sub stream
  const [data, setData] = useState([]);

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  // Handle Search
  const { refetch } = useQuery(
    ["fetchBookingsReports"],
    async () => {
      try {
        const queryParams = new URLSearchParams({
          page: page,
          size: 10,
        });

        const response = await fetch(
          `http://localhost:8000/api/rent-rooms?${queryParams.toString()}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Network Error");
        }

        const data = await response.json();
        setData(data);
        // const totalPageCount = Math.ceil(data?.bookingsTotalCount / 10);
        // setPageCount(totalPageCount);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <div className="wrapper">
        <div className="content-wrapper" style={{ background: "unset" }}>
          <section className="content customize_list">
            <div className="container-fluid ">
              <h6
                className="college_h6 fw-bold text-center"
                style={{
                  color: "#35b0a7",
                  fontSize: "35px",
                }}
              >
                Today Bookings Reports
              </h6>
              <hr />
            </div>{" "}
            <BookingReportData data={data} />
          </section>
        </div>
      </div>
    </>
  );
};

export default PropertyReports;
