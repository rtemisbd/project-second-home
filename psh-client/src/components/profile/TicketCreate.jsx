import { Input, Radio } from "@material-tailwind/react";
import React, { useState, useRef, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { AiOutlineClose } from "react-icons/ai";
import withReactContent from "sweetalert2-react-content";

import { AuthContext } from "../../contexts/UserProvider";
import "./Ticket.css";

const TicketCreate = ({ handleOpen, open }) => {
  const [issue, setIssue] = useState("Air Condition Problem");
  // const [allBranch] = useBranch();
  const { user } = useContext(AuthContext);
  const MySwal = withReactContent(Swal);
  const [branch, SetBranch] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const formRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.psh.com.bd/api/branch");
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
      category: formData.get("category"),
      subCategory: selectedSubCategory,
      branchId: formData.get("branch"),
    };
    try {
      const product = {
        ...data2,
        userName: user?.firstName,
        userNumber: user?.phone,
      };

      await axios.post("https://api.psh.com.bd/api/issue", product);
      MySwal.fire("Good job!", "successfully added", "success");
      formRef.current.reset();
    } catch (err) {
      // MySwal.fire("Something Error Found.", "warning");
    }
  };
  const issueSubCategories1 = [
    "Ac Not Working",
    "No Remote",
    "Not Remote Working",
    "Not Remote Working",
    "Ac Issue",
    "Not Remote Working",
    "Other",
  ];
  const issueSubCategories2 = [
    "Ac Working Problem",
    "No Remote",
    "Not Remote Working",
    "Not Remote Working",
    "Ac Issue",
    "Not Remote Working",
  ];
  const [issueSubValue, setIssuSubValue] = useState(0);
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>
        {" "}
        <h2
          className="text-xl font-bold md:p-0 sm:p-2"
          style={{ fontFamily: "inter" }}
        >
          Create a Ticket
        </h2>
      </DialogHeader>
      <DialogBody
        divider
        className=" md:h-[450px] sm:h-[300px]  overflow-y-auto  mb-5"
      >
        <div className="md:px-10 sm:px-3 ">
          <h3 className="text-xl mt-1">Issue For</h3>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="flex md:flex-row sm:flex-col md:gap-8 sm:gap-0 ">
              <Radio
                name="type"
                label="My Room"
                value="my-room"
                defaultChecked
              />
              <Radio name="type" label="Common Area" value="common-area" />
              <Radio name="type" label="Payment" value="payment" />
            </div>
            <div className="flex md:gap-x-16 gap-x-5 items-center">
              <div>
                <label htmlFor="inputState" className="profile_label3">
                  Branch
                </label>
                <select
                  name="branch"
                  id="inputState"
                  className="w-full h-9 border rounded  border-black"
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
              <div className="">
                <h3 className="text-xl">Issu Category</h3>
                <select
                  className="w-full h-9 border rounded mt-4 border-black"
                  onChange={(e) => setIssue(e.target.value)}
                  name="category"
                >
                  <option>Air Condition Problem</option>
                  <option>Room Problem</option>
                </select>
              </div>
            </div>

            {/* Sub Category */}
            <div className="mt-5 mb-5">
              <h3 className="text-xl">Sub Category</h3>
              {issue === "Air Condition Problem" ? (
                <div className="grid lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-1">
                  {issueSubCategories1.map((issue, index) => (
                    <div
                      className="mt-6"
                      onClick={() => {
                        setIssuSubValue(index);
                        setSelectedSubCategory(issue); // Update the selected sub-category
                      }}
                      key={index}
                    >
                      <span
                        className={`${
                          issueSubValue === index
                            ? "bg-[#399] text-white border-none "
                            : ""
                        } border border-black rounded-[15px] px-5 py-1.5 cursor-pointer text-sm`}
                      >
                        {issue}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
              {issue === "Room Problem" ? (
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1">
                  {issueSubCategories2.map((issue, index) => (
                    <div
                      className="mt-6"
                      onClick={() => {
                        setIssuSubValue(index);
                        setSelectedSubCategory(issue); // Update the selected sub-category
                      }}
                      key={index}
                    >
                      <span
                        className={`${
                          issueSubValue === index
                            ? "bg-[#399] text-white border-none "
                            : ""
                        } border border-black rounded-[15px] text-sm px-5 py-1.5 cursor-pointer`}
                      >
                        {issue}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
            {/* Issu Title */}
            <div className="issu_title ">
              <h3 className="text-xl">Issu Title</h3>
              <input
                type="text"
                className=" rounded mt-2 h-10 pl-3 w-full"
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
            {/* Issu Description */}
            <div className="issu_title mt-5 ">
              <h3 className="text-xl">Description</h3>
              <textarea
                className="w-full rounded mt-2 h-24  p-3"
                placeholder="Write about your Problem "
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
