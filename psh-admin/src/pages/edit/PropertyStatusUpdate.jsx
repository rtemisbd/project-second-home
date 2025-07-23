import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { baseUrl } from "../../utils/getBaseURL";
import { Modal } from "react-bootstrap";
import UseFetch from "../../hooks/useFetch";

const PropertyStatusUpdate = ({
  id,
  category,
  setShowStatusUpdate,
  handleShowStatusUpdate,
  refetch,
}) => {
  const { data3 } = UseFetch("facilityCategory");
  // const [data, setData] = useState(null);
  // const [seat, setSeat] = useState(null);
  const [isPublished, setIsPublished] = useState("Unpublished");

  const MySwal = withReactContent(Swal);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (category !== "Shared Room") {
        await axios.patch(`${baseUrl}/api/property/${id}`, {
          isPublished,
        });
        MySwal.fire("Updated", "success");
        refetch();
      }
      if (category === "Shared Room") {
        await axios.patch(`${baseUrl}/api/seats/${id}`, {
          isPublished,
        });
        MySwal.fire("Updated", "success");
        refetch();
      }
    } catch (err) {
      MySwal.fire("Something Error Found.", "warning");
    }
  };
  return (
    <Modal
      show={handleShowStatusUpdate}
      onHide={() => setShowStatusUpdate(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h1 className="modal-title fs-5" id="staticBackdropLabel">
            Status Update
          </h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            // width: "100%",
            borderRadius: "3px",
            backgroundColor: "white",
          }}
        >
          <div>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div>
                  <div className="">
                    <div className="col-md-12 mb-3">
                      <label htmlFor="inputState" className="">
                        Status
                      </label>
                      <br />
                      <select
                        name="isPublished"
                        id="inputState"
                        className="main_form"
                        style={{ width: "450px" }}
                        // onBlur={handleOnBlur}
                        onBlur={(e) => setIsPublished(e.target.value)}
                        defaultValue={isPublished}
                      >
                        <option value="Published">Published</option>
                        <option value="Unpublished">Unpublished</option>
                      </select>
                    </div>

                    <div className="d-flex justify-content-end ml-5">
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
      </Modal.Body>
    </Modal>
  );
};

export default PropertyStatusUpdate;
