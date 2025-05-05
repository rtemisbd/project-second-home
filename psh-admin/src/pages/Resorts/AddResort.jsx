import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./style/imageUploader.css";
import { multipleImageUpload } from "../../utils/multipleImageUpload";
import { baseUrl } from "../../utils/getBaseURL";
import { toast, ToastContainer } from "react-toastify";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { allDivision, districtsOf } from "@bangladeshi/bangladesh-address";
import TextEditor from "../../components/TextEditor/TextEditor";

const AddResort = () => {
  const MySwal = withReactContent(Swal);
  const [files, setFiles] = useState("");
  const [facilities, setFacilities] = useState([{ id: Date.now(), title: "" }]);
  const [villaTypes, setVillaTypes] = useState([{ id: Date.now(), name: "" }]);
  const [phoneNumber, setPhoneNumber] = useState([
    { id: Date.now(), number: "" },
  ]);
  const [bankDetails, setBankDetails] = useState([
    {
      id: Date.now(),
      bankName: "",
      accountHolder: "",
      accountNumber: "",
      accountType: "",
      branchName: "",
      routingNumber: "",
    },
  ]);

  const [bookingPolicy, setBookingPolicy] = useState("");
  const [cancellationPolicy, setCancellationPolicy] = useState("");

  // location
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
    setFacilities([...facilities, { id: Date.now(), title: "" }]);
  };

  // Function to remove a facility by ID
  const removeFacility = (id) => {
    setFacilities(facilities.filter((facility) => facility.id !== id));
  };

  // villa types
  const addVillaType = () => {
    setVillaTypes([...villaTypes, { id: Date.now(), name: "" }]);
  };
  const addPhoneNumber = () => {
    setPhoneNumber([...phoneNumber, { id: Date.now(), number: "" }]);
  };
  const addBankAccount = () => {
    setBankDetails([
      ...bankDetails,
      {
        id: Date.now(),
        bankName: "",
        accountHolder: "",
        accountNumber: "",
        accountType: "",
        branchName: "",
        routingNumber: "",
      },
    ]);
  };

  const removeVillaType = (id) => {
    setVillaTypes(villaTypes.filter((villa) => villa.id !== id));
  };
  const removePhoneNumber = (id) => {
    setPhoneNumber(phoneNumber.filter((phone) => phone.id !== id));
  };
  const removeBankDetail = (id) => {
    setBankDetails(bankDetails.filter((bank) => bank.id !== id));
  };

  const handleResortSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    toast("Uploading...", "success");

    // Build the main data object
    const data = {
      name: formData.get("name"),
      address: formData.get("resortAddress"),
      division: selectedDivision,
      district: selectedDistrict,
      locationLink: formData.get("locationLink"),
      resortEmail: formData.get("resortEmail"),
      contactNumbers: phoneNumber.map((phone) => ({
        number: phone.number,
      })),
      mobileBanking: {
        resortBkashNumber: formData.get("resortBkashNumber"),
        bkashAccountType: formData.get("bkashAccountType"),
        bkashAccountHolder: formData.get("bkashAccountHolder"),
        resortNagadNumber: formData.get("resortNagadNumber"),
        nagadAccountType: formData.get("nagadAccountType"),
        nagadAccountHolder: formData.get("nagadAccountHolder"),
      },
      video: formData.get("video"),
      welcomeNote: formData.get("welcomeNote"),
      villaTypes: villaTypes.map((villa) => ({
        name: villa.name.trim(),
      })),
      facilities: facilities.map((facility) => ({
        title: facility.title.trim(),
      })),
      bankDetails: bankDetails.map((bank) => ({
        bankName: bank.bankName.trim(),
        accountNumber: bank.accountNumber.trim(),
        accountHolder: bank.accountHolder.trim(),
        accountType: bank.accountType.trim(),
        branchName: bank.branchName.trim(),
        routingNumber: bank.routingNumber.trim(),
      })),
      policies: {
        bookingPolicy,
        cancellationPolicy,
      },
    };

    try {
      // Upload images
      const photoUrls = await multipleImageUpload(selectedFiles);
      data.photos = photoUrls;
      toast("Saving resort details...", "success");

      // Send data to the backend
      const response = await axios.post(`${baseUrl}/api/resort`, data);

      MySwal.fire(
        "Uploaded",
        "Resort details submitted successfully!",
        "success"
      );

      // Reset form and states
      event.target.reset();
      setPhoneNumber([{ id: Date.now(), number: "" }]);
      setVillaTypes([{ id: Date.now(), name: "" }]);
      setFacilities([{ id: Date.now(), title: "" }]);
      setBankDetails([
        {
          id: Date.now(),
          bankName: "",
          accountNumber: "",
          accountHolder: "",
          accountType: "",
          branchName: "",
          routingNumber: "",
        },
      ]);
      setSelectedFiles([]);
      setImagePreviews([]);
      setSelectedDistrict(null);
      setSelectedDivision(null);
      setBookingPolicy("");
      setCancellationPolicy("");
    } catch (error) {
      console.error("Submission error:", error);
      toast("Something went wrong! Please try again.", "error");
    }
  };

  useEffect(() => {
    if (!selectedDivision) return;
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

              {phoneNumber.map((phone, index) => (
                <div key={phone.id} className="col-md-6 form_sub_stream ">
                  <label className="form-label profile_label3">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    className="main_form w-100"
                    value={phone.number}
                    onChange={(e) => {
                      const updatedPhones = [...phoneNumber];
                      updatedPhones[index].number = e.target.value;
                      setPhoneNumber(updatedPhones);
                    }}
                    placeholder="Contact Number"
                    required
                  />

                  <div className="col-md-12 d-flex justify-content-end ">
                    {phoneNumber.length > 1 && (
                      <button
                        type="button"
                        className=""
                        style={{
                          background: "none",
                          color: "red",
                          marginTop: "-12px",

                          fontWeight: "bold",
                        }}
                        onClick={() => removePhoneNumber(phone.id)}
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
                  onClick={addPhoneNumber}
                >
                  Additional Contact
                </button>
              </div>

              <h2 className="profile_label3 profile_bg my-4">
                Online Payment{" "}
              </h2>

              <div className="col-md-4 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  bKash Number
                </label>

                <input
                  type="text"
                  className="main_form w-100"
                  name="resortBkashNumber"
                  placeholder="Resort bKash Number"
                />
              </div>
              <div className="col-md-4 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  bKash Account Type
                </label>
                <select className="main_form w-100" name="bkashAccountType">
                  <option value="merchant" selected>
                    Merchant Account
                  </option>
                  <option value="personal">Personal Account</option>
                </select>
              </div>
              <div className="col-md-4 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  bKash Account Holder Name
                </label>

                <input
                  type="text"
                  className="main_form w-100"
                  name="bkashAccountHolder"
                  placeholder=" bKash Account Holder Name"
                />
              </div>
              <div className="col-md-4 form_sub_stream">
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
              <div className="col-md-4 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Nagad Account Type
                </label>
                <select className="main_form w-100" name="nagadAccountType">
                  <option value="merchant" selected>
                    Merchant Account
                  </option>
                  <option value="personal">Personal Account</option>
                </select>
              </div>
              <div className="col-md-4 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Nagad Account Holder Name
                </label>

                <input
                  type="text"
                  className="main_form w-100"
                  name="nagadAccountHolder"
                  placeholder=" Nagad Account Holder Name"
                />
              </div>

              {/* bank */}
              <h2 className="profile_label3 profile_bg my-4">Bank Details</h2>
              {bankDetails?.map((bank, ind) => (
                <div key={ind} className="row">
                  <div className="col-md-4 form_sub_stream mb-4">
                    <label className="form-label profile_label3">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      className="main_form w-100"
                      value={bank.bankName}
                      onChange={(e) => {
                        const updatedBanks = [...bankDetails];
                        updatedBanks[ind].bankName = e.target.value;
                        setBankDetails(updatedBanks);
                      }}
                      placeholder="Bank Name"
                      required
                    />
                  </div>

                  <div className="col-md-4 form_sub_stream mb-4">
                    <label className="form-label profile_label3">
                      Account Number
                    </label>
                    <input
                      type="text"
                      className="main_form w-100"
                      value={bank.accountNumber}
                      onChange={(e) => {
                        const updatedBanks = [...bankDetails];
                        updatedBanks[ind].accountNumber = e.target.value;
                        setBankDetails(updatedBanks);
                      }}
                      placeholder="Account Number"
                      required
                    />
                  </div>

                  <div className="col-md-4 form_sub_stream mb-4">
                    <label className="form-label profile_label3">
                      Account Holder Name
                    </label>
                    <input
                      type="text"
                      className="main_form w-100"
                      value={bank.accountHolder}
                      onChange={(e) => {
                        const updatedBanks = [...bankDetails];
                        updatedBanks[ind].accountHolder = e.target.value;
                        setBankDetails(updatedBanks);
                      }}
                      placeholder="Account Holder Name"
                      required
                    />
                  </div>
                  <div className="col-md-4 form_sub_stream mb-4">
                    <label className="form-label profile_label3">
                      Account Type
                    </label>
                    <input
                      type="text"
                      className="main_form w-100"
                      value={bank.accountType}
                      onChange={(e) => {
                        const updatedBanks = [...bankDetails];
                        updatedBanks[ind].accountType = e.target.value;
                        setBankDetails(updatedBanks);
                      }}
                      placeholder="Account Type"
                      required
                    />
                  </div>
                  <div className="col-md-4 form_sub_stream mb-4">
                    <label className="form-label profile_label3">
                      Branch Name
                    </label>
                    <input
                      type="text"
                      className="main_form w-100"
                      value={bank.branchName}
                      onChange={(e) => {
                        const updatedBanks = [...bankDetails];
                        updatedBanks[ind].branchName = e.target.value;
                        setBankDetails(updatedBanks);
                      }}
                      placeholder="Branch Name"
                      required
                    />
                  </div>
                  <div className="col-md-4 form_sub_stream mb-4">
                    <label className="form-label profile_label3">
                      Routing Number
                    </label>
                    <input
                      type="text"
                      className="main_form w-100"
                      value={bank.routingNumber}
                      onChange={(e) => {
                        const updatedBanks = [...bankDetails];
                        updatedBanks[ind].routingNumber = e.target.value;
                        setBankDetails(updatedBanks);
                      }}
                      placeholder="Routing Number"
                      required
                    />
                  </div>

                  <div className="col-md-12 d-flex justify-content-end">
                    {bankDetails.length > 1 && (
                      <button
                        type="button"
                        style={{
                          background: "none",
                          color: "red",
                          fontWeight: "bold",
                        }}
                        onClick={() => removeBankDetail(bank.id)}
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
                  onClick={addBankAccount}
                >
                  Add New Bank Account
                </button>
              </div>

              <h2 className="profile_label3 profile_bg my-4">Welcome Note</h2>
              <div className="col-md-12 form_sub_stream mb-5">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Short Description or Welcome Note
                </label>
                <textarea
                  className="main_form w-100 h-100"
                  name="welcomeNote"
                  rows="5"
                  cols="50"
                  placeholder=" Write your note in detail"
                  required
                />
              </div>

              <h2 className="profile_label3 profile_bg my-4">
                Our Villa Types
              </h2>
              {villaTypes.map((villa, index) => (
                <div key={villa.id} className="col-md-4 form_sub_stream mb-4">
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
              <h2 className="profile_label3 profile_bg my-4">
                Common Facilities
              </h2>
              {facilities.map((facility, index) => (
                <div key={facility.id} className="col-md-4 form_sub_stream">
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

                  {facilities.length > 1 && (
                    <button
                      type="button"
                      className=""
                      style={{
                        background: "none",
                        color: "red",
                        marginTop: "-12px",

                        fontWeight: "bold",
                      }}
                      onClick={() => removeFacility(facility.id)}
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
                  onClick={addFacility}
                >
                  Add New facility
                </button>
              </div>

              <div className="row p-3">
                <h2 className="profile_label3 profile_bg ">
                  Rules and Regulations
                </h2>

                <div className="col-md-12 form_sub_stream mt-2">
                  <label
                    htmlFor="inputState"
                    className="form-label profile_label3 "
                  >
                    Booking Policy
                  </label>
                </div>

                <div className="col-md-12 form_sub_stream">
                  <TextEditor
                    editorValue={bookingPolicy}
                    setEditorValue={setBookingPolicy}
                  />
                </div>

                <div className="col-md-12 form_sub_stream mt-2">
                  <label
                    htmlFor="inputState"
                    className="form-label profile_label3 "
                  >
                    Cancellation Policy
                  </label>
                </div>

                <div className="col-md-12 form_sub_stream">
                  <TextEditor
                    editorValue={cancellationPolicy}
                    setEditorValue={setCancellationPolicy}
                  />
                </div>
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
