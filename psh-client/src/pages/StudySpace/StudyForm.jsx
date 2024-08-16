import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import LoadingState from "../LoadingState/LoadingState";
import { serverBaseUrl } from "../../serverApi/baseUrl";

const StudyForm = ({ handleOpen }) => {
  const [arrivalTime, setArrivalTime] = useState("");

  const handleExtraForm = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;

    const phone = e.target.phone.value;
    const arrivalDate = e.target.arrivalDate.value;

    // Form Data Append

    const formData = {
      name: name,
      mobileNumber: phone,
      arrivalDate: arrivalDate,
      arrivalTime: arrivalTime,
    };
    // save form data information to the database

    try {
      await axios.post(`${serverBaseUrl}/teaching-form`, formData);

      toast.success("Thank you, we will contact you very soon");
      handleOpen(null);
    } catch (error) {
      //   console.log(error);
      toast.error("Something is wrong");
    }
    e.target.reset();
  };

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <LoadingState />
      <form onSubmit={handleExtraForm} className="md:mx-5 sm:mx-3 extra-form">
        <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 mb-10">
          <div className="">
            <div>
              <p className="text-black flex justify-left font-bold border-b pb-2">
                Request for your Study Space
              </p>
              <span
                style={{
                  fontSize: "13px",
                }}
              >
                Location : Dhanmondi, House No: 23, Road No: 03, Dhaka,
                Bangladesh
              </span>
              <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-y-3 md:mt-5 sm:mt-3">
                <div className="col-span-2">
                  <label htmlFor="">Name</label>
                  <input
                    placeholder="Your Name *"
                    type="text"
                    className="text-black personal-info rounded w-full"
                    name="name"
                    required
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                  />
                </div>

                <div className="col-span-2">
                  <label htmlFor="">Mobile Number</label>
                  <input
                    type="text"
                    placeholder="Phone Number *"
                    className="text-black personal-info rounded w-full"
                    name="phone"
                    required
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-x-5">
                <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2  mt-3">
                  <label htmlFor="">Estimated date of Arrival</label>
                  <input
                    type="date"
                    className="text-black personal-info rounded w-full"
                    name="arrivalDate"
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                    required
                  />

                  {/* <DatePicker
                    selected={new Date(arrivalDate)}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => setArrivalDate(date)}
                    className="border"
                    style={{ width: "100%" }}
                  /> */}
                </div>

                <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2  mt-3">
                  <label htmlFor="">Estimated time of Arrival</label>
                  <select
                    className="personal-info w-full h-[45px] rounded"
                    name="estimatedArrival"
                    id="estimatedArrival"
                    onChange={(e) => setArrivalTime(e.target.value)}
                    value={arrivalTime}
                  >
                    <option value="" disabled>
                      Select arrival time
                    </option>
                    {Array.from({ length: 15 }, (_, i) => {
                      const hour = 8 + i;
                      const period = hour >= 12 ? "PM" : "AM";
                      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
                      return (
                        <option key={hour}>{`${displayHour} ${period}`}</option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="bg-[#00bbb4] text-white rounded cursor-pointer">
            <input
              type="submit"
              value="Submit"
              className="px-5 py-2 cursor-pointer"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default StudyForm;
