import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useQuery } from "react-query";
import BookingReportData from "./BookingReportsData";
import "./BookingReport.css";
import { formatDate } from "../../utils/dateConvert";
import { Spinner } from "react-bootstrap";
import { baseUrl } from "../../utils/getBaseURL";

const BookingReports = () => {
  const [checkingDate, setCheckingDate] = useState(new Date());
  // const [allBranch, setAllBranch] = useState([]);
  // const [branch, setBranch] = useState("");
  // Fetch booking reports based on the checkingDate
  const { data, error, isLoading } = useQuery(
    ["fetchBookingsReports", checkingDate],
    async () => {
      try {
        const queryParams = new URLSearchParams({
          checkingDate: checkingDate,
          // branch: branch,
        });

        const response = await fetch(
          `${baseUrl}/api/rent-rooms?${queryParams.toString()}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Network Error");
        }

        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 60000, // Cache data for 1 minute
    }
  );
  // Get All Branch
  // useEffect(() => {
  //   fetch(`${baseUrl}/api/branch`)
  //     .then((res) => res.json())
  //     .then((data) => setAllBranch(data));
  // }, []);

  // // Get All Status Bookings

  // const handleBranch = (e) => {
  //   setBranch(e.target.value);
  // };

  if (isLoading)
    return (
      <div
        className="text-center text-danger fw-bold loading"
        style={{ margin: "2rem 0" }}
      >
        <p>
          Finding Bookings Reports... <Spinner size="sm" animation="grow" />
        </p>
      </div>
    );

  if (error)
    return (
      <div
        className="text-center text-danger fw-bold"
        style={{ margin: "2rem 0" }}
      >
        <p>Error: {error.message}</p>
      </div>
    );

  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <section className="content customize_list">
          <div className="container-fluid">
            <div className="d-flex gap-3 mb-5">
              <div>
                <label htmlFor="">Choose your day :</label>
                <br />
                <DatePicker
                  selected={checkingDate}
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => setCheckingDate(date)}
                />
              </div>
              {/* <div>
                <label htmlFor="">Branch </label> <br />
                <select
                  className="rounded"
                  style={{ height: "30px" }}
                  onChange={handleBranch}
                >
                  <option value="">All</option>
                  {allBranch?.map((branch) => (
                    <option value={branch?._id}>{branch?.name}</option>
                  ))}
                </select>
              </div> */}
            </div>
            <h6
              className="college_h6 fw-bold text-center"
              style={{ color: "#35b0a7", fontSize: "30px" }}
            >
              {checkingDate.toDateString() === new Date().toDateString()
                ? `Today Bookings Reports`
                : `${formatDate(checkingDate)} Booking Reports`}
            </h6>
            <hr />
            {data?.availableRooms ? (
              <BookingReportData data={data} />
            ) : (
              <div className="text-center text-danger fw-bold loading">
                <p>No Bookings Data Available</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookingReports;
