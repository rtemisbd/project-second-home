import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useForm } from "react-hook-form";

const Add_Manager = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [branches, setBranches] = useState([]);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    // Fetch branches from your backend API and update the branches state
    const fetchBranches = async () => {
      try {
        const response = await fetch("https://api.psh.com.bd/api/branch");
        const data = await response.json();
        setBranches(data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, []);
  const onSubmitRegister = async (data) => {
    const {
      firstName,
      address,
      email,
      phone,
      password,
      role,
      branch: branchId,
    } = data;

    try {
      const response = await axios.post("https://api.psh.com.bd/api/users", {
        firstName,
        address,
        email,
        phone,
        password,
        role,
        branch: branchId,
      });

      if (response.status === 200) {
        // Registration successful
        const responseData = response.data;

        // Show success message using SweetAlert2
        MySwal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Manager added successfully.",
        });
        reset();
      } else {
        // Registration failed
        const errorData = response.data;
        console.log(errorData);
        // Show error message using SweetAlert2
        MySwal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "Failed to add manager. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error registering manager:", error);
      // Show error message using SweetAlert2
      MySwal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Failed to add manager. Please try again.",
      });
    }
  };

  const roles = [
    "admin",
    "SuperAdmin",
    "user",
    "manager",
    "partner",
    "subAdmin1",
    "subAdmin2",
  ];
  return (
    <div className="wrapper">
      <div className="content-wrapper " style={{ background: "unset" }}>
        <div className="customize registration_div card">
          <form onSubmit={handleSubmit(onSubmitRegister)}>
            <div className="row p-3">
              <div className="col-md-12 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  First Name
                </label>
                <input
                  type="text"
                  className="main_form w-100"
                  placeholder="firstName"
                  {...register("firstName", {
                    required: "firstName is Required",
                  })}
                />
              </div>

              <div className="col-md-12 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Email
                </label>
                <input
                  type="email"
                  className="main_form w-100"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is Required",
                  })}
                />
              </div>
              <div className="col-md-12 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Password
                </label>
                <input
                  type="password"
                  className="main_form w-100"
                  placeholder="password"
                  {...register("password", {
                    required: "password is Required",
                  })}
                />
              </div>

              <div className="col-md-12 form_sub_stream">
                <label htmlFor="inputState" className="profile_label3">
                  Role
                </label>
                <select
                  name="roleId"
                  id="inputState"
                  className="main_form w-100"
                  {...register("role")}
                >
                  <option>Select Role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-12 form_sub_stream">
                <label htmlFor="inputState" className="profile_label3">
                  Branch
                </label>
                <select
                  id="inputState"
                  className="main_form w-100"
                  {...register("branch")}
                >
                  <option>Select Branch</option>
                  {branches.map((branch) => (
                    <option key={branch._id} value={branch._id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-center my-5">
              <button
                type="submit"
                className="profile_btn"
                style={{ width: 175 }}
              >
                Add Manager
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add_Manager;
