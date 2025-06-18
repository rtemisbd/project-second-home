import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { placeLoadingShow } from "../../../redux/reducers/loadingStateSlice";
import axios from "axios";
import { baseUrl } from "../../../utils/getBaseURL";
import { getFromLocalStorage } from "../../../utils/local-storage";
import { authKey } from "../../../utils/storageKey";

const ResortTransactionStatusUpdate = ({ data, refetch }) => {
  const paymentStatusArray = ["Approved", "Pending", "Processing", "Rejected"];

  const [selectedStatus, setSelectedStatus] = useState(
    data?.paymentStatus || ""
  );
  const [showModal, setShowModal] = useState(true);

  const dispatch = useDispatch();

  const handleClose = () => {
    setShowModal(false);
    dispatch(placeLoadingShow(false));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedStatus === data?.paymentStatus) {
      return toast(`Sorry Already ${data?.paymentStatus}`);
    }

    try {
      dispatch(placeLoadingShow(true));
      const updatedStatus = {
        paymentStatus: selectedStatus,
      };
      // Set the headers
      const accessToken = getFromLocalStorage(authKey);
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      };
      await axios.patch(
        `${baseUrl}/api/villaTransaction/${data?._id}`,
        updatedStatus,
        { headers }
      );
      handleClose();
      toast.success("Updated");
      refetch();
    } catch (err) {
      console.log(err);
      handleClose();
      toast.warning("Something Error Found.");
    }
  };

  if (!showModal) {
    return <div></div>;
  }
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
                            Status ({data?.paymentStatus})
                          </label>
                          <br />
                          <select
                            name="paymentStatus"
                            id="inputState"
                            className="main_form"
                            style={{ width: "450px" }}
                            // onBlur={handleOnBlur}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            defaultValue={data?.paymentStatus}
                          >
                            {paymentStatusArray.map((status) => (
                              <option value={status}>{status}</option>
                            ))}
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

export default ResortTransactionStatusUpdate;
