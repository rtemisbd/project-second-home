import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

import { Link } from "react-router-dom";

import locationIcon from "../../assets/img/branchLocationIcon.png";

import "./styles/SingleCard.css";

const SingleCard = ({ item }) => {
  // Checking Booking Dates for privet room and apartment
  const currentDate = new Date().toISOString().split("T")[0];
  // Check if the target date falls within any of the date ranges
  let isIntoDate = false;

  for (const range of item?.rentDate) {
    if (currentDate <= range.bookEndDate) {
      isIntoDate = true;
      break; // No need to continue checking once a match is found
    }
  }

  const isAlreadySeatBook = [];

  let isSeatIntoDate = false;
  for (const range of item?.seats) {
    for (const rentDate of range?.rentDate) {
      isAlreadySeatBook.push(rentDate);
      if (currentDate <= rentDate.bookEndDate) {
        isSeatIntoDate = true;
        break;
      }
    }
  }

  return (
    <>
      <div className="single-card ">
        <Card className="mb-5 w-full ">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-none"
          >
            <Link to={`/${item?.name}/${item._id}`}>
              <img
                className="img_size"
                style={{ borderRadius: "10px 10px 0px 0px" }}
                src={item.photos[0]}
                alt="Room Picture"
              />
            </Link>

            {/* {isIntoDate ? (
              <div className="absolute bottom-0 right-0 bg-[#27B3B1] text-white rounded-sm text-sm font-[600] px-1 py-1">
                <span>Already Booked</span>
              </div>
            ) : (
              ""
            )} */}

            {item.branchDetails?.name === "Bashundhara" ? (
              <div className="absolute bottom-0 right-0 bg-[#27B3B1] text-white rounded-sm text-sm font-[600] px-1 py-1">
                <span>Already Booked</span>
              </div>
            ) : (
              ""
            )}

            {/* {isSeatIntoDate &&
            item?.category?.name === "Shared Room" &&
            isAlreadySeatBook?.length > 0 ? (
              <div className="absolute bottom-0 right-0 bg-[#27B3B1] text-white rounded-sm text-sm font-[600] px-1 py-1">
                <span>
                  {item?.seats?.length === isAlreadySeatBook?.length
                    ? ""
                    : `Only ${
                        item?.seats?.length - isAlreadySeatBook?.length
                      } Seat Left`}
                </span>
              </div>
            ) : (
              ""
            )} */}
            {/* {!isSeatIntoDate && item?.category?.name === "Shared Room" ? (
              <div className="absolute bottom-0 right-0 bg-[#27B3B1] text-white rounded-sm text-sm font-[600] px-1 py-1">
                <span>{item?.seats?.length} Seat Available</span>
              </div>
            ) : (
              ""
            )} */}
            {item?.categoryDetails?.name === "Shared Room" ? (
              <div className="absolute bottom-0 right-0 bg-[#27B3B1] text-white rounded-sm text-sm font-[600] px-1 py-1">
                <span>{item?.seats?.length} Seat Room</span>
              </div>
            ) : (
              ""
            )}
          </CardHeader>
          <CardBody className="p-2">
            <Link
              to={`/${item?.name}/${item._id}`}
              className="hover:text-black"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium bg-[#FCA22A] text-white px-2 py-1 rounded">
                    {item?.categoryDetails?.name}({item.type.toUpperCase()})
                  </span>
                </div>
                <div>
                  {item?.isPartner === "yes" && (
                    <span className="text-sm font-medium bg-[#fc2a2a] text-white px-2 py-1 rounded">
                      PSH Partner
                    </span>
                  )}
                </div>
                <div>
                  {item?.branchDetails?.foodAmount === 0 && (
                    <span className="text-sm font-medium bg-[#27B3B1] text-white px-2 py-1 rounded">
                      With Food
                    </span>
                  )}
                </div>
              </div>
              <div className="flex itmes-center">
                <img
                  className="mt-1"
                  src={locationIcon}
                  style={{ height: "15px", width: "15px" }}
                  alt=""
                />
                <p className="branch-location">
                  <span className="text-[10px]">
                    {item?.branchDetails?.name}
                  </span>
                </p>
              </div>

              <div className="">
                <h2 className=" text-[14px] card-title ">
                  {item.name.slice(0, 29)}-({item?.roomNumber}){" "}
                  {item.name?.length > 29 ? "..." : ""}
                </h2>
              </div>
            </Link>
          </CardBody>

          <CardFooter className="p-0">
            <Link
              to={`/${item?.name}/${item._id}`}
              className="card-price flex gap-x-3 px-2 mb-2 hover:text-black"
            >
              <div>
                {item?.categoryDetails?.name === "Shared Room" ? (
                  <>
                    <div className="flex gap-x-2">
                      {item?.seats[0]?.perDay ===
                      item?.seats[0]?.dAmountForDay ? (
                        <p>
                          <span className="card-price-sub">
                            BDT{" "}
                            {item?.seats[0]?.dAmountForDay?.toLocaleString()}
                          </span>
                          <span className="day">/day</span>
                        </p>
                      ) : (
                        <>
                          <p className="rotate-line-through text-red-500">
                            <span className="card-price-sub">
                              BDT {item?.seats[0]?.perDay?.toLocaleString()}
                            </span>
                            <span className="day">/day</span>
                          </p>
                          <p>
                            <span className="card-price-sub">
                              BDT{" "}
                              {item?.seats[0]?.dAmountForDay?.toLocaleString()}
                            </span>
                            <span className="day">/day</span>
                          </p>
                        </>
                      )}
                    </div>
                    <div className="flex gap-x-2">
                      {item?.seats[0]?.perMonth ===
                      item?.seats[0]?.dAmountForMonth ? (
                        <p className="">
                          <span className=" card-price-sub">
                            BDT{" "}
                            {item?.seats[0]?.dAmountForMonth?.toLocaleString()}
                          </span>
                          <span className="day">/month</span>
                        </p>
                      ) : (
                        <>
                          <p className="rotate-line-through text-red-500">
                            <span className=" card-price-sub">
                              BDT {item?.seats[0]?.perMonth?.toLocaleString()}
                            </span>
                            <span className="day">/month</span>
                          </p>
                          <p className="">
                            <span className=" card-price-sub">
                              BDT{" "}
                              {item?.seats[0]?.dAmountForMonth?.toLocaleString()}
                            </span>
                            <span className="day">/month</span>
                          </p>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex gap-x-2">
                      {item?.perDay === item?.dAmountForDay ? (
                        <p>
                          <span className=" card-price-sub">
                            BDT {item.dAmountForDay?.toLocaleString()}
                          </span>
                          <span className="day">/day</span>
                        </p>
                      ) : (
                        <>
                          <p className="rotate-line-through text-red-500">
                            <span className=" card-price-sub">
                              BDT {item.perDay?.toLocaleString()}
                            </span>
                            <span className="day">/day</span>
                          </p>
                          <p>
                            <span className=" card-price-sub">
                              BDT {item.dAmountForDay?.toLocaleString()}
                            </span>
                            <span className="day">/day</span>
                          </p>
                        </>
                      )}
                    </div>

                    {/* Month Price  */}
                    <div className="flex gap-x-2">
                      {item?.perMonth === item?.dAmountForMonth ? (
                        <p>
                          <span className="card-price-sub">
                            {" "}
                            BDT {item.dAmountForMonth?.toLocaleString()}
                          </span>
                          <span className="day">/month</span>
                        </p>
                      ) : (
                        <>
                          <p className="rotate-line-through text-red-500">
                            <span className="card-price-sub">
                              {" "}
                              BDT {item.perMonth?.toLocaleString()}
                            </span>
                            <span className="day">/month</span>
                          </p>
                          <p>
                            <span className="card-price-sub">
                              {" "}
                              BDT {item.dAmountForMonth?.toLocaleString()}
                            </span>
                            <span className="day">/month</span>
                          </p>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </Link>
          </CardFooter>
          {/* <div className="absolute right-2 bottom-5 text-[14px]">
            <Link
              to="/promo"
              target="_blank"
              className="hover:text-[#27b3b1] text-[#35B0A7] font-bold"
            >
              {" "}
              Get Special Discount
            </Link>
          </div> */}
          {/* <div className="absolute right-7 bottom-12 text-[14px]">
            <p className="hover:text-[#27b3b1] text-[#35B0A7] font-bold">
              {" "}
              (After Discount)
            </p>
          </div> */}
        </Card>
      </div>
    </>
  );
};

export default SingleCard;
