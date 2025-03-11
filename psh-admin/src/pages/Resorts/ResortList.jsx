import React, { useEffect, useState } from "react";
import img from "../../img/college/Icon material-delete.png";
import img3 from "../../img/college/Icon feather-edit.png";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";
import "jspdf-autotable";
import { baseUrl } from "../../utils/getBaseURL";
import { Table } from "bootstrap-4-react/lib/components";

const ResortList = () => {
  const MySwal = withReactContent(Swal);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/resort`);
        setData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <section className="content customize_list">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-7">
                <h6 className="college_h6">Resort List</h6>
              </div>
              <div className="export_btn_main">
                <div>
                  <div className="">
                    <div className="corporate_addNew_btn">
                      <Link to={"/dashboard/add-resort"}>
                        <button className="college_btn2 ms-4 p-3">
                          Add New Resort
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
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Picture</th>
                      <th>Name</th>
                      <th>District</th>
                      <th>Contact</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((resort, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <div>
                            <img
                              src={resort?.photos[0]}
                              alt=""
                              style={{ width: 120, height: 100 }}
                            />
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
                    ))}
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

export default ResortList;
