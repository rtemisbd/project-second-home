import React, { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import OrderStatusUpdate from "../../pages/edit/OrderStatusUpdate";
import { AiOutlineEye, AiOutlineFieldTime } from "react-icons/ai";
import SeeOrderDetails from "./SeeOrderDetails";
import BookingDateSetUpdate from "../../pages/edit/BookingDateSetUpdate";
import BookingDateUpdate from "../../pages/edit/BookingDateUpdate";
import Payment from "../../pages/edit/Payment";

const BookingData = ({
  booking,
  index,
  refetch,
  transactions,
  extraCharge,
  isLoading,
}) => {
  const formattedDate = new Date(booking?.createdAt).toLocaleString();
  const formattedTime = new Date(booking?.createdAt)
    ?.toLocaleString()
    ?.split(",")[1];

  // For Order Deatails
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // For Privet Room
  const [durationModal, setDurationModal] = useState(false);
  const handleDurationClose = () => setDurationModal(false);
  const handleDurationShow = () => setDurationModal(true);

  // For Seat
  const [durationSeatModal, setDurationSeatModal] = useState(false);
  const handleSeatDurationClose = () => setDurationSeatModal(false);
  const handleSeatDurationShow = () => setDurationSeatModal(true);
  const [isIncludeFood, setIsIncludeFood] = useState(false);

  useEffect(() => {
    setIsIncludeFood(booking?.isIncludeFood);
  }, []);

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        {" "}
        <p>{formattedDate?.split(",")[0]}</p>
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
      <td>
        {" "}
        <p className="fw-bold">Tk {booking?.totalAmount?.toLocaleString()}</p>
        {booking?.isIncludeFood === true ? (
          <p
            className="fw-bold"
            style={{
              color: "#35b0a7",
            }}
          >
            With Food
          </p>
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
        <p className="fw-bold">Tk {booking?.payableAmount?.toLocaleString()}</p>
      </td>
      <td>
        {" "}
        <span
          className=" fw-bold "
          style={{ color: booking?.paymentStatus === "Paid" ? "green" : "red" }}
        >
          {" "}
          {booking?.paymentStatus}
        </span>
      </td>
      <td>
        {" "}
        <span
          className=" fw-bold"
          style={{ color: booking?.paymentStatus === "Paid" ? "green" : "red" }}
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
            data-bs-toggle="modal"
            data-bs-target={`#status${booking._id}`}
            className="d-flex p-0 "
            style={{
              backgroundColor: "transparent",
            }}
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
          <OrderStatusUpdate data={booking} refetch={refetch} />
        </div>
      </td>
      <td>
        <div>
          <span onClick={handleShow}>
            <AiOutlineEye
              style={{ width: "24px", height: "24px", cursor: "pointer" }}
            />
          </span>

          {/* Modal Order Details */}
          <SeeOrderDetails
            data={booking}
            transactions={transactions}
            handleClose={handleClose}
            show={show}
          />
        </div>
      </td>
      <td>
        <div className="d-flex justify-content-center">
          <button
            onClick={handleDurationShow}
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
          >
            <AiOutlineFieldTime style={{ width: "24px", height: "24px" }} />
          </button>
        </div>
        {/* Modal order Date Update */}
        {booking?.bookingInfo?.roomType === "Shared Room" ? (
          <div>
            <BookingDateSetUpdate
              data={booking}
              refetch={refetch}
              extraCharge={extraCharge}
              handleDurationClose={handleDurationClose}
              durationModal={durationModal}
            />
          </div>
        ) : (
          <div>
            <BookingDateUpdate
              data={booking}
              refetch={refetch}
              extraCharge={extraCharge}
              handleDurationClose={handleDurationClose}
              durationModal={durationModal}
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
            data-bs-toggle="modal"
            data-bs-target={`#payment${booking._id}`}
            style={{ backgroundColor: "#00BBB4" }}
          >
            Payment
          </button>
          {/* 
              <button className="bg-danger">End</button> */}
        </div>
        <Payment data={booking} refetch={refetch} isLoading={isLoading} />
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
  );
};

export default BookingData;
