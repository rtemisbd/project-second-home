import React, { useState } from "react";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import partnerImg from "../../assets/img/partner-img1.jpeg";
import partnerImg2 from "../../assets/img/offerImg.png";
import fixedRentImg from "../../assets/img/fixed-rent.png";
import frameWorkImg from "../../assets/img/Legal Framework 1.png";
import maintainceImg from "../../assets/img/maintenance 1.png";
import strongLegalImg from "../../assets/img/legal-document 1.png";
import safelyImg from "../../assets/img/give 2.png";
import renewableImg from "../../assets/img/renewal 2.png";
import PartnerModal from "./PartnerModal";
import OtherOpportunities from "./OtherOpportunities";

import "./partner.css";

const Partner = () => {
  const [size, setSize] = React.useState(null);
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
                <h2 className=" text-white mb-5 md:text-5xl sm:text-[25px]">
                  What we do?
                </h2>
                <p className=" text-sm text-white md:text-xl sm:text-sm">
                  PSH women dormitory which is working on women accommodation,
                  safety and security who come from outside to Dhaka for Study,
                  Job and Treatment purpose etc.
                </p>
                <p className="text-sm mb-4 text-white md:text-xl sm:text-sm mt-2">
                  As well we are here to manage and give you potential property
                  counseling, Business Collaboration opportunities and carrying
                  your property maintenance issues.
                </p>

                <div className="md:flex  gap-4 md:pb-0 sm:pb-5">
                  <div className="sm:mb-3 md:mb-0 ">
                    <button
                      className="text-neutral-800 text-center text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch bg-white  px-4 py-4 rounded-lg"
                      style={{ width: 220 }}
                      onClick={() => handleOpen("sm")}
                    >
                      List Your Property
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
              alt="about psh partner"
              style={{ height: "100vh", width: "100%" }}
            />
          </div>
        </div>
      </div>
      <div className="md:hidden sm:block">
        <div className=" ">
          <img
            src={partnerImg}
            alt=""
            style={{ height: "350px", width: "100%" }}
          />
        </div>
        <div className="banner-left md:px-0 sm:px-5">
          <div className=" custom-container">
            <div className=" ">
              <div className="md:pt-40 sm:pt-5 md:w-[50%] sm:w-[100%]">
                <h2 className=" text-white mb-5 md:text-5xl sm:text-[25px]">
                  What we do?
                </h2>
                <p className=" text-sm text-white md:text-xl sm:text-sm">
                  PSH women dormitory which is working on women accommodation,
                  safety and security who come from outside to Dhaka for Study,
                  Job and Treatment purpose etc.
                </p>
                <p className="text-sm mb-4 text-white md:text-xl sm:text-sm mt-2">
                  As well we are here to manage and give you potential property
                  counseling, Business Collaboration opportunities and carrying
                  your property maintenance issues.
                </p>
              </div>
              <div className="md:flex  gap-4 md:pb-0 sm:pb-5">
                <div className="sm:mb-3 md:mb-0 ">
                  <button
                    className="text-neutral-800 text-center text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch bg-white  px-4 py-4 rounded-lg"
                    style={{ width: 220 }}
                    onClick={() => handleOpen("sm")}
                  >
                    List Your Property
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
                  <PartnerModal handleOpen={handleOpen} />
                </DialogBody>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-5">
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 custom-container md:mt-16 sm:mt-5 mb-20 md:gap-x-10 sm:gap-x-0">
          <div>
            <img src={partnerImg2} alt="" />
          </div>
          <div className="mt-2">
            <h3 className="font-bold text-xl">What do we offer? </h3>
            <h5 className="mt-8 font-bold">Lease for Property </h5>
            <p className="mt-5">
              <span className="font-bold">PSH</span> Directly engage with
              property (Building or Apartment) related work that we can create
              win-win and long term relationship with property owners so that
              you can turn your inactive or lazy assets into a profitable
              property business effectively by generating growths.
            </p>
            <Link to={"/contact-us"}>
              <button className="mt-12 border-2 border-black rounded px-5 py-2">
                Contact with us
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="sm:mx-2 md:mx-0">
        <h2 className="custom-container font-bold mb-3 text-xl">
          AS A LEASSOR :
        </h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 custom-container gap-5 mb-5">
          <div className="flex md:gap-x-5 sm:gap-x-2 items-center bg-[#4CC0B8] rounded-lg">
            <img
              src={fixedRentImg}
              style={{ width: "60px" }}
              className="py-2 ps-3"
              alt=""
            />
            <p className="text-white md:text-[20px] sm:text-[1rem]">
              Fixed Rent
            </p>
          </div>
          <div className="flex md:gap-x-5 sm:gap-x-2 items-center bg-[#4CC0B8] rounded-lg">
            <img
              src={frameWorkImg}
              style={{ width: "60px" }}
              className="py-2 ps-3"
              alt=""
            />
            <p className="text-white md:text-[20px] sm:text-[1rem]">
              Legal Framework
            </p>
          </div>
          <div className="flex md:gap-x-5 sm:gap-x-2 items-center bg-[#4CC0B8] rounded-lg">
            <img
              src={maintainceImg}
              style={{ width: "60px" }}
              className="py-2 ps-3"
              alt=""
            />
            <p className="text-white md:text-[20px] sm:text-[1rem]">
              Property Maintenance{" "}
            </p>
          </div>
          <div className="flex md:gap-x-5 sm:gap-x-2 items-center bg-[#4CC0B8] rounded-lg">
            <img
              src={strongLegalImg}
              style={{ width: "60px" }}
              className="py-2 ps-3"
              alt=""
            />
            <p className="text-white md:text-[20px] sm:text-[1rem]">
              Strong Legal Framework{" "}
            </p>
          </div>
          <div className="flex md:gap-x-5 sm:gap-x-2 items-center bg-[#4CC0B8] rounded-lg">
            <img
              src={safelyImg}
              style={{ width: "60px" }}
              className="py-2 ps-3"
              alt=""
            />
            <p className="text-white md:text-[20px] sm:text-[1rem]">
              Safely Handover{" "}
            </p>
          </div>
          <div className="flex md:gap-x-5 sm:gap-x-2 items-center bg-[#4CC0B8] rounded-lg">
            <img
              src={renewableImg}
              style={{ width: "60px" }}
              className="py-2 ps-3"
              alt=""
            />
            <p className="text-white md:text-[20px] sm:text-[1rem]">
              Renewable opportunities{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="custom-container ">
        <h2 className="text-xl font-bold mb-5 mt-24 md:mx-0 sm:mx-5">
          3 Steps to lease your property with PSH
        </h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-1 md:gap-0 sm:gap-10 md:mx-0 sm:mx-5">
          <div className="group relative">
            <div className="overflow-hidden">
              <div className="flex justify-between gap-4 items-start">
                <p className="justify-center text-white text-lg items-center bg-teal-600 h-9 px-3.5 py-1 rounded-xl">
                  1
                </p>
                <div className="self-stretch flex grow basis-[0%] flex-col items-stretch">
                  <div className="justify-center text-black text-lg font-medium leading-7 whitespace-nowrap">
                    Register Property
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
                <p className="justify-center text-white text-lg items-center bg-teal-600  h-9 px-3.5 py-1 rounded-xl">
                  3
                </p>
                <div className="self-stretch flex grow basis-[0%] flex-col items-stretch">
                  <div className="text-black text-lg font-medium leading-7 whitespace-nowrap">
                    Enjoy the Results
                  </div>
                  <div className="justify-center text-stone-500 text-sm leading-5 whitespace-nowrap mt-2.5">
                    Sit back and enjoy the results from Project Second Home
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Other Opportunities */}
      <OtherOpportunities />
    </div>
  );
};

export default Partner;
