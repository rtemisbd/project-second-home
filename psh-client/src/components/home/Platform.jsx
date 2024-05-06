import React, { useState } from "react";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import Slider from "react-slick";

import LeftArrow from "../../assets/img/arrow2.png";
import RightArrow from "../../assets/img/arrow1.png";
import fullFurnishedImg from "../../assets/img/full-furnished1.png";
import foodImg from "../../assets/img/food-img.png";
import internetImg from "../../assets/img/internetImg.png";

import separateLibraryImg from "../../assets/img/sperate-library.png";
import SearchOnMaps from "./SearchOnMaps";
const Platform = () => {
  const [lastSlideIndex, setLastSlideIndex] = useState(0);
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <img src={LeftArrow} alt="prevArrow" {...props} />
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <img src={RightArrow} alt="nextArrow" {...props} />
  );
  const settings = {
    dots: false,

    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    afterChange: (index) => {
      setLastSlideIndex(index);
    },
    infinite: false,
    speed: 400,
    adaptiveHeight: true,
    // arrows: publishedData?.length > 5 ? true : false,
    autoplay: false,
    autoplaySpeed: 3000,
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
          infinite: true,

          autoplaySpeed: 3000,
          arrows: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true,

          autoplaySpeed: 3000,
          arrows: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          className: `center ms-[-8px] ${
            lastSlideIndex >= 1 ? "only-forMobile" : ""
          }`,
          afterChange: (index) => {
            setLastSlideIndex(index);
          },
          centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          speed: 400,
          cssEase: "ease",
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="md:mt-5 sm:mt-5">
      <div className="all_promo slider_margin card-slider">
        <Slider {...settings}>
          <div className="group relative mb-12">
            <Card className="overflow-hidden ">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
              >
                <img
                  src={fullFurnishedImg}
                  alt="ui/ux review check"
                  style={{ height: 200, width: "100%" }}
                />
              </CardHeader>
              <CardBody className="md:p-4 sm:p-2  ">
                <h5 className="text-[1rem] text-black font-bold">
                  Fully furnished Room
                </h5>
                <p className="mt-3 text-sm">
                  All rooms are equipped with AC, WiFi, and full furnishing.
                  Ready to move in!
                </p>
              </CardBody>
            </Card>
          </div>

          <div className="group relative mb-12">
            <Card className="overflow-hidden ">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
              >
                <img
                  src={foodImg}
                  alt="ui/ux review check"
                  style={{ height: 200, width: "100%" }}
                />
              </CardHeader>
              <CardBody className="md:p-4 sm:p-2 ">
                <h5 className="text-[1rem] text-black font-bold">
                  3 Times Food
                </h5>

                <p className="mt-3 text-sm">
                  Relish three daily meals, plus occasional snacks.
                </p>
              </CardBody>
            </Card>
          </div>

          <div className="group relative mb-12">
            <Card className="overflow-hidden">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
              >
                <img
                  src={internetImg}
                  alt="ui/ux review check"
                  style={{ height: 200, width: "100%" }}
                />
              </CardHeader>
              <CardBody className="md:p-4 sm:p-2  ">
                <h5 className="text-[1rem] text-black font-bold">
                  High Speed Internet.
                </h5>

                <p className="mt-3 text-sm">
                  Stay connected with our reliable high-speed internet.
                </p>
              </CardBody>
            </Card>
          </div>

          <div className="group relative mb-12">
            <Card className="overflow-hidden">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
              >
                <img
                  src={separateLibraryImg}
                  alt="ui/ux review check"
                  style={{ height: 200, width: "100%" }}
                />
              </CardHeader>
              <CardBody className="md:p-4 sm:p-2  ">
                <h5 className="text-[1rem] text-black font-bold">
                  Separate Library
                </h5>

                <p className="mt-3 text-sm">
                  Dive into knowledge in our exclusive library space.
                </p>
              </CardBody>
            </Card>
          </div>
        </Slider>
      </div>
      {/* Search on Maps Part */}
      <SearchOnMaps />
    </div>
  );
};

export default Platform;
