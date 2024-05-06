import React, { useContext, useEffect, useState } from "react";
import img from "../../img/college/Icon material-delete.png";
import img3 from "../../img/college/Icon feather-edit.png";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import { Link } from "react-router-dom";

import "jspdf-autotable";

import { AuthContext } from "../../contexts/UserProvider";
import { BiSolidEdit } from "react-icons/bi";

import { useQuery } from "react-query";
import { AiOutlineEye } from "react-icons/ai";

const SubscriptionHistory = (props) => {
  const MySwal = withReactContent(Swal);
  const { user } = useContext(AuthContext);
  const userBranch = user.branch.name;

  const [data, setData] = useState([]);

  // Get user Subscriptions

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.psh.com.bd/api/subscriptionOrder/${user?.email}`,
          {
            mode: "cors",
          }
        );
        setData(data?.subscriptionHistory);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [user?.email]);

  const columns = [
    {
      dataField: "packageName",
      text: "Package Name",
    },

    {
      text: "Package Duration",
      formatter: (cellContent, row) => {
        return (
          <>
            <div className=" d-flex ">
              <div>
                <p className="fw-bold">{row?.packageDuration} Month</p>
              </div>
            </div>
          </>
        );
      },
    },
    {
      text: "Package Price",
      formatter: (cellContent, row) => {
        return (
          <>
            <div className=" d-flex ">
              <div>
                <p className="fw-bold"> Tk {row?.packagePrice} </p>
              </div>
            </div>
          </>
        );
      },
    },

    {
      text: "Featured Room",
      formatter: (cellContent, row) => {
        return (
          <>
            <div className=" d-flex ">
              <div>
                <p className="fw-bold">
                  {row?.totalFeaturedRoom === "0" ? (
                    "No Fetured Room"
                  ) : (
                    <>You can add {row?.totalFeaturedRoom} featured room</>
                  )}
                </p>
              </div>
            </div>
          </>
        );
      },
    },
    {
      text: "Package Buy Date",
      formatter: (cellContent, row) => {
        const formattedDate = new Date(row.packageBuyDate)
          ?.toLocaleString()
          ?.split(",")[0];
        return (
          <>
            <div className=" d-flex ">
              <div>
                <p className="fw-bold">{formattedDate}</p>
              </div>
            </div>
          </>
        );
      },
    },
    {
      text: "Package End Date",
      formatter: (cellContent, row) => {
        // let after7 = new Date(row.packageBuyDate);
        // after7.setMonth(after7.getMonth() + Number(row?.packageDuration));
        const formattedDate = new Date(row?.packageEndDate)
          ?.toLocaleString()
          ?.split(",")[0];
        return (
          <>
            <div className=" d-flex ">
              <div>
                <p className="fw-bold text-danger">{formattedDate}</p>
              </div>
            </div>
          </>
        );
      },
    },

    {
      text: "Status",
      formatter: (cellContent, row) => {
        return (
          <>
            <div className=" d-flex ">
              <div>
                <p
                  className="fw-bold"
                  style={{
                    color:
                      row?.acceptableStatus !== "Accepted" ? "red" : "green",
                  }}
                >
                  {" "}
                  {row?.acceptableStatus}{" "}
                </p>
              </div>
            </div>
          </>
        );
      },
    },
  ];
  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    style: { width: 60 },
    lastPageText: "Last",
    firstPageText: "First",
    nextPageText: "Next",
    prePageText: "Previous",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });

  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <section className="content customize_list">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-7">
                <h6 className="college_h6">Subscription History</h6>
              </div>
            </div>
            <hr style={{ height: "1px", background: "rgb(191 173 173)" }} />
            <div className="card">
              <div className="card-body card_body_sm">
                <>
                  <ToolkitProvider
                    bootstrap4
                    keyField="_id"
                    columns={columns}
                    data={data}
                    pagination={pagination}
                    exportCSV
                  >
                    {(props) => (
                      <React.Fragment>
                        <BootstrapTable
                          bootstrap4
                          keyField="_id"
                          columns={columns}
                          data={data}
                          pagination={pagination}
                          {...props.baseProps}
                        />
                      </React.Fragment>
                    )}
                  </ToolkitProvider>
                </>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SubscriptionHistory;
