import React, { useState } from "react";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import studyBanner from "../../assets/img/study-banner.jpeg";

import StudyForm from "./StudyForm";
import StudySpaceBottom from "./StudySpaceBottom";

const StudySpace = () => {
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
              <div className="xl:w-[67%] md:w-[80%]">
                <div>
                  <p className="text-sm mb-10 text-white md:text-xl sm:text-sm mt-2 ">
                    At PSH, we offer flexible, comfortable spaces for individual
                    study, Co-working, group discussions and tutoring sessions
                  </p>
                </div>
                <div className="md:flex gap-4 md:pb-11 sm:pb-5">
                  <div className="sm:mb-3 md:mb-0 ">
                    <button
                      className="text-neutral-800 text-center text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch bg-white  px-4 py-4 rounded-lg"
                      style={{ width: 220 }}
                      onClick={() => handleOpen("sm")}
                    >
                      Book Your Slot
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
              src={studyBanner}
              alt="project second home finance"
              style={{ height: "100vh" }}
            />
          </div>
        </div>
      </div>
      <div className="md:hidden sm:block">
        <div>
          <img
            src={studyBanner}
            alt="project second home finance"
            style={{ height: "350px", width: "100%" }}
          />
        </div>

        <div className="banner-left md:px-0 sm:px-5">
          <div className=" custom-container">
            <div className="md:pt-48 sm:pt-5 md:w-[50%] sm:w-[100%]">
              <p className="text-sm mb-4 text-white md:text-xl sm:text-sm mt-2">
                At PSH, we offer flexible, comfortable spaces for individual
                study, Co-working, group discussions, and tutoring sessions
              </p>
            </div>
            <div className="md:flex gap-4 md:pb-11 sm:pb-5">
              <div className="sm:mb-3 md:mb-0 ">
                <button
                  className="text-neutral-800 text-center text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch bg-white  px-4 py-4 rounded-lg"
                  style={{ width: 220 }}
                  onClick={() => handleOpen("sm")}
                >
                  Book Your Slot
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
              style={{
                height: "100vh",
                overflow: "scroll",
              }}
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
                <StudyForm handleOpen={handleOpen} />
              </DialogBody>
            </Dialog>
          </div>
        </div>
      </div>

      <StudySpaceBottom />
    </div>
  );
};

export default StudySpace;
