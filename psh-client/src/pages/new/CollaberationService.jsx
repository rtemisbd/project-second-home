import React, { useState } from "react";
import Slider from "react-slick";

import LeftArrow from "../../assets/img/left-arrow.svg";
import RightArrow from "../../assets/img/right-arrow.svg";

const CollaberationService = () => {
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
      <div className="custom-container">
        <div className="all_promo slider_margin card-slider mt-12">
          <Slider {...settings}>
            <div className="group relative">
              <div className="overflow-hidden">
                <div className="m-0 rounded-none">
                  <img
                    src="assets/img2/Img.png.png"
                    alt="ui/ux review check"
                    style={{ height: 195, width: "100%" }}
                  />
                </div>
                <div className="md:p-4 sm:p-2  ">
                  <p className="business">
                    Pemasangan banner iklan di properti Project Second Home
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="overflow-hidden">
                <div className="m-0 rounded-none">
                  <img
                    src="assets/img2/Img-1.png.png"
                    alt="ui/ux review check"
                    style={{ height: 195, width: "100%" }}
                  />
                </div>
                <div className="md:p-4 sm:p-2  ">
                  <p className="business">
                    Brosur/flyer di Welcome Pack untuk penghuni baru{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="overflow-hidden">
                <div className="m-0 rounded-none">
                  <img
                    src="assets/img2/Img-2.png.png"
                    alt="ui/ux review check"
                    style={{ height: 195, width: "100%" }}
                  />
                </div>
                <div className="md:p-4 sm:p-2  ">
                  <p className="business">
                    Pemasangan Tent Card di Kamar Penghuni
                  </p>
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="overflow-hidden">
                <div className="m-0 rounded-none">
                  <img
                    src="assets/img2/Img-3.png.png"
                    alt="ui/ux review check"
                    style={{ height: 195, width: "100%" }}
                  />
                </div>
                <div className="md:p-4 sm:p-2  ">
                  <p className="business">Joint Community Event</p>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default CollaberationService;
