import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { CiLocationOn } from "react-icons/ci";

import whislistIcon from "../../assets/img/Wishlist.png";
import squareIcon from "../../assets/img/square.png";
import doubleBedIcon from "../../assets/img/double-bed.png";
import bathroomIcon from "../../assets/img/Bath.png";
import personIcon from "../../assets/img/personIcon.png";
import seatIcon from "../../assets/img/seatIcon.png";
import "./HotelList.css";

function HotelsList({ item }) {
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
        break; // No need to continue checking once a match is found
      }
    }
  }

  return (
    <>
      <div className="list-lg mb-5 w-full">
        <Link to={`/room/${item._id}`}>
          <div className="card_category hover:text-black bg-white">
            <div className="w-full flex items-center gap-5 pr-2">
              <div className="relative">
                {item?.photos[0] ? (
                  <img
                    className="rounded"
                    src={item?.photos[0]}
                    alt=""
                    style={{ width: "290px", height: "200px" }}
                  />
                ) : (
                  <img
                    className="rounded"
                    src={
                      "https://i.ibb.co/fvtDpn2/360-F-335145501-8-Cr-SIh-UYBs-G7-Fg-H7-YPHFI0r-Y5-Ieb-Qy-EO.jpg"
                    }
                    alt=""
                    style={{ width: 290, height: 360 }}
                  />
                )}

                <div className="absolute top-0">
                  <img src={whislistIcon} alt="" />
                </div>

                {/* {isIntoDate ? (
                  <div className="absolute bottom-0 right-0 bg-[#27B3B1] text-white rounded-sm text-sm font-[600] p-3">
                    <span>Join for Waiting List</span>
                  </div>
                ) : (
                  ""
                )} */}
                {isSeatIntoDate &&
                item?.category?.name === "Shared Room" &&
                isAlreadySeatBook?.length > 0 ? (
                  <div className="absolute bottom-0 right-0 bg-[#27B3B1] text-white rounded-sm text-sm font-[600] p-3">
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
                )}
                {!isSeatIntoDate && item?.category?.name === "Shared Room" ? (
                  <div className="absolute bottom-0 right-0 bg-[#27B3B1] text-white rounded-sm text-sm font-[600] p-3">
                    <span>{item?.seats?.length} Seat Available</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="py-2" style={{ width: "70%" }}>
                <div className="flex justify-between">
                  <p className="text-start font-bold">{item?.name}</p>
                  <p className="text-start capitalize font-bold text-white bg-[#FCA22A] px-2 py-1 rounded">
                    {item?.category?.name} ({item?.type})
                  </p>
                </div>

                <div className="lg:flex mt-2">
                  <div className="flex items-center">
                    <CiLocationOn />
                    <p className="text-start ms-2">{item?.branch?.name}</p>
                  </div>

                  <div className="grid grid-cols-12">
                    <div className="flex flex-col items-start right-side lg:col-span-4 md:col-span-4">
                      <span
                        className=" text-[10px] border px-1 py-1 font-medium rounded-sm ml-2"
                        style={{ borderColor: "rgba(53, 176, 167, 0.50" }}
                      >
                        Near New Market Dhaka
                      </span>
                    </div>
                    <div className="flex flex-col items-start right-side lg:col-span-4 md:col-span-4">
                      <span
                        className=" text-[10px] border px-1 py-1 font-medium rounded-sm ml-2"
                        style={{ borderColor: "rgba(53, 176, 167, 0.50" }}
                      >
                        Near Dhaka City College
                      </span>
                    </div>
                    <div className="flex flex-col items-start lg:col-span-4 md:col-span-4">
                      <span
                        className="font-medium  px-1 py-1 rounded-sm text-[10px] border ml-2"
                        style={{ borderColor: "rgba(53, 176, 167, 0.50" }}
                      >
                        Near Popular Hospital
                      </span>
                    </div>
                  </div>
                </div>

                {/* <div className="px-5 py-2 list_facility mt-4">
                  <ul className=" flex gap-x-5">
                    <div className="grid grid-cols-12">
                      {item.facility.map((facility) => (
                        <div className="flex flex-col items-start right-side lg:col-span-2">
                          <li>
                            *
                            <span className="text-[12px] ">
                              {facility.name}
                            </span>
                          </li>
                        </div>
                      ))}
                    </div>
                  </ul>
                </div> */}
                <div className="flex items-center mt-3 gap-x-3">
                  <div className="flex">
                    <div>
                      <img src={squareIcon} alt="" />
                    </div>
                    <div className="ml-2 text-sm">
                      <span>Area {item.area} Ft </span>
                    </div>
                  </div>
                  <div className="flex">
                    <div>{/* <img src={homeIcon} alt="" /> */}</div>
                    <div className="ml-2 text-sm">
                      {item.furnitured === "yes" ? (
                        <span>Full Furnished</span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="flex">
                    <div>
                      <img src={personIcon} alt="" />
                    </div>
                    <div className="ml-2 text-sm">
                      <span>{item?.totalPerson} Peroson </span>
                    </div>
                  </div>
                  <div className="flex">
                    <div>
                      <img src={seatIcon} alt="" />
                    </div>
                    <div className="ml-2 text-sm">
                      <span>{item?.seats?.length} Seats </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between  mt-5 ">
                  <div className="flex">
                    <p className="font-bold">5.0</p>
                    <div>
                      <i className="fas fa-star ms-2 hotel_icon" />
                      <i className="fas fa-star ms-2 hotel_icon" />
                      <i className="fas fa-star ms-2 hotel_icon" />
                      <i className="fas fa-star ms-2 hotel_icon" />
                      <i className="fas fa-star ms-2 hotel_icon" />
                    </div>
                    <p className="me-2">(5 Reviews)</p>
                  </div>

                  <div>
                    {item?.category?.name == "Shared Room" ? (
                      <div className="flex price-part">
                        <p className="mx-2 month">
                          {" "}
                          {item?.seats[0].perDay} <span>BDT/day</span>
                        </p>
                        <p className="month">
                          {" "}
                          {item?.seats[0].perMonth} <span>BDT/month</span>
                        </p>
                      </div>
                    ) : (
                      <div className="flex price-part">
                        <p className="mx-2 month ">
                          {" "}
                          {item.perDay} <span>BDT/day</span>
                        </p>
                        <p className="month">
                          {" "}
                          {item.perMonth} <span>BDT/month</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="list-sm" style={{ width: "-webkit-fill-available" }}>
        <Link to={`/room/${item._id}`} className=" ">
          <Card
            className="mb-5 "
            style={{
              width: "100%",
              height: "308px",
            }}
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 rounded-none"
            >
              <img
                className="img_size"
                style={{ borderRadius: "5px 5px 0px 0px" }}
                src={item.photos[0]}
                alt="ui/ux review check"
              />
              <div className="absolute top-2 right-2">
                <img src={whislistIcon} alt="" />
              </div>
            </CardHeader>
            <CardBody className="p-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CiLocationOn />
                  <p className="text-start ms-2">{item?.branch?.name}</p>
                </div>
                <Typography variant="div">
                  <span className="text-sm font-medium bg-[#FCA22A] text-white px-2 py-1 rounded">
                    {item?.category?.name}({item.type.toUpperCase()})
                  </span>
                </Typography>
                <Typography variant="div" className="flex ">
                  {/* <span className="text-sm">4.8</span>
  <img
    className="ml-1 "
    style={{ width: "18px", height: "18px" }}
    src={startIcon}
    alt=""
  /> */}
                </Typography>
              </div>
              <div className=" ">
                <Typography variant="div">
                  <span>{item.city}</span>
                </Typography>
              </div>

              <div className="">
                <Typography>
                  <h2 className=" text-[18px] font-bold">
                    {item.name.slice(0, 20)}
                  </h2>
                </Typography>
              </div>
            </CardBody>

            <CardFooter className="px-2 py-2">
              <div className="flex items-center">
                <div className="flex"></div>
                <div className="flex ml-1 ">
                  <div>
                    <img src={doubleBedIcon} alt="" />
                  </div>
                  <div className=" text-[12px]">
                    <span>{item.bedroom} Beds </span>
                  </div>
                </div>
                <div className="flex ml-1">
                  <div>
                    <img src={bathroomIcon} alt="" />
                  </div>
                  <div className=" text-[12px]">
                    <span>{item.bathroom} Bathrooms </span>
                  </div>
                </div>
              </div>

              <div className="card-price flex gap-x-3 mt-2">
                {item?.category?.name == "Shared Room" ? (
                  <div className="flex price-part">
                    <p className="mx-2 month">
                      {" "}
                      {item?.seats[0].perDay} <span>BDT/day</span>
                    </p>
                    <p className="month">
                      {" "}
                      {item?.seats[0].perMonth} <span>BDT/month</span>
                    </p>
                  </div>
                ) : (
                  <div className="flex price-part">
                    <p className="mx-2 month ">
                      {" "}
                      {item.perDay} <span>BDT/day</span>
                    </p>
                    <p className="month">
                      {" "}
                      {item.perMonth} <span>BDT/month</span>
                    </p>
                  </div>
                )}
              </div>
            </CardFooter>
          </Card>
        </Link>
      </div>
    </>
  );
}

export default HotelsList;
