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
      <Link to={`/`}>
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
              {villa?.resort?.name}
            </div>
          </CardHeader>
          <CardBody className="p-2">
            <div className="flex villas-center justify-between">
              <div>
                <span className="text-sm font-medium bg-[#FCA22A] text-white px-2 py-1 rounded">
                  [{villa?.type}]
                </span>
              </div>

              <div>
                {villa?.branchDetails?.foodAmount === 0 && (
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
                <span className="text-[10px]">{villa?.location}</span>
              </p>
            </div>

            <div className="">
              <h2 className=" text-[14px] card-title ">
                {villa?.totalFloor} Floor, {villa?.totalRoom} Room
              </h2>
            </div>
          </CardBody>
          <CardFooter className="p-0">
            <div className="card-price flex gap-x-3 px-2 mb-2 hover:text-black">
              <div>
                <div className="flex gap-x-2">
                  <p>
                    <span className="card-price-sub">
                      BDT {villa?.pricing?.perNight?.toLocaleString()}
                    </span>
                    <span className="day">/per night</span>
                  </p>
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
