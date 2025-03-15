import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./style/imageUploader.css";
import { multipleImageUpload } from "../../utils/multipleImageUpload";
import { baseUrl } from "../../utils/getBaseURL";
import { toast, ToastContainer } from "react-toastify";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { allDivision, districtsOf } from "@bangladeshi/bangladesh-address";

const AddResort = () => {
  const MySwal = withReactContent(Swal);
  const [files, setFiles] = useState("");
  const [facilities, setFacilities] = useState([
    { id: Date.now(), title: "", img: "" },
  ]);
  const [villaTypes, setVillaTypes] = useState([{ id: Date.now(), name: "" }]);

  // location
  // const [allDivisions, setAllDivisions] = useState([]);
  const allDivisions = allDivision();
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [allDistricts, setAllDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  // images
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

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

  const formRef = useRef(null);

  // Function to add a new facility
  const addFacility = () => {
    setFacilities([...facilities, { id: Date.now(), title: "", img: "" }]);
  };

  // Function to remove a facility by ID
  const removeFacility = (id) => {
    setFacilities(facilities.filter((facility) => facility.id !== id));
  };

  const handleFacilityImageChange = (index, event) => {
    const file = event.target.files[0]; // Single file for each facility

    if (file) {
      const newFacilities = [...facilities];
      newFacilities[index].img = file; // Store file in state
      newFacilities[index].preview = URL.createObjectURL(file); // Create image preview
      setFacilities(newFacilities);
    }
  };

  // villa types
  const addVillaType = () => {
    setVillaTypes([...villaTypes, { id: Date.now(), name: "" }]);
  };

  const removeVillaType = (id) => {
    setVillaTypes(villaTypes.filter((villa) => villa.id !== id));
  };

  const handleRemoveFacilityImage = (index) => {
    const newFacilities = [...facilities];
    newFacilities[index].img = ""; // Clear the image file
    newFacilities[index].preview = ""; // Remove preview URL
    setFacilities(newFacilities);
  };

  const handleResortSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    toast("Uploading...", "success");
    const data = {
      name: formData.get("name"),
      address: formData.get("resortAddress"),
      division: selectedDivision,
      district: selectedDistrict,
      locationLink: formData.get("locationLink"),
      resortMobileNumber: formData.get("resortMobileNumber"),
      resortBkashNumber: formData.get("resortBkashNumber"),
      resortNagadNumber: formData.get("resortNagadNumber"),
      resortDutchNumber: formData.get("resortDutchNumber"),
      resortEmail: formData.get("resortEmail"),
      video: formData.get("video"),
      villaTypes: villaTypes.map((villa) => ({ name: villa.name })),
    };

    // host images
    const photoUrls = await multipleImageUpload(selectedFiles);
    data.photos = photoUrls;
    toast("Wait Please...", "success");
    // host facility images
    const facilityImages = await multipleImageUpload(
      facilities.map((facility) => facility.img)
    );
    data.facilities = facilities.map((facility, index) => ({
      title: facility.title,
      img: facilityImages[index],
    }));

    try {
      const response = await axios.post(`${baseUrl}/api/resort`, data);
      MySwal.fire("Uploaded", "success");
    } catch (error) {
      toast("Something Went Wrong!", "error");
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data } = await axios.get(`https://bdapis.com/api/v1.2/divisions`);
  //     setAllDivisions(data.data);
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    if (!selectedDivision) return;
    // const fetchDistricts = async () => {
    //   const { data } = await axios.get(
    //     `https://bdapis.com/api/v1.2/division/${selectedDivision}`
    //   );
    //   setAllDistricts(data.data);
    // };
    // fetchDistricts();
    const relatedDistricts = districtsOf(selectedDivision);
    setAllDistricts(relatedDistricts);
  }, [selectedDivision]);

  const handleDivisionChange = (event) => {
    setSelectedDivision(event.target.value);
  };
  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <div className="customize registration_div card">
          <form ref={formRef} onSubmit={handleResortSubmit}>
            <div className="row p-3">
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Resort Name
                </label>

                <input
                  type="text"
                  className="main_form w-100"
                  name="name"
                  placeholder="Resort Name"
                  required
                />
              </div>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Address
                </label>

                <textarea
                  type="text"
                  className="main_form w-100"
                  name="resortAddress"
                  placeholder="Details Address"
                  required
                />
              </div>

              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Division
                </label>
                <select
                  className="main_form w-100"
                  name="division"
                  placeholder="Division"
                  required
                  value={selectedDivision || ""}
                  onChange={handleDivisionChange}
                >
                  <option selected disabled value={""}>
                    {" "}
                    Choose your division
                  </option>
                  {allDivisions.map((division) => (
                    <option key={division} value={division}>
                      {division}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  District
                </label>
                <select
                  className="main_form w-100"
                  name="district"
                  placeholder="District"
                  required
                  value={selectedDistrict || ""}
                  onChange={handleDistrictChange}
                >
                  <option selected disabled value="">
                    {" "}
                    Choose your District
                  </option>
                  {allDistricts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Google Location Link
                </label>

                <input
                  type="text"
                  className="main_form w-100"
                  name="locationLink"
                  placeholder="Google Location Link"
                  required
                />
              </div>

              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Phone Number
                </label>

                <input
                  type="text"
                  className="main_form w-100"
                  name="resortMobileNumber"
                  placeholder="Mobile Number"
                  required
                />
              </div>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Bkash Number
                </label>

                <input
                  type="text"
                  className="main_form w-100"
                  name="resortBkashNumber"
                  placeholder="Resort Bkash Number"
                />
              </div>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Nagad Number
                </label>

                <input
                  type="text"
                  className="main_form w-100"
                  name="resortNagadNumber"
                  placeholder="Resort Nagad Number"
                />
              </div>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Dutch-Bangla Number
                </label>

                <input
                  type="text"
                  className="main_form w-100"
                  name="resortDutchNumber"
                  placeholder="Resort Dutch-bangla Number"
                />
              </div>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Email
                </label>

                <input
                  type="text"
                  className="main_form w-100"
                  name="resortEmail"
                  placeholder="Resort Support Email"
                  required
                />
              </div>
              <h2 className="profile_label3 profile_bg my-4">
                Our Villa Types
              </h2>
              {villaTypes.map((villa, index) => (
                <div key={villa.id} className="col-md-4 form_sub_stream">
                  <label className="form-label profile_label3">
                    Villa Type Name
                  </label>
                  <input
                    type="text"
                    className="main_form w-100"
                    value={villa.name}
                    onChange={(e) => {
                      const updatedVillas = [...villaTypes];
                      updatedVillas[index].name = e.target.value;
                      setVillaTypes(updatedVillas);
                    }}
                    placeholder="Villa Type Name"
                    required
                  />

                  <div className="col-md-12 d-flex justify-content-end ">
                    {villaTypes.length > 1 && (
                      <button
                        type="button"
                        className=""
                        style={{
                          background: "none",
                          color: "red",
                          marginTop: "-12px",

                          fontWeight: "bold",
                        }}
                        onClick={() => removeVillaType(villa.id)}
                      >
                        [ Remove ]
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <div className="col-md-12 d-flex justify-content-end ">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={addVillaType}
                >
                  Add New Villa Type
                </button>
              </div>
              {/* gallery and video */}
              <h2 className="profile_label3 profile_bg my-4">Our Gallery</h2>

              {/* upload photos */}
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
              <h2 className="profile_label3 profile_bg my-4">
                Common Facilities
              </h2>
              {facilities.map((facility, index) => (
                <div key={facility.id} className="col-md-12 form_sub_stream">
                  <label className="form-label profile_label3">
                    Facility Title
                  </label>
                  <input
                    type="text"
                    className="main_form w-100"
                    value={facility.title}
                    onChange={(e) => {
                      const updatedFacilities = [...facilities];
                      updatedFacilities[index].title = e.target.value;
                      setFacilities(updatedFacilities);
                    }}
                    placeholder="Facility Title"
                    required
                  />

                  <label className="form-label profile_label3 mt-2">
                    Facility Image
                  </label>
                  <input
                    type="file"
                    className="main_form w-100 p-0"
                    onChange={(e) => handleFacilityImageChange(index, e)}
                    accept="image/*"
                    required
                  />

                  {/* Show Image Preview */}
                  {facility.preview && (
                    <div className="col-md-1 position-relative my-4">
                      <img
                        src={facility.preview}
                        alt={`Facility Preview ${index}`}
                        className="img-preview"
                      />
                      <button
                        onClick={() => handleRemoveFacilityImage(index)}
                        className="remove-btn"
                        style={{ right: -20 }}
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  {facilities.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger mt-2"
                      onClick={() => removeFacility(facility.id)}
                    >
                      Remove Facility
                    </button>
                  )}
                </div>
              ))}

              <div className="col-md-12 d-flex gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={addFacility}
                >
                  Add New facility
                </button>
              </div>
            </div>
            <div className="d-flex justify-content-center my-5">
              <button
                type="submit"
                className="profile_btn"
                style={{ width: 175 }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer className="toast-position" position="top-center" />
    </div>
  );
};

export default AddResort;
