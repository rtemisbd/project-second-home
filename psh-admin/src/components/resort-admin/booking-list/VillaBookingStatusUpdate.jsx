import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { placeLoadingShow } from "../../../redux/reducers/loadingStateSlice";
import { getFromLocalStorage } from "../../../utils/local-storage";
import { authKey } from "../../../utils/storageKey";
import axios from "axios";
import { baseUrl } from "../../../utils/getBaseURL";

const VillaBookingStatusUpdate = ({ data, refetch }) => {
  const statusArray = ["Approved", "Pending", "Processing", "Rejected"];
  const [selectedStatus, setSelectedStatus] = useState(data?.status || "");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedStatus === data?.status) {
      return toast(`Already ${data?.status}`);
    }

    try {
      dispatch(placeLoadingShow(true));
      const updatedStatus = { status: selectedStatus };
      const accessToken = getFromLocalStorage(authKey);
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      };
      await axios.patch(
        `${baseUrl}/api/villa-order/${data?._id}`,
        updatedStatus,
        { headers }
      );
      toast.success("Updated");
      refetch();

      // ✅ Initialize and hide the modal safely
      // const modalEl = document.getElementById(`bookingStatus${data._id}`);
      // let modal = window.bootstrap.Modal.getInstance(modalEl);
      // if (!modal) {
      //   modal = new window.bootstrap.Modal(modalEl);
      // }
      // modal.hide();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong.");
    } finally {
      dispatch(placeLoadingShow(false));
    }
  };

  return (
    <div className="container">
      <div
        className="modal fade"
        id={`bookingStatus${data._id}`}
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
                Update Booking Status
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="col-md-12 mb-3">
                  <label htmlFor="inputState">Status</label>
                  <select
                    name="status"
                    id="inputState"
                    className="main_form"
                    style={{ width: "450px" }}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    defaultValue={data?.status}
                  >
                    {statusArray.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="d-flex justify-content-center ml-5">
                  <button type="submit" style={{ width: 220 }}>
                    Update Status
                  </button>
                </div>
                <Toaster
                  containerStyle={{ top: 300 }}
                  toastOptions={{ position: "top-center" }}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaBookingStatusUpdate;
