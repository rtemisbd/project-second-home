import React, { useEffect, useState } from "react";
import LoadingState from "../../pages/LoadingState/LoadingState";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { placeLoadingShow } from "../../redux/reducers/loadingStateSlice";
import useBranch from "../../hooks/useBranch";
import useCategory from "../../hooks/useCategory";
import { useQuery } from "react-query";
import axios from "axios";
import { baseUrl } from "../../utils/getBaseURL";
import { Link } from "react-router-dom";
import { Spinner, Table } from "react-bootstrap";
import { BiSolidEdit } from "react-icons/bi";
import PropertyStatusUpdate from "../../pages/edit/PropertyStatusUpdate";
import PropertyDetails from "./PropertyDetails";
import { AiOutlineEye } from "react-icons/ai";
import PropertyUpdate2 from "../../pages/edit/PropertyUpdate2";
import PropertyDetails2 from "./PropertyDetails2";

const AdminPropertyList2 = () => {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(placeLoadingShow(false));
  const { page, size } = useSelector((state) => state.pagination);
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showStatusUpdate, setShowStatusUpdate] = useState(false);

  const [roomNumber, setRoomNumber] = useState("");
  const [seatNumber, setSeatNumber] = useState("");

  const [branch, setBranch] = useState("");
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Get All Branch
  const { allBranch: branches } = useBranch();
  const { categories } = useCategory();

  const { refetch } = useQuery(["propertyList", category, branch], async () => {
    try {
      // Construct query parameters
      const queryParams = new URLSearchParams({
        // page,
        // size,
        destination: branch,
        category,
        withSharedRoom: true,
        roomNumber,
        seatNumber,
      });

      // Pass the query parameters in the URL
      const response = await axios.get(
        `${baseUrl}/api/property?${queryParams.toString()}`
      );

      // Check if data exists
      if (response?.data?.properties) {
        setData(response.data.properties);
      } else {
        console.log("No properties found");
        setData([]);
      }
    } catch (err) {
      console.error("Error fetching properties:", err);
      throw err;
    }
  });

  // Re-fetch data whenever `page` or `size` changes
  useEffect(() => {
    refetch();
  }, [refetch, page, size, roomNumber, seatNumber]);

  const handleShowDetails = () => {
    setShowDetailModal(true);
  };
  const handleShowStatusUpdate = () => {
    setShowStatusUpdate(true);
  };

  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <section className="content customize_list">
          <div className="container-fluid">
            <LoadingState handleClose={handleClose} />

            <div className="d-flex justify-content-between">
              <p
                className="fs-5"
                style={{
                  backgroundColor: "#35b0a7",
                  padding: "0 15px",
                  color: "white",
                }}
              >
                Total Room : {data?.length}
              </p>
            </div>
            <div className="row">
              <div className="col-md-7">
                <h6 className="college_h6">Property List</h6>
              </div>{" "}
              <div className="d-flex justify-content-end">
                <div>
                  <div>
                    <label htmlFor="Category">Category: </label>
                  </div>
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                      height: "30px",
                    }}
                  >
                    <option value="All">All</option>
                    {categories?.map((category) => (
                      <option key={category._id} value={category?.name}>
                        {category?.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginLeft: 10 }}>
                  <div>
                    <label htmlFor="branch">Branch</label>
                  </div>

                  <select
                    onChange={(e) => setBranch(e.target.value)}
                    style={{
                      height: "30px",
                    }}
                  >
                    <option value="All">All</option>
                    {branches?.map((branch) => (
                      <option key={branch._id} value={branch?.name}>
                        {branch?.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="roomId">Room Number </label> <br />
                  <input
                    type="text"
                    value={roomNumber}
                    style={{ margin: "0px 8px" }}
                    onChange={(e) => setRoomNumber(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="seatId">Seat Number </label> <br />
                  <input
                    type="text"
                    value={seatNumber}
                    onChange={(e) => setSeatNumber(e.target.value)}
                  />
                </div>
                <div style={{ marginLeft: 10, marginTop: 30 }}>
                  <button
                    // onClick={handleSearch}
                    className="btn text-white mb-5"
                    style={{
                      backgroundColor: "#35b0a7",
                      height: "32px",
                      padding: "0 10px",
                    }}
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className="export_btn_main">
                <div>
                  <div className="">
                    <div className="corporate_addNew_btn">
                      <Link to={"/dashboard/add_property"}>
                        <button className="college_btn2 ms-4 p-3">
                          Add New
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr style={{ height: "1px", background: "rgb(191 173 173)" }} />
            {isLoading ? (
              <p
                style={{ margin: "150px 0" }}
                className="text-center text-danger fw-bold"
              >
                Please Wait...
                <Spinner size="sm" animation="grow" />
              </p>
            ) : data?.length > 0 ? (
              <div className="card">
                <div className="card-body card_body_sm">
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Room /Seat No.</th>
                        <th>Category</th>
                        <th>Branch </th>
                        <th>Per Day</th>
                        <th>Per Month</th>
                        <th>Per Year</th>
                        <th>Seats</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((room, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <div>
                              <img
                                src={room?.photos[0]}
                                alt=""
                                style={{ width: 120, height: 120 }}
                              />
                            </div>
                          </td>

                          <td>{room?.name}</td>
                          <td>
                            <div className=" d-flex ">
                              <div>
                                {room?.categoryDetails?.name ===
                                "Shared Room" ? (
                                  <>
                                    {" "}
                                    <p className="fw-bold">
                                      Seat : {room?.seatNumber}
                                    </p>
                                    <p>Room : {room?.roomNumber}</p>
                                  </>
                                ) : (
                                  <p className="fw-bold">
                                    Room : {room?.roomNumber}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td>{room?.categoryDetails?.name}</td>
                          <td>{room?.branchDetails?.name}</td>
                          <td>
                            <div className=" d-flex ">
                              <p className="fw-bold">
                                {room?.perDay?.toLocaleString()}
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className=" d-flex ">
                              <p className="fw-bold">
                                {room?.perMonth?.toLocaleString()}
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className=" d-flex ">
                              <p className="fw-bold">
                                {room?.perYear?.toLocaleString()}
                              </p>
                            </div>
                          </td>
                          <td>
                            {room?.seats?.map((seat) => (
                              <div className="d-flex">
                                <p>{seat?.seatNumber}</p>
                              </div>
                            ))}
                          </td>
                          <td>
                            <div className=" d-flex fw-bold">
                              <div>
                                {room?.categoryDetails?.name ===
                                "Shared Room" ? (
                                  <p
                                    style={{
                                      color:
                                        room?.isSeatPublished === "Published"
                                          ? "#27b3b1"
                                          : "red",
                                    }}
                                  >
                                    {" "}
                                    {room?.isSeatPublished}
                                  </p>
                                ) : (
                                  <p
                                    style={{
                                      color:
                                        room?.isPublished === "Published"
                                          ? "#27b3b1"
                                          : "red",
                                    }}
                                  >
                                    {room?.isPublished}
                                  </p>
                                )}
                              </div>
                              <button
                                type="button"
                                className="d-flex  bg-white p-0"
                                onClick={() => {
                                  setId(room?._id);
                                  setSelectedCategory(
                                    room?.categoryDetails?.name
                                  );
                                  setShowStatusUpdate(!showStatusUpdate);
                                }}
                              >
                                <BiSolidEdit
                                  style={{ width: "24px", height: "24px" }}
                                />
                              </button>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex justify-content-center">
                              {/* <div>
                                <button
                                  type="button"
                                  className="bg-white"
                                  data-bs-toggle="modal"
                                  data-bs-target={`#propertyUpdate${room._id}`}
                                >
                                  <span>
                                    <BiSolidEdit
                                      style={{ width: "24px", height: "24px" }}
                                    />
                                  </span>
                                </button>
                              </div>

                              <div>
                                <PropertyUpdate2
                                  data={room}
                                  refetch={refetch}
                                  handleClose={handleClose}
                                />
                              </div> */}
                              <div>
                                <button
                                  type="button"
                                  className="bg-white"
                                  onClick={() => {
                                    setId(room?._id);
                                    setSelectedCategory(
                                      room?.categoryDetails?.name
                                    );
                                    setShowDetailModal(!showDetailModal);
                                  }}
                                >
                                  <span>
                                    <AiOutlineEye
                                      style={{ width: "30px", height: "30px" }}
                                    />
                                  </span>
                                </button>
                              </div>

                              {/* <AiOutlineDelete
                                    onClick={() => handleDelete(row._id)}
                                    style={{ width: "30px", height: "30px", marginTop: "10px" }}
                                /> */}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            ) : (
              <p className="text-center text-danger fw-bold">
                Find Properties...
                <Spinner size="sm" animation="row" />
              </p>
            )}
          </div>
        </section>
        {showDetailModal && (
          <PropertyDetails2
            id={id}
            category={selectedCategory}
            setShowDetailModal={setShowDetailModal}
            handleShowDetails={handleShowDetails}
            refetch={refetch}
          />
        )}
        {showStatusUpdate && (
          <PropertyStatusUpdate
            id={id}
            category={selectedCategory}
            setShowStatusUpdate={setShowStatusUpdate}
            handleShowStatusUpdate={handleShowStatusUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPropertyList2;
