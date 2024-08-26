import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import LoadingState from "../LoadingState/LoadingState";
import { serverBaseUrl } from "../../serverApi/baseUrl";
// import DatePicker from "react-datepicker";
const StudyForm = ({ handleOpen }) => {
  const [arrivalTime, setArrivalTime] = useState("");
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [purpose, setPurpose] = useState("");
  const dateInputRef = useRef(null);

  const handleExtraForm = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;

    const phone = e.target.phone.value;
    const arrivalDate = e.target.arrivalDate.value;

    // Form Data Append

    const formData = {
      purpose: purpose,
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
              <br />
              <span
                className="font-bold"
                style={{
                  fontSize: "13px",
                }}
              >
                Price Start From 200 BDT
              </span>
              <div className="mt-3">
                <label htmlFor="">Purpose</label>
                <select
                  className="personal-info w-full h-[45px] rounded"
                  name="estimatedArrival"
                  id="estimatedArrival"
                  onChange={(e) => setPurpose(e.target.value)}
                  value={purpose}
                >
                  <option value="" disabled>
                    Select your purpose
                  </option>
                  <option>Study</option>
                  <option>Session</option>
                  <option>Get go gether</option>
                  <option>Meting</option>
                  <option>Co-Working</option>
                  <option>Training</option>
                  <option>Tutorial video shotting</option>
                </select>
              </div>
              <div className=" md:mt-3 sm:mt-3">
                <div className="">
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

                <div className="col-span-2 mt-2">
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
              <div className="">
                <div className=" mt-3 w-full">
                  <label htmlFor="">Estimated date of Arrival</label>
                  <input
                    type="date"
                    ref={dateInputRef}
                    className="text-black personal-info rounded block w-full cursor-pointer"
                    name="arrivalDate"
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                    required
                    onClick={() => dateInputRef.current?.showPicker()} // Use .showPicker() for programmatic trigger
                  />

                  {/* <DatePicker
                    selected={new Date(arrivalDate)}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => setArrivalDate(date)}
                    className="ps-3 lg:w-[570px] md:w-[500px] sm:w-[100%] border rounded h-[40px] "
                  /> */}
                </div>

                <div className="mt-3">
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
