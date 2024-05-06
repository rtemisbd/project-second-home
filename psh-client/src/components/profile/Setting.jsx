import React, { useContext, useState } from "react";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import { AuthContext } from "../../contexts/UserProvider";

function Setting() {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const { user } = useContext(AuthContext);

  const MySwal = withReactContent(Swal);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    const currentPassword = e.target.currentPassword.value;
    const newPassword = e.target.newPassword.value;
    const confirmNewPassword = e.target.confirmNewPassword.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;

    // Check if the new password matches the confirmation
    if (newPassword !== confirmNewPassword) {
      MySwal.fire({
        icon: "error",
        title: "Passwords do not match",
        text: "Please make sure the new passwords match.",
      });
      return;
    }

    try {
      // Send a request to your server to update the user's password
      await axios.put(`https://api.psh.com.bd/api/users/${user?.email}`, {
        userId: user._id,
        currentPassword,
        newPassword,
        phone,
        email,
      });

      MySwal.fire({
        icon: "success",
        title: "Password updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      // Clear the form fields
      e.target.reset();
    } catch (error) {
      console.log(error);
      MySwal.fire({
        icon: "error",
        title: "Password update failed",
        text: "Please check your old password and try again.",
      });
    }
  };
  return (
    <div className="md:p-0 sm:p-2">
      {/* <div className="md:hidden sm:block">
        <MenuList />
      </div> */}
      <h1 className="font-bold text-[32px]">Security</h1>
      <form onSubmit={handlePasswordUpdate}>
        <Accordion open={open === 1}>
          <div className="flex justify-between items-center font-medium text-[1rem] mt-3">
            <div>
              <span>Phone Number</span>
            </div>
            <div className="ml-[-170px]">
              <span>{user?.phone}</span>
            </div>
            <div>
              {/* <AccordionHeader
                onClick={() => handleOpen(1)}
                className="border-0 text-[#35B0A7] hover:text-[#35B0A7] text-[1rem]"
              >
                {open === 1 ? "Cancel" : "Edit"}
              </AccordionHeader> */}
            </div>
          </div>
          <AccordionBody>
            <div className="flex justify-between items-center font-medium text-[1rem]">
              <div>
                <span> Add New Phone Number</span>
              </div>
              <div>
                <input
                  type="text"
                  className="bg-[#F7F7F7] rounded w-[340px] p-2 focus:outline-0 focus:border focus:border-[#35B0A7]"
                  placeholder="phone Number"
                  name="phone"
                />
              </div>
            </div>
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2}>
          <div className="flex justify-between items-center font-medium text-[1rem] mt-3">
            <div>
              <span>Email</span>
            </div>
            <div className="text-left">
              <span>{user?.email}</span>
            </div>
            <div>
              {/* <AccordionHeader
                onClick={() => handleOpen(2)}
                className="border-0 text-[#35B0A7] hover:text-[#35B0A7] text-[1rem]"
              >
                {open === 2 ? "Cancel" : "Edit"}
              </AccordionHeader> */}
            </div>
          </div>
          <AccordionBody>
            <div className="flex justify-between items-center font-medium text-[1rem]">
              <div>
                <span> Add New Email</span>
              </div>
              <div>
                <input
                  type="email"
                  className="bg-[#F7F7F7] rounded w-[340px] p-2 focus:outline-0 focus:border focus:border-[#35B0A7]"
                  placeholder="Add New Email Address"
                  name="email"
                />
              </div>
            </div>
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 3}>
          <div className="flex justify-between items-center font-medium text-[1rem] mt-3">
            <div>
              <span>Password</span>
            </div>
            <div className="ml-[-60px]">
              <span>**********</span>
            </div>
            <div>
              <AccordionHeader
                onClick={() => handleOpen(3)}
                className="border-0 text-[#35B0A7] hover:text-[#35B0A7] text-[1rem]"
              >
                {open === 3 ? "Cancel" : "Change Password"}
              </AccordionHeader>
            </div>
          </div>
          <AccordionBody>
            <div className="flex justify-between items-center font-medium text-[1rem]">
              <div>
                <span> New Password</span>
              </div>
              <div>
                <span>Old Password</span>
                <br />
                <input
                  type="password"
                  className="bg-[#F7F7F7] rounded w-[340px] p-2 focus:outline-0 focus:border focus:border-[#35B0A7] my-2"
                  placeholder="Old Password"
                  name="currentPassword"
                />{" "}
                <br />
                <span>New Password</span>
                <br />
                <input
                  type="password"
                  className="bg-[#F7F7F7] rounded w-[340px] p-2 focus:outline-0 focus:border focus:border-[#35B0A7] my-2"
                  placeholder="New Password"
                  name="newPassword"
                />
                <br />
                <span>Confirm Password</span>
                <br />
                <input
                  type="password"
                  className="bg-[#F7F7F7] rounded w-[340px] p-2 focus:outline-0 focus:border focus:border-[#35B0A7] my-2"
                  placeholder="confirm NewPassword"
                  name="confirmNewPassword"
                />
              </div>
            </div>
          </AccordionBody>
        </Accordion>
        <div className="flex justify-center mt-12 ">
          <input
            type="submit"
            value="Save"
            className="bg-[#00BBB4] text-white px-12 py-3 rounded cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}
export default Setting;
