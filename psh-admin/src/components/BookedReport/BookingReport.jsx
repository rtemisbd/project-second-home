import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useQuery } from "react-query";
import BookingReportData from "./BookingReportsData";
import "./BookingReport.css";
import { formatDate } from "../../utils/dateConvert";
import { Spinner } from "react-bootstrap";
import { baseUrl } from "../../utils/getBaseURL";
import axios from "axios";

const BookingReports = () => {
  const [data, setData] = useState(null);
  const [checkin, setCheckin] = useState([]);
  const [checkout, setCheckout] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatDateToYMD = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // const { data, error, isLoading } = useQuery(
  //   ["fetchBookingsReports", selectedDate],
  //   async () => {
  //     try {
  //       const queryParams = new URLSearchParams({
  //         selectedDate,
  //       });

  //       const response = await fetch(
  //         `${baseUrl}/api/rent-rooms?${queryParams.toString()}`,
  //         {
  //           method: "GET",
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error("Network Error");
  //       }

  //       const { data } = await response.json();
  //       console.log(data);

  //       return data;
  //     } catch (error) {
  //       throw new Error(error.message);
  //     }
  //   },
  //   {
  //     refetchOnWindowFocus: false,
  //     staleTime: 60000, // Cache data for 1 minute
  //   }
  // );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams({
          selectedDate: formatDateToYMD(selectedDate),
        });
        const { data } = await axios.get(
          `${baseUrl}/api/rent-rooms?${queryParams.toString()}`
        );
        console.log(data.data);
        setCheckin(data?.data?.checkin);
        setCheckout(data?.data?.checkout);
      } catch (error) {
        setError(error?.response?.data);
      }
    };
    fetchData();
  }, [selectedDate]);

  console.log(formatDateToYMD(selectedDate));

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
                  selected={selectedDate}
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => setSelectedDate(date)}
                />
              </div>
            </div>
            <h6
              className="college_h6 fw-bold text-center"
              style={{ color: "#35b0a7", fontSize: "30px" }}
            >
              Bookings Reports : {formatDate(selectedDate)}
            </h6>
            <hr />

            <div
              className="container"
              style={{
                margin: "auto",
                // border: "1px solid red",
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                justifyContent: "start",
              }}
            >
              <div
                style={{
                  backgroundColor: "#321f39",
                  color: "white",
                  borderRadius: "5px",
                  padding: "1rem",
                  width: "30%",
                }}
              >
                <p>Total Bookings: </p>
              </div>
              <div
                style={{
                  backgroundColor: "#321f39",
                  color: "white",
                  borderRadius: "5px",
                  padding: "1rem",
                  width: "30%",
                }}
              >
                <p>Private Room Bookings: </p>
              </div>
              <div
                style={{
                  backgroundColor: "#321f39",
                  color: "white",
                  borderRadius: "5px",
                  padding: "1rem",
                  width: "30%",
                }}
              >
                <p>Shared Room Bookings: </p>
              </div>
              <div
                style={{
                  backgroundColor: "#321f39",
                  color: "white",
                  borderRadius: "5px",
                  padding: "1rem",
                  width: "30%",
                }}
              >
                <p>Check-In : {checkin?.length} </p>
              </div>
              <div
                style={{
                  backgroundColor: "#321f39",
                  color: "white",
                  borderRadius: "5px",
                  padding: "1rem",
                  width: "30%",
                }}
              >
                <p>Check-Out : {checkout?.length} </p>
              </div>
            </div>

            <div className="container">
              <div>
                <h6
                  style={{
                    color: "#35b0a7",
                    fontSize: "28px",
                    fontWeight: "bold",
                    margin: "36px 0px 20px",
                  }}
                >
                  Check-In
                </h6>
                {checkin?.length > 0 ? (
                  <div className="d-flex flex-wrap gap-2">
                    {checkin?.map((data) => (
                      <div
                        style={{
                          width: "24%",
                          border: "1px solid #35b0a7",
                          padding: "15px",
                        }}
                      >
                        <p>Branch : {data?.branch?.name}</p>
                        <p>Room Number : {data?.roomNumber}</p>
                        {data?.seatNumber && (
                          <p>Seat Number : {data?.seatNumber}</p>
                        )}
                        <p className="fw-bold">
                          Dates : {formatDate(data?.bookStartDate)} -{" "}
                          {formatDate(data?.bookEndDate)}
                        </p>
                        <p>Name : {data?.user?.firstName}</p>
                        <p>Phone : {data?.user?.phone}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <h4 className="mt-3 text-center  text-danger fw-bold ">
                    No Check-In on {formatDate(selectedDate)}
                  </h4>
                )}
              </div>
              <div>
                <h6
                  style={{
                    color: "#35b0a7",
                    fontSize: "28px",
                    fontWeight: "bold",
                    margin: "36px 0px 20px",
                  }}
                >
                  Check-Out
                </h6>
                {checkout?.length > 0 ? (
                  <div className="d-flex flex-wrap gap-2">
                    {checkout?.map((data) => (
                      <div
                        style={{
                          width: "24%",
                          border: "1px solid #35b0a7",
                          padding: "15px",
                        }}
                      >
                        <p>Branch : {data?.branch?.name}</p>
                        <p>Room Number : {data?.roomNumber}</p>
                        {data?.seatNumber && (
                          <p>Seat Number : {data?.seatNumber}</p>
                        )}
                        <p className="fw-bold">
                          Dates : {formatDate(data?.bookStartDate)} -{" "}
                          {formatDate(data?.bookEndDate)}
                        </p>
                        <p>Name : {data?.user?.firstName}</p>
                        <p>Phone : {data?.user?.phone}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <h4 className="mt-3 text-center  text-danger fw-bold ">
                    No Check-Out on {formatDate(selectedDate)}
                  </h4>
                )}
              </div>
            </div>
            {/* {data ? (
              <BookingReportData data={data} />
            ) : (
              <div className="text-center text-danger fw-bold loading">
                <p>No Bookings Data Available</p>
              </div>
            )} */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookingReports;
