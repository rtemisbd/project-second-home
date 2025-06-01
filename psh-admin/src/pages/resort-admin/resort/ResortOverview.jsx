import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import img from "../../../img/college/Icon material-delete.png";
import img3 from "../../../img/college/Icon feather-edit.png";
import { AuthContext } from "../../../contexts/UserProvider";
import axios from "axios";
import { baseUrl } from "../../../utils/getBaseURL";
import { AiOutlineEye } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
const ResortOverview = () => {
  const { user } = useContext(AuthContext);

  const [resort, setResort] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${baseUrl}/api/resort/name/${user?.firstName}`
        );
        setResort(data?.data);
        setPhotos(data?.data?.photos);
      } catch (error) {
        console.error("Failed to fetch resort by name:", error);
      }
    };
    fetchData();
  }, [user?.firstName]);

  console.log(resort);

  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <section className="content customize_list">
          <div className="container-fluid">
            <div className="card">
              <div className="card-body card_body_sm">
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Logo</th>
                      <th>Name</th>
                      <th>District</th>
                      <th>Contact</th>
                      <th>Types of Villa</th>
                      <th>Totat Villa</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div>
                          <img
                            src={resort?.logo}
                            alt={resort?.name}
                            style={{ width: 120, height: 100 }}
                          />
                        </div>
                      </td>

                      <td>{resort?.name}</td>
                      <td>{resort?.district}</td>
                      <td>
                        {resort?.contactNumbers?.map((contact, ind) => (
                          <p key={ind}>{contact?.number}</p>
                        ))}
                      </td>
                      <td>
                        {resort?.villaTypes?.map((type, ind) => (
                          <p key={ind}>{type?.name}</p>
                        ))}
                      </td>
                      <td>
                        <p> Published : </p>
                        <p> Unpublished : </p>
                      </td>
                      <td className="d-flex justify-content-center">
                        {/* detail */}
                        <button
                          type="button"
                          className="bg-white"
                          onClick={() => {
                            // setId(room?._id);
                            // setSelectedCategory(room?.categoryDetails?.name);
                            // setShowDetailModal(!showDetailModal);
                          }}
                        >
                          <AiOutlineEye
                            style={{
                              width: "30px",
                              height: "30px",
                              color: "green",
                            }}
                          />
                        </button>
                        {/* edit */}
                        <button
                          type="button"
                          className="bg-white"
                          onClick={() => {
                            // setId(room?._id);
                            // setSelectedCategory(room?.categoryDetails?.name);
                            // setShowDetailModal(!showDetailModal);
                          }}
                        >
                          <BiSolidEdit
                            style={{
                              width: "30px",
                              height: "30px",
                              color: "blue",
                            }}
                          />
                        </button>
                        {/* delete */}
                        <button
                          type="button"
                          className="bg-white "
                          onClick={() => {
                            // setId(room?._id);
                            // setSelectedCategory(room?.categoryDetails?.name);
                            // setShowDetailModal(!showDetailModal);
                          }}
                        >
                          <RiDeleteBin6Line
                            style={{
                              width: "30px",
                              height: "30px",
                              color: "red",
                            }}
                          />
                        </button>
                        {/* <div className="d-flex justify-content-center"> */}
                        {/* <img
                          src={img3}
                          alt=""
                          data-toggle="modal"
                          data-target={`#loginModal${resort._id}`}
                        />
                        <img src={img} alt="" className="ms-3" /> */}
                        {/* </div> */}
                        {/* <div
                          className="modal fade"
                          id={`loginModal${resort._id}`}
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
                        </div> */}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResortOverview;
