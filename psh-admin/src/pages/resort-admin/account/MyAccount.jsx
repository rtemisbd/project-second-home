import { useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../../../contexts/UserProvider";
import axios from "axios";
import { baseUrl } from "../../../utils/getBaseURL";
import { getFromLocalStorage } from "../../../utils/local-storage";
import { authKey } from "../../../utils/storageKey";
import img3 from "../../../img/home/profile.png";
import { formatDate } from "../../../utils/dateConvert";

const MyAccount = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(user);

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
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user?._id]);

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
                <button type="button" className="btn">
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
              <form style={{ width: "100%" }}>
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
                      type="email"
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

        <Toaster
          containerStyle={{ top: 300 }}
          toastOptions={{ position: "top-center" }}
        />
      </div>
    </div>
  );
};

export default MyAccount;
