import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import locationIcon from "../../assets/img/branchLocationIcon.png";

import "./styles/SingleCard.css";

const SingleCard = ({ item }) => {
  return (
    <div className="single-card ">
      <Card className="mb-5 w-full ">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none"
        >
          <Link to={`/${item?.category}/${item?.name}/${item._id}`}>
            <img
              className="img_size"
              style={{ borderRadius: "10px 10px 0px 0px" }}
              src={item?.photos[0]}
              alt="Room Picture"
            />
          </Link>
          {item.branchDetails?.name === "Bashundhara" ? (
            <div className="absolute bottom-0 right-0  flex justify-end">
              <p className="bg-[#27B3B1] text-white rounded-sm text-sm font-[600] px-1 py-1 ">
                Already Booked
              </p>
            </div>
          ) : (
            ""
          )}
          {item?.categoryDetails?.name === "Shared Room" ? (
            <div className="absolute bottom-0 right-0  flex justify-end">
              <p className="bg-[#27B3B1] text-white rounded-sm text-sm font-[600] px-1 py-1 ">
                {item?.seatType}-{item?.seatNumber}
              </p>
            </div>
          ) : (
            ""
          )}
        </CardHeader>
        <CardBody className="p-2">
          <Link
            to={`/${item?.category}/${item?.name}/${item._id} `}
            className="hover:text-black"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium bg-[#FCA22A] text-white px-2 py-1 rounded">
                  {item?.categoryDetails?.name}{" "}
                  {item?.categoryDetails?.name !== "Homestay" ? (
                    <>[Female]</>
                  ) : (
                    <>[{item?.roomNumber}]</>
                  )}
                </span>
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
            {item?.categoryDetails?.name !== "Homestay" ? (
              <div className="">
                <h2 className=" text-[14px] card-title ">
                  Room No-{}
                  {/* {item?.roomNumber} */}
                  {item?.categoryDetails?.name === "Private Room"
                    ? item?.roomNumber
                    : item?.property?.roomNumber}
                </h2>
              </div>
            ) : (
              <div className="">
                <h2 className=" text-[14px] card-title ">{item?.name}</h2>
              </div>
            )}
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
              {/* <div className="flex gap-x-2">
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
              </div> */}
            </div>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SingleCard;
