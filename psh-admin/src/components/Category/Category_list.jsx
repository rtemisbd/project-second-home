import React, { useEffect, useState } from "react";
import img from "../../img/college/Icon material-delete.png";
import img3 from "../../img/college/Icon feather-edit.png";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import ToolkitProvider, {
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import Category from "../../pages/edit/Category";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { baseUrl } from "../../utils/getBaseURL";
import { Table } from "bootstrap-4-react/lib/components";

const Category_list = () => {
  const MySwal = withReactContent(Swal);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/category`, {
          mode: "cors",
        });
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  //delete
  const [products, setProducts] = useState(data);
  const handleCategory = async (id) => {
    const confirmation = window.confirm("Are you Sure?");
    if (confirmation) {
      const url = `${baseUrl}/api/category/${id}`;
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
                <h6 className="college_h6">Category List</h6>
              </div>
              <div className="export_btn_main">
                <div>
                  <div className="">
                    <div className="corporate_addNew_btn">
                      <Link to={"/dashboard/add_category"}>
                        <button className="college_btn2 ms-4 p-3">
                          Add New Category
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

                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((category, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <div>
                            <img
                              src={category?.photos[0]}
                              alt=""
                              style={{ width: 120, height: 100 }}
                            />
                          </div>
                        </td>

                        <td>{category?.name}</td>
                        <td>
                          <div className="d-flex justify-content-center">
                            <img
                              src={img3}
                              alt=""
                              data-toggle="modal"
                              data-target={`#loginModal${category._id}`}
                            />
                            <img
                              src={img}
                              alt=""
                              className="ms-3"
                              onClick={() => handleCategory(category._id)}
                            />
                          </div>
                          <div
                            className="modal fade"
                            id={`loginModal${category._id}`}
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
                                  <Category data={category} />
                                </div>
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

export default Category_list;
