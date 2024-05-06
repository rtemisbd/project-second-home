import React, { useContext, useEffect, useState } from "react";
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

import OrderStatusUpdate from "../../pages/edit/OrderStatusUpdate";
import { AiOutlineEye, AiOutlineFieldTime } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import SeeOrderDetails from "./SeeOrderDetails";
import BookingDateSetUpdate from "../../pages/edit/BookingDateSetUpdate";
import BookingDateUpdate from "../../pages/edit/BookingDateUpdate";
import { useQuery } from "react-query";
import Payment from "../../pages/edit/Payment";
import { ToastContainer } from "react-toastify";
const MyExportCSV = (props) => {
  const handleClick = () => {
    props.onExport();
  };
  return (
    <div>
      <button className="college_btn  mb-2 p-3" onClick={handleClick}>
        Export to CSV
      </button>
    </div>
  );
};
const Admin_Orders_list = () => {
  const MySwal = withReactContent(Swal);

  //sub stream
  const [data, setData] = useState([]);

  const { isLoading, refetch } = useQuery([data], () =>
    fetch(`https://api.psh.com.bd/api/order`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
  );

  const columns = [
    {
      text: "No",
      formatter: (cellContent, row, index) => {
        return (
          <>
            {" "}
            <p>{index + 1}</p>
          </>
        );
      },
    },

    {
      text: "Id",
      formatter: (cellContent, row, index) => {
        return <>{row?._id.slice(15)}</>;
      },
    },
    // {
    //   dataField: `firstName`,
    //   text: "firstName",
    // },
    // {
    //   dataField: "phone",
    //   text: "Phone No.",
    // },
    {
      text: "Room / Seat No.",
      formatter: (cellContent, row, index) => {
        return (
          <>
            {row?.bookingInfo?.roomType === "Shared Room"
              ? row?.bookingInfo?.seatBooking?.seatNumber
              : row?.bookingInfo?.data?.roomNumber}
          </>
        );
      },
    },
    // {
    //   text: "Check In",
    //   formatter: (cellContent, row, index) => {
    //     return <>{row?.bookingInfo?.rentDate?.bookStartDate}</>;
    //   },
    // },
    // {
    //   text: "Check Out",
    //   formatter: (cellContent, row, index) => {
    //     return <>{row?.bookingInfo?.rentDate?.bookEndDate}</>;
    //   },
    // },
    {
      text: "Total Tk",
      formatter: (cellContent, row, index) => {
        return (
          <>
            {" "}
            <p className="fw-bold">Tk {row?.totalAmount}</p>
          </>
        );
      },
    },
    {
      text: "Discount",
      formatter: (cellContent, row, index) => {
        return (
          <>
            {" "}
            <p className="fw-bold">Tk {row?.discount}</p>
          </>
        );
      },
    },
    {
      text: "Payable Tk",
      formatter: (cellContent, row, index) => {
        return (
          <>
            {" "}
            <p className="fw-bold">Tk {row?.payableAmount}</p>
          </>
        );
      },
    },
    // {
    //   dataField: "paymentStatus",
    //   text: "Payment Status",
    // },
    {
      text: "Due Amount",
      formatter: (cellContent, row, index) => {
        return (
          <span className="text-danger fw-bold"> Tk {row?.dueAmount}</span>
        );
      },
    },
    {
      text: "Total Receive",
      formatter: (cellContent, row, index) => {
        return <p>Tk {row?.totalReceiveTk}</p>;
      },
    },
    {
      text: "Status",
      formatter: (cellContent, row, index) => {
        return (
          <div className="ms-5 d-flex justify-content-between">
            <div>
              <p>{row?.status}</p>
            </div>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target={`#status${row._id}`}
              className="d-flex justify-content-center order-status bg-white"
            >
              <BiSolidEdit style={{ width: "30px", height: "30px" }} />
            </button>
            {/* Modal Order Status Update */}
            <div>
              <OrderStatusUpdate data={row} refetch={refetch} />
            </div>
          </div>
        );
      },
    },
    {
      text: "Details",
      formatter: (cellContent, row, index) => {
        return (
          <div>
            <button
              type="button"
              className="bg-white"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <span>
                <AiOutlineEye style={{ width: "30px", height: "30px" }} />
              </span>
            </button>

            {/* Modal Order Details */}
            <SeeOrderDetails order={row} />
          </div>
        );
      },
    },
    {
      text: "Update Duration",
      formatter: (cellContent, row, index) => {
        return (
          <>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="bg-white"
                data-bs-toggle="modal"
                data-bs-target={`#dateUpdate${row._id}`}
              >
                <AiOutlineFieldTime style={{ width: "30px", height: "30px" }} />
              </button>
            </div>
            {/* Modal order Date Update */}
            {row?.bookingInfo?.roomType === "Shared Room" ? (
              <div>
                <BookingDateSetUpdate data={row} refetch={refetch} />
              </div>
            ) : (
              <div>
                <BookingDateUpdate data={row} refetch={refetch} />
              </div>
            )}
          </>
        );
      },
    },

    {
      text: "Action",
      formatter: (cellContent, row) => {
        return (
          <>
            <div className="d-flex gap-2 fw-bold">
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target={`#payment${row._id}`}
                style={{ backgroundColor: "#00BBB4" }}
              >
                Payment
              </button>

              <button className="bg-danger">End</button>
            </div>
            <Payment data={row} refetch={refetch} />
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

  //delete
  const [products, setProducts] = useState(data);
  const handleCategory = async (id) => {
    const confirmation = window.confirm("Are you Sure?");
    if (confirmation) {
      const url = `https://api.psh.com.bd/api/order/${id}`;
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
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-7">
                <h6 className="college_h6">Orders List</h6>
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
                        <ToastContainer
                          className="toast-position"
                          position="top-center"
                        />
                      </React.Fragment>
                    )}
                  </ToolkitProvider>
                </>
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

export default Admin_Orders_list;
