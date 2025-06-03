import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { baseUrl } from "../../../utils/getBaseURL";
import { Link } from "react-router-dom";
import { Table } from "bootstrap-4-react/lib/components";
import img from "../../../img/college/Icon material-delete.png";
import img3 from "../../../img/college/Icon feather-edit.png";
import { BiSolidEdit } from "react-icons/bi";
import { AuthContext } from "../../../contexts/UserProvider";
import toast, { Toaster } from "react-hot-toast";
import { Modal } from "react-bootstrap";

const VillaList = () => {
  const MySwal = withReactContent(Swal);
  const { resort } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [showStatusUpdate, setShowStatusUpdate] = useState(false);
  const [id, setId] = useState(null);
  const [status, setStatus] = useState("Unpublished");

  const handleUpdateStatus = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`${baseUrl}/api/villa/${id}`, {
        isPublished: status,
      });

      toast.success("Updated");

      const { data } = await axios.get(
        `${baseUrl}/api/villa/?resortId=${resort._id}`
      );
      setData(data.data);
    } catch (err) {
      toast.error("Something Error Found.");
      console.log(err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${baseUrl}/api/villa/?resortId=${resort._id}`
        );
        setData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (resort?._id || status) {
      getData();
    }
  }, [resort?._id, status]);

  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <section className="content customize_list">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-7">
                <h6 className="college_h6">Villa List</h6>
              </div>
              <div className="export_btn_main">
                <div>
                  <div className="">
                    <div className="corporate_addNew_btn">
                      <Link to={"/dashboard/resort/add-villa"}>
                        <button className="college_btn2 ms-4 p-3">
                          Add New villa
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr style={{ height: "1px", background: "rgb(191 173 173)" }} />
            <div className="card">
              <div className="card-body card_body_sm">
                <Table bordered>
                  <thead style={{ textAlign: "center" }}>
                    <tr>
                      <th>No</th>
                      <th>Picture</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>View</th>
                      <th>Details</th>
                      <th>Occupancy</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: "center" }}>
                    {data?.map((villa, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td style={{ width: 140, height: 120 }}>
                          <div>
                            <img
                              src={villa?.media?.photos[0]}
                              alt={villa?.title}
                              style={{ width: 140, height: 120 }}
                            />
                          </div>
                        </td>

                        <td>{villa?.title}</td>
                        <td>{villa?.type}</td>
                        <td>{villa?.view}</td>
                        <td>
                          <p>Bedrooms : {villa?.totalRoom}</p>
                          <p>Balcony : {villa?.totalBalcony}</p>
                          <p>Bathroom : {villa?.totalBathroom}</p>
                        </td>
                        <td>
                          <div>
                            <p>Adults : {villa?.occupancy?.adults}</p>
                            <p>Kids : {villa?.occupancy?.kids}</p>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex justify-content-center fw-bold">
                            <div>
                              <p
                                style={{
                                  color:
                                    villa?.isPublished === "Published"
                                      ? "#27b3b1"
                                      : "red",
                                }}
                              >
                                {villa?.isPublished}
                              </p>
                            </div>
                            <button
                              type="button"
                              className="d-flex  bg-white p-0"
                              onClick={() => {
                                setId(villa?._id);

                                setShowStatusUpdate(!showStatusUpdate);
                              }}
                            >
                              <BiSolidEdit
                                style={{ width: "24px", height: "24px" }}
                              />
                            </button>
                          </div>
                        </td>

                        {/* action */}
                        <td>
                          <div className="d-flex justify-content-center">
                            <Link to={`/dashboard/edit/villa/${villa?._id}`}>
                              <img src={img3} alt="" />
                            </Link>
                            <img src={img} alt="" className="ms-3" />
                          </div>
                          <div
                            className="modal fade"
                            id={`loginModal${villa._id}`}
                            tabIndex="{-1}"
                            role="dialog"
                            aria-labelledby="loginModal"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog modal-dialog-centered">
                              <div
                                className="modal-content"
                                style={{ width: 700 }}
                              >
                                <div className="modal-body"></div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>

            {showStatusUpdate && (
              <Modal
                show={() => setShowStatusUpdate(true)}
                onHide={() => setShowStatusUpdate(false)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">
                      Status Update
                    </h1>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div
                    style={{
                      // width: "100%",
                      borderRadius: "3px",
                      backgroundColor: "white",
                    }}
                  >
                    <div>
                      <form onSubmit={handleUpdateStatus}>
                        <div className="row">
                          <div>
                            <div className="">
                              <div className="col-md-12 mb-3">
                                <label htmlFor="inputState" className="">
                                  Status
                                </label>
                                <br />
                                <select
                                  name="status"
                                  id="inputState"
                                  className="main_form"
                                  style={{ width: "450px" }}
                                  onBlur={(e) => setStatus(e.target.value)}
                                  defaultValue={status}
                                >
                                  <option value="Published">Published</option>
                                  <option value="Unpublished">
                                    Unpublished
                                  </option>
                                </select>
                              </div>

                              <div className="d-flex justify-content-end ml-5">
                                <button type="submit" style={{ width: 220 }}>
                                  Update Status
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Toaster
                          containerStyle={{ top: 300 }}
                          toastOptions={{ position: "top-center" }}
                        ></Toaster>
                      </form>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default VillaList;
