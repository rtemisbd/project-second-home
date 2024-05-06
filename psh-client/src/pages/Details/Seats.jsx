import React from "react";
import { ImInfo } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";

import {
  placeSeatBooking,
  removeSeatBooking,
} from "../../redux/reducers/seatBookingSlice";
import Skeleton from "react-loading-skeleton";

const Seats = ({ data, handleSubmit }) => {
  const dispatch = useDispatch();

  const seatBooking = useSelector((state) => state.seatBooking.seatBooking);

  const handleSeat = (seat) => {
    dispatch(placeSeatBooking(seat));
  };

  const handleRemoveSeat = () => {
    dispatch(removeSeatBooking());
  };

  const currentDate = new Date().toISOString().split("T")[0];
  const isAlreadySeatBook = [];

  let isSeatIntoDate = false;
  for (const range of data?.seats) {
    for (const rentDate of range?.rentDate) {
      isAlreadySeatBook.push(range);
      if (currentDate <= rentDate.bookEndDate) {
        isSeatIntoDate = true;
        break; // No need to continue checking once a match is found
      }
    }
  }

  return (
    <>
      <div className="facility_h1 p-2">
        <h2 className="text-xl font-bold text-gray-900">
          Seat Type <span className="text-sm">(Choose one Seat)</span>
        </h2>
      </div>
      <div className="bg-[#E9EDFB] px-4 h-[48px] flex items-center">
        <ImInfo className="" />
        <p className="pl-4">
          Room availability is shown based on today's availability.{" "}
        </p>
      </div>

      {data.seats &&
        data.seats.map((item) => {
          // const bookedSeat = isAlreadySeatBook?.find(
          //   (rent) => rent._id === item?._id
          // );
          // console.log(item?.rentDate.filter((rent) => rent?._id));

          return (
            <div
              key={item._id}
              className="p-5"
              style={{
                boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.10)",
                borderRadius: "0px 0px 5px 5px",
              }}
            >
              <div className=" sm:block md:flex justify-between items-center">
                <div className="seat-section">
                  <div className="md:flex items-center gap-x-7 ">
                    {item.photos?.length > 0 ? (
                      <img
                        src={item.photos ? item.photos[0] : ""}
                        alt=""
                        // style={{ width: "208px", height: "160px" }}
                        className="rounded seat-img"
                      />
                    ) : (
                      <Skeleton className="seat-img" />
                    )}

                    <div className=" w-full ">
                      <p className="text-start font-bold">
                        {item?.name}
                        {/* {bookedSeat?._id === item?._id ? (
                          <span className="text-red-500 ml-2">(Booked)</span>
                        ) : (
                          ""
                        )} */}
                      </p>
                      <div className="flex mt-2">
                        <div>
                          <img src="/images/category-pax.svg.png" alt="" />
                        </div>
                        <div>
                          <p className="text-start ms-2">Max person: 1</p>
                        </div>
                      </div>
                      <div className="flex mt-2">
                        <div>
                          <img src="/images/Group 2166.png" alt="" />
                        </div>
                        <div>
                          <p className="text-start ms-2">{item?.seatType}</p>
                        </div>
                      </div>

                      {/* <div className="flex mt-2">
                        <div>
                          <img src="/images/category-window.svg.png" alt="" />
                        </div>
                        <div>
                          <p className="text-start ms-2">Window outside view</p>
                        </div>
                      </div> */}
                      <div className="flex mt-2 text-sm">
                        <div>
                          <span>Rent : </span>
                        </div>
                        <div className="flex gap-x-2">
                          <p className="text-start ms-2 bg-[#27B3B1] text-white px-2 rounded">
                            {item?.perDay?.toLocaleString()}/ Day
                          </p>
                          <p className="text-start  bg-[#27B3B1] text-white px-2 rounded">
                            {item?.perMonth?.toLocaleString()}/ month
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="seatNumer text-center font-bold rounded mt-5">
                    <p className="text-sm"> Seat Number</p>
                    <div className="text-center w-full font-bold text-sm">
                      <span> {item.seatNumber}</span>
                    </div>
                  </div>
                  {/* <div className="w-full">
                    <button
                      className="bg-[#00A0FF] px-8 py-2 text-sm text-white mt-3 rounded cursor-pointer w-full"
                      onClick={handleSubmit}
                    >
                      Add to Wish List
                    </button>
                  </div> */}

                  <div className="  text-sm mt-3 rounded text-center">
                    {seatBooking?._id === item._id ? (
                      <div
                        className="bg-red-500 px-8 py-2 cursor-pointer rounded md:ms-5 sm:ms-0"
                        onClick={handleRemoveSeat}
                      >
                        <button className="text-white hover:text-white ">
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div
                        className="bg-[#00BBB4] px-8 py-2 cursor-pointer rounded md:ms-5 sm:ms-0"
                        onClick={() => handleSeat(item)}
                      >
                        <button className={`text-white hover:text-white `}>
                          Choose
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Seats;
