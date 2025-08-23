const BookingCard = ({
  order,
  handleMakePaymentShow,
  handleCancelShow,
  handleDetailsShow,
}) => {
  return (
    <div
      key={order?._id}
      className=" border-2 border-opacity-5 border-gray-600 shadow-md rounded-lg"
    >
      <div className="p-3 ">
        <div className="m-0 rounded-none">
          <div className="w-full flex justify-end mb-2 pr-4">
            <p className="text-sm">
              Booking Status :{" "}
              <span
                className="font-bold "
                style={{
                  color: order?.status === "Approved" ? "#00bbb4" : "red",
                }}
              >
                {order?.status}
              </span>
            </p>
          </div>
          <h2 className="font-bold">Booking Id : {order?.bookingId}</h2>
          <p className="font-bold text-sm">
            Booking Date :{" "}
            {
              new Date(order?.rentDate?.bookStartDate)
                ?.toLocaleString()
                ?.split(",")[0]
            }{" "}
            -{" "}
            {
              new Date(order?.rentDate?.bookEndDate)
                ?.toLocaleString()
                ?.split(",")[0]
            }
          </p>
          <h2 className="font-bold text-sm">
            Room Category : {order?.roomType}
          </h2>
          <h2 className="font-bold text-sm">
            Branch : {order?.branchDetails?.name}
          </h2>
        </div>
        <hr />
        <div className="p-2 text-sm flex justify-between">
          <div>
            <p>
              Total Amount :{" "}
              <span className="font-bold ">BDT {order?.totalAmount}</span>
            </p>
            <p>
              Discount :{" "}
              <span className="font-bold ">BDT {order?.discount}</span>
            </p>

            <p>
              Payment Status :{" "}
              <span
                className="font-bold "
                style={{
                  color: order?.paymentStatus === "Paid" ? "#00bbb4" : "red",
                }}
              >
                {order?.paymentStatus}
              </span>
            </p>
          </div>
          <div>
            <p>
              Payable Amount :{" "}
              <span className="font-bold ">BDT {order?.payableAmount}</span>
            </p>
            <p className="mb-2">
              Total Paid :{" "}
              <span className="font-bold ">
                BDT{" "}
                {order?.transactions[0]?.totalReceiveTk
                  ? order?.transactions[0]?.totalReceiveTk
                  : 0}
              </span>
            </p>
            <hr />

            <p className="my-2">
              Due Amount :{" "}
              <span
                className={`font-bold `}
                style={{
                  color: order?.dueAmount !== 0 ? "red" : "green",
                }}
              >
                BDT {order?.dueAmount}
              </span>
            </p>
          </div>
        </div>

        <div className="p-0">
          <div className="p-2 flex justify-end gap-2">
            <button
              onClick={() => handleDetailsShow(order)}
              className="bg-[#35b0a7] text-white px-1 py-1 md:px-2 rounded"
            >
              Details
            </button>
            <button
              onClick={() => handleMakePaymentShow(order, payableAmount)}
              className={` text-white px-1 py-1 md:px-2 rounded ${
                order?.status === "Canceled" ? "bg-red-200" : "bg-[#FCA22A]"
              } ${order?.paymentStatus === "Paid" ? "hidden" : ""}`}
              disabled={order?.status === "Canceled" ? true : false}
            >
              Make Payment
            </button>
            <button
              onClick={() => handleCancelShow(order)}
              className={` text-white px-1 py-1 md:px-2 rounded ${
                order?.status === "Canceled" ? "bg-red-200" : "bg-red-500"
              }`}
              disabled={order?.status === "Canceled" ? true : false}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
