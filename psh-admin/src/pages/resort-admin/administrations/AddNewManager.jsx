import { useState } from "react";
import { useForm } from "react-hook-form";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const AddNewManager = () => {
  const roles = ["resortAdmin", "resortAccountant", "resortReceptionist"];

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <div className="wrapper">
      <div className="content-wrapper " style={{ background: "unset" }}>
        <div className="customize registration_div card">
          <form>
            <div className="row p-3">
              <div className="col-md-12 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Name
                </label>
                <input
                  type="text"
                  className="main_form w-100"
                  placeholder="Name"
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
                  htmlFor="mobileNumber"
                  className="form-label profile_label3 "
                >
                  Mobile Number
                </label>
                <input
                  type="text"
                  className="main_form w-100"
                  placeholder="Mobile Number"
                  //   {...register("phone", {
                  //     required: "Mobile Number is Required",
                  //   })}
                />
              </div>
              {/* <div className="col-md-12 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Password
                </label>
                <input
                  type="password"
                  className="main_form w-100"
                  placeholder="Password must have uppercase, number and special characters "
                  {...register("password", {
                    required: "password is Required",
                  })}
                />
              </div> */}

              <div className="col-md-12  d-flex flex-column">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Password
                </label>

                <div className="d-flex">
                  <input
                    // type={showPassword ? "text" : "password"}
                    className="main_form w-100 ps-2"
                    placeholder="Enter Password"
                    // {...register("password", {
                    //   required: "Password is required",
                    //   minLength: {
                    //     value: 6,
                    //     message: "Password must be 6 characters long",
                    //   },
                    //   pattern: {
                    //     value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                    //     message:
                    //       "Password must have uppercase, number and special characters",
                    //   },
                    // })}
                  />
                  <button
                    type="button"
                    // onClick={toggleShowPassword}
                    style={{
                      border: "none",
                      marginLeft: -40,
                      width: 40,
                      height: 60,
                    }}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </div>
              <div className="col-md-12 form_sub_stream">
                <label htmlFor="inputState" className="profile_label3">
                  Role
                </label>
                <select
                  name="roleId"
                  id="inputState"
                  className="main_form w-100"
                  //   {...register("role")}
                  //   onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option>Select Role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
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

export default AddNewManager;
