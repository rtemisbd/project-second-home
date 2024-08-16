import React, { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import OrderStatusUpdate from "../../pages/edit/OrderStatusUpdate";
import { AiOutlineEye, AiOutlineFieldTime } from "react-icons/ai";
import SeeOrderDetails from "./SeeOrderDetails";
import BookingDateSetUpdate from "../../pages/edit/BookingDateSetUpdate";
import BookingDateUpdate from "../../pages/edit/BookingDateUpdate";
import Payment from "../../pages/edit/Payment";
import { formatDate } from "../../utils/dateConvert";

const BookingData = ({
  booking,
  index,
  refetch,
  transactions,
  extraCharge,
  isLoading,
  page,
}) => {
  // const formattedDate = new Date(booking?.createdAt).toLocaleString();
  const formattedTime = new Date(booking?.createdAt)
    ?.toLocaleString()
    ?.split(",")[1];

  // For Status Modal
  const [statusModalData, setStatusModalData] = useState(null);

  const [showStatusModal, setShowStatusModal] = useState(false);

  const handleStatusShow = (statusData) => {
    setShowStatusModal(true);
    setStatusModalData(statusData);
  };

  // For Payment Modal
  const [paymentModalData, setPaymentModalData] = useState(null);

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handlePaymentShow = (paymentData) => {
    setShowPaymentModal(true);
    setPaymentModalData(paymentData);
  };

  // For Privet Room Modal
  const [showDurationModal, setShowDurationModal] = useState(false);
  const [durationUpdatePrivateRoom, setDurationUpdatePrivateRoom] =
    useState(null);

  const handleDurationShow = (privateRoomData) => {
    setShowDurationModal(true);
    setDurationUpdatePrivateRoom(privateRoomData);
  };

  const [isIncludeFood, setIsIncludeFood] = useState(false);

  // For Seat Update Duration Modal
  const [durationUpdateDataSeat, setDurationUpdateDataSeat] = useState(null);
  const [showSeatUpdateDuration, setShowSeatUpdateDuration] = useState(false);
  const handleSeatShow = (seatData) => {
    setShowSeatUpdateDuration(true);
    setDurationUpdateDataSeat(seatData);
  };

  // Details Modal
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = (detailsData) => {
    setShowDetails(true);
    setBookingDetails(detailsData);
  };

  useEffect(() => {
    setIsIncludeFood(booking?.isIncludeFood);
  }, []);

  return (
    <>
      <tr className="bookings_data ">
        <td>{(page - 1) * 10 + index + 1}</td>

        <td>
          {" "}
          <p>{formatDate(booking?.createdAt)}</p>
          <p>{formattedTime}</p>
        </td>
        <td>
          {" "}
          <p>#{booking?._id?.slice(-5).toUpperCase()} </p>
          <p className="fw-bold">{booking?.bookingInfo?.branch?.name}</p>
        </td>
        <td>
          <p>#{booking?.userId?.slice(-5).toUpperCase()}</p>
          <p>{booking?.fullName}</p>
        </td>
        <td>
          {" "}
          {booking?.bookingInfo?.roomType === "Shared Room"
            ? booking?.bookingInfo?.seatBooking?.seatNumber
            : booking?.bookingInfo?.data?.roomNumber}
        </td>
        <td
          style={{
            width: "100px",
          }}
        >
          {" "}
          <p className="fw-bold">Tk {booking?.totalAmount?.toLocaleString()}</p>
          {booking?.isIncludeFood === true ? (
            <p className="fw-bold food">With Food</p>
          ) : (
            ""
          )}
        </td>
        <td>
          {" "}
          <p className="fw-bold">Tk {booking?.discount?.toLocaleString()}</p>
        </td>
        <td>
          {" "}
          <p className="fw-bold">
            Tk {booking?.payableAmount?.toLocaleString()}
          </p>
        </td>
        <td>
          {" "}
          <span
            className=" fw-bold "
            style={{
              color: booking?.paymentStatus === "Paid" ? "green" : "red",
            }}
          >
            {" "}
            {booking?.paymentStatus}
          </span>
        </td>
        <td>
          {" "}
          <span
            className=" fw-bold"
            style={{
              color: booking?.paymentStatus === "Paid" ? "green" : "red",
            }}
          >
            {" "}
            Tk {booking?.dueAmount?.toLocaleString()}
          </span>
        </td>
        <td>
          <p className="fw-bold">
            Tk {booking?.totalReceiveTk?.toLocaleString()}
          </p>
        </td>
        <td>
          <div className=" d-flex ">
            <div>
              <p
                className="fw-bold"
                style={{
                  color: booking?.status === "Approved" ? "#27b3b1" : "red",
                }}
              >
                {booking?.status}
              </p>
            </div>
            <button
              type="button"
              className="d-flex p-0 "
              style={{
                backgroundColor: "transparent",
              }}
              onClick={() => handleStatusShow(booking)}
            >
              <BiSolidEdit
                style={{
                  width: "24px",
                  height: "24px",
                  color: "black",
                }}
              />
            </button>
            {/* Modal Order Status Update */}
          </div>
          <div>
            {statusModalData && (
              <OrderStatusUpdate
                data={statusModalData}
                refetch={refetch}
                isLoading={isLoading}
                showStatusModal={showStatusModal}
                setShowStatusModal={setShowStatusModal}
              />
            )}
          </div>
        </td>
        <td>
          <div>
            <span onClick={() => handleShowDetails(booking)}>
              <AiOutlineEye
                style={{ width: "24px", height: "24px", cursor: "pointer" }}
              />
            </span>
          </div>
        </td>
        <td>
          <div className="d-flex justify-content-center">
            {booking?.bookingInfo?.roomType === "Shared Room" && (
              <button
                title={`${
                  booking?.status === "Approved"
                    ? "Sorry ! Your Booking Already Approved"
                    : ""
                }`}
                type="button"
                className={`rounded ${
                  booking?.status === "Approved" ? "bg-white" : ""
                }`}
                style={{
                  backgroundColor:
                    booking?.status === "Approved" ? "white" : "#35b0a7",
                }}
                disabled={booking?.status === "Approved" ? true : false}
                onClick={() => handleSeatShow(booking)}
              >
                <AiOutlineFieldTime style={{ width: "24px", height: "24px" }} />
              </button>
            )}
            {booking?.bookingInfo?.roomType === "Private Room" && (
              <button
                title={`${
                  booking?.status === "Approved"
                    ? "Sorry ! Your Booking Already Approved"
                    : ""
                }`}
                type="button"
                className={`rounded ${
                  booking?.status === "Approved" ? "bg-white" : ""
                }`}
                style={{
                  backgroundColor:
                    booking?.status === "Approved" ? "white" : "#35b0a7",
                }}
                disabled={booking?.status === "Approved" ? true : false}
                onClick={() => handleDurationShow(booking)}
              >
                <AiOutlineFieldTime style={{ width: "24px", height: "24px" }} />
              </button>
            )}
          </div>
          {/* Modal order Date Update */}
          {booking?.bookingInfo?.roomType === "Shared Room" &&
          durationUpdateDataSeat ? (
            <div>
              <BookingDateSetUpdate
                data={durationUpdateDataSeat}
                refetch={refetch}
                extraCharge={extraCharge}
                setShowSeatUpdateDuration={setShowSeatUpdateDuration}
                showSeatUpdateDuration={showSeatUpdateDuration}
              />
            </div>
          ) : (
            ""
          )}
          {durationUpdatePrivateRoom && (
            <div>
              <BookingDateUpdate
                data={durationUpdatePrivateRoom}
                refetch={refetch}
                extraCharge={extraCharge}
                showDurationModal={showDurationModal}
                setShowDurationModal={setShowDurationModal}
                setIsIncludeFood={setIsIncludeFood}
                isIncludeFood={isIncludeFood}
              />
            </div>
          )}
        </td>
        <td>
          <div className="d-flex gap-2 fw-bold">
            <button
              type="button"
              style={{ backgroundColor: "#00BBB4" }}
              onClick={() => handlePaymentShow(booking)}
            >
              Payment
            </button>
            {/* 
              <button className="bg-danger">End</button> */}
          </div>
          {paymentModalData && (
            <Payment
              data={paymentModalData}
              refetch={refetch}
              isLoading={isLoading}
              showPaymentModal={showPaymentModal}
              setShowPaymentModal={setShowPaymentModal}
            />
          )}
        </td>
        <td>
          <p className=" fw-bold" style={{ color: "red" }}>
            {booking?.isCancel === "Yes" ? (
              "Cancel Request"
            ) : (
              <span className="text-black">No Request</span>
            )}
          </p>
        </td>
      </tr>
      {/* Modals */}
      {bookingDetails && (
        <SeeOrderDetails
          data={bookingDetails}
          transactions={transactions}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
        />
      )}
    </>
  );
};

export default BookingData;
