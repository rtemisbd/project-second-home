import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import locationIcon from "../../assets/img/branchLocationIcon.png";

import "./styles/SingleCard.css";

const VillaCard = ({ villa }) => {
  return (
    <div className="single-card ">
      <Link to={`/villa/${villa._id}`}>
        <Card className="mb-5 w-full ">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-none"
          >
            <img
              className="img_size"
              style={{ borderRadius: "10px 10px 0px 0px" }}
              src={villa?.media?.photos[0]}
              alt="Room Picture"
            />

            <div className="absolute bottom-0 right-0 bg-[#27B3B1] text-white rounded-sm text-sm font-[600] px-1 py-1">
              {villa?.type}
            </div>
          </CardHeader>
          <CardBody className="p-2">
            <div className="flex villas-center justify-between">
              <div>
                <span className="text-sm font-medium bg-[#FCA22A] text-white px-2 py-1 rounded">
                  [ {villa?.resort?.name} ]
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <img
                className="mt-1 mr-1"
                src={locationIcon}
                style={{ height: "15px", width: "15px" }}
                alt=""
              />
              <p className="branch-location">
                <span className="text-[12px] ">{villa?.resort?.address}</span>
              </p>
            </div>

            <div className="">
              <h2 className=" text-[14px] card-title ">
                {villa?.occupancy?.adults} Adult, {villa?.occupancy?.kids} kids
              </h2>
            </div>
          </CardBody>
          <CardFooter className="p-0">
            <div className="card-price flex gap-x-3 px-2 mb-2 hover:text-black">
              <div>
                <div className="flex gap-x-2">
                  {villa?.pricing?.perNight ===
                  villa?.pricing?.afterDiscountPerNight ? (
                    <p>
                      <span className="card-price-sub">
                        BDT{" "}
                        {villa?.pricing?.afterDiscountPerNight?.toLocaleString()}
                      </span>
                      <span className="day">/Night</span>
                    </p>
                  ) : (
                    <>
                      <p className="rotate-line-through text-red-500">
                        <span className="card-price-sub">
                          BDT {villa?.pricing?.perNight?.toLocaleString()}
                        </span>
                        <span className="day">/Night</span>
                      </p>
                      <p>
                        <span className="card-price-sub">
                          BDT{" "}
                          {villa?.pricing?.afterDiscountPerNight?.toLocaleString()}
                        </span>
                        <span className="day">/Night</span>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
};

export default VillaCard;
