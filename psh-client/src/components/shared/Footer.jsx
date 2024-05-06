import React, { useState } from "react";
// import MessengerCustomerChat from "react-messenger-customer-chat";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";

import UseFetch from "../../hooks/useFetch";

import "./Custom.css";
import { useDispatch } from "react-redux";
import { placeModalShow } from "../../redux/reducers/smProfileMenuSlice";
import FinalLoginModal from "./FinalLoginModal";
import whatsappIcon from "../../../src/assets/img/whastapp.png";
const Footer = () => {
  const { data } = UseFetch(`dynamic`);
  // const [size, setSize] = useState(null);
  // const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const handleSubscribe = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/");
  };
  return (
    <div className="footer-part">
      <div>
        <div style={{ background: "linear-gradient(to right, #000, #061c34)" }}>
          <div
            className=" "
            style={{
              background: "linear-gradient(to right, #070e1b, #07182b)",
            }}
          >
            <div className="dark:text-gray-300 custom-container md:flex justify-center">
              <ul className="py-4  md:w-1/2">
                {/* <li className=" col-span-1">
                  <div className="md:flex">
                    <div className="sm:flex sm:justify-center sm:mb-2">
                      <i className="fa-solid fa-envelope md:text-2xl text-white"></i>
                    </div>
                    <div className="text-start ms-3">
                      <h2 className="text-white dark:text-gray-200 text-sm sm:hidden">
                        Email Support
                      </h2>
                      <h5 className="text-white text-sm mt-2">
                        info@psh.com.bd
                      </h5>
                    </div>
                  </div>
                </li>

                <li className=" col-span-1">
                  <div className="md:flex">
                    <div className="sm:flex sm:justify-center sm:mb-2 sm:mr-20 md:mr-0">
                      <i className="fa-solid fa-phone text-white md:text-2xl"></i>
                    </div>
                    <div className="text-start ms-3">
                      <h2 className="text-white dark:text-gray-200 text-sm sm:hidden">
                        Phone Support
                      </h2>
                      <h5 className="text-white text-sm mt-2">08147758883</h5>
                    </div>
                  </div>
                </li> */}

                {/* <li className="col-span-1 md:block sm:hidden">
                  <div className="md:flex sm:mr-4">
                    <div className="sm:flex sm:justify-center sm:mb-2">
                      <i className="fa-brands fa-whatsapp md:text-3xl text-white "></i>
                    </div>
                    <div className="text-start md:ms-3">
                      <h2 className="text-white dark:text-gray-200 text-sm sm:hidden">
                        Whatsapp Support
                      </h2>
                      <h5 className="text-white text-sm mt-2">08147758883</h5>
                    </div>
                  </div>
                </li> */}

                <li className="col-span-3 sm:p-2 md:p-0 md:ms-20 sm:ms-0">
                  <form className="flex">
                    <p className="looking_text md:text-[24px] sm:text-[14px]">
                      Looking for best place to live
                    </p>
                    <button
                      className="ml-1 rounded bg-[#00bbb4] font-bold px-5 md:py-3 sm:py-2 uppercase text-white text-sm"
                      onClick={handleSubscribe}
                    >
                      Search
                    </button>
                  </form>
                </li>
              </ul>
            </div>
          </div>
          <footer className="pt-4 pb-8 xl:pt-8 custom-container sm:p-5 ">
            <div className="  dark:text-gray-300">
              <ul className="grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-2 pb-8 text-lg font-light gap-x-10">
                {/* <li className="w-1/2 md:w-1/6 lg:w-1/6">
                  <div className="text-start">
                    <h2
                      className=" dark:text-gray-200 text-md mb-4"
                      style={{ color: "rgba(40, 255, 239, 1)" }}
                    >
                      PSH
                    </h2>

                    <ul className="footer_li">
                      {data
                        ?.filter((item) => item?.section === "footer1")
                        .map((item) => (
                          <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                            <Link to={`${item?.link}`}> {item?.name}</Link>
                          </li>
                        ))}

                      <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                        <a href="#">Our Story</a>
                      </li>
                     
                      <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                        <a href="#">Our Service</a>
                      </li>
                      <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                        <a href="#">Testimonials</a>
                      </li>
                      <Link to={"/terms"}>
                        <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                          <a>Terms & Conditions</a>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </li> */}
                <li className="">
                  <div className="text-start">
                    <h2
                      className=" dark:text-gray-200 text-md uppercase mb-4 text-[1rem]"
                      style={{ color: "rgba(40, 255, 239, 1)" }}
                    >
                      Partner With Us
                    </h2>
                    <ul className="footer_li">
                      {/* <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                        <Link
                          to={"https://partner.psh.com.bd/"}
                          className="hover:text-[#00bbb4]"
                        >
                          Partner Login
                        </Link>
                      </li> */}
                      <li className="mb-4 duration-200 hover:text-gray-800 dark:hover:text-white">
                        <Link
                          to={"/register-property"}
                          className="hover:text-[#00bbb4]"
                        >
                          Register a Property
                        </Link>
                      </li>

                      <li className="mb-4 duration-200 hover:text-gray-800 dark:hover:text-white">
                        <Link
                          to={"/investment-opportunities"}
                          className="hover:text-[#00bbb4]"
                        >
                          Partner Registration
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="">
                  <div className="text-start">
                    <h2
                      className=" dark:text-gray-200 text-md uppercase mb-4 text-[1rem]"
                      style={{ color: "rgba(40, 255, 239, 1)" }}
                    >
                      PSH FOR Business
                    </h2>
                    <ul className="footer_li">
                      <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                        <Link
                          to={"/corporate-housing"}
                          className="hover:text-[#00bbb4]"
                        >
                          Corporate Housing{" "}
                        </Link>
                      </li>

                      <li className="mb-4 duration-200 dark:hover:text-white">
                        {/* <Link
                          to={"/collaberation"}
                          className="hover:text-[#00bbb4]"
                        > */}
                        Brand Collaboration {/* </Link> */}
                      </li>

                      {/* <Link to={"/community"}> */}
                      <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                        <a>Community</a>
                      </li>
                      {/* </Link> */}
                    </ul>
                  </div>
                </li>
                <li className="">
                  <div className="text-start">
                    <h2
                      className=" dark:text-gray-200 text-md uppercase mb-4 text-[1rem]"
                      style={{ color: "rgba(40, 255, 239, 1)" }}
                    >
                      Resource
                    </h2>
                    <ul className="footer_li">
                      <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                        <Link
                          to="/faq-question"
                          className="hover:text-[#00bbb4]"
                        >
                          FAQ
                        </Link>
                      </li>

                      <a
                        href="https://www.linkedin.com/company/project-second-home/"
                        target="_blank"
                      >
                        <li className="mb-4 duration-200 text-white hover:text-[#00bbb4]">
                          Career
                        </li>
                      </a>
                      {/* <Link to={"/stories"}> */}
                      <li className="mb-4  duration-200 hover:text-gray-800 dark:hover:text-white">
                        <a>Notice</a>
                      </li>
                      {/* </Link> */}
                    </ul>
                  </div>
                </li>
                <li className="">
                  <div className="text-start">
                    <h2
                      className=" dark:text-gray-200 text-md uppercase mb-4 text-[1rem]"
                      style={{ color: "rgba(40, 255, 239, 1)" }}
                    >
                      Connect with us
                    </h2>

                    <div className="flex flex-col gap-y-2">
                      <div
                        className="text-white  text-[14px] flex items-center gap-x-1"
                        style={{ marginTop: -3 }}
                      >
                        <div>
                          <FaWhatsapp
                            style={{ width: "16px", height: "16px" }}
                          />
                        </div>
                        <p>+8801647647404</p>
                      </div>
                      <div
                        className="text-white text-[14px] flex items-center gap-x-1"
                        style={{ marginTop: -3 }}
                      >
                        <div>
                          <AiOutlineMail
                            style={{ width: "16px", height: "16px" }}
                          />
                        </div>
                        <p>help@psh.com.bd</p>
                      </div>
                    </div>
                    <p className="text-white text-[14px] mt-2">
                      Operational Hour
                    </p>
                    <p
                      className=" text-[12px]"
                      style={{
                        fontWeight: "300px",
                        lineWeight: "18px",
                        color: "rgba(255, 255, 255, 1)",
                      }}
                    >
                      Sunday - Friday: 10.00 AM - 7 PM
                    </p>
                  </div>
                </li>
                <li className="sm:mt-5 md:mt-0 md:flex sm:hidden">
                  <div>
                    <div className="flex gap-x-3 items-center justify-center">
                      <a
                        href="https://www.facebook.com/pshbd?mibextid=eHce3h"
                        target="_blank"
                      >
                        <img src="/assets/img/facebook.svg.png" alt="" />
                      </a>

                      <a
                        href="https://www.instagram.com/projectsecondhome.bd/?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"
                        target="_blank"
                      >
                        <img
                          src="/assets/img/Link → instagram.svg.png"
                          alt=""
                        />
                      </a>

                      <a
                        href="https://www.linkedin.com/company/project-second-home/"
                        target="_blank"
                      >
                        <FaLinkedin className="text-white" />
                      </a>
                    </div>
                    <div>
                      <div className="mt-6">
                        <button
                          className="footer_btn"
                          onClick={() => dispatch(placeModalShow(true))}
                        >
                          <p className="mt-2 text-[14px]"> Login / Signup</p>
                        </button>
                      </div>
                      <div className="mt-6 ">
                        <button className="footer_btn ">
                          <img
                            src="/assets/img/appstore.svg.png"
                            alt=""
                            className="mt-2 text-[14px] ms-3"
                          />
                          <img
                            src="/assets/img/playstore.svg.png"
                            alt=""
                            className="mt-2 text-[14px] "
                          />
                          <span className="mt-2 text-[14px] ms-3">
                            {" "}
                            Download PSH
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </footer>
          <div className="sm:block md:hidden mb-4">
            <div className="w-full flex justify-center items-center ">
              <div>
                <div className="flex gap-x-3 items-center justify-center">
                  <a
                    href="https://www.facebook.com/pshbd?mibextid=eHce3h"
                    target="_blank"
                  >
                    <img src="/assets/img/facebook.svg.png" alt="" />
                  </a>

                  <a
                    href="https://www.instagram.com/projectsecondhome.bd/?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"
                    target="_blank"
                  >
                    <img src="/assets/img/Link → instagram.svg.png" alt="" />
                  </a>

                  <a
                    href="https://www.linkedin.com/company/project-second-home/"
                    target="_blank"
                  >
                    <FaLinkedin className="text-white" />
                  </a>
                </div>
                <div>
                  <div className="mt-6">
                    <button
                      className="footer_btn"
                      onClick={() => dispatch(placeModalShow(true))}
                    >
                      <p className="mt-2 text-[14px]"> Login / Signup</p>
                    </button>
                  </div>
                  <div className="mt-6 ">
                    <button className="footer_btn ">
                      <img
                        src="/assets/img/appstore.svg.png"
                        alt=""
                        className="mt-2 text-[14px] ms-3"
                      />
                      <img
                        src="/assets/img/playstore.svg.png"
                        alt=""
                        className="mt-2 text-[14px] "
                      />
                      <span className="mt-2 text-[14px] ms-3">
                        {" "}
                        Download PSH
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" sm:flex sm:justify-center md:hidden mb-2">
            <Link
              to={"/terms"}
              className="text-white text-[12px] underline hover:text-[#00bbb4]"
              style={{
                fontWeight: "300px",
              }}
            >
              Terms of use
            </Link>
            <Link
              to={"/privacy"}
              className="text-white text-[12px] ms-2 underline hover:text-[#00bbb4]"
              style={{
                fontWeight: "300px",
              }}
            >
              Privacy Policy
            </Link>
          </div>
          <div
            className=" flex md:justify-between sm:justify-center text-white sm:text-[12px] custom-container pb-5"
            // style={{
            //   background: "linear-gradient(to right, #020304, #071e37)",
            // }}
          >
            © 2024 Project Second Home. All rights reserved
            <div className="flex ms-5 sm:hidden md:block">
              <Link
                to={"/terms"}
                className="text-white text-[12px] underline hover:text-[#00bbb4]"
                style={{
                  fontWeight: "300px",
                }}
              >
                Terms of use
              </Link>
              <Link
                to={"/privacy"}
                className="text-white text-[12px] ms-2 underline hover:text-[#00bbb4]"
                style={{
                  fontWeight: "300px",
                }}
              >
                Privacy Policy
              </Link>
            </div>
            {/* <div className="sm:hidden md:flex md:ms-4 footer_social ms-2 mr-2">
              <img src="assets/img/facebook.svg.png" alt="" />

              <img
                src="assets/img/Link → instagram.svg.png"
                alt=""
                className="mx-2"
              />

              <img src="assets/img/Link → twitter.svg.png" alt="" />
            </div> */}
          </div>
        </div>
      </div>
      <div className="whatsapp_pic ">
        <a href="https://wa.me/+8801647647404" target="_blank">
          <img
            src={whatsappIcon}
            alt="psh whatsapp"
            style={{ width: 60, height: 60 }}
          />
        </a>
      </div>
      {/* <MessengerCustomerChat
        pageId="102879811311818"
        appId=" 570469815108233"
      /> */}
      {/* Signup, login modal */}
      <FinalLoginModal />
    </div>
  );
};

export default Footer;
