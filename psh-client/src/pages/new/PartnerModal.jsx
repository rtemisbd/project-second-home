import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import React, { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import UseFetch from "../../hooks/useFetch";
import { AuthContext } from "../../contexts/UserProvider";
import { placeLoadingShow } from "../../redux/reducers/smProfileMenuSlice";
import { useDispatch } from "react-redux";
import LoadingState from "../LoadingState/LoadingState";

const PartnerModal = ({ handleOpen }) => {
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
      purpose: formData.get("purpose"),
      fullname: formData.get("fullname"),

      phoneNumber: formData.get("phoneNumber"),
      email: formData.get("email"),
      propertyName: formData.get("propertyName"),
      propertyType: formData.get("propertyType"),
      propertySize: formData.get("propertySize"),
      floorNumber: formData.get("floorNumber"),
      totalRooms: parseInt(formData.get("totalRooms")),
      totalBathrooms: parseInt(formData.get("totalBathrooms")),
      parking: formData.get("parking"),
      elevator: formData.get("elevator"),
      address: formData.get("address"),
      city: formData.get("city"),
      stateRegion: formData.get("stateRegion"),
      postCode: formData.get("postCode"),
      district: formData.get("district"),
      division: formData.get("division"),
      country: formData.get("country"),
      availabilityForVisit: formData.get("availabilityForVisit"),
      availabilityForVisitTime: formData.get("availabilityForVisitTime"),
    };

    try {
      dispatch(placeLoadingShow(true));
      const product = {
        ...data2,
      };

      await axios.post("https://api.psh.com.bd/api/leaseproperty", product);
      dispatch(placeLoadingShow(false));
      toast.success("Thank you, we will contact you very soon");
      handleOpen(null);
      formRef.current.reset();
    } catch (err) {
      dispatch(placeLoadingShow(false));
      toast.error("Something is wrong");
      // console.log(err);
    }
  };
  return (
    <div className="sm:mb-32 md:mb-5 custom-container">
      <div>
        {main.length <= 0 ? (
          <div>
            <div className="px-5">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="extra-form"
              >
                {/* Property Owner Details */}
                <p className="text-black flex justify-left font-bold border-b pb-2">
                  Property Owner Details *
                </p>
                <div className="grid grid-cols-1 md:gap-x-5 md:mt-5">
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2  ">
                    <label htmlFor="">Full Name</label>
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

                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2  mt-3">
                    <label htmlFor="">Phone Number</label>
                    <input
                      type="text"
                      className="text-black personal-info rounded w-full"
                      placeholder="Phone Number"
                      name="phoneNumber"
                      style={{
                        height: "45px",
                        padding: "0px 10px",
                      }}
                      required
                    />
                  </div>
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2  mt-3">
                    <label htmlFor="">Email Address</label>
                    <input
                      type="text"
                      className="text-black personal-info rounded w-full"
                      placeholder="Email Address"
                      name="email"
                      style={{
                        height: "45px",
                        padding: "0px 10px",
                      }}
                      required
                    />
                  </div>
                </div>
                {/* Property Information */}
                <div className="mt-7 font-bold text-xl border-b ">
                  <span>Property Information *</span>
                </div>
                <div className="grid grid-cols-1 gap-x-5 mt-5">
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2  mt-3 ">
                    <label htmlFor="">Property Name</label>
                    <input
                      type="text"
                      className="text-black personal-info rounded w-full"
                      placeholder="Property Name"
                      name="propertyName"
                      style={{
                        height: "45px",
                        padding: "0px 10px",
                      }}
                      required
                    />
                  </div>
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2  mt-3">
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
                      <option value="Building">Building</option>
                      <option value="Flat">Flat</option>
                      <option value="Villa">Villa</option>
                    </select>
                  </div>
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2  mt-3">
                    <label htmlFor="">Property Size</label>
                    <input
                      type="text"
                      className="text-black personal-info rounded w-full"
                      placeholder="Property Size"
                      name="propertySize"
                      style={{
                        height: "45px",
                        padding: "0px 10px",
                      }}
                      required
                    />
                  </div>
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2  mt-3">
                    <label htmlFor="">Floor Number</label>
                    <input
                      type="text"
                      className="text-black personal-info rounded w-full"
                      placeholder="Floor Number"
                      name="floorNumber"
                      style={{
                        height: "45px",
                        padding: "0px 10px",
                      }}
                      required
                    />
                  </div>
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2  mt-3">
                    <label htmlFor="">Number Of Rooms</label>
                    <input
                      type="number"
                      className="text-black personal-info rounded w-full"
                      placeholder="Number Of Rooms"
                      name="totalRooms"
                      style={{
                        height: "45px",
                        padding: "0px 10px",
                      }}
                      required
                    />
                  </div>
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2  mt-3">
                    <label htmlFor="">Number Of Bathrooms</label>
                    <input
                      type="number"
                      className="text-black personal-info rounded w-full"
                      placeholder="Number Of Bathrooms"
                      name="totalBathrooms"
                      style={{
                        height: "45px",
                        padding: "0px 10px",
                      }}
                      required
                    />
                  </div>

                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2  mt-3">
                    <label htmlFor="">Parking</label>

                    <select
                      name="parking"
                      className="text-black personal-info rounded w-full"
                      style={{
                        height: "45px",
                        padding: "0px 10px",
                      }}
                      required
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2  mt-3">
                    <label htmlFor="">Elevator</label>

                    <select
                      name="elevator"
                      className="text-black personal-info rounded w-full"
                      style={{
                        height: "45px",
                        padding: "0px 10px",
                      }}
                      required
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>

                {/* Property Location */}
                <div className=" border-b ">
                  <div className="mt-7 font-bold text-xl">
                    <span>Property Location *</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-x-5 mt-5">
                  <div className="col-span-1  ">
                    <label htmlFor="">Address</label>
                    <input
                      type="text"
                      className="text-black personal-info rounded w-full"
                      placeholder="Permanent Address"
                      name="address"
                      style={{
                        height: "45px",
                        padding: "0px 10px",
                      }}
                      required
                    />
                  </div>
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2  mt-3">
                    <label htmlFor="">City</label>
                    <input
                      type="text"
                      className="text-black personal-info rounded w-full"
                      placeholder="City"
                      name="city"
                      style={{
                        height: "45px",
                        padding: "0px 10px",
                      }}
                      required
                    />
                  </div>

                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2  mt-3">
                    <label htmlFor="">Post Code</label>
                    <input
                      type="text"
                      className="text-black personal-info rounded w-full"
                      placeholder="Post Code"
                      name="postCode"
                      style={{
                        height: "45px",
                        padding: "0px 10px",
                      }}
                      required
                    />
                  </div>

                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2  mt-3">
                    <label htmlFor="">District</label>

                    <select
                      name="district"
                      id=""
                      className="text-black personal-info rounded w-full"
                      style={{
                        height: "45px",
                        padding: "0px 10px",
                      }}
                      required
                    >
                      <option disabled>Select Your District</option>
                      <option>Dhaka</option>
                      <option>Barguna</option>
                      <option>Barishal</option>
                      <option>Bhola</option>
                      <option>Patuakhali</option>
                      <option>Pirojpur</option>
                      <option>Bandarban</option>
                      <option>Brahmanbaria</option>
                      <option>Chandpur</option>
                      <option>Chattogram</option>
                      <option>Cumilla</option>
                      <option>Cox's Bazar</option>
                      <option>Khagrachhari</option>
                      <option>Lakshmipur</option>
                      <option>Noakhali</option>
                      <option>Rangamati</option>
                      <option>Jhalokati</option>
                      <option>Faridpur</option>
                      <option>Gazipur</option>
                      <option>Gopalganj</option>
                      <option>Kishoreganj</option>
                      <option>Madaripur</option>
                      <option>Manikganj</option>
                      <option>Munshiganj</option>
                      <option>Narayanganj</option>
                      <option>Narsingdi</option>
                      <option>Rajbari</option>
                      <option>Shariatpur</option>
                      <option>Tangail</option>
                      <option>Bagerhat</option>
                      <option>Chuadanga</option>
                      <option>Jashore</option>
                      <option>Jhenaidah</option>
                      <option>Khulna</option>
                      <option>Kushtia</option>
                      <option>Magura</option>
                      <option>Meherpur</option>
                      <option>Narail</option>
                      <option>Satkhira</option>
                      <option>Jamalpur</option>
                      <option>Mymensingh</option>
                      <option>Netrokona</option>
                      <option>Sherpur</option>
                      <option>Bogura</option>
                      <option>Joypurhat</option>
                      <option>Naogaon</option>
                      <option>Natore</option>
                      <option>Chapai Nawabganj</option>
                      <option>Pabna</option>
                      <option>Rajshahi</option>
                      <option>Sirajganj</option>
                      <option>Dinajpur</option>
                      <option>Gaibandha</option>
                      <option>Kurigram</option>
                      <option>Lalmonirhat</option>
                      <option>Nilphamari</option>
                      <option>Panchagarh</option>
                      <option>Rangpur</option>
                      <option>Thakurgaon</option>
                      <option>Habiganj</option>
                      <option>Moulvibazar</option>
                      <option>Sunamganj</option>
                      <option>Sylhet</option>
                    </select>
                  </div>

                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2  mt-3">
                    <label htmlFor="">Division</label>

                    <select
                      name="division"
                      id=""
                      className="text-black personal-info rounded w-full"
                      style={{
                        height: "45px",
                        padding: "0px 10px",
                      }}
                      required
                    >
                      <option disabled>Select Your District</option>
                      <option value="Dhaka">Dhaka</option>
                      <option value="Chittagong">Chittagong</option>
                      <option value="Rajshahi">Rajshahi</option>
                      <option value="Khulna">Khulna</option>
                      <option value="Barisal">Barisal</option>
                      <option value="Sylhet">Sylhet</option>
                      <option value="Rangpur">Rangpur</option>
                      <option value="Mymensingh">Mymensingh</option>
                    </select>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="border-b ">
                  <div className="mt-7 font-bold text-xl">
                    <span>Property Visit Request *</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-x-5 mt-5">
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2  mt-3">
                    <label htmlFor="">Availability for Visit</label>
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

                <div className="flex justify-center mt-12 mb-12">
                  <button
                    type="submit"
                    className="bg-[#00BBB4] text-white px-12 py-3 rounded cursor-pointer"
                  >
                    Register Your Property
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
          </div>
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

export default PartnerModal;
