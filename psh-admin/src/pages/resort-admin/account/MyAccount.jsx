import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../../contexts/UserProvider";
import axios from "axios";
import { baseUrl } from "../../../utils/getBaseURL";
import { getFromLocalStorage } from "../../../utils/local-storage";
import { authKey } from "../../../utils/storageKey";
import img3 from "../../../img/home/profile.png";
import { formatDate } from "../../../utils/dateConvert";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

const MyAccount = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(user);
  const [reFetch, setReFetch] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const handleUpdateUser = async (e) => {
    try {
      e.preventDefault();
      const payload = {
        firstName: e.target.firstName.value,
        phone: e.target.phone.value,
      };
      await axios.patch(`${baseUrl}/api/users/${user?._id}`, payload);
      setReFetch(true);
      toast.success("Your account updated successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordChange = async (data) => {
    const { newPassword, confirmPassword } = data;

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const accessToken = getFromLocalStorage(authKey);
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      };

      await axios.patch(
        `${baseUrl}/api/users/${user?._id}/update-password`,
        { password: newPassword },
        { headers }
      );

      toast.success("Password updated successfully!");
      setShowPasswordModal(false);
      reset(); // Reset form after success
    } catch (error) {
      console.error(error);
      toast.error("Password update failed");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the access token
        const accessToken = getFromLocalStorage(authKey);
        // Set the headers
        const headers = {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        };

        const { data } = await axios.get(`${baseUrl}/api/users/${user?._id}`, {
          headers,
        });
        setUserData(data?.data);
        setReFetch(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user?._id, reFetch]);

  console.log(userData);

  return (
    <div className="wrapper">
      <div>
        <div className="wrapper">
          <div className="content-wrapper h-0" style={{ background: "unset" }}>
            <h4 className="customize mx-lg-5 mb-3">My Account</h4>
          </div>
          <hr />
        </div>
      </div>

      <div className="content-wrapper" style={{ background: "unset" }}>
        <section className="content customize_list">
          <div className="container-fluid d-flex ">
            <div style={{ width: "40%" }}>
              <div className="d-flex align-items-start gap-2">
                <img src={img3} alt="" style={{ width: "46px" }} />
                <div>
                  <h4>{userData?.firstName}</h4>
                  <p>{userData?.email}</p>
                  <h5>Contact : {userData?.phone}</h5>
                  <h5>
                    Role :{" "}
                    {userData?.role === "SuperAdmin"
                      ? "Super Admin"
                      : userData?.role === "subAdmin1"
                      ? "Sub Admin"
                      : userData?.role === "manager"
                      ? "Branch Manager"
                      : userData?.role === "partner"
                      ? "Partner"
                      : userData?.role === "resortAdmin"
                      ? "Admin"
                      : userData?.role === "resortAccountant"
                      ? "Accountant"
                      : userData?.role === "resortReceptionist"
                      ? "Receptionist"
                      : ""}
                  </h5>
                  <h5>Joining Date : {formatDate(userData?.createdAt)}</h5>
                </div>
              </div>
              <div className="d-flex justify-content-end pr-5">
                <button
                  onClick={() => setShowPasswordModal(!showPasswordModal)}
                  type="button"
                  className="btn text-success btn-link"
                >
                  Change Password
                </button>
              </div>
            </div>
            <div
              style={{
                width: "60%",
                background: "white",
                padding: "16px",
                borderRadius: "12px",
              }}
            >
              <form
                onSubmit={(e) => handleUpdateUser(e)}
                style={{ width: "100%" }}
              >
                <div className="d-flex gap-3">
                  <div style={{ width: "50%" }}>
                    <label>Full Name</label>
                    <br />
                    <input
                      type="text"
                      defaultValue={userData?.firstName}
                      className="main_form w-100 p-2 mb-4"
                      name="firstName"
                    />
                  </div>
                  <div style={{ width: "50%" }}>
                    <label>Email</label>
                    <br />
                    <input
                      type="email"
                      defaultValue={userData?.email}
                      className="main_form w-100 p-2 "
                      name="email"
                      disabled
                    />
                  </div>
                </div>
                <div className="d-flex gap-3">
                  <div style={{ width: "50%" }}>
                    <label>Phone Number</label>
                    <br />
                    <input
                      type="text"
                      defaultValue={userData?.phone}
                      className="main_form w-100 p-2 mb-4"
                      name="phone"
                    />
                  </div>
                  <div style={{ width: "50%" }}>
                    <label>Role</label>
                    <br />
                    <input
                      type="text"
                      defaultValue={userData?.role}
                      className="main_form w-100 p-2 "
                      name="role"
                      disabled
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <input
                    type="submit"
                    value="Update Now"
                    className="btn btn-success"
                  />
                </div>
              </form>
            </div>
          </div>
        </section>
        {showPasswordModal && (
          <Modal
            show={showPasswordModal}
            onHide={() => {
              setShowPasswordModal(false);
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Set New Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit(handlePasswordChange)}>
                <div className="mb-3">
                  <label>New Password</label>
                  <input
                    type="password"
                    {...register("newPassword", {
                      required: "New Password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^])[A-Za-z\d@$!%*?#&^]{8,}$/,
                        message:
                          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
                      },
                    })}
                    className="main_form w-100 px-2"
                    placeholder="Type New Password"
                  />
                  {errors.newPassword && (
                    <small className="text-danger">
                      {errors.newPassword.message}
                    </small>
                  )}
                </div>
                <div className="mb-3">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === watch("newPassword") ||
                        "Passwords do not match",
                    })}
                    className="main_form w-100 px-2"
                    placeholder="Confirm New Password"
                  />
                  {errors.confirmPassword && (
                    <small className="text-danger">
                      {errors.confirmPassword.message}
                    </small>
                  )}
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-success"
                    style={{ width: 220 }}
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        )}

        <Toaster
          containerStyle={{ top: 300 }}
          toastOptions={{ position: "top-center" }}
        />
      </div>
    </div>
  );
};

export default MyAccount;
