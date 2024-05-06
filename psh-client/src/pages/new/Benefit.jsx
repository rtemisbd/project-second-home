import React, { useState } from "react";
import Slider from "react-slick";

import LeftArrow from "../../assets/img/left-arrow.svg";
import RightArrow from "../../assets/img/right-arrow.svg";

const Benefit = () => {
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
          slidesToShow: 4,
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
          className: `center ms-5 ${
            lastSlideIndex >= 1 ? "only-forMobile" : ""
          }`,
          afterChange: (index) => {
            setLastSlideIndex(index);
          },
          centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          speed: 1000,
          autoplaySpeed: 1000,
          arrows: false,
        },
      },
    ],
  };
  return (
    <div>
      <div className="md:mt-10 sm:mt-5 second_part text-white">
        <div className="custom-container">
          <div className="py-14">
            <h2 className="text-xl font-bold mb-5">
              PSH's choice of housing for companies
            </h2>
            <div className="all_promo slider_margin card-slider ">
              <Slider {...settings}>
                <div className="group relative">
                  <div className="overflow-hidden">
                    <div className="flex ">
                      <img src="assets/img/SVG.png" alt="" />
                    </div>
                    <div>
                      <p className="header2 py-3">Hassle Free</p>
                    </div>
                    <p className="content2">
                      Providing housing, resident services, and renovations and
                      interiors through one door
                    </p>
                  </div>
                </div>

                <div className="group relative">
                  <div className="overflow-hidden ">
                    <div className="flex ">
                      <img src="assets/img/SVG (1).png" alt="" />
                    </div>
                    <div>
                      <p className="header2 py-3">Flexible Location</p>
                    </div>
                    <p className="content2">
                      Select the desired location throughout Indonesia according
                      to the company's needs
                    </p>
                  </div>
                </div>

                <div className="group relative">
                  <div className="overflow-hidden">
                    <div className="flex ">
                      <img src="assets/img/SVG (2).png" alt="" />
                    </div>
                    <div>
                      <p className="header2 py-3">Complete Facilities</p>
                    </div>
                    <p className="content2">
                      AC, WiFi, laundry, cleaning and other facilities that can
                      be ordered according to needs
                    </p>
                  </div>
                </div>
                <div className="group relative">
                  <div className="overflow-hidden">
                    <div className="flex ">
                      <img src="assets/img/SVG (3).png" alt="" />
                    </div>
                    <div>
                      <p className="header2 py-3">Bill</p>
                    </div>
                    <p className="content2">
                      Transparent billing for both residential reimbursement and
                      corporate accounts
                    </p>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefit;
