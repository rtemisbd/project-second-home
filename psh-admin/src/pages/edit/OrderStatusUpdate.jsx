import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import { isAlreadyBookings } from "../../utils/bookingChecking";

const OrderStatusUpdate = ({
  data,
  refetch,
  showStatusModal,
  setShowStatusModal,
}) => {
  const { _id, status } = data;

  const [user, setUser] = useState(data);

  const MySwal = withReactContent(Swal);

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newInfo = { ...user };
    if (field === "status") {
      newInfo[field] = value;
    }
    newInfo[field] = value;
    setUser(newInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === user?.status) {
      return MySwal.fire(`Sorry Already ${user?.status}`);
    }
    // const inputStartDate = new Date(minus1dFromStartDate)
    //   .toISOString()
    //   .split("T")[0];

    // const inputEndDate = new Date(endDate).toISOString().split("T")[0];
    // const isBooked = isAlreadyBookings(
    //   inputStartDate,
    //   inputEndDate,
    //   seatBooking?.rentDate
    // );
    const newPost = {
      ...user,
    };
    try {
      const updatedStatus = {
        ...newPost,
      };

      await axios.patch(
        `http://localhost:8000/api/order/${_id}`,
        updatedStatus
      );
      MySwal.fire("Updated", "success");
      refetch();
    } catch (err) {
      // console.log(err);
      MySwal.fire("Something Error Found.", "warning");
    }
  };

  const handleClose = () => setShowStatusModal(false);
  return (
    <>
      <Modal show={showStatusModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div>
                <div className="">
                  <div className="col-md-12 mb-3">
                    <label htmlFor="inputState" className="">
                      Status ({status})
                    </label>
                    <br />
                    <select
                      name="status"
                      id="inputState"
                      className="main_form"
                      style={{ width: "450px" }}
                      onBlur={handleOnBlur}
                      defaultValue={user.status}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Approved">Approved</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                  </div>

                  <div className="d-flex justify-content-center ml-5">
                    <button type="submit" style={{ width: 220 }}>
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Toaster
              containerStyle={{ top: 300 }}
              toastOptions={{ position: "top-center" }}
            ></Toaster>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OrderStatusUpdate;
