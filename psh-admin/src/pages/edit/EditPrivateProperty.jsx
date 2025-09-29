import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../contexts/UserProvider";
import { useParams } from "react-router-dom";
import UseFetch from "../../hooks/useFetch";
import { baseUrl } from "../../utils/getBaseURL";
import { ToastContainer, toast } from "react-toastify";
import { multipleImageUpload } from "../../utils/multipleImageUpload";
import axios from "axios";

const EditPrivateProperty = () => {
  const { user } = useContext(AuthContext);

  const { id } = useParams();

  const { data3: facilityCategory } = UseFetch("facilityCategory");
  const { data3: commonFacilities } = UseFetch("commonfacility");

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState(null);
  const [roomPhotos, setRoomPhotos] = useState([]);
  const [files, setFiles] = useState("");

  const [perDay, setPerDay] = useState(null);
  const [perMonth, setPerMonth] = useState(null);
  const [perYear, setPerYear] = useState(null);

  const [dAmountForDay, setDAmountForDay] = useState(null);
  const [dAmountForMonth, setDAmountForMonth] = useState(null);
  const [dAmountForYear, setDAmountForYear] = useState(null);

  const [discountForDay, setDiscountForDay] = useState(null);
  const [discountForMonth, setDiscountForMonth] = useState(null);
  const [discountForYear, setDiscountForYear] = useState(null);

  const [selectedCommonFacilities, setSelectedCommonFacilities] = useState([]);
  const [selectedAllFacilities, setSelectedAllFacilities] = useState([]);

  const [highlights, setHighlights] = useState([""]);

  // Function to add a new highlight
  const addHighlight = () => {
    setHighlights([...highlights, ""]);
  };

  // Function to remove a Highlight by ID
  const removeHighlight = (ind) => {
    setHighlights(highlights.filter((highlight, index) => index !== ind));
  };

  const handleCheckboxChange = (facilityId) => {
    setSelectedCommonFacilities((prevSelected) => {
      if (prevSelected.includes(facilityId)) {
        return prevSelected.filter((id) => id !== facilityId);
      } else {
        return [...prevSelected, facilityId];
      }
    });
  };
  const handleCheckboxChangeForAll = (event, facilityId) => {
    const isChecked = event.target.checked;
    setSelectedAllFacilities((prevSelected) => {
      if (isChecked) {
        return [...new Set([...prevSelected, facilityId])]; // Prevent duplicates
      } else {
        return prevSelected.filter((id) => id !== facilityId);
      }
    });
  };

  // // Handle Discount For Room
  useEffect(() => {
    // For Day
    if (perDay > 0) {
      const discountedAmountForDay = Number(perDay - dAmountForDay);
      const percentageDiscount =
        (discountedAmountForDay / Number(perDay)) * 100;

      setDiscountForDay(
        percentageDiscount === 100 ? "" : percentageDiscount.toFixed(2)
      );
    }
    // For Month
    if (perMonth > 0) {
      const discountedAmountForDay = Number(perMonth - dAmountForMonth);
      const percentageDiscount =
        (discountedAmountForDay / Number(perMonth)) * 100;

      setDiscountForMonth(
        percentageDiscount === 100 ? "" : percentageDiscount.toFixed(2)
      );
    }
    // For Year
    if (perYear > 0) {
      const discountedAmountForDay = Number(perYear - dAmountForYear);
      const percentageDiscount =
        (discountedAmountForDay / Number(perYear)) * 100;

      setDiscountForYear(
        percentageDiscount === 100 ? "" : percentageDiscount.toFixed(2)
      );
    }
  }, [
    perDay,
    dAmountForDay,
    dAmountForMonth,
    perMonth,
    perYear,
    dAmountForYear,
  ]);

  // read and set data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/property/${id}`);
        const { property } = await response.json();
        console.log(property);

        setData(property);
        setRoomPhotos(property?.photos);
        setPerDay(property?.perDay);
        setPerMonth(property?.perMonth);
        setPerYear(property?.perYear);
        setDAmountForDay(property?.dAmountForDay);
        setDAmountForMonth(property?.dAmountForMonth);
        setDAmountForYear(property?.dAmountForYear);
        setSelectedCommonFacilities(property?.commonfacility);
        setSelectedAllFacilities(
          (property?.facility || []).map((item) => item._id || item) // Normalize to only _id
        );

        setHighlights(
          property?.highlights.length ? property?.highlights : [""]
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  // submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    //  Checking Rent Details

    if (
      Number(perDay) < Number(dAmountForDay) ||
      Number(perMonth) < Number(dAmountForMonth) ||
      Number(perYear) < Number(dAmountForYear)
    ) {
      toast.warn("Please Check Rent Details");
      return;
    }

    const formData = new FormData(event.target);

    const data2 = {
      // info
      category: data?.category?._id,
      branch: data?.branch?._id,
      floor: formData.get("floor"),
      type: formData.get("type"),
      // sort details
      name: formData.get("name"),
      area: formData.get("area"),
      bedroom: formData.get("bedroom"),
      bathroom: formData.get("bathroom"),
      // key details
      balcony: formData.get("balcony"),
      bedType: formData.get("bedType"),
      recommended: formData.get("recommended"),
      furnitured: formData.get("furnitured"),
      CCTV: formData.get("CCTV"),
      WiFi: formData.get("WiFi"),
      //   facility
      facility: selectedAllFacilities,
      commonfacility: selectedCommonFacilities,
      // rent details
      perDay: formData.get("perDay"),
      perMonth: formData.get("perMonth"),
      perYear: formData.get("perYear"),
      dAmountForDay: dAmountForDay,
      dAmountForMonth: dAmountForMonth,
      dAmountForYear: dAmountForYear,
      percentOfDiscountDay: discountForDay,
      percentOfDiscountMonth: discountForMonth,
      percentOfDiscountYear: discountForYear,

      roomNumber: formData.get("roomNumber"),

      rules: formData.get("rules"),
    };

    try {
      setIsLoading(true);
      const list = await multipleImageUpload(files);

      const property = {
        ...data2,
        photos: [...roomPhotos, ...list],
      };

      if (property?.photos?.length < 5) {
        return toast("Sorry ! Minimum 5 Photo Required.", "warning");
      }
      if (data?.category?.name === "Homestay") {
        property.highlights = highlights.map((highlight) => highlight.trim());
      }

      toast("Uploading...", "success");
      const { data: updatedData } = await axios.patch(
        `${baseUrl}/api/property/${id}`,
        property
      );

      if (updatedData?.data?.modifiedCount > 0) {
        setIsLoading(false);
        toast("Your property has been updated!", "success");
      }

      event.target.reset();
    } catch (err) {
      setIsLoading(false);
      console.log(err);

      toast("Something Error Found.", "warning");
    }
  };

  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <div className="customize registration_div card">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* property type */}
              <div className="col-md-6 form_sub_stream ">
                <label htmlFor="inputState" className="profile_label3">
                  Property Type
                </label>
                <input
                  type="text"
                  className="main_form w-100"
                  defaultValue={data?.category?.name}
                  disabled
                />
              </div>
              {/* branch */}
              {(user && user.role === "SuperAdmin") ||
              user.role === "admin" ||
              user.role === "subAdmin1" ? (
                <div className="col-md-6 form_sub_stream ">
                  <label htmlFor="inputState" className="profile_label3">
                    Branch
                  </label>
                  <input
                    type="text"
                    className="main_form w-100"
                    defaultValue={data?.branch?.name}
                    disabled
                  />
                </div>
              ) : (
                <div className="col-md-6 form_sub_stream ">
                  <label htmlFor="inputState" className="profile_label3">
                    Branch
                  </label>
                  <select
                    name="branch"
                    id="inputState"
                    className="main_form w-100"
                    required
                  >
                    <option value={user?.branch?._id}>
                      {user?.branch?.name}
                    </option>
                  </select>
                </div>
              )}
              {/* floor, gender */}
              <div className="col-md-3 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Floor Number
                </label>
                <input
                  type="text"
                  className="main_form w-100"
                  name="floor"
                  placeholder="Name"
                  required
                  defaultValue={data?.floor}
                />
              </div>

              <div className="col-md-3 form_sub_stream mb-5">
                <label htmlFor="inputState" className="profile_label3">
                  Gender Type
                </label>
                <select
                  name="type"
                  className="main_form w-100"
                  defaultValue={"female"}
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              {/* sort details */}
              <h2 className="profile_label3 profile_bg">Sort Details</h2>
              <div className="col-md-6 form_sub_stream ">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Room Title
                </label>
                <input
                  type="text"
                  className="main_form w-100"
                  name="name"
                  placeholder=" Room Title"
                  required
                  defaultValue={data?.name}
                />
              </div>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Room Area
                </label>
                <input
                  type="text"
                  className="main_form w-100"
                  name="area"
                  placeholder="Please Type in Sqft"
                  required
                  defaultValue={data?.area}
                />
              </div>

              <div className="col-md-6 form_sub_stream">
                <label htmlFor="inputState" className="profile_label3">
                  Total Bedroom
                </label>
                <input
                  type="number"
                  className="main_form w-100"
                  name="bedroom"
                  placeholder="Total Bed Room"
                  required
                  defaultValue={data?.bathroom}
                />
              </div>

              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Total Bathroom
                </label>

                <input
                  type="number"
                  className="main_form w-100"
                  name="bathroom"
                  placeholder="bathroom"
                  required
                  defaultValue={data?.bathroom}
                />
              </div>

              {/* key details */}
              <h2 className="profile_label3 profile_bg mt-5">Key Details</h2>
              <div className="col-md-12 form_sub_stream">
                <div className="row p-4">
                  <div className="col-md-4 form_sub_stream mt-3">
                    <label htmlFor="inputState" className="profile_label3">
                      Balcony
                    </label>
                    <select
                      name="balcony"
                      id="furnitured"
                      className="main_form w-100"
                      required
                    >
                      <option value="yes" selected={data?.balcony === "yes"}>
                        Yes
                      </option>
                      <option value="no" selected={data?.balcony === "no"}>
                        No
                      </option>
                    </select>
                  </div>
                  <div className="col-md-4 form_sub_stream mt-3">
                    <label
                      htmlFor="inputState"
                      className="form-label profile_label3 "
                    >
                      Bed Type
                    </label>

                    <select
                      name="bedType"
                      id="inputState"
                      className="main_form w-100"
                      required
                    >
                      <option
                        value="Single Bed"
                        selected={data?.bedType === "Single Bed"}
                      >
                        Single Bed
                      </option>
                      <option
                        value="Queen Bed"
                        selected={data?.bedType === "Queen Bed"}
                      >
                        Queen Size Bed
                      </option>
                      <option
                        value="King Size Bed"
                        selected={data?.bedType === "King Size Bed"}
                      >
                        King Size Bed
                      </option>
                      <option
                        value="Semi-Double Bed"
                        selected={data?.bedType === "Bunk Bed"}
                      >
                        Semi-Double Bed
                      </option>
                    </select>
                  </div>
                  <div className="col-md-4 form_sub_stream mt-3">
                    <label htmlFor="inputState" className="profile_label3">
                      Recommended
                    </label>
                    <select
                      name="recommended"
                      id="inputState"
                      className="main_form w-100"
                      required
                    >
                      <option
                        value="yes"
                        selected={data?.recommended === "yes"}
                      >
                        Yes
                      </option>
                      <option value="no" selected={data?.recommended === "no"}>
                        No
                      </option>
                    </select>
                  </div>
                  <div className="col-md-4 form_sub_stream">
                    <label htmlFor="inputState" className="profile_label3">
                      Furnitured
                    </label>
                    <select
                      name="furnitured"
                      id="furnitured"
                      className="main_form w-100"
                      required
                    >
                      <option value="yes" selected={data?.furnitured === "yes"}>
                        Yes
                      </option>
                      <option value="no" selected={data?.furnitured === "no"}>
                        No
                      </option>
                    </select>
                  </div>
                  <div className="col-md-4 form_sub_stream">
                    <label htmlFor="inputState" className="profile_label3">
                      CCTV
                    </label>
                    <select
                      name="CCTV"
                      id="inputState"
                      className="main_form w-100"
                      required
                    >
                      <option value="yes" selected={data?.CCTV === "yes"}>
                        Yes
                      </option>
                      <option value="no" selected={data?.CCTV === "yes"}>
                        No
                      </option>
                    </select>
                  </div>
                  <div className="col-md-4 form_sub_stream">
                    <label htmlFor="inputState" className="profile_label3">
                      WiFi
                    </label>
                    <select
                      name="WiFi"
                      id="furnitured"
                      className="main_form w-100"
                      required
                    >
                      <option value="yes" selected={data?.WiFi === "yes"}>
                        Yes
                      </option>
                      <option value="no" selected={data?.WiFi === "yes"}>
                        No
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Facility */}
              <div className="row">
                <h2 className="profile_label3 profile_bg mt-4">Facility</h2>
                <div className="p-4">
                  <div className="row">
                    <h2 className="profile_label3 mt-2">Regular</h2>
                    <div>
                      {commonFacilities.map((facility) => (
                        <React.Fragment key={facility._id}>
                          <input
                            type="checkbox"
                            id={facility._id}
                            name="commonfacility[]"
                            value={facility._id}
                            multiple
                            className="me-1"
                            checked={selectedCommonFacilities.includes(
                              facility._id
                            )}
                            onChange={() => handleCheckboxChange(facility._id)}
                          />
                          <label className="ms-2 mt-1" htmlFor={facility._id}>
                            {facility.name ? facility.name : ""}
                          </label>
                          <img
                            src={facility.photos ? facility.photos[0] : ""}
                            alt=""
                            style={{ width: 20 }}
                            className="mx-3"
                          />
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  {/* facilities */}
                  <div className="row">
                    {facilityCategory.map((facility, index) => (
                      <React.Fragment key={index}>
                        <h2 className="profile_label3 mt-2">{facility.name}</h2>

                        <div>
                          {facility.facility.map((pd) => (
                            <React.Fragment key={pd._id}>
                              <input
                                type="checkbox"
                                id={pd._id}
                                name="facility[]"
                                value={pd._id}
                                multiple
                                key={pd._id}
                                className="me-1"
                                checked={selectedAllFacilities.includes(pd._id)}
                                onChange={(e) =>
                                  handleCheckboxChangeForAll(e, pd._id)
                                }
                              />

                              <label className="ms-2 mt-1" htmlFor={pd._id}>
                                {pd.name ? pd.name : ""}
                              </label>
                              <img
                                src={pd.photos ? pd.photos[0] : ""}
                                alt=""
                                style={{ width: 20 }}
                                className="mx-3"
                              />
                            </React.Fragment>
                          ))}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* highlights for Homestay */}

              {data?.category?.name === "Homestay" && (
                <div className="row">
                  <h2 className="profile_label3 profile_bg">
                    Highlights Features
                  </h2>
                  {highlights?.map((highlight, index) => (
                    <div key={index} className="col-md-4 form_sub_stream">
                      <input
                        type="text"
                        className="main_form w-100"
                        value={highlight}
                        onChange={(e) => {
                          const updatedHighlights = [...highlights];
                          updatedHighlights[index] = e.target.value;
                          setHighlights(updatedHighlights);
                        }}
                        placeholder="Write the highlighted feature"
                        required
                      />

                      {highlights.length > 1 && (
                        <button
                          type="button"
                          className=""
                          style={{
                            background: "none",
                            color: "red",
                            marginTop: "-12px",

                            fontWeight: "bold",
                          }}
                          onClick={() => removeHighlight(index)}
                        >
                          [ Remove ]
                        </button>
                      )}
                    </div>
                  ))}

                  <div className="col-md-12 d-flex gap-2 justify-content-end">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={addHighlight}
                    >
                      New highlight
                    </button>
                  </div>
                </div>
              )}

              <h2 className="profile_label3 profile_bg mt-5 mb-4">
                Rent Details
              </h2>
              <div className="col-md-12 form_sub_stream">
                <div className="row p-4">
                  <div className="col-md-3 form_sub_stream">
                    <label
                      htmlFor="inputState"
                      className="form-label profile_label3 "
                    >
                      Per Day
                    </label>

                    <input
                      type="number"
                      className="main_form w-100"
                      name="perDay"
                      placeholder="Per Day"
                      defaultValue={perDay}
                      onChange={(e) => setPerDay(e.target.value)}
                      required
                      onWheel={(e) => e.target.blur()}
                    />
                  </div>
                  {/* Discount For Day */}

                  <div className="col-md-5 form_sub_stream">
                    <label
                      htmlFor="inputState"
                      className="form-label profile_label3 "
                    >
                      After Discount Amount (Day)
                    </label>

                    <input
                      type="number"
                      name="discountAmountForDay"
                      className="main_form w-100"
                      placeholder="After Discount Amount (Day)"
                      defaultValue={dAmountForDay}
                      onChange={(e) => setDAmountForDay(e.target.value)}
                      onWheel={(e) => e.target.blur()}
                    />
                  </div>

                  <div className="col-md-4 form_sub_stream">
                    <label
                      htmlFor="inputState"
                      className="form-label profile_label3 "
                    >
                      Discount For Day
                    </label>

                    <input
                      type="text"
                      className="main_form w-100"
                      // value={
                      //   discountForDay > 0 ? `${discountForDay} %` : ""
                      // }
                      name="percentOfDiscountDay"
                      placeholder=" Discount For Day"
                      // disabled

                      defaultValue={discountForDay}
                    />
                  </div>

                  <div className="col-md-3 form_sub_stream">
                    <label
                      htmlFor="inputState"
                      className="form-label profile_label3 "
                    >
                      Per Month
                    </label>

                    <input
                      type="number"
                      className="main_form w-100"
                      name="perMonth"
                      placeholder="Per Month"
                      onChange={(e) => setPerMonth(e.target.value)}
                      required
                      defaultValue={perMonth}
                      onWheel={(e) => e.target.blur()}
                    />
                  </div>

                  {/* Discount For Months */}

                  <div className="col-md-5 form_sub_stream">
                    <label
                      htmlFor="inputState"
                      className="form-label profile_label3 "
                    >
                      After Discount Amount(Month)
                    </label>

                    <input
                      type="number"
                      name="discountAmountForMonth"
                      className="main_form w-100"
                      onChange={(e) => setDAmountForMonth(e.target.value)}
                      placeholder="After Discount Amount"
                      onWheel={(e) => e.target.blur()}
                      defaultValue={dAmountForMonth}
                    />
                  </div>

                  <div className="col-md-4 form_sub_stream">
                    <label
                      htmlFor="inputState"
                      className="form-label profile_label3 "
                    >
                      Discount For Month
                    </label>

                    <input
                      type="text"
                      className="main_form w-100"
                      name="percentOfDiscountMonth"
                      placeholder=" Discount For Day"
                      // value={
                      //   discountForMonth > 0 ? `${discountForMonth} %` : ""
                      // }
                      defaultValue={discountForMonth}
                      disabled
                    />
                  </div>

                  <div className="col-md-3 form_sub_stream">
                    <label
                      htmlFor="inputState"
                      className="form-label profile_label3 "
                    >
                      Per Year
                    </label>

                    <input
                      type="number"
                      className="main_form w-100"
                      name="perYear"
                      placeholder="Per Year"
                      required
                      defaultValue={perYear}
                      onChange={(e) => setPerYear(e.target.value)}
                      onWheel={(e) => e.target.blur()}
                    />
                  </div>

                  {/* Discount For Year */}

                  <div className="col-md-5 form_sub_stream">
                    <label
                      htmlFor="inputState"
                      className="form-label profile_label3 "
                    >
                      After Discount Amount (Year)
                    </label>

                    <input
                      type="number"
                      name="discountAmountForYear"
                      className="main_form w-100"
                      placeholder="After Discount Amount"
                      onChange={(e) => setDAmountForYear(e.target.value)}
                      onWheel={(e) => e.target.blur()}
                      defaultValue={dAmountForYear}
                    />
                  </div>

                  <div className="col-md-4 form_sub_stream">
                    <label
                      htmlFor="inputState"
                      className="form-label profile_label3 "
                    >
                      Discount For Year
                    </label>

                    <input
                      type="text"
                      className="main_form w-100"
                      name="percentOfDiscountYear"
                      placeholder=" Discount For Year"
                      // value={
                      //   discountForYear > 0 ? `${discountForYear} %` : ""
                      // }
                      disabled
                      defaultValue={discountForYear}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-12 form_sub_stream ">
                <label htmlFor="inputState" className="profile_label3">
                  Room Number
                </label>
                <input
                  type="text"
                  className="main_form w-100"
                  name="roomNumber"
                  placeholder="Room Number"
                  defaultValue={data?.roomNumber}
                />
              </div>

              <h2 className="profile_label3 profile_bg mt-5 mb-4">
                Room Rules
              </h2>
              <div className="col-md-12 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Room Rules
                </label>
                <textarea
                  className="form-control"
                  name="rules"
                  rows="6"
                  defaultValue={data?.rules}
                ></textarea>
              </div>
              {/* room photos */}
              <div className="col-md-12 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Image
                </label>
                <input
                  type="file"
                  id="file"
                  className="main_form w-100 p-0"
                  name="photos"
                  onChange={(e) => setFiles(e.target.files)}
                  multiple
                  //   required
                />
              </div>
              <div className="col-md-12 form_sub_stream d-flex flex-wrap ">
                {roomPhotos?.map((photo, ind) => (
                  <div
                    key={ind}
                    className="col-md-2 form_sub_stream "
                    style={{ position: "relative", marginTop: "10px" }}
                  >
                    <img src={photo} atr="" height="124px" width="124px" />
                    <button
                      type="button"
                      style={{
                        height: "24px",
                        width: "24px",
                        borderRadius: "12px",
                        background: "white",
                        color: "black",
                        boxShadow: "1px 1px 1px 1px gray",
                        position: "absolute",
                        right: "2px",
                        top: "-12px",
                      }}
                      onClick={() => {
                        const updatedPhotos = roomPhotos.filter(
                          (_, index) => index !== ind
                        );
                        setRoomPhotos(updatedPhotos);
                      }}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex justify-content-start my-3">
              <button
                type="submit"
                className="profile_btn"
                style={{ width: 175 }}
              >
                Update Property
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer className="toast-position" position="top-center" />
    </div>
  );
};

export default EditPrivateProperty;
