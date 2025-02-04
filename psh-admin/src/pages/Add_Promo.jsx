/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { uploadSingleImage } from "../utils/uploadSingleImage";
import { baseUrl } from "../utils/getBaseURL";

const Add_Promo = () => {
  const [discount, setDiscount] = useState(0);
  const MySwal = withReactContent(Swal);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const isPublished = event.target.isPublished.value;
    if (isPublished === "Select Status") {
      return toast.warn("Please Select Status");
    }

    const data2 = {
      promoName: formData.get("promoName"),
      promoCode: formData.get("promoCode"),
      minimumDays: formData.get("minimumDays"),
      promoStart: formData.get("promoStart"),
      promoEnd: formData.get("promoEnd"),
      promoDiscount: discount,
      discountAmount: formData.get("discountAmount"),
      promoDetails: formData.get("promoDetails"),
      useTime: formData.get("useTime"),
      isPublished: isPublished,
    };

    try {
      const detailsCover = await uploadSingleImage(formData.get("img"));
      const homePageCover = await uploadSingleImage(
        formData.get("homePageCover")
      );

      const promo = {
        ...data2,
        photos: detailsCover,
        homePageCover: homePageCover,
      };

      await axios.post(`${baseUrl}/api/promo`, promo);
      MySwal.fire("Good job!", "successfully added", "success");
    } catch (err) {
      MySwal.fire("Something Error Found.", "warning");
    }
    event.target.reset();
  };

  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <div className="customize registration_div card">
          <form onSubmit={handleSubmit}>
            <div className="row p-3">
              <div className="col-md-4 form_sub_stream">
                <label htmlFor="inputState" className="form-label ">
                  Discount Title{" "}
                </label>

                <input
                  type="text"
                  className="main_form w-100"
                  name="promoName"
                  placeholder="Promo Name"
                />
              </div>
              <div className="col-md-4 form_sub_stream">
                <label htmlFor="inputState" className="form-label ">
                  Discount Code
                </label>

                <input
                  type="text"
                  className="main_form w-100"
                  name="promoCode"
                  placeholder="Promo Code"
                />
              </div>
              <div className="col-md-4 form_sub_stream">
                <label htmlFor="inputState" className="form-label  ">
                  Total Duration (input Total Days)
                </label>

                <input
                  type="number"
                  className="main_form w-100"
                  name="minimumDays"
                  required
                  placeholder="Total Duration (input Total Days)"
                />
              </div>
              <div className="col-md-4 form_sub_stream">
                <label htmlFor="inputState" className="form-label  ">
                  Valid From
                </label>

                <input
                  type="date"
                  className="main_form w-100"
                  name="promoStart"
                  placeholder="Promo Start Date"
                />
              </div>
              <div className="col-md-4 form_sub_stream">
                <label htmlFor="inputState" className="form-label  ">
                  Expired
                </label>

                <input
                  type="date"
                  className="main_form w-100"
                  name="promoEnd"
                  placeholder="Promo Code"
                />
              </div>

              <div className="d-flex flex-column form_sub_stream col-md-4 ">
                <label htmlFor="inputState" className="form-label  ">
                  Use Time
                </label>

                <input
                  type="text"
                  className="main_form w-100"
                  name="useTime"
                  placeholder="Available"
                  required
                />
              </div>
              <div className="col-md-4 form_sub_stream">
                <label htmlFor="inputState" className="form-label  ">
                  Discount (Input as percentages )
                </label>

                <input
                  type="number"
                  className="main_form w-100"
                  name="promoDiscount"
                  placeholder="Discount"
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
              {discount === "100" ? (
                <div className="col-md-4 form_sub_stream">
                  <label htmlFor="inputState" className="form-label  ">
                    Discount Amount
                  </label>

                  <input
                    type="number"
                    className="main_form w-100"
                    name="discountAmount"
                    placeholder="Discount Amount"
                    required
                  />
                </div>
              ) : (
                ""
              )}

              <div className="col-md-4 form_sub_stream">
                <label htmlFor="inputState" className="form-label  ">
                  Small Photo
                </label>

                <input
                  type="file"
                  className="main_form w-100 p-0"
                  name="homePageCover"
                  required
                />
              </div>
              <div className="col-md-4 form_sub_stream">
                <label htmlFor="inputState" className="form-label  ">
                  Large Photo
                </label>

                <input
                  type="file"
                  className="main_form w-100 p-0"
                  name="img"
                  required
                />
              </div>

              <div className="col-md-4 form_sub_stream">
                <label className="profile_label3">Status</label>

                <select
                  name="isPublished"
                  className="main_form w-100"
                  // required
                >
                  <option disabled>Select Status</option>
                  <option>Published</option>
                  <option>Unpublished</option>
                </select>
              </div>
              <div className="col-md-6 form_sub_stream">
                <label htmlFor="inputState" className="form-label  ">
                  Discount Details
                </label>

                <textarea
                  className="main_form w-100 px-2"
                  style={{ height: "100px" }}
                  name="promoDetails"
                  placeholder="Promo Code Details"
                />
              </div>
            </div>

            <div className="d-flex justify-content-center my-5">
              <button
                type="submit"
                className="profile_btn"
                style={{ width: 175 }}
              >
                Add New Discount
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer className="toast-position" position="top-center" />
    </div>
  );
};

export default Add_Promo;
