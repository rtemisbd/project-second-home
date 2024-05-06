import React, { useState } from "react";
import Slider from "react-slick";

import LeftArrow from "../../assets/img/left-arrow.svg";
import RightArrow from "../../assets/img/right-arrow.svg";

const OurClientFeadBack = () => {
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
    <div className="text-black bg-[#f5f3ed] rounded-tl-[100px]">
      <div className="custom-container pt-16">
        <div className="card-slider3">
          <Slider {...settings}>
            <div className="justify-center items-center bg-neutral-800 flex flex-col py-8 rounded-none ">
              <div className="max-w-full mb-8">
                <div className="gap-5 md:flex max-md:flex-col">
                  <div className="flex flex-col md:w-6/12 max-md:w-full max-md:ml-0">
                    <div className="flex grow flex-col items-stretch max-md:max-w-full max-md:mt-10">
                      <img
                        loading="lazy"
                        src="assets/img2/Image-Unit.png.png"
                        className="object-contain object-center w-full overflow-hidden max-md:max-w-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col  md:w-6/12 ml-5 max-md:w-full max-md:ml-0">
                    <div className="flex  flex-col items-start max-md:max-w-full ">
                      <div className="flex text-emerald-50 text-3xl font-medium leading-8 self-stretch whitespace-nowrap mt-5 max-md:max-w-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_10_13517)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12.2236 15.2353C11.0937 14.0098 9.6154 13.3235 7.78847 13.1765C8.3654 11.1176 9.51923 9.15687 11.25 7.29413L11.3882 7.145C11.873 6.59083 12.1154 5.95427 12.1154 5.2353C12.1154 4.40197 11.7548 3.6544 11.0337 2.99265C10.3125 2.33088 9.47117 2 8.5096 2C7.54807 2 6.73077 2.36764 6.0577 3.10294C4.03847 5.2108 2.52404 7.47793 1.51442 9.9044C0.504803 12.3309 0 15.0147 0 17.9559C0 20.8481 0.67307 23.0784 2.01923 24.6471C3.3654 26.2157 5.09613 27 7.21153 27C9.13463 27 10.7332 26.3137 12.0072 24.9412C13.2813 23.5686 13.9183 21.8775 13.9183 19.8676C13.9183 18.0049 13.3534 16.4608 12.2236 15.2353ZM28.3053 15.2353C27.1755 14.0098 25.6971 13.3235 23.8702 13.1765C24.4471 11.1176 25.601 9.15687 27.3317 7.29413L27.47 7.145C27.9547 6.59083 28.1971 5.95427 28.1971 5.2353C28.1971 4.40197 27.8365 3.6544 27.1154 2.99265C26.3942 2.33088 25.5529 2 24.5913 2C23.6298 2 22.8125 2.36764 22.1394 3.10294C20.1202 5.2108 18.6058 7.47793 17.5962 9.9044C16.5865 12.3309 16.0817 15.0147 16.0817 17.9559C16.0817 20.8481 16.7548 23.0784 18.101 24.6471C19.4471 26.2157 21.1779 27 23.2933 27C25.2164 27 26.8149 26.3137 28.0889 24.9412C29.363 23.5686 30 21.8775 30 19.8676C30 18.0049 29.4351 16.4608 28.3053 15.2353Z"
                              fill="#009C96"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_10_13517">
                              <rect width="30" height="30" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>

                        <p className="ms-2 md:text-[24px] sm:text-[12px] ">
                          Let the Results Speak
                        </p>
                      </div>
                      <div className="justify-center mt-3">
                        <p className="">
                          "With PSH, apart from being given exposure from social
                          media and advertising, we also receive reports so we
                          can learn what the interest of boarding house seekers
                          is like."
                        </p>
                      </div>

                      <div className="flex  text-neutral-50 text-base leading-6 self-stretch whitespace-nowrap max-md:max-w-full feedback_pic">
                        <img src="assets/img2/Foto.png.png" alt="" />{" "}
                        <p className="mt-4 ms-2"> Rata-rata okupansi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="justify-center items-center bg-neutral-800 flex flex-col py-8 rounded-none ">
              <div className="max-w-full mb-8">
                <div className="gap-5 md:flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                  <div className="flex flex-col items-stretch md:w-6/12 max-md:w-full max-md:ml-0">
                    <div className="flex grow flex-col items-stretch max-md:max-w-full max-md:mt-10">
                      <img
                        loading="lazy"
                        src="assets/img2/Image-Unit.png.png"
                        className="object-contain object-center w-full overflow-hidden max-md:max-w-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch md:w-6/12 ml-5 max-md:w-full max-md:ml-0">
                    <div className="flex grow flex-col items-start max-md:max-w-full ">
                      <div className="flex text-emerald-50 text-3xl font-medium leading-8 self-stretch whitespace-nowrap mt-5 max-md:max-w-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_10_13517)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12.2236 15.2353C11.0937 14.0098 9.6154 13.3235 7.78847 13.1765C8.3654 11.1176 9.51923 9.15687 11.25 7.29413L11.3882 7.145C11.873 6.59083 12.1154 5.95427 12.1154 5.2353C12.1154 4.40197 11.7548 3.6544 11.0337 2.99265C10.3125 2.33088 9.47117 2 8.5096 2C7.54807 2 6.73077 2.36764 6.0577 3.10294C4.03847 5.2108 2.52404 7.47793 1.51442 9.9044C0.504803 12.3309 0 15.0147 0 17.9559C0 20.8481 0.67307 23.0784 2.01923 24.6471C3.3654 26.2157 5.09613 27 7.21153 27C9.13463 27 10.7332 26.3137 12.0072 24.9412C13.2813 23.5686 13.9183 21.8775 13.9183 19.8676C13.9183 18.0049 13.3534 16.4608 12.2236 15.2353ZM28.3053 15.2353C27.1755 14.0098 25.6971 13.3235 23.8702 13.1765C24.4471 11.1176 25.601 9.15687 27.3317 7.29413L27.47 7.145C27.9547 6.59083 28.1971 5.95427 28.1971 5.2353C28.1971 4.40197 27.8365 3.6544 27.1154 2.99265C26.3942 2.33088 25.5529 2 24.5913 2C23.6298 2 22.8125 2.36764 22.1394 3.10294C20.1202 5.2108 18.6058 7.47793 17.5962 9.9044C16.5865 12.3309 16.0817 15.0147 16.0817 17.9559C16.0817 20.8481 16.7548 23.0784 18.101 24.6471C19.4471 26.2157 21.1779 27 23.2933 27C25.2164 27 26.8149 26.3137 28.0889 24.9412C29.363 23.5686 30 21.8775 30 19.8676C30 18.0049 29.4351 16.4608 28.3053 15.2353Z"
                              fill="#009C96"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_10_13517">
                              <rect width="30" height="30" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>

                        <p className="ms-2 md:text-[24px] sm:text-[12px] ">
                          Let the Results Speak
                        </p>
                      </div>
                      <div className="justify-center mt-3">
                        <p className="">
                          "With PSH, apart from being given exposure from social
                          media and advertising, we also receive reports so we
                          can learn what the interest of boarding house seekers
                          is like."
                        </p>
                      </div>

                      <div className="flex  text-neutral-50 text-base leading-6 self-stretch whitespace-nowrap max-md:max-w-full feedback_pic">
                        <img src="assets/img2/Foto.png.png" alt="" />{" "}
                        <p className="mt-4 ms-2"> Rata-rata okupansi</p>
                      </div>
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

export default OurClientFeadBack;
