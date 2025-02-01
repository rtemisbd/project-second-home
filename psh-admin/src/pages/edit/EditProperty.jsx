import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-bootstrap";
import { AuthContext } from "../../contexts/UserProvider";
import { useParams } from "react-router-dom";
import UseFetch from "../../hooks/useFetch";
import { baseUrl } from "../../utils/getBaseURL";

const EditProperty = () => {
  const { user } = useContext(AuthContext);

  const { category, id } = useParams();

  const [categoryName, setCategoryName] = useState("");

  const { data3: facilityCategory } = UseFetch("facilityCategory");
  const { data3: commonFacilities } = UseFetch("commonfacility");
  const [data, setData] = useState(null);
  const [seat, setSeat] = useState(null);
  const [roomPhotos, setRoomPhotos] = useState([[]]);
  const [seatPhotos, setSeatPhotos] = useState([[]]);

  const [discountForDay, setDiscountForDay] = useState(null);
  const [discountForMonth, setDiscountForMonth] = useState(null);
  const [discountForYear, setDiscountForYear] = useState(null);

  // // Handle Discount For Room
  // useEffect(() => {
  //   // For Day
  //   if (perDay > 0) {
  //     const discountedAmountForDay = Number(perDay - dAmountForDay);
  //     const percentageDiscount =
  //       (discountedAmountForDay / Number(perDay)) * 100;

  //     setDiscountForDay(
  //       percentageDiscount === 100 ? "" : percentageDiscount.toFixed(2)
  //     );
  //   }
  //   // For Month
  //   if (perMonth > 0) {
  //     const discountedAmountForDay = Number(perMonth - dAmountForMonth);
  //     const percentageDiscount =
  //       (discountedAmountForDay / Number(perMonth)) * 100;

  //     setDiscountForMonth(
  //       percentageDiscount === 100 ? "" : percentageDiscount.toFixed(2)
  //     );
  //   }
  //   // For Year
  //   if (perYear > 0) {
  //     const discountedAmountForDay = Number(perYear - dAmountForYear);
  //     const percentageDiscount =
  //       (discountedAmountForDay / Number(perYear)) * 100;

  //     setDiscountForYear(
  //       percentageDiscount === 100 ? "" : percentageDiscount.toFixed(2)
  //     );
  //   }
  // }, [
  //   perDay,
  //   dAmountForDay,
  //   dAmountForMonth,
  //   perMonth,
  //   perYear,
  //   dAmountForYear,
  // ]);

  // read and set data
  useEffect(() => {
    if (category === "Private Room") {
      const fetchData = async () => {
        try {
          const response = await fetch(`${baseUrl}/api/property/${id}`);

          const { property } = await response.json();
          setData(property);
          setRoomPhotos(property?.photos);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
    if (category === "Shared Room") {
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
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [id, category]);
  console.log({ data, seat });

  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <div className="customize registration_div card">
          <form>
            <div className="row">
              {/* property type */}
              <div className="col-md-6 form_sub_stream ">
                <label htmlFor="inputState" className="profile_label3">
                  Property Type
                </label>
                <input
                  type="text"
                  className="main_form w-100"
                  name="categoryName"
                  defaultValue={category}
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
                    name="branch"
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
                      defaultValue={data?.totalRoom}
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
                    defaultValue={data?.bathroom}
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
                            checked={data?.commonfacility?.find(
                              (item) => item === facility._id
                            )}
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

                  {category === "Private Room" || category === "Shared Room" ? (
                    <>
                      <div className="row">
                        {facilityCategory.map((facility, index) => (
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
                                        checked={data?.facility?.find(
                                          (item) => item._id === pd._id
                                        )}
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
                    {facilityCategory.map((facility, index) => (
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
                                    checked={data?.facility?.find(
                                      (item) => item._id === pd._id
                                    )}
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
              {category !== "Shared Room" && (
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
                          defaultValue={data?.perDay}
                          // onChange={(e) => setPerDay(e.target.value)}
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
                          defaultValue={data?.dAmountForDay}
                          // onChange={(e) => setDAmountForDay(e.target.value)}
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
                          // defaultValue={data?.percentOfDiscountDay}
                          defaultValue={data?.percentOfDiscountDay}
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
                          // onChange={(e) => setPerMonth(e.target.value)}
                          required
                          defaultValue={data?.perMonth}
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
                          // onChange={(e) => setDAmountForMonth(e.target.value)}
                          placeholder="After Discount Amount"
                          // onWheel={(e) => e.target.blur()}
                          defaultValue={data?.dAmountForMonth}
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
                          defaultValue={data?.percentOfDiscountMonth}
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
                          defaultValue={data?.perYear}
                          // onChange={(e) => setPerYear(e.target.value)}
                          // onWheel={(e) => e.target.blur()}
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
                          // onChange={(e) => setDAmountForYear(e.target.value)}
                          // onWheel={(e) => e.target.blur()}
                          defaultValue={data?.dAmountForYear}
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
                          defaultValue={data?.percentOfDiscountYear}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {(category === "Private Room" || category === "Shared Room") && (
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
                      defaultValue={data?.roomNumber}
                    />
                  </div>
                </>
              )}

              {category === "Shared Room" && (
                <>
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
                        />
                      </div>
                      <div className="col-md-3 form_sub_stream">
                        <label className="profile_label3">Seat Type</label>

                        <select
                          name="WiFi"
                          id="furnitured"
                          className="main_form w-100"
                          required
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
                        />
                      </div>

                      <div className="col-md-3 form_sub_stream">
                        <label className="profile_label3">
                          After Discount Amount(Year)
                        </label>
                        <input
                          type="number"
                          className="main_form w-100"
                          placeholder="After Discount Amount(Year)"
                          required
                          defaultValue={seat?.dAmountForYear}
                        />
                      </div>
                      {/* seat photos */}
                      <div className="col-md-12 form_sub_stream">
                        <label
                          // htmlFor={`seatPhotos-${index}`}
                          className="form-label profile_label3"
                        >
                          Seat Photos
                        </label>
                        <input
                          type="file"
                          // id={`seatPhotos-${index}`}
                          className="main_form w-100 p-0"
                          // name={`seatPhotos-${index}`}
                          // onChange={(e) => handleSeatPhotosChange(e, index)}
                          multiple
                          required
                        />
                      </div>
                      <div className="col-md-12 form_sub_stream d-flex">
                        {seatPhotos?.map((photo, ind) => (
                          <div
                            className="col-md-2 form_sub_stream "
                            style={{ position: "relative", marginTop: "10px" }}
                          >
                            <img
                              src={photo}
                              atr=""
                              height="124px"
                              width="124px"
                            />
                            <button
                              style={{
                                height: "24px",
                                width: "24px",
                                borderRadius: "12px",
                                background: "white",
                                color: "black",
                                // border: "1px solid black",
                                boxShadow: "1px 1px 1px 1px gray",
                                position: "absolute",
                                right: "4px",
                                top: "-12px",
                              }}
                              onClick={() => {
                                const updatedPhotos = roomPhotos.filter(
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

                    <div
                      className="col-md-6 form_sub_stream d-flex gap-2"
                      style={{ marginTop: 10 }}
                    >
                      <p
                        style={{
                          backgroundColor: "#006666",
                          color: "white",
                          padding: "10px 20px",
                          borderRadius: "5px",
                          fontSize: "1rem",
                          cursor: "pointer",
                        }}
                      >
                        Update Seat
                      </p>
                    </div>
                  </div>
                </>
              )}

              {category === "Apartment" && (
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
                          defaultValue="2 month's rent"
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
                                    3. Car Parking with 1 Driver's Accommodation.
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
                  // onChange={(e) => setFiles(e.target.files)}
                  multiple
                  required
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
                        // border: "1px solid black",
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
                // onSubmit={handleSubmit}
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

export default EditProperty;
