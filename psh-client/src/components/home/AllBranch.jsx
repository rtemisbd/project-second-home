import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import "./styles/AllBranch.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import { branchSlider } from "../../helpers/utils/branchSlider";
import UseFetch from "../../hooks/useFetch";

const AllBranch = () => {
  const { data } = UseFetch(`branch`);
  const splideRef = useRef(null); // Ref to control Splide instance
  const [activeIndex, setActiveIndex] = useState(0);

  const totalSlides = data.length;

  // Update active index on slide movement
  const handleMove = (splide) => {
    setActiveIndex(splide.index);
  };

  // Handle previous button click
  const handlePrevClick = () => {
    if (splideRef.current) {
      splideRef.current.splide.go("<");
    }
  };

  // Handle next button click
  const handleNextClick = () => {
    if (splideRef.current) {
      splideRef.current.splide.go(">");
    }
  };

  const isFirstSlide = activeIndex === 0;
  const isLastSlide = activeIndex === totalSlides - 1;

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
            <div className="all_branch slider_margin  pl-12 md:pl-0 relative">

              <Splide
                ref={splideRef}
                options={branchSlider(data)} // Options from utils
                onMove={handleMove} // Update active slide on move
              >
                {data.map((item) => (
                  <SplideSlide key={item?._id}>
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
                                width: "324px",
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
                  </SplideSlide>
                ))}
              </Splide>

              {/* Custom Arrow Buttons */}
              <div className="absolute top-1/2 w-full flex justify-between items-center z-50 text-xl font-bold">
                {/* Left Arrow */}
                {!isFirstSlide && (
                  <button
                    className="splide__arrow splide__arrow--prev "
                    onClick={handlePrevClick}
                  >
                    {"<"}
                  </button>
                )}

                {/* Right Arrow */}
                {!isLastSlide && (
                  <button
                    className="splide__arrow splide__arrow--next"
                    onClick={handleNextClick}
                  >
                    {">"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBranch;
