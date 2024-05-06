import React from "react";
import { Link } from "react-router-dom";

import aboutHero from "../../assets/img/about-cover.jpeg";
import fullFurnished from "../../assets/img/full-furnished.jpeg";
import forApartment from "../../assets/img/for-about-apartment.jpeg";
import forColving from "../../assets/img/for-about-colving.jpeg";
import forAsestic from "../../assets/img/for-about-asestic-design.jpeg";
import forPayment from "../../assets/img/for-about-monthly-payment.jpeg";
import forWram from "../../assets/img/for-about-wram.jpeg";
import forComprehensive from "../../assets/img/for-about-comprhensive.jpeg";
import forMobile from "../../assets/img/for-about-mobile.jpeg";
import partnerImg from "../../assets/img/partner-img1.jpeg";
import "./About.css";

const About = () => {
  return (
    <div>
      <div className="hidden md:block mt-[-20px]">
        <div className="md:grid md:grid-cols-12 md:gap-x-8 sm:gap-x-0 gap-y-16 mt-5 banner-left">
          <div className="flex flex-col space-y-3 sm:col-span-12 md:col-span-6 ">
            <div
              className="sm:pt-5 flex justify-end items-center"
              style={{ height: "100vh" }}
            >
              <div className="xl:w-[67%] md:w-[90%]">
                <h2 className=" text-white mb-5 md:text-5xl sm:text-[25px]">
                  Home That Grows With You
                </h2>
                <p className=" text-sm text-white md:text-xl sm:text-sm pr-5">
                  Creating quality and affordable housing for everyone, at every
                  phase of life.
                </p>
                <div className="md:flex  gap-4 md:pb-36 sm:pb-28">
                  <Link to={"/"}>
                    <div className="mt-8">
                      <button
                        className="text-white text-sm px-5 py-3 rounded-lg"
                        style={{
                          background:
                            "linear-gradient(to right, #000, #061c34)",
                        }}
                      >
                        Search for Housing Now
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-3 sm:col-span-12 md:col-span-6 ">
            <img src={aboutHero} alt="about psh" style={{ height: "100vh" }} />
          </div>
        </div>
      </div>

      <div className="md:hidden sm:block">
        <div className=" ">
          <img
            src={aboutHero}
            alt="psh about"
            style={{ height: "400px", width: "100%" }}
          />
        </div>
        <div className="md:px-0 sm:px-5 banner-left">
          <div className="custom-container">
            <div className="md:pt-40 sm:pt-5 md:w-[50%] sm:w-[100%] ">
              <h2 className=" text-white mb-5 md:text-5xl sm:text-[25px]">
                Home That Grows With You
              </h2>
              <p className=" text-sm text-white md:text-xl sm:text-sm pr-5">
                Creating quality and affordable housing for everyone, at every
                phase of life.
              </p>
            </div>
            <div className="md:flex  gap-4 md:pb-36 sm:pb-28">
              <Link to={"/"}>
                <div className="mt-8">
                  <button
                    className="text-white text-sm px-5 py-3 rounded-lg"
                    style={{
                      background: "linear-gradient(to right, #000, #061c34)",
                    }}
                  >
                    Search for Housing Now
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white mb-10 rounded-tl-[100px] mt-[-90px] product-ecosystem">
        <div className="custom-container">
          <div>
            <p className="text-[16px] font-medium py-12 leading-7 sm:ps-5 md:ps-5 shadow-xl rounded-xl border px-8 ">
              দেশের বিভিন্ন প্রান্ত থেকে আগত হাজারো নারীকে নিরাপদ, আরামদায়ক এবং
              সুরক্ষিত আবাসস্থল প্রদানের লক্ষে PSH/পি.এস.এইচ (Project Second
              Home/ প্রোজেক্ট সেকেন্ড হোম) শুরু করেছে তাদের নারী ডরমিটরি
              ব্যবস্থা। থাকা খাওয়ার মৌলিক সুযোগ সুবিধার পাশাপাশি অত্যাধুনিক
              প্রযুক্তি সুবিধা থেকে শুরু করে কর্মজীবী নারী, বিভিন্ন প্রতিষ্ঠানে
              পড়ুয়া নারী শিক্ষার্থী এবং স্বাধীনচেতা নারীদের চলার পথকে সুগম এবং
              সহজতর করতে PSH দিচ্ছে সাধ্যের মধ্যে সর্বোচ্চ নিরাপদ এবং আরামদায়ক
              আবাসন ব্যবস্থা। To ensure a comfortable and safe place for the
              thousands of female who come from various places for different
              purposes and for them Project Second Home (PSH) has taken an
              initiative to create a safe residence. Besides the basic needs
              like food and security, we are going to provide house keeping and
              other necessary supports so that female of different profession
              can cope with their daily lives with full of comfort and safety.
            </p>
          </div>
          <h4 className="text-[32px] font-bold mb-10 pt-16 md:mx-0 mx-2">
            PSH Product Ecosystem
          </h4>
          <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-x-6">
            <div className="">
              <div className="md:block flex justify-center">
                <img
                  className="rounded-t-lg"
                  style={{ width: "300px", height: "130px" }}
                  src={forApartment}
                  alt="psh apartment"
                />
              </div>
              <div className="text-center bg-[#faf9f6] pt-3 h-48 rounded-b-lg">
                <h5 className="font-bold pt-7 pb-3">PSH Apartment</h5>
                <p className="text-sm px-6">
                  Serviced apartment with complete furniture and comprehensive
                  service.
                </p>
              </div>
            </div>
            <div>
              <div className="md:block flex justify-center">
                <img
                  className="rounded-t-lg"
                  style={{ width: "300px", height: "130px" }}
                  src={forColving}
                  alt="psh colving"
                />
              </div>
              <div className="text-center bg-[#faf9f6] pt-3 h-48 rounded-b-lg">
                <h5 className="font-bold pt-7 pb-3">PSH Coliving</h5>
                <p className="text-sm px-6">
                  Coliving exclusive with five star facilities in a strategic
                  location.
                </p>
              </div>
            </div>
            <div>
              <div className="md:block flex justify-center">
                <img
                  className="rounded-t-lg"
                  src="https://images.rukita.co/web/static/img/landing-page/about-us/rukita_residence.png?tr=c-at_max%2Cw-400"
                  style={{ width: "300px", height: "130px" }}
                  alt="psh residence"
                />
              </div>
              <div className="text-center bg-[#faf9f6] pt-3 h-48  rounded-b-lg">
                <h5 className="font-bold pt-7 pb-3">PSH Residence</h5>
                <p className="text-sm">Comming Soon!</p>
              </div>
            </div>
            <div>
              <div className="md:block flex justify-center">
                <img
                  className="rounded-t-lg"
                  style={{ width: "300px", height: "130px" }}
                  src={partnerImg}
                  alt="psh partner"
                />
              </div>
              <div className="text-center bg-[#faf9f6] pt-3 h-48  rounded-b-lg">
                <h5 className="font-bold pt-7 pb-3">PSH Partner</h5>
                <p className="text-sm px-7">
                  Marketing services for exclusive apartments and boarding
                  houses throughout Bangladesh
                </p>
              </div>
            </div>
            <div>
              <div className="md:block flex justify-center">
                <img
                  className="rounded-t-lg"
                  style={{ width: "300px", height: "130px" }}
                  src={partnerImg}
                  alt="psh partner"
                />
              </div>
              <div className="text-center bg-[#faf9f6] pt-3 h-48  rounded-b-lg">
                <h5 className="font-bold pt-7 pb-3 ">PSH Finance</h5>
                <p className="text-sm px-6">
                  Financing assistance for property business expansion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Benefits of Psh */}
      <div className="bg-[#f5f3ed] rounded-tr-[100px] pb-16 mt-16">
        <div className="custom-container">
          <h2 className="text-[32px] font-bold pt-10 pb-9 md:mx-0 mx-2">
            Benefits of Living in PSH
          </h2>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-9 md:mx-0 mx-2">
            <div>
              <img
                className="rounded-lg"
                src={fullFurnished}
                alt="psh furnished"
                style={{
                  width: "400px",
                  height: "200px",
                }}
              />
              <div className="pt-4 ">
                <h4 className="text-xl font-bold">Fully furnished</h4>
                <p className="mt-2 text-sm">
                  The residence is equipped with complete furniture including
                  AC, Wi-Fi, and water heater.
                </p>
              </div>
            </div>
            <div>
              <img
                className="rounded-lg"
                src={forWram}
                alt="psh wram"
                style={{ width: "400px", height: "200px" }}
              />
              <div className="pt-4 ">
                <h4 className="text-xl font-bold">Comprehensive Service</h4>
                <p className="mt-2 text-sm">
                  Room cleaning, laundry, maintenance, and Customer Service are
                  ready to help.
                </p>
              </div>
            </div>
            <div>
              <img
                className="rounded-lg"
                style={{ width: "400px", height: "200px" }}
                src={forPayment}
                alt="psh payments"
              />

              <div className="pt-4 ">
                <h4 className="text-xl font-bold">Monthly Payments</h4>
                <p className="mt-2 text-sm">
                  It's easier with practical monthly payments via Mobile
                  Banking, Cards and Bank Transfer.
                </p>
              </div>
            </div>
            <div>
              <img
                className="rounded-lg"
                style={{ width: "400px", height: "200px" }}
                src={forMobile}
                alt="psh app"
              />
              <div className="pt-4 ">
                <h4 className="text-xl font-bold">
                  Multifunctional Application
                </h4>
                <p className="mt-2 text-sm">
                  Request services, room requirements and monthly payments
                  directly from one application.
                </p>
              </div>
            </div>
            <div>
              <img
                className="rounded-lg"
                style={{ width: "400px", height: "200px" }}
                src={forAsestic}
                alt="psh design application"
              />
              <div className="pt-4 ">
                <h4 className="text-xl font-bold">Aesthetic Design</h4>
                <p className="mt-2 text-sm">
                  A dream residence that is comfortable, stylish and modern.
                </p>
              </div>
            </div>
            <div>
              <img
                className="rounded-lg"
                src={forComprehensive}
                alt="psh warm & exciting"
                style={{ width: "400px", height: "200px" }}
              />
              <div className="pt-4 ">
                <h4 className="text-xl font-bold">Warm & Exciting</h4>
                <p className="mt-2 text-sm">
                  Expand connections by joining Community Events with PSH
                  guests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
