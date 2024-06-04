import { Input, Radio } from "@material-tailwind/react";
import React, { useState, useRef, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { AiOutlineClose } from "react-icons/ai";
import withReactContent from "sweetalert2-react-content";

import { AuthContext } from "../../contexts/UserProvider";
import "./Ticket.css";
import { serverBaseUrl } from "../../serverApi/baseUrl";

const TicketCreate = ({ handleOpen, open }) => {
  const [category, setCategory] = useState("my-room");
  const { user } = useContext(AuthContext);
  const MySwal = withReactContent(Swal);
  const [branch, SetBranch] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const formRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverBaseUrl}/branch`);
        SetBranch(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data2 = {
      name: formData.get("name"),
      desc: formData.get("desc"),
      email: formData.get("email"),
      type: formData.get("type"),
      category,
      subCategory: selectedSubCategory,
      branchId: formData.get("branch"),
    };
    try {
      const product = {
        ...data2,
        userName: user?.firstName,
        userNumber: user?.phone,
      };

      await axios.post(`${serverBaseUrl}/issue`, product);
      MySwal.fire("Good job!", "successfully added", "success");
      formRef.current.reset();
    } catch (err) {
      // MySwal.fire("Something Error Found.", "warning");
    }
  };

  const issueSubCategories = {
    "my-room": [
      "Roommate",
      "Wifi",
      "Air Condition",
      "Cleaning",
      "Room Lock issue",
      "Fan or Light",
      "Bed",
      "Washroom",
      "Others Issue",
    ],
    "common-area": [
      "Food Issue",
      "Kitchen",
      "TV",
      "Water",
      "Fridge",
      "Watching Machine",
      "Housekeeper",
      "Others",
    ],
    payment: [
      "Invoice Update",
      "Payment Not Showing",
      "Payment Failed",
      "Rent",
      "Discount",
      "Others Problem",
    ],
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>
        <h2
          className="text-xl font-bold md:p-0 sm:p-2"
          style={{ fontFamily: "inter" }}
        >
          Create a Ticket
        </h2>
      </DialogHeader>
      <DialogBody
        divider
        className="md:h-[650px] sm:h-[400px] overflow-y-auto mb-5 "
      >
        <div className="md:px-10 sm:px-3 ">
          <div>
            <label htmlFor="inputState" className="profile_label3 bg-green-50">
              Branch
            </label>
            <select
              name="branch"
              id="inputState"
              className="w-2/2 h-9 border rounded border-orange-400"
              defaultValue={"Select Branch"}
            >
              <option selected disabled>
                Select Branch
              </option>
              {branch.map((pd) => (
                <option key={pd._id} value={pd._id}>
                  {pd.name}
                </option>
              ))}
            </select>
          </div>
          <h3 className="text-xl mt-1 bg-green-50">Issue For</h3>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="flex md:flex-row sm:flex-col md:gap-4 sm:gap-0">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="my-room"
                  className="custom-radio"
                  defaultChecked
                  onChange={(e) => setCategory(e.target.value)}
                />
                <span className="ml-2">My Room</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="common-area"
                  className="custom-radio"
                  onChange={(e) => setCategory(e.target.value)}
                />
                <span className="ml-2">Service</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="payment"
                  className="custom-radio"
                  onChange={(e) => setCategory(e.target.value)}
                />
                <span className="ml-2">Payment</span>
              </label>
            </div>

            <div className="mt-5 mb-5">
              <h3 className="text-xl border-2 bg-green-50">
                Select Sub Category
              </h3>
              <div className="flex flex-wrap gap-2">
                {issueSubCategories[category].map((subCategory, index) => (
                  <div
                    className="mt-2"
                    onClick={() => {
                      setSelectedSubCategory(subCategory);
                    }}
                    key={index}
                  >
                    <span
                      className={`${
                        selectedSubCategory === subCategory
                          ? "bg-[#399] text-white border-none"
                          : ""
                      } border border-black rounded px-4 py-2 cursor-pointer text-sm bg-emerald-400 hover:bg-emerald-500 transition-colors duration-200`}
                    >
                      {subCategory}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Issue Title */}
            <div className="issu_title">
              <h3 className="text-xl">Issue Title</h3>
              <input
                type="text"
                className="rounded mt-2 h-10 pl-3 w-full border-1"
                placeholder="Problem"
                name="name"
              />
            </div>
            <div className="mt-5" style={{ display: "none" }}>
              <Input
                variant="static"
                name="email"
                label="Email"
                placeholder="Enter Email"
                defaultValue={user.email || ""}
              />
            </div>
            {/* Issue Description */}
            <div className="issu_title mt-5">
              <h3 className="text-xl">Description</h3>
              <textarea
                className="w-full rounded mt-2 h-24 p-3"
                placeholder="Write about your Problem"
                name="desc"
              />
            </div>
            <div className="flex justify-end" onClick={handleOpen}>
              <button
                type="submit"
                className="bg-[#35B0A7] rounded px-10 py-3 text-white mt-2"
              >
                SEND
              </button>
            </div>
          </form>
        </div>
      </DialogBody>
      <div
        onClick={() => handleOpen(null)}
        className="absolute top-2 right-2 cursor-pointer"
      >
        <span>
          <AiOutlineClose style={{ width: "30px", height: "30px" }} />
        </span>
      </div>
    </Dialog>
  );
};

export default TicketCreate;
