import React from "react";
import { AiFillStar } from "react-icons/ai";
import Slider from "react-slick";

import commaIcon from "../../assets/img/comaIcon.png";
import femaleIcon from "../../assets/img/woman.png";

const settings = {
  dots: false,
  arrows: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2500,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2500,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2500,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2500,
      },
    },
  ],
};
const Review = () => {
  return (
    <div className="text-sm">
      <h3 className=" text-xl mt-10 font-bold">Listening to Our Clients</h3>
      <div className=" my-12">
        <Slider {...settings}>
          <div>
            <div className="flex items-center gap-x-7">
              <div>
                <img
                  src={femaleIcon}
                  alt="autor picture"
                  className="w-[90px] h-[90px]"
                />
              </div>
              <div>
                <p>Shanju Sharmin </p>
                <div className="flex">
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                </div>
              </div>
            </div>
            <div className="flex gap-x-3 mt-8">
              <div>
                <img loading="lazy" src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                I was a guest at Project Second Home for a day. It is a very
                beautiful, tidy and safe place. I had many doubts about how it
                would be, whether it would be safe or not, and I was impressed.
                The people who are in charge of looking after it are also very
                sincere. Their such a beautiful initiative for the girls really
                deserves praise.
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-7">
              <div>
                <img
                  src={femaleIcon}
                  alt="autor picture"
                  className="w-[90px] h-[90px]"
                />
              </div>
              <div>
                <p>Nusrat Munia</p>
                <div className="flex">
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                </div>
              </div>
            </div>
            <div className="flex gap-x-3 mt-8">
              <div>
                <img loading="lazy" src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                One of the best hostels in Dhaka for girls, the environment is
                very good as well as the food, and if you want to stay in a good
                environment at a reasonable cost, there is no alternative. I
                highly recommend this hotel to you.
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-7">
              <div>
                <img
                  src={femaleIcon}
                  alt="autor picture"
                  className="w-[90px] h-[90px]"
                />
              </div>
              <div>
                <p>Sabrina Chitto</p>
                <div className="flex">
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                </div>
              </div>
            </div>
            <div className="flex gap-x-3 mt-8">
              <div>
                <img loading="lazy" src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                Many girls from outside Dhaka come to Dhaka to study or work.
                What they need most is a safe shelter. Your initiative is very
                inspiring. I applaud you.
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-7">
              <div>
                <img
                  src={femaleIcon}
                  alt="autor picture"
                  className="w-[90px] h-[90px]"
                />
              </div>
              <div>
                <p>Paharika Paharika</p>
                <div className="flex">
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                </div>
              </div>
            </div>
            <div className="flex gap-x-3 mt-8">
              <div>
                <img loading="lazy" src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                A very pleasant environment with many savings and all modern
                facilities for girls. It is truly a second home. Many many
                blessings for PSH.
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-x-7">
              <div>
                <img
                  src={femaleIcon}
                  alt="autor picture"
                  className="w-[90px] h-[90px]"
                />
              </div>
              <div>
                <p>Kaniz Binte Kamal</p>
                <div className="flex">
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                </div>
              </div>
            </div>
            <div className="flex gap-x-3 mt-8">
              <div>
                <img loading="lazy" src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                The safest place to stay in Dhaka within budget.
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-7">
              <div>
                <img
                  src={femaleIcon}
                  alt="autor picture"
                  className="w-[90px] h-[90px]"
                />
              </div>
              <div>
                <p>Israt Jahan Bhuiya Nishat</p>
                <div className="flex">
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                </div>
              </div>
            </div>
            <div className="flex gap-x-3 mt-8">
              <div>
                <img loading="lazy" src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                A very trusted and safe hostel for girls, food and service,
                Mashallah, best wishes.
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-7">
              <div>
                <img
                  src={femaleIcon}
                  alt="autor picture"
                  className="w-[90px] h-[90px]"
                />
              </div>
              <div>
                <p>Ohona Islam</p>
                <div className="flex">
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                </div>
              </div>
            </div>
            <div className="flex gap-x-3 mt-8">
              <div>
                <img loading="lazy" src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                A perfect hostel for girls,, the environment is very nice.
                Within cost and affordability,, also about the food.
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-7">
              <div>
                <img
                  src={femaleIcon}
                  alt="autor picture"
                  className="w-[90px] h-[90px]"
                />
              </div>
              <div>
                <p>Mushfikatul Meem</p>
                <div className="flex">
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                </div>
              </div>
            </div>
            <div className="flex gap-x-3 mt-8">
              <div>
                <img loading="lazy" src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                safest place for girls... environment of the hostel is very neat
                and clean.... having good sanitation system, furnitures and
                proper security facilities... moreover the expense is very less
                compare to facilities best wishes for you..
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-7">
              <div>
                <img
                  src={femaleIcon}
                  alt="autor picture"
                  className="w-[90px] h-[90px]"
                />
              </div>
              <div>
                <p>Farhana Sharmin</p>
                <div className="flex">
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                </div>
              </div>
            </div>
            <div className="flex gap-x-3 mt-8">
              <div>
                <img loading="lazy" src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                A friendly place for girls, has all kinds of facilities, the
                environment is very nice.
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-7">
              <div>
                <img
                  src={femaleIcon}
                  alt="autor picture"
                  className="w-[90px] h-[90px]"
                />
              </div>
              <div>
                <p>Rokeya Khan</p>
                <div className="flex">
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                </div>
              </div>
            </div>
            <div className="flex gap-x-3 mt-8">
              <div>
                <img loading="lazy" src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                Project Second Home is an environment where I felt like I were
                in my own family. This is one such hostel. Best wishes always.
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-7">
              <div>
                <img
                  src={femaleIcon}
                  alt="autor picture"
                  className="w-[90px] h-[90px]"
                />
              </div>
              <div>
                <p>Nosrat Jahan</p>
                <div className="flex">
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                </div>
              </div>
            </div>
            <div className="flex gap-x-3 mt-8">
              <div>
                <img loading="lazy" src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                Safe place for girls, hostel environment and service are very
                good, best wishes for PSH
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-7">
              <div>
                <img
                  src={femaleIcon}
                  alt="autor picture"
                  className="w-[90px] h-[90px]"
                />
              </div>
              <div>
                <p>Shamima Zaman Jabin</p>
                <div className="flex">
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                  <AiFillStar className="text-[#F8D254] w-[24px] h-[24px]" />
                </div>
              </div>
            </div>
            <div className="flex gap-x-3 mt-8">
              <div>
                <img loading="lazy" src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                A very safe place for girls, their service is very good, the
                environment is beautiful and all the facilities are there.
              </p>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Review;
