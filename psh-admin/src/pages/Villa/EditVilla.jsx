import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { baseUrl } from "../../utils/getBaseURL";
import { multipleImageUpload } from "../../utils/multipleImageUpload";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TextEditor from "../../components/TextEditor/TextEditor";
import { useParams } from "react-router-dom";
import ImageManagement from "../../components/PreviewImages/ImageManagement";

const EditVilla = () => {
  const { id } = useParams();
  const MySwal = withReactContent(Swal);

  const [villa, setVilla] = useState(null);
  const [allResorts, setAllResorts] = useState([]);
  const [selectedResort, setSelectedResort] = useState(null);
  const [allTypes, setAllTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [occupancyPolicy, setOccupancyPolicy] = useState("");
  const [houseRules, setHouseRules] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);

  const [commonFeatures, setCommonFeatures] = useState([
    "24/7 Room Services",
    "Welcome Drink On Arrival",
    "Complementary Breakfast",
    "Wireless Internet Service",
    "Ac",
    "Non Ac",
    "Wall-mounted LCD TV",
    "Electronic Safety Deposit Box",
    "Fast Aid Box",
    "Tea/Coffee Making Facility",
    "Fruits Basket In Arrival Day",
    "Study Table",
  ]);

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
        const { data } = await axios.get(`${baseUrl}/api/villa/${id}`);
        setVilla(data.data);
        const extraAddedFeature = data?.data?.features?.filter(
          (feature) => !commonFeatures.includes(feature)
        );
        setCommonFeatures([...commonFeatures, ...extraAddedFeature]);
        setOccupancyPolicy(data?.data?.occupancy?.policy);
        setHouseRules(data?.data?.houseRules);
        setUploadedImages(data?.data?.media?.photos);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id, commonFeatures]);
  console.log({ villa, uploadedImages });

  useEffect(() => {
    const resort = allResorts.find((res) => res._id === selectedResort);
    setAllTypes(resort?.villaTypes);
  }, [selectedResort, allResorts]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const selectedRoomFeatures = formData.getAll("commonfeature[]");
    // const addedFeatures = newFeatures?.map((feature) => feature.name);
    const addedFeatures = newFeatures
      ?.map((feature) => feature.name.trim())
      .filter((name) => name !== "");

    const villaData = {
      resortId: selectedResort,
      title: formData.get("villaTitle"),
      type: selectedType,
      villaNumber: formData.get("villaNumber"),
      view: formData.get("view"),
      area: formData.get("area"),
      totalFloor: formData.get("totalFloor"),
      totalRoom: formData.get("totalRoom"),
      totalBalcony: formData.get("balcony"),
      totalBathroom: formData.get("bathroom"),
      occupancy: {
        adults: formData.get("adult"),
        kids: formData.get("kids"),
        policy: occupancyPolicy,
      },
      features: [...selectedRoomFeatures, ...addedFeatures],
      pricing: {
        perNight: formData.get("perNight"),
        advancePayment: formData.get("advancePayment"),
        adultAddition: formData.get("adultAddition"),
        kidAddition: formData.get("kidAddition"),
        checkIn: formData.get("checkInTime"),
        checkOut: formData.get("checkOutTime"),
      },
      houseRules: houseRules,
    };
    const video = formData.get("video");
    toast("Uploading...", "success");
    const photos = await multipleImageUpload(selectedFiles);
    villaData.media = {
      photos,
      video,
    };

    try {
      const response = await axios.patch(`${baseUrl}/api/villa`, villaData);
      MySwal.fire("Villa updated successfully!");
      event.target.reset();
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
                <input
                  className="main_form w-100"
                  name="resort"
                  required
                  value={villa?.resortId?.name}
                  disabled
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
                  defaultValue={villa?.title}
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
                  {villa?.resortId?.villaTypes?.map((data, index) => (
                    <option
                      key={index}
                      value={data?.name}
                      selected={data?.name === villa.type}
                    >
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
                  defaultValue={villa?.villaNumber}
                  required
                />
              </div>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  View
                </label>
                <input
                  type="text"
                  className="main_form w-100"
                  name="view"
                  placeholder="Enter Villa View"
                  defaultValue={villa?.view}
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
                  Villa Area
                </label>
                <input
                  type="text"
                  className="main_form w-100"
                  name="area"
                  placeholder="Please Type in Sqft"
                  required
                  defaultValue={villa?.area}
                />
              </div>
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
                  defaultValue={villa?.totalFloor}
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
                  defaultValue={villa?.totalRoom}
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
                  defaultValue={villa?.totalBalcony}
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
                  defaultValue={villa?.totalBathroom}
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
                  defaultValue={villa?.occupancy?.adults}
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
                  defaultValue={villa?.occupancy?.kids}
                  required
                />
              </div>

              <div className="col-md-12 form_sub_stream mt-2">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Occupancy Policy
                </label>
              </div>
              <div className="col-md-12 form_sub_stream">
                <TextEditor
                  editorValue={occupancyPolicy}
                  setEditorValue={setOccupancyPolicy}
                />
              </div>
            </div>

            <div className="row p-3">
              <h2 className="profile_label3 profile_bg mt-3">
                Room Amenities & Services
              </h2>
              <div>
                {commonFeatures.map((feature, ind) => (
                  <React.Fragment key={ind}>
                    <input
                      type="checkbox"
                      id={ind}
                      name="commonfeature[]"
                      value={feature}
                      multiple
                      className="me-1"
                      checked={villa?.features?.find(
                        (item) => item === feature
                      )}
                    />
                    <label className="ml-1 mr-3 mt-1" htmlFor={feature}>
                      {feature}
                    </label>
                  </React.Fragment>
                ))}
              </div>
              <div className="p-3">
                <div className="row">
                  {newFeatures.map((feature, index) => (
                    <div key={feature.id} className="col-md-4 form_sub_stream">
                      <input
                        type="text"
                        className="main_form w-100"
                        value={feature.name || ""}
                        onChange={(e) => {
                          const updatedFeature = [...newFeatures];
                          updatedFeature[index].name = e.target.value;
                          setNewFeatures(updatedFeature);
                        }}
                        placeholder="New Amenity or Service"
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
                      Add New
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row p-3">
              <h2 className="profile_label3 profile_bg mt-3">
                Pricing Details
              </h2>
              <div className="col-md-4 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Per Night(BDT)
                </label>
                <input
                  type="number"
                  className="main_form w-100"
                  name="perNight"
                  placeholder="Per Night BDT Cost"
                  defaultValue={villa?.pricing?.perNight}
                  required
                />
              </div>
              <div className="col-md-4 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  After Discount - Per Night(BDT)
                </label>
                <input
                  type="number"
                  className="main_form w-100"
                  name="perNight"
                  placeholder="Per Night BDT Cost"
                  defaultValue={villa?.pricing?.perNight}
                  required
                />
              </div>
              <div className="col-md-4 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Total Discount Count(%)
                </label>
                <input
                  type="number"
                  className="main_form w-100"
                  name="perNight"
                  placeholder="Per Night BDT Cost"
                  defaultValue={villa?.pricing?.perNight}
                  required
                />
              </div>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Advance Payment
                </label>
                <input
                  type="number"
                  className="main_form w-100"
                  name="advancePayment"
                  placeholder=" Minimum Payment"
                  defaultValue={villa?.pricing?.advancePayment}
                  required
                />
              </div>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Extra For Additional Adult (BDT)
                </label>
                <input
                  type="number"
                  className="main_form w-100"
                  name="adultAddition"
                  placeholder=" Extra For Additional Adult "
                  defaultValue={villa?.pricing?.adultAddition}
                  // required
                />
              </div>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Extra For Additional Kid (BDT)
                </label>
                <input
                  type="number"
                  className="main_form w-100"
                  name="kidAddition"
                  placeholder=" Extra For Additional Kid "
                  defaultValue={villa?.pricing?.kidAddition}
                  // required
                />
              </div>
              {/* Check-In Time */}
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="checkInTime"
                  className="form-label profile_label3"
                >
                  Check-In Time (AM/PM)
                </label>
                <input
                  type="time"
                  className="main_form w-100"
                  name="checkInTime"
                  defaultValue={villa?.pricing?.checkIn}
                  required
                />
              </div>

              {/* Check-Out Time */}
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="checkOutTime"
                  className="form-label profile_label3"
                >
                  Check-Out Time (AM/PM)
                </label>
                <input
                  type="time"
                  className="main_form w-100"
                  name="checkOutTime"
                  defaultValue={villa?.pricing?.checkOut}
                  required
                />
              </div>
            </div>

            <div className="row p-3">
              <h2 className="profile_label3 profile_bg mt-3">Villa Gallery</h2>
              <ImageManagement
                label={"Photos"}
                uploadedImages={uploadedImages}
                setUploadedImages={setUploadedImages}
              />

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
                  ></span>
                </label>

                <input
                  type="text"
                  className="main_form w-100"
                  name="video"
                  placeholder="Youtube Video Link"
                  required
                  defaultValue={villa?.media?.video}
                />
              </div>
            </div>

            <div className="row p-3">
              <h2 className="profile_label3 profile_bg mt-3">
                House Rules And Policy
              </h2>

              <div className="col-md-12 form_sub_stream mt-2">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  House Rules And Policy
                </label>
              </div>
              <div className="col-md-12 form_sub_stream">
                <TextEditor
                  editorValue={houseRules}
                  setEditorValue={setHouseRules}
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

export default EditVilla;
