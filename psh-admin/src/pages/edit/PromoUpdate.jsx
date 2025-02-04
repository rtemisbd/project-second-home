import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./Main_steam.css";
import axios from "axios";
import { uploadSingleImage } from "../../utils/uploadSingleImage";
import { baseUrl } from "../../utils/getBaseURL";

const Promo = ({ data, refetch }) => {
  const [discount, setDiscount] = useState(data?.promoDiscount);
  const MySwal = withReactContent(Swal);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
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
      isPublished: formData.get("isPublished"),
    };

    try {
      const detailsCover = await uploadSingleImage(formData.get("img"));
      const homePageCover = await uploadSingleImage(
        formData.get("homePageCover")
      );

      const updatePromo = {
        ...data2,
        photos: detailsCover,
        homePageCover: homePageCover,
      };

      await axios.patch(`${baseUrl}/api/promo/${data._id}`, updatePromo);
      MySwal.fire("Good job!", "successfully Updated", "success");
      refetch();
    } catch (err) {
      console.log(err);

      MySwal.fire("Something Error Found.", "warning");
    }
    event.target.reset();
  };
  return (
    <>
      <div className="">
        <div
          className="modal fade"
          id={`promo${data?._id}`}
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" style={{ maxWidth: "750px" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Promo Update
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
                  <div className="p-3">
                    <div className="form_sub_stream d-flex flex-column">
                      <label
                        htmlFor="inputState"
                        className="form-label profile_label3 "
                      >
                        Promo Name
                      </label>

                      <input
                        type="text"
                        className="main_form "
                        name="promoName"
                        placeholder="Promo Name"
                        defaultValue={data?.promoName}
                        required
                      />
                    </div>
                    <div className="d-flex flex-column form_sub_stream">
                      <label
                        htmlFor="inputState"
                        className="form-label profile_label3 "
                      >
                        Promo Code
                      </label>

                      <input
                        type="text"
                        className="main_form "
                        name="promoCode"
                        placeholder="Promo Code"
                        defaultValue={data?.promoCode}
                        required
                      />
                    </div>
                    <div className="d-flex flex-column form_sub_stream">
                      <label
                        htmlFor="inputState"
                        className="form-label profile_label3 "
                      >
                        Total Duration (input Total Days)
                      </label>

                      <input
                        type="number"
                        className="main_form "
                        name="minimumDays"
                        placeholder="Total Duration (input Total Days)"
                        defaultValue={data?.minimumDays}
                        required
                      />
                    </div>
                    <div className="d-flex flex-column form_sub_stream">
                      <label
                        htmlFor="inputState"
                        className="form-label profile_label3 "
                      >
                        Valid From
                      </label>

                      <input
                        type="date"
                        className="main_form "
                        name="promoStart"
                        placeholder="Promo Start Date"
                        defaultValue={data?.promoStart}
                        required
                      />
                    </div>
                    <div className="d-flex flex-column form_sub_stream">
                      <label
                        htmlFor="inputState"
                        className="form-label profile_label3 "
                      >
                        Expired
                      </label>

                      <input
                        type="date"
                        className="main_form"
                        name="promoEnd"
                        placeholder="Promo Code"
                        defaultValue={data?.promoEnd}
                        required
                      />
                    </div>
                    <div className="d-flex flex-column form_sub_stream">
                      <label
                        htmlFor="inputState"
                        className="form-label  profile_label3 "
                      >
                        Use Time
                      </label>

                      <input
                        type="text"
                        className="main_form "
                        name="useTime"
                        placeholder="Available"
                        defaultValue={data?.useTime}
                        required
                      />
                    </div>
                    <div className="d-flex flex-column form_sub_stream">
                      <label
                        htmlFor="inputState"
                        className="form-label profile_label3 "
                      >
                        Discount (Input as percentages )
                      </label>

                      <input
                        type="number"
                        className="main_form "
                        name="promoDiscount"
                        placeholder="Discount"
                        onChange={(e) => setDiscount(e.target.value)}
                        defaultValue={data?.promoDiscount}
                      />
                    </div>
                    {discount === "100" ? (
                      <div className="d-flex flex-column form_sub_stream">
                        <label
                          htmlFor="inputState"
                          className="form-label  profile_label3"
                        >
                          Discount Amount
                        </label>

                        <input
                          type="number"
                          className="main_form w-100"
                          name="discountAmount"
                          placeholder="Discount Amount"
                          required
                          defaultValue={data?.discountAmount}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="d-flex flex-column form_sub_stream">
                      <label
                        htmlFor="inputState"
                        className="form-label profile_label3 "
                      >
                        Promo Details
                      </label>

                      <textarea
                        className="main_form"
                        style={{ height: "100px" }}
                        name="promoDetails"
                        placeholder="Promo Code Details"
                        defaultValue={data?.promoDetails}
                        required
                      />
                    </div>
                    <div className="d-flex flex-column form_sub_stream">
                      <label className="profile_label3">Status</label>

                      <select
                        name="isPublished"
                        className="main_form w-100"
                        // required
                        defaultValue={data?.isPublished}
                      >
                        <option>Published</option>
                        <option>Unpublished</option>
                      </select>
                    </div>

                    <div>
                      <img
                        src={data?.homePageCover[0] && data?.homePageCover[0]}
                        style={{ width: "300px", height: "200px" }}
                        alt=""
                      />
                    </div>
                    <div className="col-md-4 form_sub_stream">
                      <label htmlFor="inputState" className="form-label  ">
                        Small Photo
                      </label>

                      <input
                        type="file"
                        className="main_form w-100 p-0"
                        name="homePageCover"
                      />
                    </div>

                    <div>
                      <img
                        src={data?.photos[0] && data?.photos[0]}
                        style={{ width: "300px", height: "200px" }}
                        alt=""
                      />
                    </div>
                    <div className="d-flex flex-column form_sub_stream">
                      <label
                        htmlFor="inputState"
                        className="form-label profile_label3 "
                      >
                        Large Photo
                      </label>

                      <input
                        type="file"
                        className="main_form  p-0"
                        name="img"
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-end my-3">
                    <button
                      type="submit"
                      className="px-3"
                      style={{ backgroundColor: "#35b0a7" }}
                    >
                      Update Promo
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Promo;
