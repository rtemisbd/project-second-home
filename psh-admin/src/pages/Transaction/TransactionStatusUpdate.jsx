/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { placeLoadingShow } from "../../redux/reducers/loadingStateSlice";
import { useDispatch } from "react-redux";
import LoadingState from "../LoadingState/LoadingState";
import { baseUrl } from "../../utils/getBaseURL";

const TransactionStatusUpdate = ({ data, refetch, handleClose }) => {
  const { _id, name, seatNumber, desc, acceptableStatus } = data;
  const dispatch = useDispatch();

  // const handleClose = () => dispatch(placeLoadingShow(false));
  const [user, setUser] = useState(data);

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newInfo = { ...user };
    if (field === "acceptableStatus") {
      newInfo[field] = value;
    }
    newInfo[field] = value;
    setUser(newInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (acceptableStatus === user?.acceptableStatus) {
      return toast(`Sorry Already ${user?.acceptableStatus}`);
    }

    const newPost = {
      ...user,
    };
    try {
      dispatch(placeLoadingShow(true));
      const updatedStatus = {
        ...newPost,
      };

      await axios.patch(`${baseUrl}/api/transaction/${_id}`, updatedStatus);
      toast("Updated", "success");
      handleClose();
      refetch();
    } catch (err) {
      // console.log(err);
      handleClose();
      toast("Something Error Found.", "warning");
    }
  };
  return (
    <div className="container">
      <div
        className="modal fade"
        id={`transactionStatus${data._id}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Status Update
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div>
                      <div className="">
                        <div className="col-md-12 mb-3">
                          <label htmlFor="inputState" className="">
                            Status ({acceptableStatus})
                          </label>
                          <br />
                          <select
                            name="acceptableStatus"
                            id="inputState"
                            className="main_form"
                            style={{ width: "450px" }}
                            onBlur={handleOnBlur}
                            defaultValue={user.acceptableStatus}
                          >
                            <option value="Accepted">Accepted</option>
                            <option value="Pending">Pending</option>

                            <option value="Rejected">Rejected</option>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionStatusUpdate;
