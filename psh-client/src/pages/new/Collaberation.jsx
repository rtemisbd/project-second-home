import React, { useState } from "react";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import Slider from "react-slick";

import LeftArrow from "../../assets/img/left-arrow.svg";
import RightArrow from "../../assets/img/right-arrow.svg";
import CollaberationService from "./CollaberationService";
import CollaberationService2 from "./CollaberationService2";
import CollaberationSpaceSlider from "./CollaberationSpaceSlider";
import "./Collaberation.css";
const Collaberation = () => {
  const [lastSlideIndex, setLastSlideIndex] = useState(0);
  const [isOffline, setIsOffline] = useState(false);

  const handleCheckboxChange = () => {
    setIsOffline((prevIsOffline) => !prevIsOffline);
  };
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <img src={LeftArrow} alt="prevArrow" {...props} />
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <img src={RightArrow} alt="nextArrow" {...props} />
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
    <div>
      <div className="banner-left-collaberation">
        <div className="grid grid-cols-12 sm:px-5 gap-x-8 gap-y-16 ">
          <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-12 md:col-span-6">
            <div className="2xl:ms-72">
              <div
                className="flex justify-center items-center"
                style={{ height: "100vh" }}
              >
                <div className="">
                  <p className="banner_partner_p text-white">RuCollab</p>
                  <h1 className="banner_h1">
                    Beriklan di PSH & Tingkatkan Eksposure
                  </h1>
                  <p className="banner_partner_p2 my-4">
                    Manfaatkan produk offline dan online Project Second Home
                    untuk mencapai target konsumen perusahaan Anda.
                  </p>
                  <div
                    className="justify-center items-stretch bg-white flex gap-2 px-5 py-2.5 rounded-lg"
                    style={{ width: 280 }}
                  >
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b8d065bee7abb28ea2bfb39611c1cfdad6558a257dc50ba7d83114cb6640840?apiKey=e4c55b3835e0471b869cabb50a0b8cd9&"
                      className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                    />
                    <div className="justify-center text-neutral-800 text-sm font-medium leading-5 self-center grow whitespace-nowrap my-auto">
                      Hubungi Tim Project Second Home
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-12 md:col-span-6 ">
            <img
              src="assets/img/IMG-Hero.png.png"
              alt=""
              style={{ height: "100vh", width: "100%" }}
            />
          </div>
        </div>
      </div>

      <div className="custom-container mt-5">
        <h2 className="text-xl font-bold mb-5 mt-12  text-center">
          Pilihan produk offline dan online untuk kebutuhan promosi Anda
        </h2>
        <div className="flex justify-center mt-12 mb-8">
          <div class="btn-container">
            <label class="switch btn-color-mode-switch">
              <input
                value="1"
                id="color_mode"
                name="color_mode"
                type="checkbox"
                checked={isOffline}
                onChange={handleCheckboxChange}
              />
              <label
                class="btn-color-mode-switch-inner"
                data-off="Produk Offline"
                data-on="Produk Online"
                for="color_mode"
              ></label>
            </label>
          </div>
        </div>
        {isOffline ? (
          <>
            <div className="all_promo slider_margin card-slider">
              <Slider {...settings}>
                <div>
                  <div className="flex justify-center text-teal-600 text-5xl font-medium leading-[60px]">
                    <span className="text-black">3jt </span>
                    <span className="text-teal-600 ms-3">+</span>
                  </div>
                  <p className=" text-stone-500 text-base text-center leading-6 self-center whitespace-nowrap mt-2">
                    Pengguna website
                  </p>
                </div>
                <div>
                  <div className="flex justify-center text-teal-600 text-5xl font-medium leading-[60px]">
                    <span className="text-black">500rb</span>
                    <span className="text-teal-600 ms-3"> +</span>
                  </div>

                  <p className=" text-stone-500 text-base text-center leading-6 self-center whitespace-nowrap mt-2">
                    Aplikasi terdownload
                  </p>
                </div>
                <div>
                  <div className="flex justify-center text-teal-600 text-5xl font-medium leading-[60px]">
                    <span className="text-black">200rb</span>
                    <span className="text-teal-600 ms-3"> +</span>
                  </div>
                  <p className=" text-stone-500 text-base text-center leading-6 self-center whitespace-nowrap mt-2">
                    Followers di media sosial
                  </p>
                </div>
              </Slider>
            </div>
            <CollaberationService2 />
          </>
        ) : (
          <>
            <div className="all_promo slider_margin card-slider">
              <Slider {...settings}>
                <div>
                  <div className="flex justify-center text-teal-600 text-5xl font-medium leading-[60px]">
                    <span className="text-black">800 </span>
                    <span className="text-teal-600 ms-3">+</span>
                  </div>
                  <p className=" text-stone-500 text-base text-center leading-6 self-center whitespace-nowrap mt-2">
                    Properti se-Indonesia
                  </p>
                </div>
                <div>
                  <div className="flex justify-center text-teal-600 text-5xl font-medium leading-[60px]">
                    <span className="text-black">10rb</span>
                    <span className="text-teal-600 ms-3"> +</span>
                  </div>

                  <p className=" text-stone-500 text-base text-center leading-6 self-center whitespace-nowrap mt-2">
                    Penghuni se-Indonesia
                  </p>
                </div>
                <div>
                  <div className="flex justify-center text-teal-600 text-5xl font-medium leading-[60px]">
                    <span className="text-black">500rb</span>
                    <span className="text-teal-600 ms-3"> +</span>
                  </div>
                  <p className=" text-stone-500 text-base text-center leading-6 self-center whitespace-nowrap mt-2">
                    Foot traffic
                  </p>
                </div>
              </Slider>
            </div>
            <CollaberationService />
          </>
        )}
      </div>
      <CollaberationSpaceSlider />
      <div>
        <Card shadow={false} className="overflow-hidden text-center">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="absolute inset-0 m-0  w-full  bg-[url('https://i.ibb.co/PC0Jpyv/Background-Section-CTA-jpg.png')]"
            style={{
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
          </CardHeader>
          <CardBody
            className="relative flex justify-center items-center"
            style={{ height: 580 }}
          >
            <div>
              <p className="header3">Masih punya pertanyaan?</p>
              <div className="flex justify-center items-center gap-4 mt-4">
                <div className="justify-center items-stretch bg-white flex gap-2 px-5 py-2.5 rounded-lg">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/53249364ee46f9409bbda65da6585843815b30133c683ab0d04c0a964b8c4bc2?apiKey=e4c55b3835e0471b869cabb50a0b8cd9&"
                    className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                  />
                  <div className="justify-center text-neutral-800 text-sm font-medium leading-5 self-center grow whitespace-nowrap my-auto">
                    Hubungi Tim Project Second Home
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Collaberation;
