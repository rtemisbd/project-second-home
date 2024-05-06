import React, { useState } from "react";

import LeftArrow from "../../assets/img/left-arrow.svg";
import RightArrow from "../../assets/img/right-arrow.svg";
import Slider from "react-slick";
import angelInvestorImg from "../../assets/img/angel-InvestorImg.jpeg";
import shareHolderImg from "../../assets/img/forShareHolder.jpeg";
const PartnerService = () => {
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
        <h2 className="text-xl font-bold mb-5 mt-12 md:mx-0 sm:mx-5">
          Service Coverage
        </h2>
        <div className="all_promo slider_margin card-slider ">
          <Slider {...settings}>
            <div className="group relative">
              <div className="overflow-hidden">
                <div className="m-0">
                  <img
                    src={angelInvestorImg}
                    alt="ui/ux review check"
                    style={{ height: 195, width: "100%" }}
                    className="rounded-lg"
                  />
                </div>
                <div className="md:p-4 sm:p-2  ">
                  <p className="business font-bold">Angel Investor</p>
                  <div className="text-stone-500 text-sm leading-5">
                    <ul className="partner_li mt-4">
                      <li>Special Discount of PSH</li>
                      <li>Discount in Rtemis Ltd</li>
                      <li>Dedicated PR Manager</li>
                      <li>Greetings and Gifts</li>
                      <li>Tax Certification</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="overflow-hidden">
                <div className="m-0 rounded-none">
                  <img
                    src={angelInvestorImg}
                    alt="ui/ux review check"
                    style={{ height: 195, width: "100%" }}
                    className="rounded-lg"
                  />
                </div>
                <div className="md:p-4 sm:p-2  ">
                  <p className="business font-bold">Project Director </p>
                  <div className="text-stone-500 text-sm leading-5">
                    <ul className="partner_li mt-3">
                      <li>Fixed Remuneration</li>
                      <li>Yearly Profit</li>
                      <li>NOC Provide from Rtemis</li>
                      <li>Social Recognization</li>
                      <li>Official ID Card and Visiting Card of Rtemis Ltd</li>
                      <li>Greetings and Gifts</li>
                      <li>Discount in Rtemis Ltd</li>
                      <li>Dedicated PR Manager</li>
                      <li>Yearly Domestic and Foreign tour with Families </li>
                      <li> Yearly 7 Days Accomondation free of cost in PSH</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="overflow-hidden">
                <div className="m-0 rounded-none">
                  <img
                    src={angelInvestorImg}
                    alt="ui/ux review check"
                    style={{ height: 195, width: "100%" }}
                    className="rounded-lg"
                  />
                </div>
                <div className="md:p-4 sm:p-2  ">
                  <p className="business font-bold">Franchise Partner</p>
                  <div className="text-stone-500 text-sm leading-5">
                    <ul className="partner_li mt-3">
                      <li>High Profit</li>
                      <li> Yearly 7 Days Accomondation free of cost in PSH</li>

                      <li>Personal Recognization</li>
                      <li>Brand Recognization</li>
                      <li>Business Assistance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="overflow-hidden">
                <div className="m-0 ">
                  <img
                    src={shareHolderImg}
                    alt="ui/ux review check"
                    style={{ height: 195, width: "100%" }}
                    className="rounded-lg"
                  />
                </div>
                <div className="md:p-4 sm:p-2  ">
                  <p className="business font-bold">Share Holders</p>
                  <div className="text-stone-500 text-sm leading-5">
                    <ul className="partner_li mt-3">
                      <li> High Remuneration</li>
                      <li>Active Participation</li>
                      <li>Yearly Domestic and Foreign tour with Families </li>
                      <li>Discount in Rtemis Ltd</li>
                      <li>Yearly 10 Days Accomondation free of cost in PSH</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
      <div className="banner3">
        <div className="custom-container pb-20">
          <h2 className="text-[32px] font-bold mb-5 mt-12 text-center py-12">
            Property Rental Investment Proven to be More Profitable
          </h2>

          <div className="grid md:grid-cols-4 grid-cols-1 md:gap-y-0 gap-y-16">
            <div>
              <p className=" text-black text-center md:text-xl font-bold ">
                Angle Investment
              </p>
              <p className=" text-black text-center font-medium w-full mt-4">
                <span className="text-sm md:text-xl">(50K to 1,000K)</span>
              </p>
              <p className=" text-black md:text-5xl text-center font-bold w-full mt-4">
                (12 - 18% )
              </p>
              <p className=" text-black md:text-xl text-center font-medium w-full mt-4">
                Returns per year
              </p>
            </div>
            <div>
              <p className=" text-black text-center md:text-xl font-bold ">
                Project Director
              </p>
              <p className=" text-black text-center font-medium w-full mt-4">
                <span className="md:text-xl">
                  (10 Lac to up to Project Value)
                </span>
              </p>
              <p className=" text-black md:text-xl text-center font-bold w-full mt-4">
                5% Net Profit on Particular Project
              </p>
              <p className=" text-stone-500 text-base text-center leading-6 self-center whitespace-nowrap mt-2">
                returns per year
              </p>
            </div>
            <div>
              <p className=" text-black text-center md:text-xl font-bold ">
                Share Holder
              </p>
              <p className=" text-black text-center font-medium w-full mt-4">
                <span className="md:text-xl">50 Lac per Share</span>
              </p>
              <p className=" text-black md:text-xl text-center font-bold w-full mt-4">
                1% Net Profit of PSH
              </p>
              <p className=" text-stone-500 text-base text-center leading-6 self-center whitespace-nowrap mt-2">
                returns per year
              </p>
            </div>
            <div>
              <p className=" text-black text-center md:text-xl font-bold ">
                Franchise Partner
              </p>
              <p className=" text-black text-center font-medium w-full mt-4">
                <span className="md:text-xl">Based on Branch Value</span>
              </p>
              <p className=" text-black md:text-xl text-center font-bold w-full mt-4">
                Up to 90% profit on particular project
              </p>
              <p className=" text-stone-500 text-base text-center leading-6 self-center whitespace-nowrap mt-2">
                returns per year
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerService;
