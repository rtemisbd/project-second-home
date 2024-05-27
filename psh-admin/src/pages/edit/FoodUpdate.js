import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const FoodUpdate = ({ data, refetch, setStatusShow, statusShow }) => {
  const { _id, name, seatNumber, desc, status, isIncludeFood } = data;

  const [user, setUser] = useState(data);

  const MySwal = withReactContent(Swal);

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newInfo = { ...user };
    if (field === "isFood") {
      newInfo[field] = value;
    }
    newInfo[field] = value;
    setUser(newInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isIncludeFood === user?.isIncludeFood) {
      return MySwal.fire(`Sorry Already ${user?.isIncludeFood}`);
    }

    const newPost = {
      ...user,
    };

    try {
      const updatedFoodStatus = {
        ...newPost,
      };

      await axios.patch(
        `http://localhost:8000/api/order/${_id}`,
        updatedFoodStatus
      );
      MySwal.fire("Updated", "success");
      refetch();
    } catch (err) {
      console.log(err);
      MySwal.fire("Something Error Found.", "warning");
    }
  };
  return (
    <div className="container">
      <div
        className="modal fade"
        id={`food${data._id}`}
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
                Food Update
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
                            Food ({isIncludeFood})
                          </label>
                          <br />
                          <select
                            name="isFood"
                            id="inputState"
                            className="main_form"
                            style={{ width: "450px" }}
                            onBlur={handleOnBlur}
                            defaultValue={user.isIncludeFood}
                          >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>

                        <div className="d-flex justify-content-center ml-5">
                          <button type="submit" style={{ width: 220 }}>
                            Update Food
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

export default FoodUpdate;
