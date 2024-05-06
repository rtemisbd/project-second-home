import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import React, { useRef, useContext } from "react";
import Swal from "sweetalert2";

import withReactContent from "sweetalert2-react-content";
import UseFetch from "../../hooks/useFetch";
import { AuthContext } from "../../contexts/UserProvider";
import { placeLoadingShow } from "../../redux/reducers/smProfileMenuSlice";
import { useDispatch } from "react-redux";
import LoadingState from "../LoadingState/LoadingState";

const RentVisitModal = ({ property, handleOpen2 }) => {
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
      email: formData.get("email"),
      availabilityForVisit: formData.get("availabilityForVisit"),
      availabilityForVisitTime: formData.get("availabilityForVisitTime"),
    };

    try {
      dispatch(placeLoadingShow(true));
      const product = {
        ...data2,
        propertyId: property?._id,
        branchId: property?.branch?._id,
      };

      await axios.post("https://api.psh.com.bd/api/requestVisit", product);
      dispatch(placeLoadingShow(false));
      toast.success("Thank you, we will contact you very soon");
      formRef.current.reset();
      handleOpen2(null);
    } catch (err) {
      dispatch(placeLoadingShow(false));
      toast.error("Something Error Found.", "warning");
    }
  };
  return (
    <div className="md:mb-5 ">
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
                  Visiting Request
                  <span className="text-[#00BBB4] mx-2">
                    {" "}
                    {property?.branch?.name}
                  </span>
                  Branch
                </h3>

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
                    <label htmlFor="">Email</label>
                    <input
                      type="email"
                      className="text-black personal-info rounded w-full"
                      placeholder="Email*"
                      name="email"
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
                      min="10:00"
                      max="19:00"
                    />
                  </div>
                </div>

                <div className="flex justify-center mt-12">
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

export default RentVisitModal;
