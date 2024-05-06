import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import React, { useRef, useContext } from "react";
import Swal from "sweetalert2";

import withReactContent from "sweetalert2-react-content";
import UseFetch from "../../hooks/useFetch";
import { AuthContext } from "../../contexts/UserProvider";
import "./business.css";
import { useDispatch } from "react-redux";
import { placeLoadingShow } from "../../redux/reducers/smProfileMenuSlice";
import LoadingState from "../LoadingState/LoadingState";

const RentRequestModal = ({ handleOpen }) => {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const formRef = useRef(null);
  const { user } = useContext(AuthContext);
  const { data } = UseFetch(`leaseproperty`);

  const email = user?.email;
  const main = data.filter((pd) => pd?.email === email);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data2 = {
      fullname: formData.get("fullname"),
      phone: formData.get("phone"),
      propertyType: formData.get("propertyType"),
      position: formData.get("position"),
      totalRoom: formData.get("totalRoom"),
      company: formData.get("company"),
      companyEmail: formData.get("companyEmail"),
      location: formData.get("location"),
      availabilityForVisit: formData.get("availabilityForVisit"),
      availabilityForVisitTime: formData.get("availabilityForVisitTime"),
    };

    try {
      dispatch(placeLoadingShow(true));
      const product = {
        ...data2,
      };

      await axios.post("https://api.psh.com.bd/api/requestRent", product);
      dispatch(placeLoadingShow(false));
      toast.success("Thank you, we will contact you very soon");
      handleOpen(null);
      // formRef.current.reset();
    } catch (err) {
      dispatch(placeLoadingShow(false));
      toast.error("Something is wrong");
      console.log(err);
    }
  };
  return (
    <div className="md:mb-5 sm:mb-32 custom-container">
      {/* <h3 className="md:text-[32px] sm:text-[22px] font-bold whitespace-normal">
        Tell us your needs
      </h3> */}
      <div>
        {main.length <= 0 ? (
          <>
            <div className="px-5">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="extra-form"
              >
                <h3 className="text-black flex justify-left font-bold pb-2 text-2xl">
                  Tell us your needs
                </h3>
                <p className="text-black flex justify-left font-bold border-b pb-2">
                  Company data
                </p>
                <div className="grid grid-cols-1 md:gap-x-5">
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 md:mt-5">
                    <label htmlFor="" className="">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="text-black personal-info rounded w-full"
                      placeholder="Full Name"
                      name="fullname"
                      style={{
                        height: "45px",
                        padding: "0px 10px",
                      }}
                      required
                    />
                  </div>

                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-normal mt-1">
                    <label htmlFor="">Position</label>
                    <input
                      type="text"
                      className="text-black personal-info rounded w-full"
                      placeholder="Position*"
                      name="position"
                      style={{
                        height: "45px",
                        padding: "0px 10px",
                      }}
                      required
                    />
                  </div>

                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 mt-1">
                    <label htmlFor="">Company Name</label>
                    <input
                      type="text"
                      className="text-black personal-info rounded w-full"
                      placeholder="Company Name*"
                      name="company"
                      style={{
                        height: "45px",
                        padding: "0px 10px",
                      }}
                      required
                    />
                  </div>
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 mt-1">
                    <label htmlFor="">Address</label>
                    <input
                      type="text"
                      className="text-black personal-info rounded w-full"
                      placeholder="Address*"
                      name="address"
                      style={{
                        height: "45px",
                        padding: "0px 10px",
                      }}
                      required
                    />
                  </div>
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 mt-1">
                    <label htmlFor="">Company Email Address</label>
                    <input
                      type="email"
                      className="text-black personal-info rounded w-full"
                      placeholder="Company email address*"
                      name="companyEmail"
                      style={{
                        height: "45px",
                        padding: "0px 10px",
                      }}
                      required
                    />
                  </div>
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 mt-1">
                    <label htmlFor="">Phone Number</label>
                    <input
                      type="number"
                      className="text-black personal-info rounded w-full"
                      placeholder="Phone Number*"
                      name="phone"
                      style={{
                        height: "45px",
                        padding: "0px 10px",
                      }}
                      required
                    />
                  </div>
                </div>
                <div className=" border-b pb-1">
                  <div className="mt-7 font-bold text-xl">
                    <span>Property Location *</span>
                  </div>
                </div>
                <div className="col-span-2 ">
                  <label htmlFor="">Enter Your Location</label>
                  <input
                    type="text"
                    className="text-black personal-info rounded w-full"
                    placeholder="Enter your location"
                    name="location"
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                    required
                  />
                </div>
                {/* Property Information */}
                <div className="mt-7 font-bold text-xl border-b pb-1">
                  <span>Select housing type*</span>
                </div>
                <div className="grid grid-cols-1 gap-x-5 mt-5">
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 mt-1">
                    <label htmlFor="">Property Type</label>

                    <select
                      name="propertyType"
                      className="text-black personal-info rounded w-full"
                      style={{
                        height: "45px",
                        padding: "0px 10px",
                      }}
                      required
                    >
                      <option value="Share Room">Share Room</option>
                      <option value="Private Room">Private Room</option>
                      <option value="Apartment">Apartment</option>
                    </select>
                  </div>
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 mt-1">
                    <label htmlFor="">Number of Room</label>
                    <input
                      type="text"
                      className="text-black personal-info rounded w-full"
                      placeholder="Number of Room"
                      name="totalRoom"
                      style={{
                        height: "45px",
                        padding: "0px 10px",
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-5 mt-5">
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 mt-1">
                    <label htmlFor="">Estimated date of arrival</label>
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

                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 mt-1">
                    <label htmlFor="">Estimated time of arrival</label>
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
                <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 mt-1">
                  <label htmlFor="">Duration for rent ---</label>
                  <input
                    type="text"
                    className="text-black personal-info rounded w-full"
                    placeholder="Duration for rent"
                    name="duration"
                    style={{
                      height: "45px",
                      padding: "0px 10px",
                    }}
                    required
                  />
                </div>

                <div className="flex justify-center mt-12 mb-12">
                  <button
                    type="submit"
                    className="bg-[#00BBB4] text-white px-12 py-3 rounded cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div
              style={{
                position: "fixed",
                top: 8,
                left: 8,
              }}
            ></div>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Link to={"http://localhost:3000/"} style={{ fontSize: 36 }}>
              See Your Dashboard
            </Link>
          </div>
        )}
      </div>
      <LoadingState />
    </div>
  );
};

export default RentRequestModal;
