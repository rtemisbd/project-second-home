import React from "react";
import { Typography } from "@material-tailwind/react";

import "./Contact.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { placeLoadingShow } from "../../redux/reducers/smProfileMenuSlice";

const Contact = () => {
  const dispatch = useDispatch();
  const handleContactUs = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const mobileNumber = e.target.mobileNumber.value;
    const purPose = e.target.purPose.value;
    const appointMentDate = e.target.appointMentDate.value;
    const appointMentTime = e.target.appointMentTime.value;
    const contactMsg = e.target.contactMsg.value;

    const contactUsData = {
      name: name,
      email: email,
      mobileNumber: mobileNumber,
      purPose: purPose,
      appointMentDate: appointMentDate,
      appointMentTime: appointMentTime,
      contactMsg: contactMsg,
    };
    try {
      dispatch(placeLoadingShow(true));
      await axios.post("https://api.psh.com.bd/api/contact", contactUsData);
      toast.success(
        "Thank you. One Confirmation email will be sent to you if your appointment is confirmed from us."
      );
    } catch (error) {
      dispatch(placeLoadingShow(false));
      console.log(error);
    }
    e.target.reset();
  };

  return (
    <div className="custom-container mb-28">
      <div className="md:mt-7 sm:mt-4 md:mx-5 sm:mx-4">
        <div>
          <h2 className="md:text-[32px] sm:text-[26px] font-bold mb-3">
            Our Office
          </h2>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.2121161853374!2d90.37714807592732!3d23.739814189181644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b92150a7d46b%3A0x85fbdf9128e8b71f!2sCafe%20Rtemis!5e0!3m2!1sen!2sbd!4v1702806089293!5m2!1sen!2sbd"
              width="100%"
              height="550"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="md:grid md:grid-cols-12 md:gap-x-8 sm:gap-x-0 gap-y-16 mt-5 ">
          <div className="flex flex-col items-start space-y-3 sm:col-span-12 md:col-span-6 ">
            <div className="">
              <span className="block text-base text-primary font-bold uppercase">
                Head Office
              </span>
              <p>
                Ahamed House, House No. 23, Road No. 03, Dhanmondi, Dhaka-1209
              </p>
              <h2 className="mb-6 font-bold md:text-[32px] sm:text-[16px] mt-5">
                Let’s talk.
              </h2>
              <p className="text-base text-body-color leading-relaxed mb-9">
                Have a question or need assistance? We're here to help! Use the
                contact form below to get in touch with the Project Second Home
                team
              </p>
              <div className="flex md:flex-row sm:flex-col md:gap-x-5 sm:gap-x-0 md:gap-y-0 sm:gap-y-4">
                <button className=" bg-[#00bbb4] text-white px-16  text-left rounded-lg py-2">
                  <p>Call us</p> <p>+8801647647404</p>
                </button>
                <button className="bg-[#00bbb4] px-16 text-left rounded-lg py-2 text-white">
                  <p>Mail us</p> <p>help@psh.com.bd</p>
                </button>
              </div>
              <p className="mt-10 md:text-[60px] sm:text-[30px] text-center text-[#00bbb4] font-semibold">
                “ Project Second Home is for Everyone Safety and Friendly ”
              </p>
            </div>
          </div>
          <div className="lg:col-span-6 sm:col-span-12 md:col-span-12 md:mt-20 sm:mt-10 md:mx-20 sm:mx-0">
            <Typography variant="h4" className="text-[22px] font-bold">
              Contact Us
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              If you have any question about our service . Fill the form below.
              We’ll help you
            </Typography>
            <form className="mt-8 mb-2 contact-us" onSubmit={handleContactUs}>
              <div className="flex md:flex-row sm:flex-col md:gap-y-0 sm:gap-y-2 md:gap-x-3 sm:gap-x-0  ">
                <div className="w-full">
                  <label className="" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="contact-us-form rounded-lg h-12 w-[100%] px-3 "
                    name="name"
                  />
                </div>

                <div className="w-full">
                  <label className="" htmlFor="">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="contact-us-form rounded-lg h-12 w-[100%] px-3"
                    name="email"
                  />
                </div>
              </div>
              <div className="flex md:flex-row sm:flex-col md:gap-y-0 sm:gap-y-2 md:gap-x-3 sm:gap-x-0 mt-2 ">
                <div className="w-full">
                  <label className="" htmlFor="name">
                    Mobile
                  </label>
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    className="contact-us-form rounded-lg h-12 w-[100%] px-3 "
                    name="mobileNumber"
                  />
                </div>

                <div className=" w-full">
                  <label htmlFor="country" className="text-[1rem]">
                    Purpose
                  </label>
                  <select
                    className=" contact-us-form h-12 rounded-lg px-3 w-[100%]"
                    id="country"
                    name="purPose"
                  >
                    <option>General meeting</option>
                    <option>Partnership</option>
                    <option>Investment </option>
                    <option>Media/PR </option>
                    <option>Business </option>
                    <option>Collaboration </option>
                    <option>Corporate Housing </option>
                    <option>Franchisee </option>
                    <option>Others </option>
                  </select>
                </div>
              </div>

              <div className="flex md:flex-row sm:flex-col md:gap-y-0 sm:gap-y-2 md:gap-x-3 sm:gap-x-0 mt-2 ">
                <div className="w-full">
                  <label className="" htmlFor="name">
                    Appointment Date
                  </label>
                  <input
                    placeholder="hello"
                    type="date"
                    className="contact-us-form rounded-lg h-12 w-[100%] px-3 "
                    name="appointMentDate"
                  />
                </div>

                <div className="w-full">
                  <label className="" htmlFor="">
                    Appointment Time
                  </label>
                  <input
                    type="time"
                    name="appointMentTime"
                    placeholder="time"
                    className="contact-us-form rounded-lg h-12 w-[100%] px-3"
                  />
                </div>
              </div>
              <label htmlFor="message" className="mt-4">
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  name="contactMsg"
                  id="message"
                  rows={6}
                  className="block w-full rounded-md border-0 px-3.5 py-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="flex justify-center ">
                <input
                  type="submit"
                  value="Contact Us"
                  className=" mt-6 bg-[#00bbb4] text-white md:px-28 sm:px-16 py-3 rounded-lg"
                  style={{ cursor: "pointer" }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <Toaster
        containerStyle={{ top: 300 }}
        toastOptions={{ position: "top-center" }}
      ></Toaster> */}
    </div>
  );
};

export default Contact;
