/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AuthContext } from "../contexts/UserProvider";
import { useContext } from "react";

import { ToastContainer, toast } from "react-toastify";
import { multipleImageUpload } from "../utils/multipleImageUpload";
import { baseUrl } from "../utils/getBaseURL";

const Add_property = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState("");
  const MySwal = withReactContent(Swal);
  const [categories, setCategories] = useState([]);
  const [branch, setBranch] = useState([]);

  const [facilities, setFacilities] = useState([]);
  const [commonFacilities, setCommonaFacilities] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [seatOptions, setSeatOptions] = useState([]);

  const [perDay, setPerDay] = useState(0);
  const [discountForDay, setDiscountForDay] = useState(null);
  const [dAmountForDay, setDAmountForDay] = useState(0);

  const [perMonth, setPerMonth] = useState(0);
  const [discountForMonth, setDiscountForMonth] = useState(0);
  const [dAmountForMonth, setDAmountForMonth] = useState(0);

  const [perYear, setPerYear] = useState(0);
  const [discountForYear, setDiscountForYear] = useState(0);
  const [dAmountForYear, setDAmountForYear] = useState(0);

  // Handle Discount For Room
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

  // Update seatOptions whenever categoryName changes
  useEffect(() => {
    if (categoryName === "Shared Room") {
      setSeatOptions([
        {
          name: "",
          description: "",
          seatNumber: "",
          seatType: "",
          perDay: "",

          perMonth: "",
          perYear: "",
          dAmountForDay: "",
          dAmountForMonth: "",
          dAmountForYear: "",

          photos: [],
        },
      ]);
    } else {
      setSeatOptions([]);
    }
  }, [categoryName]);

  const formRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/category`);
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    const selectedCategory = categories.find(
      (category) => category._id === selectedCategoryId
    );
    setCategoryName(selectedCategory?.name || "");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/branch`);
        setBranch(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/facilityCategory`);
        setFacilities(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/commonfacility`);
        setCommonaFacilities(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleAddSeatOption = () => {
    setSeatOptions([
      ...seatOptions,
      {
        name: "",
        description: "",
        seatNumber: "",
        seatType: "",
        perDay: "",
        perMonth: "",
        perYear: "",
        dAmountForDay: "",
        dAmountForMonth: "",
        dAmountForYear: "",
        photos: [],
      },
    ]);
  };
  const handleSeatPhotosChange = (e, index) => {
    const updatedOptions = [...seatOptions];
    updatedOptions[index].photos = e.target.files;
    setSeatOptions(updatedOptions);
  };

  const handleRemoveSeatOption = (index) => {
    if (seatOptions.length === 1) {
      MySwal.fire("You must need to select one seat.", "warning");
      return;
    }
    const updatedOptions = seatOptions.slice(0, -1);
    setSeatOptions(updatedOptions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const perDay = event.target?.perDay?.value;
    const perMonth = event.target?.perMonth?.value;
    const perYear = event.target?.perYear?.value;
    //  Checking Ren Details
    if (categoryName === "Shared Room") {
      const checkSeatPrice = seatOptions.some(
        (option) =>
          Number(option.dAmountForDay) > Number(option.perDay) ||
          Number(option.dAmountForMonth) > Number(option.perMonth) ||
          Number(option.dAmountForYear) > Number(option.perYear)
      );

      if (checkSeatPrice) {
        toast.warn("Please Check Rent Details");
        return;
      }
    } else {
      if (
        Number(perDay) < Number(dAmountForDay) ||
        Number(perMonth) < Number(dAmountForMonth) ||
        Number(perYear) < Number(dAmountForYear)
      ) {
        toast.warn("Please Check Rent Details");
        return;
      }
    }

    const formData = new FormData(event.target);

    const selectedFacilities = formData.getAll("facility[]");
    const selectedCommonFacilities = formData.getAll("commonfacility[]");
    const selectedSeatOptions = seatOptions?.filter(
      (option) =>
        option.name &&
        option.description &&
        option.seatNumber &&
        option.seatType &&
        option.perDay &&
        option.perMonth &&
        option.perYear &&
        option.photos &&
        option.dAmountForDay &&
        option.dAmountForMonth &&
        option.dAmountForYear
    );

    const data2 = {
      name: formData.get("name"),
      type: formData.get("type"),
      city: formData.get("city"),
      floor: formData.get("floor"),
      roomNumber: formData.get("roomNumber"),
      builtYear: formData.get("builtYear"),
      area: formData.get("area"),
      totalRoom: formData.get("totalRoom"),
      totalPerson: formData.get("totalPerson"),
      available: formData.get("available"), // Corrected typo
      rating: formData.get("rating"),
      desc: formData.get("desc"),
      fulldesc: formData.get("fulldesc"),
      bedroom: formData.get("bedroom"),
      bathroom: formData.get("bathroom"),
      car: formData.get("car"),
      bike: formData.get("bike"),
      pet: formData.get("pet"),
      perDay: formData.get("perDay"),
      perMonth: formData.get("perMonth"),
      perYear: formData.get("perYear"),
      dAmountForDay: dAmountForDay,
      dAmountForMonth: dAmountForMonth,
      dAmountForYear: dAmountForYear,
      percentOfDiscountDay: discountForDay,
      percentOfDiscountMonth: discountForMonth,
      percentOfDiscountYear: discountForYear,

      categoryId: formData.get("category"),
      branchId: formData.get("branch"),
      recommended: formData.get("recommended"),
      bedType: formData.get("bedType"),
      furnitured: formData.get("furnitured"),
      CCTV: formData.get("CCTV"),
      WiFi: formData.get("WiFi"),
      balcony: formData.get("balcony"),
      meal: formData.get("meal"),
      rules: formData.get("rules"),
      //apartment
      roomCategory: formData.get("roomCategory"),
      additionalFacility: formData.get("additionalFacility"),
      apartmentRent: formData.get("apartmentRent"),
      serviceCharge: formData.get("service"),
      security: formData.get("security"),
      faltPolicy: formData.get("faltPolicy"),
      occupanct: formData.get("occupanct"),
      facility: selectedFacilities,
      commonfacility: selectedCommonFacilities,
      seats: selectedSeatOptions,
    };

    try {
      setIsLoading(true);
      const list = await multipleImageUpload(files);

      const seatPhotoList = await Promise.all(
        seatOptions.map(async (option) => {
          const photos = option.photos;
          const photoUrls = await multipleImageUpload(photos);
          return photoUrls;
        })
      );

      const property = {
        ...data2,
        photos: list,
        seats: seatOptions?.map((option, index) => ({
          ...option,
          photos: seatPhotoList[index],
        })),
      };

      if (property?.photos?.length < 5) {
        return MySwal.fire("Sorry ! Minimum 5 Photo Required.", "warning");
      }

      await axios.post(`${baseUrl}/api/property`, property);
      await MySwal.fire("Your Property!", "successfully added", "success");
      setDiscountForDay(0);
      setDiscountForMonth(0);
      setDiscountForYear(0);
      setDAmountForDay(0);
      setDAmountForMonth(0);
      setDAmountForYear(0);
      event.target.reset();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);

      MySwal.fire("Something Error Found.", "warning");
    }
  };
  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <div className="customize registration_div card">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 form_sub_stream ">
                <label htmlFor="inputState" className="profile_label3">
                  Property Type
                </label>
                <select
                  name="category"
                  id="inputState"
                  className="main_form w-100"
                  onChange={handleCategoryChange}
                >
                  <option>Select Type</option>
                  {categories.map((pd, index) => (
                    <option key={index} value={pd._id}>
                      {pd.name}
                    </option>
                  ))}
                </select>
              </div>
              {(user && user.role === "SuperAdmin") || user.role === "admin" ? (
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
                    <option value="">Select Type</option>
                    {branch.map((category, index) => (
                      <option key={index} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
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
                />
              </div>
              {categoryName !== "Private Room" &&
                categoryName !== "Shared Room" && (
                  <div className="col-md-3 form_sub_stream">
                    <label
                      htmlFor="inputState"
                      className="form-label profile_label3 "
                    >
                      Total Room
                    </label>
                    <input
                      type="text"
                      className="main_form w-100"
                      name="totalRoom"
                      placeholder="  Total Room"
                      // required
                    />
                  </div>
                )}
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
                  placeholder="Room Title"
                  required
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
                />
              </div>
              {categoryName === "Shared Room" ? (
                ""
              ) : (
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
                  />
                </div>
              )}

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
                />
              </div>
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
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
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
                      <option value="Bunk Bed">Bunk Bed</option>
                      <option value="Single Bed">Single Bed</option>
                      <option value="Queen Bed">Queen Size Bed</option>
                      <option value="King Size Bed">King Size Bed</option>
                      <option value="Semi-Double Bed">Semi-Double Bed</option>
                      <option value="Bunk Bed & Single Bed">
                        Bunk Bed & Single Bed
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
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
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
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
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
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
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
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <h2 className="profile_label3 profile_bg mt-4">Facility</h2>
                <div className="p-4">
                  <div className="row">
                    <h2 className="profile_label3  mt-4">Regular</h2>
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

                  {categoryName === "Private Room" ||
                  categoryName === "Shared Room" ? (
                    <>
                      <div className="row">
                        {facilities.map((facility, index) => (
                          <React.Fragment key={index}>
                            {facility.name === "Common" ? ( // Add this condition to check the facility name
                              <>
                                <h2 className="profile_label3">
                                  {facility.name}
                                </h2>

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
                                      />

                                      <label
                                        className="ms-2 mt-1"
                                        htmlFor={pd._id}
                                      >
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
                              </>
                            ) : null}
                          </React.Fragment>
                        ))}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  <div className="row mt-2">
                    {facilities.map((facility, index) => (
                      <React.Fragment key={index}>
                        {facility.name !== "Common" ? ( // Add this condition to check the facility name
                          <>
                            <h2 className="profile_label3">{facility.name}</h2>

                            <div>
                              {facility.facility.map((pd) => (
                                <React.Fragment key={pd._id}>
                                  <input
                                    type="checkbox"
                                    id={pd._id}
                                    name="facility[]"
                                    value={pd._id}
                                    multiple
                                    className="me-1"
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
                          </>
                        ) : null}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {categoryName !== "Shared Room" && (
                <>
                  <h2 className="profile_label3 profile_bg mt-5 mb-4">
                    Rent Details
                  </h2>
                  <div className="col-md-12 form_sub_stream">
                    <div className="row p-4">
                      <div className="col-md-4 form_sub_stream">
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
                          onChange={(e) => setPerDay(e.target.value)}
                          required
                          onWheel={(e) => e.target.blur()}
                        />
                      </div>
                      {/* Discount For Day */}

                      <div className="col-md-4 form_sub_stream">
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
                          value={
                            discountForDay > 0 ? `${discountForDay} %` : ""
                          }
                          name="percentOfDiscountDay"
                          placeholder=" Discount For Day"
                          disabled
                        />
                      </div>

                      <div className="col-md-4 form_sub_stream">
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
                          onWheel={(e) => e.target.blur()}
                        />
                      </div>

                      {/* Discount For Months */}

                      <div className="col-md-4 form_sub_stream">
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
                          value={
                            discountForMonth > 0 ? `${discountForMonth} %` : ""
                          }
                          disabled
                        />
                      </div>

                      <div className="col-md-4 form_sub_stream">
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
                          onChange={(e) => setPerYear(e.target.value)}
                          onWheel={(e) => e.target.blur()}
                        />
                      </div>

                      {/* Discount For Year */}

                      <div className="col-md-4 form_sub_stream">
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
                          value={
                            discountForYear > 0 ? `${discountForYear} %` : ""
                          }
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              {(categoryName === "Private Room" ||
                categoryName === "Shared Room") && (
                <>
                  <div className="col-md-12 form_sub_stream mb-5">
                    <label htmlFor="inputState" className="profile_label3">
                      Room Number
                    </label>
                    <input
                      type="text"
                      className="main_form w-100"
                      name="roomNumber"
                      placeholder="Room Number"
                    />
                  </div>
                </>
              )}

              {categoryName === "Shared Room" && (
                <>
                  <h2 className="profile_label3 profile_bg">Seat Details</h2>
                  <div className="row card_div p-4">
                    {seatOptions.map((option, index) => (
                      <React.Fragment key={index}>
                        <h2 className="profile_label3 profile_bg">
                          Seat No: {index + 1}
                        </h2>
                        <div className="col-md-6 form_sub_stream">
                          <label className="profile_label3">Seat Title</label>
                          <input
                            type="text"
                            className="main_form w-100"
                            value={option.name}
                            onChange={(e) => {
                              const updatedOptions = [...seatOptions];
                              updatedOptions[index].name = e.target.value;
                              setSeatOptions(updatedOptions);
                            }}
                            placeholder="Seat Title"
                            required
                          />
                        </div>

                        <div className="col-md-3 form_sub_stream">
                          <label className="profile_label3">Seat Number</label>
                          <input
                            type="text"
                            className="main_form w-100"
                            value={option.seatNumber}
                            onChange={(e) => {
                              const updatedOptions = [...seatOptions];
                              updatedOptions[index].seatNumber = e.target.value;
                              setSeatOptions(updatedOptions);
                            }}
                            placeholder="Seat Number"
                            required
                          />
                        </div>
                        <div className="col-md-3 form_sub_stream">
                          <label className="profile_label3">Seat Type</label>

                          <select
                            name="WiFi"
                            id="furnitured"
                            className="main_form w-100"
                            required
                            value={option.seatType}
                            onChange={(e) => {
                              const updatedOptions = [...seatOptions];
                              updatedOptions[index].seatType = e.target.value;
                              setSeatOptions(updatedOptions);
                            }}
                          >
                            <option value="Upper Bed">Upper Bed</option>
                            <option value="Lower Bed">Lower Bed</option>
                            <option value="Single Bed">Single Bed</option>
                          </select>
                        </div>

                        <div className="col-md-6 form_sub_stream">
                          <label className="profile_label3">Per Day</label>
                          <input
                            type="number"
                            className="main_form w-100"
                            value={option.perDay}
                            onChange={(e) => {
                              const updatedOptions = [...seatOptions];
                              updatedOptions[index].perDay = e.target.value;
                              setSeatOptions(updatedOptions);
                            }}
                            placeholder="Per Day Price"
                            required
                            onWheel={(e) => e.target.blur()}
                          />
                        </div>

                        <div className="col-md-6 form_sub_stream">
                          <label className="profile_label3">
                            After Discount Amount(Day)
                          </label>
                          <input
                            type="number"
                            className="main_form w-100"
                            value={option.dAmountForDay}
                            onChange={(e) => {
                              const updatedOptions = [...seatOptions];
                              updatedOptions[index].dAmountForDay =
                                e.target.value;
                              setSeatOptions(updatedOptions);
                            }}
                            placeholder=" After Discount Amount(Day)"
                            required
                            onWheel={(e) => e.target.blur()}
                          />
                        </div>

                        <div className="col-md-6 form_sub_stream">
                          <label className="profile_label3">Per Month</label>
                          <input
                            type="number"
                            className="main_form w-100"
                            value={option.perMonth}
                            onChange={(e) => {
                              const updatedOptions = [...seatOptions];
                              updatedOptions[index].perMonth = e.target.value;
                              setSeatOptions(updatedOptions);
                            }}
                            placeholder="Per Month Price"
                            required
                            onWheel={(e) => e.target.blur()}
                          />
                        </div>

                        <div className="col-md-6 form_sub_stream">
                          <label className="profile_label3">
                            After Discount Amount(Month)
                          </label>
                          <input
                            type="number"
                            className="main_form w-100"
                            value={option.dAmountForMonth}
                            onChange={(e) => {
                              const updatedOptions = [...seatOptions];
                              updatedOptions[index].dAmountForMonth =
                                e.target.value;
                              setSeatOptions(updatedOptions);
                            }}
                            onWheel={(e) => e.target.blur()}
                            placeholder="After Discount Amount(Month)"
                            required
                          />
                        </div>
                        <div className="col-md-6 form_sub_stream">
                          <label className="profile_label3">Per Year</label>
                          <input
                            type="number"
                            className="main_form w-100"
                            value={option.perYear}
                            onChange={(e) => {
                              const updatedOptions = [...seatOptions];
                              updatedOptions[index].perYear = e.target.value;
                              setSeatOptions(updatedOptions);
                            }}
                            placeholder="Per Year Price"
                            required
                            onWheel={(e) => e.target.blur()}
                          />
                        </div>
                        <div className="col-md-6 form_sub_stream">
                          <label className="profile_label3">
                            After Discount Amount(Year)
                          </label>
                          <input
                            type="number"
                            className="main_form w-100"
                            value={option.dAmountForYear}
                            onChange={(e) => {
                              const updatedOptions = [...seatOptions];
                              updatedOptions[index].dAmountForYear =
                                e.target.value;
                              setSeatOptions(updatedOptions);
                            }}
                            placeholder="After Discount Amount(Year)"
                            required
                            onWheel={(e) => e.target.blur()}
                          />
                        </div>
                        <div className="col-md-12 form_sub_stream" key={index}>
                          <label
                            htmlFor={`seatPhotos-${index}`}
                            className="form-label profile_label3"
                          >
                            Seat Photos
                          </label>
                          <input
                            type="file"
                            id={`seatPhotos-${index}`}
                            className="main_form w-100 p-0"
                            name={`seatPhotos-${index}`}
                            onChange={(e) => handleSeatPhotosChange(e, index)}
                            multiple
                            required
                          />
                        </div>
                      </React.Fragment>
                    ))}
                    <div
                      className="col-md-6 form_sub_stream d-flex gap-2"
                      style={{ marginTop: 10 }}
                    >
                      <p
                        onClick={handleAddSeatOption}
                        style={{
                          backgroundColor: "#006666",
                          color: "white",
                          padding: "10px 20px",
                          borderRadius: "5px",
                          fontSize: "1rem",
                          cursor: "pointer",
                        }}
                      >
                        Add New Seat
                      </p>

                      <p
                        onClick={() => handleRemoveSeatOption()}
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          padding: "10px 20px",
                          borderRadius: "5px",
                          fontSize: "1rem",
                          cursor: "pointer",
                        }}
                      >
                        Remove Seat
                      </p>
                    </div>
                  </div>
                </>
              )}

              {categoryName === "Apartment" && (
                <>
                  <h2 className="profile_label3 profile_bg mt-5 mb-4">
                    Rent Policy
                  </h2>
                  <div className="col-md-12 form_sub_stream">
                    <div className="row p-4">
                      <div className="col-md-4 form_sub_stream">
                        <label
                          htmlFor="inputState"
                          className="form-label profile_label3 "
                        >
                          Rent Per Month
                        </label>

                        <input
                          type="text"
                          className="main_form w-100"
                          name="apartmentRent"
                          placeholder="Rent Per Month"
                          required
                        />
                      </div>
                      <div className="col-md-4 form_sub_stream">
                        <label
                          htmlFor="inputState"
                          className="form-label profile_label3 "
                        >
                          Service Charge
                        </label>

                        <input
                          type="text"
                          className="main_form w-100"
                          name="serviceCharge"
                          placeholder="Service Charge"
                        />
                      </div>
                      <div className="col-md-4 form_sub_stream">
                        <label
                          htmlFor="inputState"
                          className="form-label profile_label3 "
                        >
                          Security Deposit
                        </label>

                        <input
                          type="text"
                          className="main_form w-100"
                          name="security"
                          defaultValue="2 month’s rent"
                        />
                      </div>
                      <div className="col-md-4 form_sub_stream">
                        <label
                          htmlFor="inputState"
                          className="form-label profile_label3 "
                        >
                          Flat Release Policy
                        </label>

                        <input
                          type="text"
                          className="main_form w-100"
                          name="faltPolicy"
                          defaultValue="2 months earlier notice required"
                        />
                      </div>
                    </div>
                  </div>
                  <h2 className="profile_label3 profile_bg">Details</h2>
                  <div className="row p-4">
                    <div className="row">
                      <div className="col-md-6 form_sub_stream">
                        <label
                          htmlFor="inputState"
                          className="form-label profile_label3 "
                        >
                          Build Year
                        </label>
                        <input
                          type="text"
                          className="main_form w-100"
                          name="builtYear"
                          placeholder=" Build Year"
                        />
                      </div>
                    </div>
                    <div className="col-md-12 form_sub_stream">
                      <label
                        htmlFor="inputState"
                        className="form-label profile_label3 "
                      >
                        Room Category
                      </label>
                      <textarea
                        className="form-control"
                        name="roomCategory"
                        rows="2"
                        defaultValue={`Example : 3 Large Bed rooms with 3 Balcony, Spacious Drawing Room, Dining & Family Living Room, Highly Decorated Kitchen with a Store Room and Servant room with Attached Toilet.`}
                      ></textarea>
                    </div>

                    <div className="col-md-12 form_sub_stream">
                      <label
                        htmlFor="inputState"
                        className="form-label profile_label3 "
                      >
                        Additional Facilities
                      </label>
                      <textarea
                        className="form-control"
                        name="additionalFacility"
                        rows="6"
                        defaultValue={`Example :  
                      1. Electricity with full time Generator Service.
                      2. Available 24/7 Gas. 
                      3. Car Parking with 1 Driver’s Accommodation.
                      4. Roof TOp Beautified Garden and Grassy Ground.
                      5. Full Building Covered by CCTV.`}
                      ></textarea>
                    </div>
                  </div>
                </>
              )}

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
                  defaultValue={`Example :  
                      1. Keep your living space, common areas, and bathrooms clean and organized..
                      2. Engage in hostel activities, meetings, and events. Active participation can enhance your social experience and create a sense of community. 
                    `}
                ></textarea>
              </div>

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
                  required
                />
              </div>
            </div>

            <div className="d-flex justify-content-center my-5">
              <button
                type="submit"
                className="profile_btn"
                style={{ width: 175 }}
                onSubmit={handleSubmit}
              >
                Add Property
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer className="toast-position" position="top-center" />
    </div>
  );
};

export default Add_property;
