import React, { useState } from "react";
import Slider from "react-slick";

import LeftArrow from "../../assets/img/left-arrow.svg";
import RightArrow from "../../assets/img/right-arrow.svg";
import Recommended from "../../components/home/Recommended";
import "./Stories.css";

const Stories = () => {
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
        <Recommended />
      </div>
      <div style={{ background: "rgba(245, 243, 237, 1)" }}>
        <div className="custom-container py-12">
          <h2 className="text-xl font-bold mb-5 mt-12">Expart</h2>
          <div className="all_promo slider_margin card-slider">
            <Slider {...settings}>
              <div
                className="group relative"
                style={{ height: "160px", width: "270px" }}
              >
                <div className="overflow-hidden">
                  <div className="m-0 rounded-none">
                    <img
                      src="assets/img2/Img-3.png.png"
                      alt="ui/ux review check"
                      style={{ height: "220px", width: "100%" }}
                    />
                  </div>
                  <div className="sm:p-2 flex">
                    <p className="stories_tag">Leisure</p>
                    <p className="mx-4 stories_dot">.</p>
                    <p className="stories_date">10 December 2023</p>
                  </div>
                  <div className="sm:p-2">
                    <p className="business font-bold">
                      5 Rekomendasi Beach Club di Bali untuk Menikmati Mome…
                    </p>
                  </div>

                  <div className="sm:p-2 flex">
                    <div>
                      <img
                        src="/assets/img2/Foto.png.png"
                        alt=""
                        style={{ width: 30 }}
                      />
                    </div>
                    <div className="flex mt-1">
                      <p className="stories_date ms-3">Mahamud Pino</p>
                      <p className="mx-4 stories_dot">.</p>
                      <p className="stories_date">5 min read</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="group relative"
                style={{ height: "160px", width: "270px" }}
              >
                <div className="overflow-hidden">
                  <div className="m-0 rounded-none">
                    <img
                      src="assets/img2/Img-3.png.png"
                      alt="ui/ux review check"
                      style={{ height: "220px", width: "100%" }}
                    />
                  </div>
                  <div className="sm:p-2 flex">
                    <p className="stories_tag">Leisure</p>
                    <p className="mx-4 stories_dot">.</p>
                    <p className="stories_date">10 December 2023</p>
                  </div>
                  <div className="sm:p-2">
                    <p className="business font-bold">
                      5 Rekomendasi Beach Club di Bali untuk Menikmati Mome…
                    </p>
                  </div>

                  <div className="sm:p-2 flex">
                    <div>
                      <img
                        src="/assets/img2/Foto.png.png"
                        alt=""
                        style={{ width: 30 }}
                      />
                    </div>
                    <div className="flex mt-1">
                      <p className="stories_date ms-3">Mahamud Pino</p>
                      <p className="mx-4 stories_dot">.</p>
                      <p className="stories_date">5 min read</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="group relative"
                style={{ height: "160px", width: "270px" }}
              >
                <div className="overflow-hidden">
                  <div className="m-0 rounded-none">
                    <img
                      src="assets/img2/Img-3.png.png"
                      alt="ui/ux review check"
                      style={{ height: "220px", width: "100%" }}
                    />
                  </div>
                  <div className="sm:p-2 flex">
                    <p className="stories_tag">Leisure</p>
                    <p className="mx-4 stories_dot">.</p>
                    <p className="stories_date">10 December 2023</p>
                  </div>
                  <div className="sm:p-2">
                    <p className="business font-bold">
                      5 Rekomendasi Beach Club di Bali untuk Menikmati Mome…
                    </p>
                  </div>

                  <div className="sm:p-2 flex">
                    <div>
                      <img
                        src="/assets/img2/Foto.png.png"
                        alt=""
                        style={{ width: 30 }}
                      />
                    </div>
                    <div className="flex mt-1">
                      <p className="stories_date ms-3">Mahamud Pino</p>
                      <p className="mx-4 stories_dot">.</p>
                      <p className="stories_date">5 min read</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="group relative"
                style={{ height: "160px", width: "270px" }}
              >
                <div className="overflow-hidden">
                  <div className="m-0 rounded-none">
                    <img
                      src="assets/img2/Img-3.png.png"
                      alt="ui/ux review check"
                      style={{ height: "220px", width: "100%" }}
                    />
                  </div>
                  <div className="sm:p-2 flex">
                    <p className="stories_tag">Leisure</p>
                    <p className="mx-4 stories_dot">.</p>
                    <p className="stories_date">10 December 2023</p>
                  </div>
                  <div className="sm:p-2">
                    <p className="business font-bold">
                      5 Rekomendasi Beach Club di Bali untuk Menikmati Mome…
                    </p>
                  </div>

                  <div className="sm:p-2 flex">
                    <div>
                      <img
                        src="/assets/img2/Foto.png.png"
                        alt=""
                        style={{ width: 30 }}
                      />
                    </div>
                    <div className="flex mt-1">
                      <p className="stories_date ms-3">Mahamud Pino</p>
                      <p className="mx-4 stories_dot">.</p>
                      <p className="stories_date">5 min read</p>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>

      <div className="custom-container">
        <h2 className="text-xl font-bold mb-5 mt-12">Leisure</h2>
        <div className=" md:px-0 sm:px-6 ">
          <div className="image-overlay-container">
            <img
              className="image-overlay-img"
              src="https://www.rukita.co/stories/wp-content/uploads/2023/01/Soompi.jpg"
              alt="Overlay Image"
            />
            <div className="image-overlay-text">
              <div className="sm:p-2 flex text-white">
                <p className="layout_tag">Leisure</p>
                <p className="mx-4 layout_dot">.</p>
                <p className="layout_date">10 December 2023</p>
              </div>
              <div className="sm:p-2">
                <h6 className="business font-bold">
                  Jadi Tontonan Wajib Saat Natal, Ini 6 Urutan Film Home Alone
                  dari Paling Lama hingga Terbaru
                </h6>
              </div>
              <div className="sm:p-2">
                <p className="layout_p">
                  Intip rekomendasi beach club di Bali ini untuk melihat sunset
                  atau menikmati suasana pinggir pantai seru bersama oran…
                </p>
              </div>
              <div className="sm:p-2 flex">
                <div>
                  <img
                    src="/assets/img2/Foto.png.png"
                    alt=""
                    style={{ width: 30 }}
                  />
                </div>
                <div className="flex mt-1">
                  <p className=" ms-3">Mahamud Pino</p>
                  <p className="mx-4 stories_dot">.</p>
                  <p className="">5 min read</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="custom-container">
        <h2 className="text-xl font-bold mb-5 mt-12">Event choices for you</h2>
        <div className="all_promo slider_margin card-slider">
          <Slider {...settings}>
            <div
              className="group relative"
              style={{ height: "160px", width: "270px" }}
            >
              <div className="overflow-hidden">
                <div className="m-0 rounded-none">
                  <img
                    src="assets/img2/Stories-Web@2x-100.jpg.png"
                    alt="ui/ux review check"
                    style={{ height: "220px", width: "100%" }}
                  />
                </div>
                <div className="sm:p-2 flex">
                  <p className="stories_tag">Leisure</p>
                  <p className="mx-4 stories_dot">.</p>
                  <p className="stories_date">10 December 2023</p>
                </div>
                <div className="sm:p-2">
                  <p className="business font-bold">
                    5 Rekomendasi Beach Club di Bali untuk Menikmati Mome…
                  </p>
                </div>
                <div className="sm:p-2">
                  <p className="stories_second_p">
                    Intip rekomendasi beach club di Bali ini untuk melihat
                    sunset atau menikmati suasana pinggir pantai seru bersama
                    oran…
                  </p>
                </div>
                <div className="sm:p-2 flex">
                  <div>
                    <img
                      src="/assets/img2/Foto.png.png"
                      alt=""
                      style={{ width: 30 }}
                    />
                  </div>
                  <div className="flex mt-1">
                    <p className="stories_date ms-3">Mahamud Pino</p>
                    <p className="mx-4 stories_dot">.</p>
                    <p className="stories_date">5 min read</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="group relative"
              style={{ height: "160px", width: "270px" }}
            >
              <div className="overflow-hidden">
                <div className="m-0 rounded-none">
                  <img
                    src="assets/img2/Stories-Web@2x-100.jpg.png"
                    alt="ui/ux review check"
                    style={{ height: "220px", width: "100%" }}
                  />
                </div>
                <div className="sm:p-2 flex">
                  <p className="stories_tag">Leisure</p>
                  <p className="mx-4 stories_dot">.</p>
                  <p className="stories_date">10 December 2023</p>
                </div>
                <div className="sm:p-2">
                  <p className="business font-bold">
                    5 Rekomendasi Beach Club di Bali untuk Menikmati Mome…
                  </p>
                </div>
                <div className="sm:p-2">
                  <p className="stories_second_p">
                    Intip rekomendasi beach club di Bali ini untuk melihat
                    sunset atau menikmati suasana pinggir pantai seru bersama
                    oran…
                  </p>
                </div>
                <div className="sm:p-2 flex">
                  <div>
                    <img
                      src="/assets/img2/Foto.png.png"
                      alt=""
                      style={{ width: 30 }}
                    />
                  </div>
                  <div className="flex mt-1">
                    <p className="stories_date ms-3">Mahamud Pino</p>
                    <p className="mx-4 stories_dot">.</p>
                    <p className="stories_date">5 min read</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="group relative"
              style={{ height: "160px", width: "270px" }}
            >
              <div className="overflow-hidden">
                <div className="m-0 rounded-none">
                  <img
                    src="assets/img2/Stories-Web@2x-100.jpg.png"
                    alt="ui/ux review check"
                    style={{ height: "220px", width: "100%" }}
                  />
                </div>
                <div className="sm:p-2 flex">
                  <p className="stories_tag">Leisure</p>
                  <p className="mx-4 stories_dot">.</p>
                  <p className="stories_date">10 December 2023</p>
                </div>
                <div className="sm:p-2">
                  <p className="business font-bold">
                    5 Rekomendasi Beach Club di Bali untuk Menikmati Mome…
                  </p>
                </div>
                <div className="sm:p-2">
                  <p className="stories_second_p">
                    Intip rekomendasi beach club di Bali ini untuk melihat
                    sunset atau menikmati suasana pinggir pantai seru bersama
                    oran…
                  </p>
                </div>
                <div className="sm:p-2 flex">
                  <div>
                    <img
                      src="/assets/img2/Foto.png.png"
                      alt=""
                      style={{ width: 30 }}
                    />
                  </div>
                  <div className="flex mt-1">
                    <p className="stories_date ms-3">Mahamud Pino</p>
                    <p className="mx-4 stories_dot">.</p>
                    <p className="stories_date">5 min read</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="group relative"
              style={{ height: "160px", width: "270px" }}
            >
              <div className="overflow-hidden">
                <div className="m-0 rounded-none">
                  <img
                    src="assets/img2/Stories-Web@2x-100.jpg.png"
                    alt="ui/ux review check"
                    style={{ height: "220px", width: "100%" }}
                  />
                </div>
                <div className="sm:p-2 flex">
                  <p className="stories_tag">Leisure</p>
                  <p className="mx-4 stories_dot">.</p>
                  <p className="stories_date">10 December 2023</p>
                </div>
                <div className="sm:p-2">
                  <p className="business font-bold">
                    5 Rekomendasi Beach Club di Bali untuk Menikmati Mome…
                  </p>
                </div>
                <div className="sm:p-2">
                  <p className="stories_second_p">
                    Intip rekomendasi beach club di Bali ini untuk melihat
                    sunset atau menikmati suasana pinggir pantai seru bersama
                    oran…
                  </p>
                </div>
                <div className="sm:p-2 flex">
                  <div>
                    <img
                      src="/assets/img2/Foto.png.png"
                      alt=""
                      style={{ width: 30 }}
                    />
                  </div>
                  <div className="flex mt-1">
                    <p className="stories_date ms-3">Mahamud Pino</p>
                    <p className="mx-4 stories_dot">.</p>
                    <p className="stories_date">5 min read</p>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
      <div className="mt-12">
        <div className="grid grid-cols-12 sm:px-5 gap-y-16 ">
          <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-12 md:col-span-6 ">
            <img src="/assets/img2/footer-desktop@3x.png.png" alt="" />
          </div>
          <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-12 md:col-span-6 community_header">
            <div className="2xl:ms-12 ">
              <div className="flex justify-center items-center h-96">
                <div className="">
                  <h1 className="text-black">
                    Let's find a home
                    <br />
                    <span>for you now!</span>
                  </h1>

                  <div className="md:flex  gap-4 mt-12">
                    <button
                      className="text-neutral-800 text-center text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch text-white px-4 py-4 rounded-lg"
                      style={{ width: 220, background: "black" }}
                    >
                      Check the Event Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stories;
