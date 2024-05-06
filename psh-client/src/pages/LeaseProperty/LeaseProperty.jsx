import { Toaster } from "react-hot-toast";
import axios from "axios";
import React, { useRef, useContext } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";

import UseFetch from "../../hooks/useFetch";
import { AuthContext } from "../../contexts/UserProvider";

const LeaseProperty = () => {
  const MySwal = withReactContent(Swal);
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
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
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
      country: formData.get("country"),
      availabilityForVisit: formData.get("availabilityForVisit"),
      availabilityForVisitTime: formData.get("availabilityForVisitTime"),
    };

    try {
      const product = {
        ...data2,
      };

      await axios.post("https://api.psh.com.bd/api/leaseproperty", product);
      MySwal.fire("Good job!", "successfully added", "success");
      formRef.current.reset();
    } catch (err) {
      MySwal.fire("Something Error Found.", "warning");
    }
  };
  return (
    <div className=" mt-5  custom-container">
      <h3 className="text-[32px] font-bold whitespace-normal		">
        Lease Your Property{" "}
      </h3>
      <div>
        {main.length <= 0 ? (
          <>
            <div className="mt-5 font-bold text-xl border-b pb-3">
              <span>Property Owner Details *</span>
            </div>
            <div className="mt-5 account-details">
              <form ref={formRef} onSubmit={handleSubmit}>
                {/* Property Owner Details */}

                <div className="grid grid-cols-2 md:gap-x-5">
                  <div className="col-span-2 font-medium mb-4">
                    <label htmlFor="">Purpose</label>

                    <select
                      name="purpose"
                      className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                    >
                      <option value="rent">Rent</option>
                      <option value="franchising">Franchising</option>
                      <option value="lease">Lease</option>
                      <option value="partnership">PartnerShip</option>
                    </select>
                  </div>
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium ">
                    <label htmlFor="">First Name</label>
                    <input
                      type="text"
                      className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                      placeholder="First Name"
                      name="firstName"
                    />
                  </div>
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium ">
                    <label htmlFor="">Last Name</label>
                    <input
                      type="text"
                      className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                      placeholder="Last Name"
                      name="lastName"
                    />
                  </div>

                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
                    <label htmlFor="">Phone Number</label>
                    <input
                      type="text"
                      className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                      placeholder="Phone Number"
                      name="phoneNumber"
                    />
                  </div>
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
                    <label htmlFor="">Email Address</label>
                    <input
                      type="text"
                      className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                      placeholder="Email Address"
                      name="email"
                    />
                  </div>
                </div>
                {/* Property Information */}
                <div className="mt-7 font-bold text-xl border-b pb-3">
                  <span>Property Information *</span>
                </div>
                <div className="grid grid-cols-2 gap-x-5 mt-5">
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3 ">
                    <label htmlFor="">Property Name</label>
                    <input
                      type="text"
                      className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                      placeholder="Property Name"
                      name="propertyName"
                    />
                  </div>
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
                    <label htmlFor="">Property Type</label>

                    <select
                      name="propertyType"
                      className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                    >
                      <option value="Share Room">Share Room</option>
                      <option value="Private Room">Private Room</option>
                      <option value="Apartment">Apartment</option>
                    </select>
                  </div>
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
                    <label htmlFor="">Property Size</label>
                    <input
                      type="text"
                      className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                      placeholder="Property Size"
                      name="propertySize"
                    />
                  </div>
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
                    <label htmlFor="">Floor Number</label>
                    <input
                      type="text"
                      className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                      placeholder="Floor Number"
                      name="floorNumber"
                    />
                  </div>
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
                    <label htmlFor="">Number Of Rooms</label>
                    <input
                      type="number"
                      className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                      placeholder="Number Of Rooms"
                      name="totalRooms"
                    />
                  </div>
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
                    <label htmlFor="">Number Of Bathrooms</label>
                    <input
                      type="number"
                      className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                      placeholder="Number Of Bathrooms"
                      name="totalBathrooms"
                    />
                  </div>

                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
                    <label htmlFor="">Parking</label>

                    <select
                      name="parking"
                      className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
                    <label htmlFor="">Elevator</label>

                    <select
                      name="elevator"
                      className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>

                {/* Property Location */}
                <div className=" border-b pb-3">
                  <div className="mt-7 font-bold text-xl">
                    <span>Property Location *</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-5 mt-5">
                  <div className="col-span-2 font-medium ">
                    <label htmlFor="">Address</label>
                    <input
                      type="text"
                      className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                      placeholder="Permanent Address"
                      name="address"
                    />
                  </div>
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
                    <label htmlFor="">City</label>
                    <input
                      type="text"
                      className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                      placeholder="City"
                      name="city"
                    />
                  </div>
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
                    <label htmlFor="">State/Region</label>
                    <input
                      type="text"
                      className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                      placeholder="State/Region"
                      name="stateRegion"
                    />
                  </div>
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
                    <label htmlFor="">Post Code</label>
                    <input
                      type="text"
                      className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                      placeholder="Post Code"
                      name="postCode"
                    />
                  </div>

                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
                    <label htmlFor="">District</label>

                    <select
                      name="district"
                      id=""
                      className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
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
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
                    <label htmlFor="">Country</label>

                    <select
                      name="country"
                      className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                    >
                      <option disabled>Select Your Country</option>
                      <option value="Bangladesh">Bangladesh</option>
                    </select>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="border-b pb-3">
                  <div className="mt-7 font-bold text-xl">
                    <span>Property Visit Request *</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-5 mt-5">
                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
                    <label htmlFor="">Availability for Visit</label>
                    <input
                      type="date"
                      className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                      placeholder="Availability for Visit"
                      name="availabilityForVisit"
                    />
                  </div>

                  <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
                    <label htmlFor="">Availability for Visit Time</label>
                    <input
                      type="time"
                      className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                      placeholder="Availability for Visit Time"
                      name="availabilityForVisitTime"
                    />
                  </div>
                </div>

                <div className="flex justify-center mt-12 mb-12">
                  <input
                    type="submit"
                    value="Register Your Property"
                    className="bg-[#00BBB4] text-white px-12 py-3 rounded cursor-pointer"
                  />
                </div>
              </form>
            </div>
            <div
              style={{
                position: "fixed",
                top: 8,
                left: 8,
              }}
            >
              <Toaster
                containerStyle={{ top: 100 }}
                toastOptions={{ position: "top-center" }}
              ></Toaster>
            </div>
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
    </div>
  );
};

export default LeaseProperty;
