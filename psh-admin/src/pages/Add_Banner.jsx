/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { baseUrl } from "../utils/getBaseURL";
import { multipleImageUpload } from "../utils/multipleImageUpload";
import { uploadSingleImage } from "../utils/uploadSingleImage";

const Add_Banner = () => {
  const [files, setFiles] = useState("");
  const MySwal = withReactContent(Swal);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data2 = {
      name: formData.get("name"),
    };
    try {
      // const list = await multipleImageUpload(files);
      const list = await uploadSingleImage(formData.get("img"));

      // if (list?.length !== 3) {
      //   return MySwal.fire("Please upload 3 images.", "warning");
      // }

      const product = {
        ...data2,
        photos: list,
      };

      await axios.post(`${baseUrl}/api/banner`, product);
      MySwal.fire("Good job!", "successfully added", "success");
    } catch (err) {
      console.log(err);
      MySwal.fire("Something Error Found.", "warning");
    }
  };
  return (
    <div className="wrapper">
      <div className="content-wrapper " style={{ background: "unset" }}>
        <div className="customize registration_div card">
          <form onSubmit={handleSubmit}>
            <div className="row p-3 ">
              <div className="col-md-12 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Banner Tittle
                </label>

                <input
                  type="text"
                  className="main_form w-100"
                  name="name"
                  placeholder="Banner Tittle"
                />
              </div>
              <div className="col-md-12 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Image upload
                </label>

                <input
                  type="file"
                  className="main_form w-100 p-0"
                  name="img"
                  onChange={(e) => setFiles(e.target.files)}
                  // multiple
                />
              </div>
            </div>

            <div className="d-flex justify-content-center my-5">
              <button
                type="submit"
                className="profile_btn"
                style={{ width: 175 }}
              >
                Add Banner
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add_Banner;
