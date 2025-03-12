import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { baseUrl } from "../../utils/getBaseURL";

const AddVilla = () => {
  const [allResorts, setAllResorts] = useState([]);
  const [selectedResort, setSelectedResort] = useState(null);
  const [allTypes, setAllTypes] = useState([]);
  const [selcetedType, setSelectedType] = useState(null);
  const [location, setLocation] = useState(null);

  const [facilities, setFacilities] = useState([]);
  const [commonFacilities, setCommonaFacilities] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/resort`);
        setAllResorts(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const resort = allResorts.find((res) => res._id === selectedResort);
    setLocation(resort?.district);
    setAllTypes(resort?.villaTypes);
  }, [selectedResort, allResorts]);

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

  const handleResortChange = (event) => {
    setSelectedResort(event.target.value);
  };
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <div className="customize registration_div card">
          <form>
            <div className="row p-3">
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Resort
                </label>
                <select
                  className="main_form w-100"
                  name="resort"
                  required
                  onChange={handleResortChange}
                >
                  <option selected disabled>
                    {" "}
                    Choose your resort
                  </option>
                  {allResorts?.map((data, index) => (
                    <option key={index} value={data?._id}>
                      {data?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Location
                </label>
                <input
                  type="text"
                  className="main_form w-100"
                  name="name"
                  placeholder="Enter Villa Location"
                  required
                  disabled
                  value={location}
                />
              </div>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Villa Title
                </label>
                <input
                  type="text"
                  className="main_form w-100"
                  name="name"
                  placeholder="Enter Villa Title"
                  required
                />
              </div>

              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Villa Type
                </label>
                <select
                  className="main_form w-100"
                  name="type"
                  required
                  onChange={handleTypeChange}
                >
                  <option selected disabled>
                    {" "}
                    Select your villa type
                  </option>
                  {allTypes?.map((data, index) => (
                    <option key={index} value={data?.name}>
                      {data?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Villa Number
                </label>
                <input
                  type="text"
                  className="main_form w-100"
                  name="villaNumber"
                  placeholder="Villa Number"
                  required
                />
              </div>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Villa Area
                </label>
                <input
                  type="text"
                  className="main_form w-100"
                  name="area"
                  placeholder="Please Type in Sqft"
                  required
                />
              </div>
            </div>
            <div className="row p-3">
              <h2 className="profile_label3 profile_bg mt-3">Short Details</h2>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Total Floor
                </label>
                <input
                  type="number"
                  className="main_form w-100"
                  name="totalFloor"
                  placeholder="Total floor of the villa"
                  required
                />
              </div>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Total Room
                </label>
                <input
                  type="number"
                  className="main_form w-100"
                  name="totalRoom"
                  placeholder="Total Room"
                  required
                />
              </div>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Total Balcony
                </label>

                <input
                  type="number"
                  className="main_form w-100"
                  name="balcony"
                  placeholder="Balcony"
                  required
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
                  placeholder="Bathroom"
                  required
                />
              </div>
            </div>
            <div className="row p-3">
              <h2 className="profile_label3 profile_bg mt-3">Occupancy</h2>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Adult Occupancy
                </label>
                <input
                  type="number"
                  className="main_form w-100"
                  name="adult"
                  placeholder="Adult Occupancy"
                  required
                />
              </div>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Kid Occupancy
                </label>
                <input
                  type="number"
                  className="main_form w-100"
                  name="kids"
                  placeholder="Kids Occupancy"
                  required
                />
              </div>
              <div className="col-md-12 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Occupancy Policy
                </label>
                <textarea
                  className="main_form w-100"
                  name="occupancyPolicy"
                  rows="4"
                  cols="50"
                  placeholder=" Write occupancy policy in detail"
                  required
                />
              </div>
            </div>

            <div className="row p-3">
              <h2 className="profile_label3 profile_bg mt-3">Facility</h2>
              <div className="p-3">
                <div className="row">
                  <h2 className="profile_label3">Regular</h2>
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

                <div className="row mt-2">
                  {facilities.map((facility, index) => (
                    <React.Fragment key={index}>
                      {facility.name !== "Common" ? ( // Add this condition to check the facility name
                        <>
                          <h2 className="profile_label3 mt-2">
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
          </form>
        </div>
      </div>
      <ToastContainer className="toast-position" position="top-center" />
    </div>
  );
};

export default AddVilla;
