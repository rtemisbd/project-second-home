import React, { useState } from "react";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import ExtraForm from "../ExtraForm/ExtraForm";
import partnerImg from "../../assets/img/partner-img1.jpeg";
import PartnerService from "../new/PartnerService";
import OtherOpportunities from "../new/OtherOpportunities";
import PartnerFeedback from "../new/PartnerFeedback";
import "./PshPartner.css";

const PshPartner = () => {
  const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value);

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
                <div>
                  <h2 className=" text-white mb-5 md:text-5xl sm:text-[25px]">
                    Invest and Grow with Project Second Home
                  </h2>

                  <p className="text-sm mb-4 text-white md:text-xl sm:text-sm mt-2">
                    Become a PSH angel Investor, Project Director, Franchise
                    Partner or Share holder to maximize your idle money and
                    Increase your property valuation to great a social
                    recognition and hassle free income.
                  </p>
                </div>
                <div className="md:flex gap-4 md:pb-11 sm:pb-5">
                  <div className="sm:mb-3 md:mb-0 ">
                    <button
                      className="text-neutral-800 text-center text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch bg-white  px-4 py-4 rounded-lg"
                      style={{ width: 220 }}
                      onClick={() => handleOpen("sm")}
                    >
                      Apply for PSH Parntner
                    </button>
                  </div>
                  <Link to={"/contact-us"}>
                    <div
                      className="justify-between items-stretch border flex gap-px pl-3 pr-4 py-3 rounded-lg border-solid border-white "
                      style={{ width: 220 }}
                    >
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5acafaceab7794f50dc75a52aade2c6ed5eabd94dd1236c337c5bddd85becb4d?apiKey=e4c55b3835e0471b869cabb50a0b8cd9&"
                        className="aspect-square object-contain object-center w-7 overflow-hidden shrink-0 max-w-full"
                      />
                      <div className="text-white text-center text-sm leading-5 self-center grow whitespace-nowrap my-auto">
                        Contact the PSH Team
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-3 sm:col-span-12 md:col-span-6 ">
            <img
              src={partnerImg}
              alt="project second home finance"
              style={{ height: "100vh" }}
            />
          </div>
        </div>
      </div>
      <div className="md:hidden sm:block">
        <div>
          <img
            src={partnerImg}
            alt="project second home finance"
            style={{ height: "350px", width: "100%" }}
          />
        </div>

        <div className="banner-left md:px-0 sm:px-5">
          <div className=" custom-container">
            <div className="md:pt-48 sm:pt-5 md:w-[50%] sm:w-[100%]">
              <h2 className=" text-white mb-5 md:text-5xl sm:text-[25px]">
                Invest and Grow with Project Second Home
              </h2>

              <p className="text-sm mb-4 text-white md:text-xl sm:text-sm mt-2">
                Become a PSH angel Investor, Project Director, Franchise Partner
                or Share holder to maximize your idle money and Increase your
                property valuation to great a social recognition and hassle free
                income.
              </p>
            </div>
            <div className="md:flex gap-4 md:pb-11 sm:pb-5">
              <div className="sm:mb-3 md:mb-0 ">
                <button
                  className="text-neutral-800 text-center text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch bg-white  px-4 py-4 rounded-lg"
                  style={{ width: 220 }}
                  onClick={() => handleOpen("sm")}
                >
                  Apply for Partner
                </button>
              </div>
              <Link to={"/contact"}>
                <div
                  className="justify-between items-stretch border flex gap-px pl-3 pr-4 py-3 rounded-lg border-solid border-white "
                  style={{ width: 220 }}
                >
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5acafaceab7794f50dc75a52aade2c6ed5eabd94dd1236c337c5bddd85becb4d?apiKey=e4c55b3835e0471b869cabb50a0b8cd9&"
                    className="aspect-square object-contain object-center w-7 overflow-hidden shrink-0 max-w-full"
                  />
                  <div className="text-white text-center text-sm leading-5 self-center grow whitespace-nowrap my-auto">
                    Contact the PSH Team
                  </div>
                </div>
              </Link>
            </div>
            <Dialog
              open={size === "sm"}
              size={size || "sm"}
              handler={handleOpen}
              style={{ height: "100vh", overflow: "scroll" }}
            >
              <DialogHeader>
                {" "}
                <div
                  className="flex justify-end text-3xl text-black"
                  onClick={() => handleOpen(null)}
                >
                  <i className="fa-solid fa-circle-xmark cursor-pointer"></i>
                </div>
              </DialogHeader>
              <DialogBody className="p-2">
                <ExtraForm handleOpen={handleOpen} />
              </DialogBody>
            </Dialog>
          </div>
        </div>
      </div>
      <PartnerService />
      <div className="custom-container ">
        <h2 className="text-xl font-bold mb-5 mt-24 md:mx-0 sm:mx-5">
          3 Steps to lease an investor
        </h2>
        <div className=" grid md:grid-cols-3 sm:grid-cols-1 md:gap-0 sm:gap-10 md:mx-0 sm:mx-5">
          <div className="group relative">
            <div className="overflow-hidden">
              <div className="flex justify-between gap-4 items-start">
                <p className="justify-center text-white text-lg items-center bg-teal-600 h-9 px-3.5 py-1 rounded-xl">
                  1
                </p>
                <div className="self-stretch flex grow basis-[0%] flex-col items-stretch">
                  <div className="justify-center text-black text-lg font-medium leading-7 whitespace-nowrap">
                    Register as an investor
                  </div>
                  <div className="text-stone-500 text-sm leading-5 whitespace-nowrap mt-2.5">
                    Our team will carry out an evaluation
                  </div>
                </div>
              </div>
              <button
                className="partner_btn ms-12 mt-3"
                onClick={() => handleOpen("sm")}
              >
                Apply Now
              </button>
            </div>
          </div>
          <div className="group relative">
            <div className="overflow-hidden">
              <div className="flex justify-between gap-4 items-start">
                <p className="justify-center text-white text-lg items-center bg-teal-600 h-9 px-3.5 py-1 rounded-xl">
                  2
                </p>
                <div className="self-stretch flex grow basis-[0%] flex-col items-stretch">
                  <div className="justify-center text-black text-lg font-medium leading-7 whitespace-nowrap">
                    Contract Signature
                  </div>
                  <div className="justify-center text-stone-500 text-sm leading-5 whitespace-nowrap mt-2.5">
                    Check the contract and sign the contract
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="group relative">
            <div className="overflow-hidden">
              <div className="flex justify-between gap-4 items-start">
                <p className="justify-center text-white text-lg items-center bg-teal-600 h-9 px-3.5 py-1 rounded-xl">
                  3
                </p>
                <div className="self-stretch flex grow basis-[0%] flex-col items-stretch">
                  <div className="text-black text-lg font-medium leading-7 whitespace-nowrap">
                    Enjoy the Results
                  </div>
                  <div className="justify-center text-stone-500 text-sm leading-5 whitespace-nowrap mt-2.5">
                    Sit back and enjoy the hassle free return
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OtherOpportunities />
      <PartnerFeedback />
    </div>
  );
};

export default PshPartner;
