import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../contexts/UserProvider";
import { useParams } from "react-router-dom";
import UseFetch from "../../hooks/useFetch";
import { baseUrl } from "../../utils/getBaseURL";
import { toast, ToastContainer } from "react-toastify";
import { multipleImageUpload } from "../../utils/multipleImageUpload";
import axios from "axios";
const EditSeat = () => {
  const { user } = useContext(AuthContext);

  const { id } = useParams();

  const { data3: facilityCategory } = UseFetch("facilityCategory");
  const { data3: commonFacilities } = UseFetch("commonfacility");
  const [data, setData] = useState(null);
  const [seat, setSeat] = useState(null);
  const [roomPhotos, setRoomPhotos] = useState([[]]);
  const [seatPhotos, setSeatPhotos] = useState([[]]);

  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState("");
  const [seatFiles, setSeatFiles] = useState("");
  const [newSeatFiles, setNewSeatFiles] = useState("");

  const [selectedCommonFacilities, setSelectedCommonFacilities] = useState([]);
  const [selectedAllFacilities, setSelectedAllFacilities] = useState([]);

  const [addNewSeat, setAddNewSeat] = useState(0);

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

  // read and set data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/seats/${id}`);
        const { data } = await response.json();
        setSeat(data.seat);
        setSeatPhotos(data?.seat?.photos);

        if (data?.seat) {
          try {
            const responseForRoom = await fetch(
              `${baseUrl}/api/property/${data?.seat?.roomId}`
            );
            const { property } = await responseForRoom.json();
            setData(property);
            setRoomPhotos(property?.photos);
            setSelectedCommonFacilities(property?.commonfacility);
            setSelectedAllFacilities(
              (property?.facility || []).map((item) => item._id || item) // Normalize to only _id
            );
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);
  console.log({ data, seat });

  console.log(addNewSeat);

  const handleUploadSeat = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    //  Checking Rent Details
    const perDay = formData.get("newSeatPerDay");
    const dAmountForDay = formData.get("newSeatDAmountForDay");
    const perMonth = formData.get("newSeatPerMonth");
    const dAmountForMonth = formData.get("newSeatDAmountForMonth");
    const perYear = formData.get("newSeatPerYear");
    const dAmountForYear = formData.get("newSeatDAmountForYear");

    if (
      Number(perDay) < Number(dAmountForDay) ||
      Number(perMonth) < Number(dAmountForMonth) ||
      Number(perYear) < Number(dAmountForYear)
    ) {
      toast.warn("Please Check Rent Details");
      return;
    }

    const seatData = {
      name: formData.get("newSeatName"),
      seatNumber: formData.get("newSeatNumber"),
      seatType: formData.get("newSeatBedType"),
      perDay,
      perMonth,
      perYear,
      dAmountForDay,
      dAmountForMonth,
      dAmountForYear,
      roomId: data?._id,
    };
    try {
      setIsLoading(true);
      const list = await multipleImageUpload(newSeatFiles);

      const newSeat = {
        ...seatData,
        photos: [...list],
      };

      toast("Uploading...", "success");

      const response = await axios.post(`${baseUrl}/api/seats/`, newSeat);
      console.log({ response });

      setNewSeatFiles("");
      // e.target.reset();
    } catch (err) {
      setIsLoading(false);
      console.log(err);

      toast("Something Error Found.", "warning");
    }
  };

  // submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    //  Checking Rent Details
    const perDay = formData.get("perDay");
    const dAmountForDay = formData.get("dAmountForDay");
    const perMonth = formData.get("perMonth");
    const dAmountForMonth = formData.get("dAmountForMonth");
    const perYear = formData.get("perYear");
    const dAmountForYear = formData.get("dAmountForYear");

    if (
      Number(perDay) < Number(dAmountForDay) ||
      Number(perMonth) < Number(dAmountForMonth) ||
      Number(perYear) < Number(dAmountForYear)
    ) {
      toast.warn("Please Check Rent Details");
      return;
    }

    const updatedSeat = {
      name: formData.get("seatName"),
      seatNumber: formData.get("seatNumber"),
      seatType: formData.get("seatBedType"),
      perDay,
      perMonth,
      perYear,
      dAmountForDay,
      dAmountForMonth,
      dAmountForYear,
      // photos,
    };

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

      roomNumber: formData.get("roomNumber"),

      rules: formData.get("rules"),
    };

    try {
      setIsLoading(true);
      const list = await multipleImageUpload(files);
      const seatList = await multipleImageUpload(seatFiles);

      const property = {
        ...data2,
        photos: [...roomPhotos, ...list],
      };
      const newSeat = {
        ...updatedSeat,
        photos: [...seatPhotos, ...seatList],
      };

      if (property?.photos?.length < 5) {
        return toast("Sorry ! Minimum 5 Photo Required.", "warning");
      }

      toast("Uploading...", "success");
      // update seat
      const { data: updateResponse } = await axios.patch(
        `${baseUrl}/api/seats/${id}`,
        newSeat
      );
      // if (updateResponse?.data?.modifiedCount > 0) {
      //   const response = await fetch(`${baseUrl}/api/seats/${id}`);
      //   const { data } = await response.json();
      //   setSeat(data.seat);
      // }

      const { data } = await axios.patch(
        `${baseUrl}/api/property/${seat?.roomId}`,
        property
      );

      if (data?.data?.modifiedCount > 0) {
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
              {(user && user.role === "SuperAdmin") || user.role === "admin" ? (
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
              {/* floor, room, gender */}
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
                        value="Bunk Bed"
                        selected={data?.bedType === "Bunk Bed"}
                      >
                        Bunk Bed
                      </option>
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
                      <option
                        value="Bunk Bed & Single Bed"
                        selected={data?.bedType === "Bunk Bed & Single Bed"}
                      >
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

              <div className="col-md-12 form_sub_stream mb-5">
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

              <h2 className="profile_label3 profile_bg">Seat Details</h2>
              <div className="row card_div p-4">
                <React.Fragment>
                  <div className="col-md-6 form_sub_stream">
                    <label className="profile_label3">Seat Title</label>
                    <input
                      type="text"
                      className="main_form w-100"
                      placeholder="Seat Title"
                      defaultValue={seat?.name}
                      required
                      name="seatName"
                    />
                  </div>

                  <div className="col-md-3 form_sub_stream">
                    <label className="profile_label3">Seat Number</label>
                    <input
                      type="text"
                      className="main_form w-100"
                      placeholder="Seat Number"
                      defaultValue={seat?.seatNumber}
                      required
                      name="seatNumber"
                    />
                  </div>
                  <div className="col-md-3 form_sub_stream">
                    <label className="profile_label3">Seat Type</label>

                    <select
                      className="main_form w-100"
                      required
                      name="seatType"
                    >
                      <option
                        value="Upper Bed"
                        selected={seat?.seatType === "Upper Bed"}
                      >
                        Upper Bed
                      </option>
                      <option
                        value="Lower Bed"
                        selected={seat?.seatType === "Lower Bed"}
                      >
                        Lower Bed
                      </option>
                      <option
                        value="Single Bed"
                        selected={seat?.seatType === "Single Bed"}
                      >
                        Single Bed
                      </option>
                    </select>
                  </div>

                  <div className="col-md-6 form_sub_stream">
                    <label className="profile_label3">Per Day</label>
                    <input
                      type="number"
                      className="main_form w-100"
                      placeholder="Per Day Price"
                      required
                      defaultValue={seat?.perDay}
                      name="perDay"
                    />
                  </div>

                  <div className="col-md-6 form_sub_stream">
                    <label className="profile_label3">
                      After Discount Amount(Day)
                    </label>
                    <input
                      type="number"
                      className="main_form w-100"
                      placeholder=" After Discount Amount(Day)"
                      required
                      defaultValue={seat?.dAmountForDay}
                      name="dAmountForDay"
                    />
                  </div>

                  <div className="col-md-6 form_sub_stream">
                    <label className="profile_label3">Per Month</label>
                    <input
                      type="number"
                      className="main_form w-100"
                      placeholder="Per Month Price"
                      required
                      defaultValue={seat?.perMonth}
                      name="perMonth"
                    />
                  </div>

                  <div className="col-md-6 form_sub_stream">
                    <label className="profile_label3">
                      After Discount Amount(Month)
                    </label>
                    <input
                      type="number"
                      className="main_form w-100"
                      placeholder="After Discount Amount(Month)"
                      required
                      defaultValue={seat?.dAmountForMonth}
                      name="dAmountForMonth"
                    />
                  </div>

                  <div className="col-md-6 form_sub_stream">
                    <label className="profile_label3">Per Year</label>
                    <input
                      type="number"
                      className="main_form w-100"
                      placeholder="Per Year Price"
                      required
                      defaultValue={seat?.perYear}
                      name="perYear"
                    />
                  </div>

                  <div className="col-md-6 form_sub_stream">
                    <label className="profile_label3">
                      After Discount Amount (Year)
                    </label>
                    <input
                      type="number"
                      className="main_form w-100"
                      placeholder="After Discount Amount(Year)"
                      required
                      defaultValue={seat?.perYear}
                      name="perYear"
                    />
                  </div>
                  {/* seat photos */}
                  <div className="col-md-12 form_sub_stream">
                    <label className="form-label profile_label3">
                      Seat Photos
                    </label>
                    <input
                      type="file"
                      className="main_form w-100 p-0"
                      onChange={(e) => setSeatFiles(e.target.files)}
                      multiple
                    />
                  </div>
                  <div className="col-md-12 form_sub_stream d-flex">
                    {seatPhotos?.map((photo, ind) => (
                      <div
                        className="col-md-2 form_sub_stream "
                        style={{ position: "relative", marginTop: "10px" }}
                      >
                        <img src={photo} atr="" height="124px" width="124px" />
                        <button
                          style={{
                            height: "24px",
                            width: "24px",
                            borderRadius: "12px",
                            background: "white",
                            color: "black",
                            boxShadow: "1px 1px 1px 1px gray",
                            position: "absolute",
                            right: "4px",
                            top: "-12px",
                          }}
                          onClick={() => {
                            const updatedPhotos = seatPhotos.filter(
                              (_, index) => index !== ind
                            );
                            setSeatPhotos(updatedPhotos);
                          }}
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                </React.Fragment>

                {Array.from({ length: addNewSeat }).map((_, i) => (
                  <>
                    <h2 className="profile_label3 profile_bg">New Seat </h2>

                    <div className="row">
                      <div className="col-md-6 form_sub_stream">
                        <label className="profile_label3">Seat Title</label>
                        <input
                          type="text"
                          className="main_form w-100"
                          placeholder="Seat Title"
                          required
                          name="newSeatName"
                        />
                      </div>

                      <div className="col-md-3 form_sub_stream">
                        <label className="profile_label3">Seat Number</label>
                        <input
                          type="text"
                          className="main_form w-100"
                          placeholder="Seat Number"
                          required
                          name="newSeatNumber"
                        />
                      </div>

                      <div className="col-md-3 form_sub_stream">
                        <label className="profile_label3">Seat Type</label>
                        <select
                          className="main_form w-100"
                          required
                          name="newSeatBedType"
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
                          placeholder="Per Day Price"
                          required
                          name="newSeatPerDay"
                        />
                      </div>

                      <div className="col-md-6 form_sub_stream">
                        <label className="profile_label3">
                          After Discount Amount (Day)
                        </label>
                        <input
                          type="number"
                          className="main_form w-100"
                          placeholder="After Discount Amount (Day)"
                          required
                          name="newSeatDAmountForDay"
                        />
                      </div>

                      <div className="col-md-6 form_sub_stream">
                        <label className="profile_label3">Per Month</label>
                        <input
                          type="number"
                          className="main_form w-100"
                          placeholder="Per Month Price"
                          required
                          name="newSeatPerMonth"
                        />
                      </div>

                      <div className="col-md-6 form_sub_stream">
                        <label className="profile_label3">
                          After Discount Amount (Month)
                        </label>
                        <input
                          type="number"
                          className="main_form w-100"
                          placeholder="After Discount Amount (Month)"
                          required
                          name="newSeatDAmountForMonth"
                        />
                      </div>

                      <div className="col-md-6 form_sub_stream">
                        <label className="profile_label3">Per Year</label>
                        <input
                          type="number"
                          className="main_form w-100"
                          placeholder="Per Year Price"
                          required
                          name="newSeatPerYear"
                        />
                      </div>

                      <div className="col-md-6 form_sub_stream">
                        <label className="profile_label3">
                          After Discount Amount (Year)
                        </label>
                        <input
                          type="number"
                          className="main_form w-100"
                          placeholder="After Discount Amount (Year)"
                          required
                          name="newSeatDAmountForYear"
                        />
                      </div>

                      {/* Seat Photos */}
                      <div className="col-md-12 form_sub_stream">
                        <label className="form-label profile_label3">
                          Seat Photos
                        </label>
                        <input
                          type="file"
                          className="main_form w-100 p-0"
                          onChange={(e) =>
                            setNewSeatFiles((prev) => ({
                              ...prev,
                              [i]: e.target.files,
                            }))
                          }
                          multiple
                          name={`seatPhotos-${i}`}
                        />
                      </div>
                      <div className="d-flex justify-content-start my-3">
                        <button
                          type="submit"
                          className="profile_btn"
                          style={{ width: 175 }}
                          onSubmit={handleUploadSeat}
                        >
                          Upload Seat
                        </button>
                      </div>
                    </div>
                  </>
                ))}

                <div
                  className="col-md-12 form_sub_stream d-flex gap-2 justify-content-end"
                  style={{ marginTop: 10 }}
                >
                  <p
                    // onClick={handleAddSeatOption}
                    style={{
                      backgroundColor: "#006666",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      fontSize: "1rem",
                      cursor: "pointer",
                    }}
                    onClick={() => setAddNewSeat((prev) => prev + 1)}
                  >
                    Add New Seat
                  </p>

                  {addNewSeat > 0 && (
                    <p
                      // onClick={() => handleRemoveSeatOption()}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        fontSize: "1rem",
                        cursor: "pointer",
                      }}
                      onClick={() => setAddNewSeat((prev) => prev - 1)}
                    >
                      Remove Seat
                    </p>
                  )}
                </div>
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

            <div className="d-flex justify-content-start my-5">
              <button
                type="submit"
                className="profile_btn"
                style={{ width: 175 }}
                onSubmit={handleSubmit}
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

export default EditSeat;
