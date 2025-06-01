import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import img from "../../../img/college/Icon material-delete.png";
import img3 from "../../../img/college/Icon feather-edit.png";
import { AuthContext } from "../../../contexts/UserProvider";
import axios from "axios";
import { baseUrl } from "../../../utils/getBaseURL";

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
                      <th>Picture</th>
                      <th>Name</th>
                      <th>District</th>
                      <th>Contact</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div>
                          {photos && (
                            <img
                              src={photos[0]}
                              alt={resort?.name}
                              style={{ width: 120, height: 100 }}
                            />
                          )}
                        </div>
                      </td>

                      <td>{resort?.name}</td>
                      <td>{resort?.district}</td>
                      <td>{resort?.resortMobileNumber}</td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <img
                            src={img3}
                            alt=""
                            data-toggle="modal"
                            data-target={`#loginModal${resort._id}`}
                          />
                          <img src={img} alt="" className="ms-3" />
                        </div>
                        <div
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
                        </div>
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
