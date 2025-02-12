import React, { useEffect, useState } from "react";
import img from "../../img/college/Icon material-delete.png";
import img3 from "../../img/college/Icon feather-edit.png";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

import Managers from "../../pages/edit/Managers";
import { baseUrl } from "../../utils/getBaseURL";
import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";
import { Table } from "react-bootstrap";

const Manager_list = () => {
  const MySwal = withReactContent(Swal);
  const { page, size } = useSelector((state) => state.pagination);

  //sub stream
  const [data, setData] = useState([]);
  const [totalDataCount, setTotalDataCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams({
          page,
          size,
          role: "manager",
        });
        const { data } = await axios.get(
          `${baseUrl}/api/users?${queryParams.toString()}`
        );
        setData(data?.users);
        setTotalDataCount(data?.totalCount);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [page, size]);

  //delete
  const [products, setProducts] = useState(data);
  const handleCategory = async (id) => {
    const confirmation = window.confirm("Are you Sure?");
    if (confirmation) {
      const url = `${baseUrl}/api/users/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          MySwal.fire("Good job!", "successfully deleted", "success");
          if (data.deletedCount === 1) {
            const remainItem = products.filter((item) => item._id !== id);
            setProducts(remainItem);
          }
        });
    }
  };

  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <section className="content customize_list">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-7">
                <h6 className="college_h6">Manager List</h6>
              </div>
              <div className="export_btn_main">
                <div>
                  <div className="">
                    <div className="corporate_addNew_btn">
                      <Link to={"/dashboard/add_manager"}>
                        <button className="college_btn2 ms-4 p-3">
                          Add Manager
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
                <Table striped bordered>
                  <thead>
                    <tr
                      style={{
                        fontSize: "16px",
                      }}
                    >
                      <th>No.</th>
                      <th>Name</th>
                      <th>Branch</th>
                      <th>Role</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Joining Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((user, index) => (
                      <tr className="bookings_data">
                        <td>{(page - 1) * size + index + 1}</td>
                        <td>
                          <p>{user?.firstName}</p>
                        </td>
                        <td>
                          <p>{user?.branch[0]?.name}</p>
                        </td>
                        <td>
                          <p>{user?.role}</p>
                        </td>
                        <td>
                          <p>{user?.phone}</p>
                        </td>
                        <td>
                          <p>{user?.email}</p>
                        </td>

                        <td>
                          <p>
                            {
                              new Date(user?.createdAt)
                                .toLocaleString()
                                .split(",")[0]
                            }
                          </p>
                          <p>
                            {
                              new Date(user?.createdAt)
                                .toLocaleString()
                                .split(",")[1]
                            }
                          </p>
                        </td>
                        <td>{user?.userStatus}</td>
                        <td>
                          <div className="d-flex justify-content-center">
                            <img
                              src={img3}
                              alt=""
                              data-toggle="modal"
                              data-target={`#loginModal${user._id}`}
                            />
                            <img
                              src={img}
                              alt=""
                              className="ms-3"
                              onClick={() => handleCategory(user._id)}
                            />
                          </div>
                          <div
                            className="modal fade"
                            id={`loginModal${user._id}`}
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
                                <div className="modal-body">
                                  <Managers data={user} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Pagination totalDataCount={totalDataCount} />
              </div>
            </div>
            {/* /.row (main row) */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}

      {/* Control Sidebar */}
    </div>
  );
};

export default Manager_list;
