import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

import "./ExtraForm.css";
import { placeLoadingShow } from "../../redux/reducers/smProfileMenuSlice";
import { useDispatch } from "react-redux";
import LoadingState from "../LoadingState/LoadingState";

const ExtraForm = ({ handleOpen }) => {
  const [image, setImage] = useState([]);
  const dispatch = useDispatch();
  const handleExtraForm = async (e) => {
    e.preventDefault();

    const purpose = e.target.purpose.value;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;

    const propertySize = e.target.propertySize.value;
    const numberOfRooms = e.target.numberOfRooms.value;
    const totalSeatCapacity = e.target.totalSeatCapacity.value;
    const existingBooking = e.target.existingBooking.value;
    const designation = e.target.designation.value;

    const address = e.target.address.value;
    const availabilityForVisit = e.target.availabilityForVisit.value;
    const availabilityForVisitTime = e.target.availabilityForVisitTime.value;

    const formData = new FormData();

    // image Verify check
    const isValidFileUploaded = (file) => {
      const validExtensions = [
        "png",
        "jpeg",
        "jpg",
        "PNG",
        "JPG",
        "jpeg",
        "JPEG",
      ];
      const fileExtension = file.type.split("/")[1];
      return validExtensions.includes(fileExtension);
    };

    // Customer Nid
    if (image?.length > 1) {
      return toast.error("please provide 1 Visiting Card");
    }
    const file = image[0];
    if (file.size > 5000000) {
      return toast.error("Visiting Card size 5 MB more than not allowed");
    } else {
      if (isValidFileUploaded(file)) {
        Array.from(image).forEach((item) => {
          formData.append("image", item);
        });
      } else {
        return toast.error("Visiting Card is not valid");
      }
    }

    // Form Data Append

    formData.append("purpose", purpose);
    formData.append("propertySize", propertySize);
    formData.append("numberOfRooms", numberOfRooms);
    formData.append("totalSeatCapacity", totalSeatCapacity);
    formData.append("existingBooking", existingBooking);
    formData.append("designation", designation);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("availabilityForVisit", availabilityForVisit);
    formData.append("availabilityForVisitTime", availabilityForVisitTime);
    // save form data information to the database

    try {
      dispatch(placeLoadingShow(true));
      await axios.post("https://api.psh.com.bd/api/extraForm", formData);
      dispatch(placeLoadingShow(false));
      toast.success("Thank you, we will contact you very soon");
      handleOpen(null);
    } catch (error) {
      dispatch(placeLoadingShow(false));
      toast.error("Something is wrong");
    }
    e.target.reset();
  };

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  function formatNumberIndianSystem(number) {
    const formattedNumber = number.toLocaleString("en-IN");
    return formattedNumber;
  }

  const tenLakh = 1000000;

  const formattedTenLakh = formatNumberIndianSystem(tenLakh);

  function formatNumberWithCustomLakhSeparator(number) {
    const strNumber = number.toString();
    return strNumber.slice(0, 1) + "," + strNumber.slice(1);
  }

  const fiveLakh = 500000;
  const formattedFiveLakh = formatNumberWithCustomLakhSeparator(fiveLakh);
  return (
    <>
      <LoadingState />
      <form onSubmit={handleExtraForm} className="md:mx-5 sm:mx-3 extra-form m">
        <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 mb-10">
          <div className="">
            <div>
              <p className="text-black flex justify-left font-bold border-b pb-2">
                Already have Hostel/ Property
              </p>

              <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-y-3 md:mt-5 sm:mt-3">
                <div className="col-span-2">
                  <label htmlFor="">Purpose</label>
                  <select
                    className="personal-info w-full h-[45px] rounded"
                    name="purpose"
                  >
                    <option>Franchise Partner</option>
                    <option>PSH Partner (Hostel / Property)</option>
                  </select>
                </div>
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

                <div className="col-span-2 ">
                  <label htmlFor="">Email</label>
                  <input
                    type="email"
                    placeholder="Email *"
                    className="text-black personal-info rounded w-full"
                    name="email"
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
                <div className=" col-span-2 ">
                  <label htmlFor="">Address</label>
                  <textarea
                    placeholder="Details Address *"
                    className="text-black personal-info rounded w-full"
                    name="address"
                    cols="30"
                    required
                    rows="3"
                    maxLength={100}
                    style={{
                      padding: "2px 10px",
                    }}
                  />
                </div>

                <div className=" col-span-2">
                  <label htmlFor="">Property Size</label>
                  <input
                    type="text"
                    placeholder="Property Size *"
                    className="text-black personal-info rounded w-full"
                    name="propertySize"
                    required
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                    // required
                  />
                </div>
                <div className=" col-span-2">
                  <label htmlFor="">Number of rooms</label>
                  <input
                    type="number"
                    placeholder="Number of rooms *"
                    className="text-black personal-info rounded w-full"
                    name="numberOfRooms"
                    required
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                    // required
                  />
                </div>
                <div className=" col-span-2">
                  <label htmlFor="">Total Seat capacity</label>
                  <input
                    type="number"
                    placeholder="Total Seat capacity *"
                    className="text-black personal-info rounded w-full"
                    name="totalSeatCapacity"
                    required
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                    // required
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="">Do you have Exisiting Booking System</label>
                  <select
                    className="personal-info w-full h-[45px] rounded"
                    name="existingBooking"
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label htmlFor=""> Your Designation</label>
                  <select
                    className="personal-info w-full h-[45px] rounded"
                    name="designation"
                  >
                    <option>Owner</option>
                    <option>Manager</option>
                  </select>
                </div>

                <div className=" col-span-2">
                  <label htmlFor="">Visiting Card</label>
                  <input
                    multiple
                    onChange={(e) => {
                      setImage(e.target.files);
                    }}
                    type="file"
                    className=" personal-info rounded w-full h-[45px] p-2 file-input"
                    required
                    name="image"
                    id=""
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-x-5 mt-5">
                <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2  mt-3">
                  <label htmlFor="">Availability for Visit Date</label>
                  <input
                    type="date"
                    className="text-black personal-info rounded w-full"
                    placeholder="Availability for Visit"
                    name="availabilityForVisit"
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                    required
                  />
                </div>

                <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2  mt-3">
                  <label htmlFor="">Availability for Visit Time</label>
                  <input
                    type="time"
                    className="text-black personal-info rounded w-full"
                    placeholder="Availability for Visit Time"
                    name="availabilityForVisitTime"
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-10">
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

export default ExtraForm;
