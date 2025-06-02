import React, { useState } from "react";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";

import { useQuery } from "react-query";

import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { baseUrl } from "../../utils/getBaseURL";
import { useSelector } from "react-redux";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
import { Table } from "react-bootstrap";

const UserManage = () => {
  const MySwal = withReactContent(Swal);

  //sub stream
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const { page, size } = useSelector((state) => state.pagination);
  const [totalDataCount, setTotalDataCount] = useState(0);

  // useEffect(() => {
  //   if (data) {
  //     const users = data?.filter((user) => user?.usedPromo?.length > 0);
  //     setUsers(users);
  //   }
  // }, [data]);
  // const { isLoading, refetch } = useQuery(
  //   [data],
  //   async () =>
  //     await fetch(`${baseUrl}/api/users`, {
  //       method: "GET",
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);

  //         setData(data?.users);
  //       })
  // );

  const { refetch } = useQuery(["users"], async () => {
    try {
      // Construct query parameters
      const queryParams = new URLSearchParams({
        page,
        size,
        usedPromo: true,
      });

      // Pass the query parameters in the URL
      const { data } = await axios.get(
        `${baseUrl}/api/users?${queryParams.toString()}`
      );
      console.log("Response Data:", data);

      // Check if data exists
      if (data?.data?.users) {
        setUsers(data.data.users);
        setTotalDataCount(data.data.totalCount);
      } else {
        console.log("No users found");
        setUsers([]);
        setTotalDataCount(0);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      throw err;
    }
  });

  useEffect(() => {
    refetch();
  }, [refetch, page, size]);

  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <section className="content customize_list">
          <div className="container-fluid">
            <div className="">
              <h6 className="college_h6">Used Promo List</h6>
            </div>
            <hr style={{ height: "1px", background: "rgb(191 173 173)" }} />
            <div className="card">
              <div className="card-body card_body_sm">
                <Table striped bordered>
                  <thead>
                    <tr
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Used Promos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((user, index) => (
                      <tr key={index} className="bookings_data">
                        <td>{user?.firstName}</td>
                        <td>{user?.phone}</td>
                        <td>
                          {user?.usedPromo?.map((promo) => (
                            <span>{promo?.promo},</span>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <Pagination totalDataCount={totalDataCount} />
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

export default UserManage;
