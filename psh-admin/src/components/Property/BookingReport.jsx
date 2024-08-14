import React, { useContext, useRef, useState } from "react";

import { useQuery } from "react-query";

// import { Spinner, Table } from "react-bootstrap";
// import ReactToPrint from "react-to-print";
// import ReportPrint from "./ReportPrint";
import StatusCard from "./StatusCard";

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
          `https://api.psh.com.bd/api/rent-rooms?${queryParams.toString()}`,
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
  console.log(data);
  return (
    <>
      <div className="wrapper">
        <div className="content-wrapper" style={{ background: "unset" }}>
          <section className="content customize_list">
            <div className="container-fluid">
              <div className="d-flex justif-content-between"></div>
              <div className="row">
                <div className="col-md-7">
                  <h6 className="college_h6">Booking Reports</h6>
                </div>{" "}
                <StatusCard />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default PropertyReports;
