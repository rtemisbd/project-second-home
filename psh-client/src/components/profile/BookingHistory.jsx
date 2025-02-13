import React, { useState } from "react";
import userEndOrder from "../../hooks/userEndOrder";
import { UserBooking } from "./UserBooking";
import { CancelBooking } from "./CancelBooking";

const BookingHistory = () => {
  const [userOrder] = userEndOrder();
  const [detailsShow, setDetailsShow] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);

  const handleDetailsShow = () => setDetailsShow(!detailsShow);
  const handleCancelShow = () => setCancelShow(!cancelShow);
  console.log(userOrder);

  return (
    <div className="md:p-0 sm:p-2">
      <h2 className="mb-5 text-[32px] py-2 font-bold">Booking History</h2>
      {userOrder?.length > 0 ? (
        <div className="h-full w-full lg:overflow-hidden md:overflow-x-scroll sm:overflow-x-scroll grid grid-cols-1 md:grid-cols-2 gap-12 pb-12">
          {userOrder.map((order) => (
            <div key={order?._id} className="border-gray-600 shadow-xl">
              <div className="p-3 ">
                <div className="m-0 rounded-none">
                  <h2 className="font-bold">Booking Id : {order?.bookingId}</h2>
                  <h2 className="font-bold text-sm">
                    Room Category : {order?.bookingInfo?.roomType}
                  </h2>
                  <h2 className="font-bold text-sm">
                    Branch : {order?.branch?.name}
                  </h2>
                  <div className="w-full flex justify-end mb-2 pr-4">
                    <p className="text-sm">
                      Status :{" "}
                      <span
                        className="font-bold "
                        style={{
                          color:
                            order?.status === "Approved" ? "#00bbb4" : "red",
                        }}
                      >
                        {order?.status}
                      </span>
                    </p>
                  </div>
                </div>
                <hr />
                <div className="p-2">
                  <p>
                    Booking Date :{" "}
                    {
                      new Date(order?.bookingInfo?.rentDate?.bookStartDate)
                        ?.toLocaleString()
                        ?.split(",")[0]
                    }{" "}
                    -{" "}
                    {
                      new Date(order?.bookingInfo?.rentDate?.bookEndDate)
                        ?.toLocaleString()
                        ?.split(",")[0]
                    }
                  </p>

                  <p>
                    Payable Amount :{" "}
                    <span className="font-bold ">
                      BDT {order?.payableAmount}
                    </span>
                  </p>
                  <p>
                    Payment Status :{" "}
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
                <div className="p-0">
                  <div className="p-2 flex justify-end gap-2 ">
                    <button
                      onClick={handleDetailsShow}
                      className="bg-[#35b0a7] text-white px-2 rounded"
                    >
                      Details
                    </button>
                    <button
                      onClick={handleCancelShow}
                      className={` text-white px-2 rounded ${
                        order?.status === "Canceled"
                          ? "bg-red-200"
                          : "bg-red-500"
                      }`}
                      disabled={order?.status === "Canceled" ? true : false}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-10 text-red-500">No Booking Found</div>
      )}
      {/* <UserBooking
        handleDetailsShow={handleDetailsShow}
        detailsShow={detailsShow}
        // endOrder={seeBooking}
      />
      <CancelBooking
        handleCancelShow={handleCancelShow}
        cancelShow={cancelShow}
        // endOrder={seeBooking}
      /> */}
    </div>
  );
};

export default BookingHistory;
