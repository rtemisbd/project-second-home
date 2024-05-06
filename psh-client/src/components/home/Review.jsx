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
                <img src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                প্রজেক্ট সেকেন্ড হোমে একদিনের জন্য অতিথি হয়েছিলাম। খুব সুন্দর,
                গোছানো ও নিরাপদ জায়গা। কেমন না কেমন হবে, নিরাপদ হবে কিনা এই রকম
                অনেক সংশয় নিয়ে গিয়েছিলাম এবং আমি মুগ্ধ। সেখানে যারা দেখাশুনার
                দায়িত্বে আছেন তারাও খুব আন্তরিক। মেয়েদের জন্য তাদের এত সুন্দর
                একটা উদ্যোগ সত্যিই প্রশংসার দাবি রাখে।
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
                <p>Adv Nusrat Munia</p>
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
                <img src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                মেয়েদের জন্য ঢাকার মধ্যে বেস্ট একটা হোস্টেল, যেমন পরিবেশ
                পাশাপাশি খাবার ও খুব ভালো, এবং রিজনেবল cost এ ভালো পরিবেশে থাকতে
                চাইলে এটার বিকল্প নেই আমি highly recommend করছি আপুদের কে এই
                হোটেল
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
                <p>সাবরিনা চিন্তু</p>
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
                <img src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                ঢাকার বাহির থেকে অনেক মেয়েরা ঢাকায় আসে পড়াশুনা কিংবা চাকরি বাকরি
                করতে। তাদের জন্য সবথেকে বেশী যেটা প্রয়জন হয় তা হল নিরাপদ আশ্রয়।
                আপনাদের উদ্যোগ টা খুবই অনুপ্রেরণা জনক। আপনাদের সাধুবাদ জানাই।
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
                <img src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                মেয়েদের জন্য অনেক সেইভ এবং আধুনিক সব সুবিধা সম্মত অতি মনোরম একটা
                পরিবেশ। আসলেই এটা সেকেন্ড হোম। অনেক অনেক দোয়া রইলো psh.
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
                <img src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                ঢাকায় সাধ্যের মধ্যে থাকার জন্য সবথেকে নিরাপদ জায়গা।
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
                <img src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                অনেক ট্রাস্টটেড এবং মেয়েদের জিন্য নিরাপদ একটি হোস্টেল খাবার ও
                সার্ভিস মাসাল্লাহ শুভ কামনা রইল
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
                <img src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                মেয়েদের জন্য পারফেক্ট একটা হোস্টেল,, পরিবেশ খুবই সুন্দর। খরচ ও
                সাধ্যের মধ্যে,,, খাবার নিয়েও নিশ্চিন্ত।
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
                <img src={commaIcon} alt="" />
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
                <img src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                মেয়েদের জন্য একটা সৈভ প্লেস, সবধরনের সুজোক সুবিধা আছে, পরিবেশ
                ওখুব সুন্দর
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
                <img src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                সেকেন্ড হোমটা বলা হয় এমন একটা পরিবেশকে যেখানে থাকলে মনে হয় নিজের
                পরিবারেই আছি। এটা এমনই একটা হোস্টেল। শুভকামনা সবসময়।
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
                <img src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                মেয়েদের জন্য সেইফ place, হোস্টেল এর পরিবেশ এবং সার্ভিস খুবই
                ভালো, অনেক শুভকামনা রইলো PSH এর জন্য
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
                <img src={commaIcon} alt="" />
              </div>
              <p className="pr-16">
                মেয়েদের জন্য অনেক সেভ একটা প্লেস, তাদের সার্ভিস অনেক ভালো,
                পরিবেশ সুন্দর এবং সকল সুযোগ সুবিধা রয়েছে।
              </p>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Review;
