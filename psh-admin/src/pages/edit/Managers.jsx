import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import axios from "axios";
import { baseUrl } from "../../utils/getBaseURL";

const Managers = ({ data }) => {
  const { _id, name, role, resort } = data;

  const [user, setUser] = useState(data);
  const [branches, setBranches] = useState(null);

  const roles = resort
    ? ["resortAdmin", "resortAccountant", "resortReceptionist"]
    : [
        "admin",
        "SuperAdmin",
        "user",
        "manager",
        "partner",
        "subAdmin1",
        "subAdmin2",
        "resortAdmin",
      ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/branch`);
        setBranches(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const MySwal = withReactContent(Swal);

  // const handleOnBlur = (e) => {
  //   const field = e.target.name;
  //   const value = e.target.value;
  //   const newInfo = { ...user };
  //   // if (field === "status") {
  //   //   newInfo[field] = value;
  //   // }
  //   newInfo[field] = value;
  //   setUser(newInfo);
  // };

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      ...user,
    };
    try {
      const payload = {
        ...newPost,
        branch:
          typeof user.branch === "object" && user.branch !== null
            ? user.branch._id
            : user.branch,
      };

      await axios.patch(`${baseUrl}/api/users/admin/${_id}`, payload);
      MySwal.fire("Good job!", "successfully edited", "success");
    } catch (err) {
      console.log(err);

      MySwal.fire("Something Went Wrong!.", "warning");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div>
            <div className="card-body">
              <div className="col-md-12 mb-3">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="main_form  w-100"
                  name="firstName"
                  onBlur={handleOnBlur}
                  defaultValue={user.firstName || ""}
                />
              </div>
              {resort ? (
                <></>
              ) : (
                <div className="col-md-6 form_sub_stream ">
                  <label htmlFor="inputState" className="profile_label3">
                    Branch
                  </label>
                  <select
                    name="branch"
                    id="inputState"
                    className="main_form w-100"
                    onChange={handleOnBlur}
                    defaultValue={user?.branch || ""}
                  >
                    <option disabled>Select Branch</option>
                    {branches?.map((branch) => (
                      <option key={branch?._id} value={branch?._id}>
                        {branch?.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="col-md-12 mb-3">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3"
                >
                  Role
                </label>
                <select
                  name="role"
                  id="inputState"
                  className="main_form w-100"
                  onBlur={handleOnBlur}
                  defaultValue={user.role}
                >
                  {roles.map((role, ind) => (
                    <option
                      key={ind}
                      value={role}
                      selected={role === user?.role}
                    >
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="inputState" className="">
                  Status ({data?.userStatus})
                </label>
                <br />
                <select
                  name="userStatus"
                  id="inputState"
                  className="main_form"
                  style={{ width: "450px" }}
                  onBlur={handleOnBlur}
                  defaultValue={user.userStatus}
                >
                  <option value="Active">Active</option>
                  <option value="Deactive">Deactive</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>

              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="profile_btn"
                  style={{ width: 220 }}
                >
                  Update Role
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Managers;
