import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Slider from "react-slick";

import UseFetch from "../../hooks/useFetch";
import LeftArrow from "../../assets/img/arrow2.png";
import RightArrow from "../../assets/img/arrow1.png";
import "./styles/AllBranch.css";

const AllBranch = () => {
  const { data } = UseFetch(`branch`);

  const [lastSlideIndex, setLastSlideIndex] = useState(0);
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => {
    if (lastSlideIndex === 0) {
      return null;
    } else {
      return <img src={LeftArrow} alt="prevArrow" {...props} />;
    }
  };
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => {
    if (lastSlideIndex === data?.length - 4) {
      return null;
    } else {
      return <img src={RightArrow} alt="nextArrow" {...props} />;
    }
  };
  const settings = {
    dots: false,
    speed: 400,

    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    adaptiveHeight: true,
    arrows: data?.length > 4 ? true : false,
    autoplay: false,
    infinite: true,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    className: "mx-[-15px]",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
          infinite: false,
          // autoplay: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
          // infinite: true,
          // autoplay: true,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 640,
        settings: {
          className: `center ms-[-8px] `,
          afterChange: (index) => {
            setLastSlideIndex(index);
          },
          centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1,

          arrows: false,
          initialSlide: 1,
          speed: 400,
          cssEase: "ease-out",
        },
      },
    ],
  };
  return (
    <div>
      <div>
        <div className=" ">
          <div className="">
            <h2 className="text-xl font-bold ">
              Looking For Best Place To Stay{" "}
            </h2>
            <span className="mt-2 text-[1rem]">
              Our available Branches for your stay
            </span>
            <div className="all_branch mt-4 slider_margin card-slider">
              <Slider {...settings}>
                {data?.map((item) => (
                  <div className="items-start" key={item?._id}>
                    <Link to={`/branch/${item?.name}`}>
                      <Card
                        shadow={false}
                        className="relative grid h-[12rem] items-end justify-center overflow-hidden text-center"
                      >
                        <CardHeader
                          floated={false}
                          shadow={false}
                          color="transparent"
                          className={`absolute inset-0 m-0 rounded-none bg-cover bg-center`}
                          style={{
                            backgroundImage: `url('${item.photos[0]}')`,
                          }}
                        >
                          <div className="to-bg-black-10 absolute inset-0 bg-gradient-to-t from-black/80 " />
                        </CardHeader>
                        <CardBody className="relative ">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "start",
                              width: "317px",
                              height: "48px",
                              padding: "44px 20px 0px 10px",
                              alignItems: "center",
                              flexShrink: 0,
                              background: "rgba(39, 179, 177, 0.80)",
                              marginBottom: "-24px",
                            }}
                          >
                            <i
                              className="fa-solid fa-location-dot text-white me-3 mt-1"
                              style={{
                                marginBottom: "42px",
                              }}
                            ></i>
                            <Typography
                              variant="h5"
                              className="mb-0 text-white text-[1rem] "
                              style={{
                                marginBottom: "35px",
                              }}
                            >
                              {item.name}
                            </Typography>
                          </div>
                        </CardBody>
                      </Card>
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBranch;
