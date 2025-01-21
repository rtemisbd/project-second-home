import React, { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import OrderStatusUpdate from "../../pages/edit/OrderStatusUpdate";
import { AiOutlineEye, AiOutlineFieldTime } from "react-icons/ai";
import SeeOrderDetails from "./SeeOrderDetails";
import Payment from "../../pages/edit/Payment";
import { formatDate } from "../../utils/dateConvert";
import { FaWhatsapp } from "react-icons/fa";
import BookingDatesExtend from "../../pages/edit/BookingDatesExtend";
import BookingSeatDateExtend from "../../pages/edit/BookingSeatDateExtend";

const BookingData = ({
  booking,
  index,
  refetch,
  extraCharge,
  isLoading,
  page,
  size,
}) => {
  // console.log(booking);

  // For Status Modal
  const [statusModalData, setStatusModalData] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  // For Payment Modal
  const [paymentModalData, setPaymentModalData] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  // For Privet Room Modal
  const [showDurationModal, setShowDurationModal] = useState(false);
  const [durationUpdatePrivateRoom, setDurationUpdatePrivateRoom] =
    useState(null);
  const [isIncludeFood, setIsIncludeFood] = useState(false);
  // For Seat Update Duration Modal
  const [discount, setDiscount] = useState(0);
  const [payableAmount, setPayableAmount] = useState(0);
  const [durationUpdateDataSeat, setDurationUpdateDataSeat] = useState(null);
  const [showSeatUpdateDuration, setShowSeatUpdateDuration] = useState(false);
  // Details Modal
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // const formattedDate = new Date(booking?.createdAt).toLocaleString();
  const formattedTime = new Date(booking?.createdAt)
    ?.toLocaleString()
    ?.split(",")[1];

  const handleStatusShow = (statusData) => {
    setShowStatusModal(true);
    setStatusModalData(statusData);
  };

  const handlePaymentShow = (paymentData) => {
    setShowPaymentModal(true);
    setPaymentModalData(paymentData);
  };

  const handleDurationShow = (privateRoomData) => {
    setShowDurationModal(true);
    setDurationUpdatePrivateRoom(privateRoomData);
  };

  const handleSeatShow = (seatData) => {
    setShowSeatUpdateDuration(true);
    setDurationUpdateDataSeat(seatData);
    setShowDurationModal(true);
  };
  const handleShowDetails = (detailsData) => {
    setShowDurationModal(true);
    setShowDetails(true);
    setBookingDetails(detailsData);
  };

  useEffect(() => {
    setIsIncludeFood(booking?.isIncludeFood);
  }, [booking.isIncludeFood]);

  useEffect(() => {
    const totalDiscount = booking?.adjustments?.[0]?.totatAdjustmentAmount || 0;
    const updatedDiscount = booking?.discount || 0;

    // Update the discount to include adjustments
    const newDiscount = updatedDiscount + totalDiscount;
    setDiscount(newDiscount);

    // Calculate and set the payable amount
    const newPayableAmount = (booking?.totalAmount || 0) - newDiscount;
    setPayableAmount(newPayableAmount > 0 ? newPayableAmount : 0); // Ensure no negative value
  }, [booking?.adjustments, booking?.totalAmount, booking?.discount]);

  return (
    <>
      <tr className="bookings_data">
        <td>{(page - 1) * size + index + 1}</td>
        <td
          style={{
            width: "140px",
          }}
        >
          {" "}
          <p>{formatDate(booking?.createdAt)}</p>
          <p>{formattedTime}</p>
        </td>
        <td>
          {" "}
          <p>#{booking?.bookingId} </p>
          <p className="fw-bold">{booking?.bookingInfo?.branch?.name}</p>
        </td>
        <td>
          <p>{booking?.phone}</p>
          <p>{booking?.fullName}</p>
        </td>
        <td>
          {" "}
          {booking?.bookingInfo?.roomType === "Shared Room"
            ? booking?.bookingInfo?.seatBooking?.seatNumber
            : booking?.bookingInfo?.roomNumber}
        </td>
        <td
          style={{
            width: "100px",
          }}
        >
          {" "}
          <p className="fw-bold">Tk {booking?.totalAmount?.toLocaleString()}</p>
          {booking?.bookingInfo?.isIncludeFood === true ? (
            <p
              className="fw-bold"
              style={{
                color: "white",
                backgroundColor: "#35b0a7",
                padding: "0 2px",
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
          <p className="fw-bold">Tk {discount}</p>
        </td>
        <td>
          {" "}
          <p className="fw-bold">
            {/* Tk {booking?.payableAmount?.toLocaleString()} */}
            Tk {payableAmount}
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
          <p className="fw-bold">
            Tk{" "}
            {booking?.transactions[0]?.totalReceiveTk
              ? booking?.transactions[0]?.totalReceiveTk?.toLocaleString()
              : "0"}
          </p>
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
            TK{" "}
            {booking?.transactions[0]?.totalReceiveTk
              ? payableAmount - booking?.transactions[0]?.totalReceiveTk
              : payableAmount}
            {/* Tk {booking?.dueAmount?.toLocaleString()} */}
          </span>
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
        {/* whats app contact */}
        <td>
          <a
            href={`https://api.whatsapp.com/send?phone=88${booking?.phone}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button class="btn position-relative">
              <FaWhatsapp
                style={{
                  width: "32px",
                  height: "32px",
                  cursor: "pointer",
                  color: "#25D366",
                }}
              />
              <span
                class="spinner-grow spinner-grow-sm text-success "
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "-5px", // Adjust this value to move it higher or lower
                  left: "70%",
                  // transform: "translateX(-50%)",
                }}
              ></span>
            </button>
          </a>
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
            <button
              title={`${
                booking?.status === "Approved"
                  ? "Sorry ! Your Booking Already Approved"
                  : ""
              }`}
              type="button"
              className={`rounded ${
                booking?.status === "Approved" ? "bg-white" : "#35b0a7"
              }`}
              disabled={booking?.status === "Approved" ? true : false}
              onClick={() => {
                booking?.bookingInfo?.roomType === "Shared Room"
                  ? handleSeatShow(booking)
                  : handleDurationShow(booking);
              }}
            >
              <AiOutlineFieldTime style={{ width: "24px", height: "24px" }} />
            </button>
          </div>
          {/* Modal order Date Update */}
          {booking?.bookingInfo?.roomType === "Shared Room" &&
          durationUpdateDataSeat ? (
            <div>
              <BookingSeatDateExtend
                data={booking}
                refetch={refetch}
                extraCharge={extraCharge}
                showDurationModal={showDurationModal}
                setShowDurationModal={setShowDurationModal}
              />
            </div>
          ) : (
            ""
          )}
          {durationUpdatePrivateRoom && (
            <div>
              <BookingDatesExtend
                data={booking}
                refetch={refetch}
                extraCharge={extraCharge}
                showDurationModal={showDurationModal}
                setShowDurationModal={setShowDurationModal}
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
          showDetails={showDetails}
          setShowDetails={setShowDetails}
        />
      )}
    </>
  );
};

export default BookingData;
