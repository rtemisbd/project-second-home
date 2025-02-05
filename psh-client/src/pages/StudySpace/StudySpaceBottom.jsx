import React, { useState } from "react";
import Slider from "react-slick";
import studyBanner from "../../assets/img/study-banner.jpeg";
import img2 from "../../assets/img/studyImg2.png";
import img3 from "../../assets/img/studyImg3.png";

import LeftArrow from "../../assets/img/left-arrow.svg";
import RightArrow from "../../assets/img/right-arrow.svg";

const StudySpaceBottom = () => {
  const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value);
  const [lastSlideIndex, setLastSlideIndex] = useState(0);
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <img loading="lazy" src={LeftArrow} alt="prevArrow" {...props} />
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <img loading="lazy" src={RightArrow} alt="nextArrow" {...props} />
  );
  const settings = {
    dots: false,

    slidesToShow: 3,
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
    <div className="custom-container ">
      <h2 className="text-xl font-bold mb-5 mt-12 uppercase md:mx-0 sm:mx-2">
        Why do you need to be PSH's Study Space?:
      </h2>
      <div className="all_promo slider_margin card-slider ">
        <Slider {...settings}>
          <div className="group relative">
            <div className="overflow-hidden">
              <div className="m-0 rounded-none">
                <img
                  src={studyBanner}
                  alt="ui/ux review check"
                  style={{ height: 269, width: "100%" }}
                />
              </div>
              <div className="md:p-4 sm:p-2  ">
                <p className="business font-bold ">Quiet Study Rooms</p>
                <p className="content my-5">
                  Peaceful, distraction-free rooms equipped with ergonomic
                  desks, chairs, power outlets, and adjustable lighting.
                </p>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="overflow-hidden ">
              <div color="transparent" className="m-0 rounded-none">
                <img
                  src={img2}
                  alt="ui/ux review check"
                  style={{ height: 269, width: "100%" }}
                />
              </div>
              <div className="md:p-4 sm:p-2 ">
                <p className="business font-bold">Group Study Areas</p>

                <p className="content my-3" style={{ width: "90%" }}>
                  Spacious areas with large tables and whiteboards, ideal for
                  group discussions and projects.
                </p>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="overflow-hidden">
              <div color="transparent" className="m-0 rounded-none">
                <img
                  src={img3}
                  alt="ui/ux review check"
                  style={{ height: 269, width: "100%" }}
                />
              </div>
              <div className="md:p-4 sm:p-2  ">
                <p className="business font-bold ">Tutoring Spaces</p>

                <p className="content my-3">
                  Private, comfortable spaces for one-on-one or small group
                  tutoring sessions.
                </p>
                {/* <Link to={"/psh-finance"}>
                  <button className="partner_btn">View More</button>
                </Link> */}
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default StudySpaceBottom;
