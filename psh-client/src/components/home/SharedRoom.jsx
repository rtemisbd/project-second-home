import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import locationIcon from "../../assets/img/branchLocationIcon.png";
import "./styles/SingleCard.css";

const SharedRoom = ({ item }) => {
  console.log(item);

  return (
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
        </CardHeader>
        <CardBody className="p-2">
          <Link to={`/ `} className="hover:text-black">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium bg-[#FCA22A] text-white px-2 py-1 rounded">
                  {item?.seatType.toUpperCase()}-{item?.seatNumber}
                </span>
              </div>
              <div>
                {item?.property.isPartner === "yes" && (
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
                <span className="text-[10px]">{item?.branchDetails?.name}</span>
              </p>
            </div>

            <div className="">
              <h2 className=" text-[14px] card-title ">
                {item?.property?.name}-{}
                {item?.property?.roomNumber}
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
              <div className="flex gap-x-2">
                {item?.perDay === item?.dAmountForDay ? (
                  <p>
                    <span className="card-price-sub">
                      BDT {item?.dAmountForDay?.toLocaleString()}
                    </span>
                    <span className="day">/day</span>
                  </p>
                ) : (
                  <>
                    <p className="rotate-line-through text-red-500">
                      <span className="card-price-sub">
                        BDT {item?.perDay?.toLocaleString()}
                      </span>
                      <span className="day">/day</span>
                    </p>
                    <p>
                      <span className="card-price-sub">
                        BDT {item?.dAmountForDay?.toLocaleString()}
                      </span>
                      <span className="day">/day</span>
                    </p>
                  </>
                )}
              </div>
              <div className="flex gap-x-2">
                {item?.perMonth === item?.dAmountForMonth ? (
                  <p className="">
                    <span className=" card-price-sub">
                      BDT {item?.dAmountForMonth?.toLocaleString()}
                    </span>
                    <span className="day">/month</span>
                  </p>
                ) : (
                  <>
                    <p className="rotate-line-through text-red-500">
                      <span className=" card-price-sub">
                        BDT {item?.perMonth?.toLocaleString()}
                      </span>
                      <span className="day">/month</span>
                    </p>
                    <p className="">
                      <span className=" card-price-sub">
                        BDT {item?.dAmountForMonth?.toLocaleString()}
                      </span>
                      <span className="day">/month</span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SharedRoom;
