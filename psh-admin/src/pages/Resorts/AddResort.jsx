import { useRef, useState } from "react";

const AddResort = () => {
  const [files, setFiles] = useState("");
  const [services, setServices] = useState([{ id: Date.now(), title: "", img: "" }]);

  const formRef = useRef(null);

  // Function to add a new service
  const addService = () => {
    setServices([...services, { id: Date.now(), title: "", img: "" }]);
  };

  // Function to remove a service by ID
  const removeService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };
 
  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <div className="customize registration_div card">
          <form ref={formRef} >
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
                  cols="50"
                  rows="2"
                  className="main_form w-100 px-2"
                  name="ResortAddress"
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

                <input
                  type="text"
                  className="main_form w-100"
                  name="division"
                  placeholder="Division"
                  required
                />
              </div>
              <div className="col-md-6 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  District
                </label>

                <input
                  type="text"
                  className="main_form w-100"
                  name="district"
                  placeholder="District"
                  required
                />
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
           
              
              {/* gallery and video */}
              <h2 className="profile_label3 profile_bg my-4">Our Gallery</h2>
            
              <div className="col-md-12 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Gallery
                </label>

                <input
                  type="file"
                  className="main_form w-100 p-0"
                  name="img"
                  onChange={(e) => setFiles(e.target.files)}
                  multiple
                  required
                />
              </div>

              <div className="col-md-12 form_sub_stream">
                <label
                  htmlFor="inputState"
                  className="form-label profile_label3 "
                >
                  Overview Video
                </label>

                <input
                  type="file"
                  className="main_form w-100 p-0"
                  name="video"
                  onChange={(e) => setFiles(e.target.filecds)}
              
                />
              </div>
              <h2 className="profile_label3 profile_bg my-4">Our Services</h2>
              {services.map((service, index) => (
                <div key={service.id} className="col-md-12 form_sub_stream border p-3 my-2">
                  <label className="form-label profile_label3">Service Title</label>
                  <input 
                    type="text" 
                    className="main_form w-100" 
                    value={service.title} 
                    onChange={(e) => {
                      const updatedServices = [...services];
                      updatedServices[index].title = e.target.value;
                      setServices(updatedServices);
                    }}
                    placeholder="Service Title" 
                    required
                  />
                  
                  <label className="form-label profile_label3 mt-2">Service Image</label>
                  <input 
                    type="file" 
                    className="main_form w-100 p-0" 
                    onChange={(e) => {
                      const updatedServices = [...services];
                      updatedServices[index].img = e.target.files[0];
                      setServices(updatedServices);
                    }}
                    required 
                  />
                  
                  {services.length > 1 && (
                    <button 
                      type="button" 
                      className="btn btn-danger mt-2" 
                      onClick={() => removeService(service.id)}
                    >
                      Remove Service
                    </button>
                  )}
                </div>
              ))}
              
              <div className="col-md-12 d-flex gap-2 justify-content-end">
                <button 
                  type="button" 
                  className="btn btn-success" 
                  onClick={addService}
                >
                  Add New Service
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
    </div>
  );
};

export default AddResort;
