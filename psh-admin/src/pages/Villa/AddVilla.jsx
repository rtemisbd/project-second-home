import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { baseUrl } from "../../utils/getBaseURL";
import { multipleImageUpload } from "../../utils/multipleImageUpload";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const AddVilla = () => {
  const MySwal = withReactContent(Swal);
  const [allResorts, setAllResorts] = useState([]);
  const [selectedResort, setSelectedResort] = useState(null);
  const [allTypes, setAllTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [location, setLocation] = useState(null);

  const [newFeatures, setNewFeatures] = useState([
    { id: Date.now(), name: "" },
  ]);

  // images
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const formRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);

    // Generate image previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };

  // remove images
  const handleRemoveImage = (index) => {
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    setNewFeatures([...newFeatures, { id: Date.now(), name: "" }]);
  };

  const removeFeature = (id) => {
    setNewFeatures(newFeatures.filter((feature) => feature.id !== id));
  };

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

  const handleResortChange = (event) => {
    setSelectedResort(event.target.value);
  };
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const villaData = {
      resortId: selectedResort,
      location,
      title: formData.get("villaTitle"),
      type: selectedType,
      villaNumber: formData.get("villaNumber"),
      area: formData.get("area"),
      totalFloor: formData.get("totalFloor"),
      totalRoom: formData.get("totalRoom"),
      totalBalcony: formData.get("balcony"),
      totalBathroom: formData.get("bathroom"),
      occupancy: {
        adults: formData.get("adult"),
        kids: formData.get("kids"),
        policy: formData.get("occupancyPolicy"),
      },
      features: newFeatures.map((feature) => feature.name),
      pricing: {
        perNight: formData.get("perNight"),
        vat: formData.get("vat"),
      },
      policies: {
        terms: formData.get("terms"),
        cancellationPolicy: formData.get("cancellationPolicy"),
      },
    };
    const video = formData.get("video");
    toast("Uploading...", "success");
    const photos = await multipleImageUpload(selectedFiles);
    villaData.media = {
      photos,
      video,
    };

    try {
      const response = await axios.post(`${baseUrl}/api/villa`, villaData);
      MySwal.fire("Villa added successfully!");
      event.target.reset();
      setSelectedResort(null);
      setLocation(null);
      setSelectedType(null);
      setNewFeatures([{ id: Date.now(), name: "" }]);
      setSelectedFiles([]);
      setImagePreviews([]);
    } catch (error) {
      toast.error("Error adding villa. Try again!");
      console.error(error);
    }
  };

  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <div className="customize registration_div card py-5">
          <form onSubmit={handleSubmit}>
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
                  name="villaTitle"
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
                  className="main_form w-100 h-100"
                  name="occupancyPolicy"
                  rows="5"
                  cols="50"
                  placeholder=" Write occupancy policy in detail"
                  required
                />
              </div>
            </div>

            <div className="row p-3">
              <h2 className="profile_label3 profile_bg mt-3">
                Additional Features
              </h2>
              <div className="p-3">
                <div className="row">
                  {newFeatures.map((feature, index) => (
                    <div key={feature.id} className="col-md-4 form_sub_stream">
                      <label className="form-label profile_label3">
                        New Feature Title
                      </label>
                      <input
                        type="text"
                        className="main_form w-100"
                        value={feature.name}
                        onChange={(e) => {
                          const updatedFeature = [...newFeatures];
                          updatedFeature[index].name = e.target.value;
                          setNewFeatures(updatedFeature);
                        }}
                        placeholder="Feature Title"
                        required
                      />

                      <div className="col-md-12 d-flex justify-content-end ">
                        {newFeatures.length > 1 && (
                          <button
                            type="button"
                            className=""
                            style={{
                              background: "none",
                              color: "red",
                              marginTop: "-12px",

                              fontWeight: "bold",
                            }}
                            onClick={() => removeFeature(feature.id)}
                          >
                            [ Remove ]
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="col-md-12 d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={addFeature}
                    >
                      Add New Feature
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row p-3">
              <h2 className="profile_label3 profile_bg mt-3">Rent Details</h2>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Per Night(BDT)
                </label>
                <input
                  type="text"
                  className="main_form w-100"
                  name="perNight"
                  placeholder="Per Night BDT Cost"
                  required
                />
              </div>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Vat (% BDT){" "}
                  <span
                    style={{
                      color: "gray",
                      fontSize: "12px",
                      fontWeight: "400",
                    }}
                  >
                    [excluded]
                  </span>
                </label>
                <input
                  type="text"
                  className="main_form w-100"
                  name="vat"
                  placeholder="Total Vat (%)"
                  required
                />
              </div>
            </div>
            <div className="row p-3">
              <h2 className="profile_label3 profile_bg mt-3">Villa Gallery</h2>
              <div className="max-w-lg mx-auto mb-4">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Photos
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  accept="image/*"
                  name="photo"
                  className="main_form w-100"
                  required
                />
                <div className="d-flex flex-wrap my-6">
                  {imagePreviews.map((preview, index) => (
                    <div key={index}>
                      <div className="d-flex position-relative my-4">
                        <img
                          src={preview}
                          alt={`Preview ${index}`}
                          className="img-preview"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="remove-btn"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-12 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Overview Video (Youtube Video Link){" "}
                  <span
                    style={{
                      color: "gray",
                      fontSize: "12px",
                      fontWeight: "400",
                    }}
                  >
                    [optional]
                  </span>
                </label>

                <input
                  type="text"
                  className="main_form w-100"
                  name="video"
                  placeholder="Youtube Video Link"
                  required
                />
              </div>
            </div>
            <div className="row p-3">
              <h2 className="profile_label3 profile_bg ">
                Rules and Regulations
              </h2>
              <div className="col-md-12 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Terms & Conditions
                </label>
                <textarea
                  className="main_form w-100 h-100"
                  name="terms"
                  rows="5"
                  cols="50"
                  placeholder=" Write occupancy policy in detail"
                  required
                />
              </div>
              <div className="col-md-12 form_sub_stream  mt-5">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Cancellation Policy
                </label>
                <textarea
                  className="main_form w-100 h-100"
                  name="cancellationPolicy"
                  rows="5"
                  cols="50"
                  placeholder=" Write occupancy policy in detail"
                  required
                />
              </div>
            </div>
            <div className="d-flex justify-content-center my-5">
              <button
                type="submit"
                className="profile_btn"
                style={{ width: 175 }}
              >
                Add Villa
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer className="toast-position" position="top-center" />
    </div>
  );
};

export default AddVilla;
