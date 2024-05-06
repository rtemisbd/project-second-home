import React, { useState } from "react";
import Slider from "react-slick";

import LeftArrow from "../../assets/img/left-arrow.svg";
import RightArrow from "../../assets/img/right-arrow.svg";

const CollaberationSpaceSlider = () => {
  const [lastSlideIndex, setLastSlideIndex] = useState(0);
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <img src={LeftArrow} alt="prevArrow" {...props} />
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <img src={RightArrow} alt="nextArrow" {...props} />
  );
  const settings = {
    dots: false,

    slidesToShow: 1,
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
          slidesToShow: 1,
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
          slidesToShow: 1,
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
    <div className="text-white" style={{ background: "black" }}>
      <div className="custom-container pt-16">
        <div className="justify-center text-white text-3xl font-medium leading-10 whitespace-nowrap max-md:max-w-full">
          Space for rent
        </div>
        <div className="justify-center text-neutral-50 text-base leading-6  mt-6 max-md:max-w-full">
          Manfaatkan free area di ratusan unit Project Second Home sebagai
          lokasi bisnis Anda.
        </div>
        <div className="card-slider2">
          <Slider {...settings}>
            <div className="w-full mb-8 max-md:mt-10">
              <div className="md:flex max-md:flex-col">
                <div className="flex flex-col items-stretch md:w-6/12 max-md:w-full max-md:ml-0">
                  <div className="flex grow flex-col items-stretch max-md:max-w-full max-md:mt-10">
                    <img
                      loading="lazy"
                      src="assets/img2/1.png"
                      className="object-contain object-center w-full overflow-hidden mt-11 max-md:max-w-full max-md:mt-10"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:w-6/12 ml-5 max-md:w-full max-md:ml-0">
                  <div className="flex grow flex-col mt-8 items-start max-md:max-w-full max-md:mt-10">
                    <div className="justify-center items-stretch rounded border flex gap-1 px-1.5 py-1 border-solid border-white">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/db747e2bc56fe265efdc8f4c79d93b099210c36c2e18bdc586ce973b13d83499?apiKey=e4c55b3835e0471b869cabb50a0b8cd9&"
                        className="object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
                      />
                      <div className="justify-center text-white text-xs leading-5 grow whitespace-nowrap self-start">
                        Kost Coliving
                      </div>
                    </div>
                    <div className="justify-center text-emerald-50 text-3xl font-medium leading-8 self-stretch whitespace-nowrap mt-5 max-md:max-w-full">
                      Project Second Home
                    </div>
                    <div className="justify-center text-neutral-50 text-base leading-6 self-stretch whitespace-nowrap mt-5 max-md:max-w-full">
                      Menteng, Menteng
                    </div>
                    <div className="border self-stretch flex shrink-0 h-0.5 flex-col mt-7 border-solid border-stone-500 max-md:max-w-full" />
                    <div className="flex items-stretch gap-1.5 mt-6">
                      <div className="justify-center text-emerald-50 text-5xl font-medium leading-10 whitespace-nowrap max-md:text-4xl max-md:leading-10">
                        100
                      </div>
                      <div className="justify-center text-emerald-50 text-5xl font-medium leading-10 whitespace-nowrap max-md:text-4xl max-md:leading-10">
                        %
                      </div>
                    </div>
                    <div className="justify-center text-neutral-50 text-base leading-6 self-stretch whitespace-nowrap mt-3.5 max-md:max-w-full">
                      Rata-rata okupansi
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full mb-8 max-md:mt-10">
              <div className="md:flex max-md:flex-col">
                <div className="flex flex-col items-stretch md:w-6/12 max-md:w-full max-md:ml-0">
                  <div className="flex grow flex-col items-stretch max-md:max-w-full max-md:mt-10">
                    <img
                      loading="lazy"
                      src="assets/img2/1.png"
                      className="object-contain object-center w-full overflow-hidden mt-11 max-md:max-w-full max-md:mt-10"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:w-6/12 ml-5 max-md:w-full max-md:ml-0">
                  <div className="flex grow flex-col mt-8 items-start max-md:max-w-full max-md:mt-10">
                    <div className="justify-center items-stretch rounded border flex gap-1 px-1.5 py-1 border-solid border-white">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/db747e2bc56fe265efdc8f4c79d93b099210c36c2e18bdc586ce973b13d83499?apiKey=e4c55b3835e0471b869cabb50a0b8cd9&"
                        className="object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
                      />
                      <div className="justify-center text-white text-xs leading-5 grow whitespace-nowrap self-start">
                        Kost Coliving
                      </div>
                    </div>
                    <div className="justify-center text-emerald-50 text-3xl font-medium leading-8 self-stretch whitespace-nowrap mt-5 max-md:max-w-full">
                      Project Second Home
                    </div>
                    <div className="justify-center text-neutral-50 text-base leading-6 self-stretch whitespace-nowrap mt-5 max-md:max-w-full">
                      Menteng, Menteng
                    </div>
                    <div className="border self-stretch flex shrink-0 h-0.5 flex-col mt-7 border-solid border-stone-500 max-md:max-w-full" />
                    <div className="flex items-stretch gap-1.5 mt-6">
                      <div className="justify-center text-emerald-50 text-5xl font-medium leading-10 whitespace-nowrap max-md:text-4xl max-md:leading-10">
                        100
                      </div>
                      <div className="justify-center text-emerald-50 text-5xl font-medium leading-10 whitespace-nowrap max-md:text-4xl max-md:leading-10">
                        %
                      </div>
                    </div>
                    <div className="justify-center text-neutral-50 text-base leading-6 self-stretch whitespace-nowrap mt-3.5 max-md:max-w-full">
                      Rata-rata okupansi
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default CollaberationSpaceSlider;
