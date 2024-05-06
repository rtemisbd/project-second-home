import React, { useContext, useState } from "react";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { Toaster, toast } from "react-hot-toast";

import { AuthContext } from "../../contexts/UserProvider";
import "./Personal.css";

function EditProfile() {
  const { user } = useContext(AuthContext);
  const MySwal = withReactContent(Swal);
  const [image, setImage] = useState([]);
  const [files, setFiles] = useState("");

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Id Card file check
    const file = image[0];
    if (file?.size) {
      const isValidFileUploaded = (file) => {
        const validExtensions = [
          "png",
          "jpeg",
          "jpg",
          "PNG",
          "JPG",
          "jpeg",
          "JPEG",
          "webp",
        ];
        const fileExtension = file?.type.split("/")[1];
        return validExtensions.includes(fileExtension);
      };

      if (file?.size > 5000000) {
        return toast.error("Id Card size 5MB more than not allowed");
      } else {
        if (isValidFileUploaded(file)) {
          Array.from(image).forEach((item) => {
            formData.append("image", item);
          });
        } else {
          return toast.error("Id Card Picture is not valid");
        }
      }
    }
    // update User Data
    const userUpdate = {
      firstName: e.target.fullName.value,
      email: e.target.email.value,
      phone: e.target?.phoneNumber?.value,
      userName: e.target.userName?.value,
      userId: user?._id,
      dateOfBirth: e.target.dateOfBirth.value,
      gender: e.target.genderType.value,
      nationalId: e.target.nationalId.value,
      nationality: e.target.nationality.value,

      presentAddress: JSON.stringify({
        address: e.target.presentAddress.value,
        city: e.target.presentCity.value,
        state: e.target.presentState.value,
        postCode: e.target.presentPostCode.value,
        country: e.target.presentCountry.value,
      }),
      permanentAddress: JSON.stringify({
        address: e.target.permanentAddress.value,
        city: e.target.permanentCity.value,
        state: e.target.permanentState.value,
        postCode: e.target.permanentPostCode.value,
        country: e.target.permanentCountry.value,
      }),
      idCardType: e.target.cardType.value,

      employmentStatus: JSON.stringify({
        workAs: e.target.worksStudent.value,
        monthlyIncome: e.target.monthlyIncome.value,
      }),
      emergencyContact: JSON.stringify({
        contactName: e.target.emContactName.value,
        relation: e.target.emRelationType.value,
        phoneNumber: e.target.emPhoneNumber.value,
      }),
    };

    if (file?.size) {
      const imgbbapi = "10af0db0e6d5ceeee402c8e874cea2ab";
      const url = `https://api.imgbb.com/1/upload?key=${imgbbapi}`;
      await fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then(async (imgData) => {
          if (imgData.success) {
            const finalUserData = {
              ...userUpdate,
              cardImage: imgData.data.url,
            };

            // save User Update information to the database
            try {
              await axios.patch(
                `https://api.psh.com.bd/api/users/${user?._id}`,
                finalUserData
              );
              localStorage.setItem("user", JSON.stringify(finalUserData));
              MySwal.fire({
                icon: "success",
                title: "User Update successfully done",
                showConfirmButton: false,
                timer: 1500,
              });
            } catch (error) {
              console.log(error);
            }
          } else {
            // save User Update information without card picture to the database
            try {
              await axios.patch(
                `https://api.psh.com.bd/api/users/${user?._id}`,
                userUpdate
              );
              localStorage.setItem("user", JSON.stringify(userUpdate));
              MySwal.fire({
                icon: "success",
                title: "User Update successfully done",
                showConfirmButton: false,
                timer: 1500,
              });
            } catch (error) {
              console.log(error);
            }
          }
        });
    } else {
      // save User Update information without card picture to the database
      try {
        const list = await Promise.all(
          Object.values(files).map(async (file) => {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "upload");
            const uploadRes = await axios.post(
              "https://api.cloudinary.com/v1_1/dtpvtjiry/image/upload",
              data
            );

            const { url } = uploadRes.data;
            return url;
          })
        );
        const product = {
          ...userUpdate,
          photos: list,
        };
        await axios.patch(
          `https://api.psh.com.bd/api/users/${user?._id}`,
          product
        );

        MySwal.fire({
          icon: "success",
          title: "User Update successfully done",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.log(error);
      }
    }
    e.target.reset();
  };

  return (
    <div className="md:p-0 sm:p-2">
      {/* <div className="md:hidden sm:block">
        <MenuList />
      </div> */}
      <h2 className="text-3xl font-bold">Edit Your Profile</h2>
      <div className="mt-5 font-bold text-xl border-b pb-3">
        <span>Account Details</span>
      </div>
      <div className="mt-5 account-details">
        <form onSubmit={handleUserUpdate}>
          {/* Account Details */}

          <div className="grid grid-cols-2 gap-x-5">
            <div className="xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-2 font-medium ">
              <label htmlFor="">Full Name</label>
              <input
                type="text"
                className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                placeholder="First Name"
                name="fullName"
                defaultValue={user?.firstName}
              />
            </div>
            {/* <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium ">
              <label htmlFor="">Last Name</label>
              <input
                type="text"
                className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                placeholder="Last Name"
                defaultValue={user?.lastName}
              />
            </div> */}
            <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
              <label htmlFor="">User Name</label>
              <input
                type="text"
                className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                placeholder="User Name"
                name="userName"
              />
            </div>
            <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
              <label htmlFor="">User Id</label>
              <input
                type="text"
                className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                placeholder="User Id"
                defaultValue={user?._id?.slice(15)}
                name="userId"
                disabled
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
                value={user?.email}
                disabled
              />
            </div>
            <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
              <label htmlFor="">Date Of Birth</label>
              <input
                type="date"
                className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                placeholder="Date Of Birth"
                name="dateOfBirth"
              />
            </div>
            <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
              <label htmlFor="">Gender</label>

              <select
                name="genderType"
                id=""
                className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
              >
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </div>

            <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
              <label htmlFor="">National Id Number</label>
              <input
                type="text"
                className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                placeholder="National Id Number"
                name="nationalId"
              />
            </div>
            <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
              <label htmlFor="">Passport Number</label>
              <input
                type="text"
                className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                placeholder="Passport Number"
                name="passportNumber"
              />
            </div>
            <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
              <label htmlFor="">Nationality</label>

              <select
                name="nationality"
                id=""
                className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
              >
                <option>Bangladeshi</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          {/* Present Address */}
          <div className="mt-7 font-bold text-xl border-b pb-3">
            <span>Present Address</span>
          </div>
          <div className="grid grid-cols-2 gap-x-5 mt-5">
            <div className="col-span-2 font-medium ">
              <label htmlFor="">Address</label>
              <input
                type="text"
                className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                placeholder="Present Address"
                name="presentAddress"
              />
            </div>
            <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
              <label htmlFor="">City</label>
              <input
                type="text"
                className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                placeholder="City"
                name="presentCity"
              />
            </div>
            <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
              <label htmlFor="">State/Region</label>
              <input
                type="text"
                className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                placeholder="State/Region"
                name="presentState"
              />
            </div>
            <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
              <label htmlFor="">Post Code</label>
              <input
                type="text"
                className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                placeholder="Post Code"
                name="presentPostCode"
              />
            </div>

            <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
              <label htmlFor="">Country</label>

              <select
                name="presentCountry"
                id=""
                className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
              >
                <option>Bangladesh</option>
                <option>Pakistan</option>
                <option>India</option>
              </select>
            </div>
          </div>

          {/* Permanent Address */}
          <div className="flex justify-between items-center border-b pb-3">
            <div className="mt-7 font-bold text-xl">
              <span>Permanent Address</span>
            </div>
            <div className="mt-7 font-medium text-[1rem]">
              <input type="checkbox" name="" className="mr-2" id="" />
              <span>Same</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-5 mt-5">
            <div className="col-span-2 font-medium ">
              <label htmlFor="">Address</label>
              <input
                type="text"
                className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                placeholder="Permanent Address"
                name="permanentAddress"
              />
            </div>
            <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
              <label htmlFor="">City</label>
              <input
                type="text"
                className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                placeholder="City"
                name="permanentCity"
              />
            </div>
            <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
              <label htmlFor="">State/Region</label>
              <input
                type="text"
                className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                placeholder="State/Region"
                name="permanentState"
              />
            </div>
            <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
              <label htmlFor="">Post Code</label>
              <input
                type="text"
                className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                placeholder="Post Code"
                name="permanentPostCode"
              />
            </div>

            <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
              <label htmlFor="">Country</label>

              <select
                name="permanentCountry"
                id=""
                className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
              >
                <option>Bangladesh</option>
                <option>Pakistan</option>
                <option>India</option>
              </select>
            </div>
          </div>
          {/* Submit Nid */}
          <div className=" border-b pb-3">
            <div className="mt-7 font-bold text-xl">
              <span>Nid , Passport or Driving Licence (JPG, JPEG, PNG)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-5 mt-5">
            <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium ">
              <label htmlFor="">Type of Id Card</label>
              <select
                name="cardType"
                id=""
                className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
              >
                <option>NID</option>
                <option>Passport</option>
                <option>Driving Lincence</option>
              </select>
            </div>
            <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
              <label htmlFor="">Upload</label>
              <input
                multiple
                onChange={(e) => {
                  setImage(e.target.files);
                }}
                type="file"
                className="w-full h-10 bg-[#F7F7F7] rounded "
                name="image"
              />
            </div>
          </div>
          {/* Employment Status */}

          <div className="border-b pb-3">
            <div className="mt-7 font-bold text-xl">
              <span>Eployment Status</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-5 mt-5">
            <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
              <label htmlFor="">Work As</label>

              <select
                name="worksStudent"
                id=""
                className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
              >
                <option>Student</option>
                <option>Employee</option>
                <option>UnEmployee</option>
                <option>Business</option>
              </select>
            </div>
            <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
              <label htmlFor="">Monthly Income</label>

              <select
                name="monthlyIncome"
                id=""
                className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
              >
                <option>0-9999</option>
                <option>10000-20000</option>
                <option>21000-30000</option>
                <option>31000-40000</option>
                <option>41000-50000</option>
                <option>Upto-50000</option>
              </select>
            </div>
          </div>
          {/* Emergency Contact */}
          <div className="border-b pb-3">
            <div className="mt-7 font-bold text-xl">
              <span>Emergency Contact</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-5 mt-5">
            <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
              <label htmlFor="">Contact Name</label>
              <input
                type="text"
                className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                placeholder="Contact Name"
                name="emContactName"
              />
            </div>
            <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
              <label htmlFor="">Relation</label>

              <input
                type="text"
                className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                placeholder="Relation"
                name="emRelationType"
              />
            </div>
            <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 font-medium mt-3">
              <label htmlFor="">Phone Number</label>

              <input
                type="text"
                className="w-full h-10 bg-[#F7F7F7] rounded pl-2"
                placeholder="Phone Number"
                name="emPhoneNumber"
              />
            </div>
          </div>
          <div className="border-b pb-3">
            <div className="mt-7 font-bold text-xl">
              <span>Profile Picture</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-5 mt-5">
            <label htmlFor="inputState" className="form-label profile_label3 ">
              Image upload
            </label>

            <input
              type="file"
              className="main_form w-100 p-0"
              name="img"
              onChange={(e) => setFiles(e.target.files)}
              multiple
            />
          </div>

          <div className="flex justify-center mt-12 ">
            <input
              type="submit"
              value="Save"
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
    </div>
  );
}
export default EditProfile;
