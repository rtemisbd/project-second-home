import React, { useContext, useEffect, useMemo, useState } from "react";

import { useQuery } from "react-query";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { AuthContext } from "../../contexts/UserProvider";

const FeaturedRoom = () => {
  const { logoutUser, user } = useContext(AuthContext);

  const userBranch = user?.branch?.name;

  const [data, setData] = useState([]);

  const [roomId, setRoomId] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterFeatured, setIsFilterFeatured] = useState([]);
  const [featuredRoom, setIsFeaturedRoom] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [isToDay, setIsToDay] = useState(false);
  const [formattedDate, setFormattedDate] = useState();
  const [categories, setCategories] = useState([]);

  const [branches, setBranches] = useState([]);
  const [selectCategory, setSelectCategory] = useState("All");
  const [selectBranch, setSelectBranch] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  // Fetured Room handle
  useEffect(() => {
    let featuredRooms = [];
    let featuredFilterRooms = [];

    featuredRooms = data
      ?.filter((room) => room.Featured === "yes")
      .map((room) => room._id);

    setRoomId(featuredRooms);

    if (isFilter) {
      featuredFilterRooms = filterData?.filter(
        (room) => room.Featured === "yes"
      );
    }
    setIsFilterFeatured(featuredFilterRooms);
    if (isFilter) {
      const feturedFilterRoom = filterData?.find(
        (room) => room?.Featured === "yes"
      );
      setIsFeaturedRoom(feturedFilterRoom);
    } else {
      const feturedNonFilterRoom = data?.find(
        (room) => room?.Featured === "yes"
      );
      setIsFeaturedRoom(feturedNonFilterRoom);
    }
  }, [data, filterData, isFilter, featuredRoom]);

  // Checking After 7 Days

  const feturedDate = useMemo(
    () => new Date(featuredRoom?.FeaturedDate),
    [featuredRoom?.FeaturedDate]
  );

  const after7days = useMemo(() => {
    const after7 = new Date(feturedDate);
    after7.setDate(after7.getDate() + 7);
    return after7;
  }, [feturedDate]);

  useEffect(() => {
    if (after7days.getTime() === feturedDate.getTime()) {
      setIsToDay(true);
    } else {
      setIsToDay(false);
    }
    const date = new Date(after7days);
    const formatted = date.toLocaleString("en-US", { dateStyle: "long" });
    setFormattedDate(formatted);
  }, [after7days, feturedDate, featuredRoom?.FeaturedDate]);

  const { refetch: categoryList } = useQuery(["categoryList"], async () => {
    try {
      const response = await axios.get(`https://api.psh.com.bd/api/category`, {
        mode: "cors",
      });

      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  });
  const { refetch: branchList } = useQuery(["branchList"], async () => {
    try {
      const response = await axios.get(`https://api.psh.com.bd/api/branch`, {
        mode: "cors",
      });

      setBranches(response.data);
    } catch (error) {
      console.error(error);
    }
  });

  // Get Properties
  const { refetch } = useQuery(["propertyList"], async () => {
    try {
      const response = await axios.get(
        `https://api.psh.com.bd/api/property/booking-report?branch=${userBranch}`,
        {
          mode: "cors",
        }
      );

      setData(response.data?.allProperty); // Return data from the async function
    } catch (error) {
      console.error(error);
      throw error; // Throw the error to handle it in the caller
    }
  });

  const handleSearch = async () => {
    setIsLoading(true);
    setIsFilter(true);

    try {
      const response = await axios.get("https://api.psh.com.bd/api/property", {
        params: {
          sCategory: selectCategory !== "All" ? selectCategory : undefined,
          sBranch: userBranch,
          roomNumber: roomNumber.toUpperCase(),
        },
        mode: "cors",
      });

      setFilterData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeaturedRoom = (e) => {
    const roomIdToAddOrRemove = e.target.value;

    if (e.target.checked) {
      // Checkbox is checked, add the room ID to the state if it doesn't already exist
      if (!roomId.includes(roomIdToAddOrRemove)) {
        setRoomId((prevRoomIds) => [...prevRoomIds, roomIdToAddOrRemove]);
      }
    } else {
      // Checkbox is unchecked, remove the room ID from the state
      setRoomId((prevRoomIds) =>
        prevRoomIds.filter((id) => id !== roomIdToAddOrRemove)
      );
    }
  };

  const updateFeatured = {
    roomId: roomId,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `https://api.psh.com.bd/api/property/featured`,
        updateFeatured
      );
      toast.success(response.data.message);
      refetch();
    } catch (err) {
      console.log(err);
      //   MySwal.fire("Something Error Found.", "warning");
    }
  };

  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <section className="content customize_list">
          <div className="container-fluid">
            <h3>Features</h3>

            <div className="d-flex gx-5">
              <h4>
                Availble Rooms : {isFilter ? filterData?.length : data?.length}
              </h4>
              <h5 className="ms-5 fw-bold">
                Featured Room :{" "}
                {isFilter ? filterFeatured?.length : roomId?.length}
              </h5>
            </div>
            <h6>
              You can change your featured room on:{" "}
              <span className="text-danger fw-bold">
                {formattedDate === "Invalid Date" ? "" : formattedDate}
              </span>
            </h6>
            <div className="row">
              <div className="d-flex justify-content-end ">
                <div>
                  <div>
                    <label htmlFor="Category">Category: </label>
                  </div>
                  <select
                    onChange={(e) => setSelectCategory(e.target.value)}
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
                    onChange={(e) => setSelectBranch(e.target.value)}
                    style={{
                      height: "30px",
                    }}
                  >
                    <option value={userBranch}>{userBranch}</option>
                  </select>
                </div>

                <div style={{ marginLeft: 10 }}>
                  <label htmlFor="">Room No. </label> <br />
                  <input
                    type="text"
                    list="roomNumber"
                    placeholder="Type Room Number"
                    onChange={(e) => setRoomNumber(e.target.value)}
                    style={{
                      width: "200px",
                    }}
                  />
                </div>
                <div style={{ marginLeft: 10, marginTop: 30 }}>
                  <button
                    onClick={handleSearch}
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
            </div>

            {isLoading ? (
              <p
                style={{ margin: "150px 0" }}
                className="text-center text-danger fw-bold"
              >
                Please Wait...
                <Spinner size="sm" animation="grow" />
              </p>
            ) : data?.length > 0 || filterData?.length > 0 ? (
              <div>
                <h5>Choose one Room for Feature: </h5>
                <form onSubmit={handleSubmit}>
                  <div className="row mt-3">
                    {isFilter
                      ? filterData?.map((room, index) => (
                          <div
                            className="col-lg-3 col-md-3 col-sm-6"
                            key={index}
                          >
                            <input
                              type="checkbox"
                              name=""
                              id={`checkbox-${index}`}
                              onChange={handleFeaturedRoom}
                              value={room?._id}
                              defaultChecked={
                                room?.Featured === "yes" ? true : false
                              }
                              disabled={
                                roomId?.find((r) => r === room._id) &&
                                room?.Featured === "yes" &&
                                !isToDay
                                  ? true
                                  : false ||
                                    (roomId?.length === 1 &&
                                    roomId?.find((r) => r !== room._id)
                                      ? true
                                      : false)
                              }
                            />
                            <label
                              htmlFor={`checkbox-${index}`}
                              className="ms-3"
                              style={{
                                color:
                                  roomId?.length === 1 &&
                                  roomId?.find((r) => r !== room._id)
                                    ? "#a69494"
                                    : "black",
                              }}
                            >
                              Room No: {room?.roomNumber}
                            </label>
                          </div>
                        ))
                      : data?.map((room, index) => (
                          <div
                            className="col-lg-3 col-md-3 col-sm-6"
                            key={index}
                          >
                            <input
                              type="checkbox"
                              name=""
                              id={`checkbox-${index}`}
                              onChange={handleFeaturedRoom}
                              value={room?._id}
                              defaultChecked={
                                room?.Featured === "yes" ? true : false
                              }
                              disabled={
                                roomId?.find((r) => r === room._id) &&
                                room?.Featured === "yes" &&
                                !isToDay
                                  ? true
                                  : false ||
                                    (roomId?.length === 1 &&
                                    roomId?.find((r) => r !== room._id)
                                      ? true
                                      : false)
                              }
                            />
                            <label
                              htmlFor={`checkbox-${index}`}
                              className="ms-3"
                              style={{
                                color:
                                  roomId?.length === 1 &&
                                  roomId?.find((r) => r !== room._id)
                                    ? "#a69494"
                                    : "black",
                              }}
                            >
                              Room No: {room?.roomNumber}
                            </label>
                          </div>
                        ))}
                  </div>
                  <input
                    type="submit"
                    className="btn text-white mt-4"
                    style={{
                      backgroundColor: "#35b0a7",
                      height: "32px",
                      padding: "0 10px",
                    }}
                    value="Submit"
                  />
                </form>
                <p className="mt-5">
                  <strong>FAQ about Feature Facilities:</strong>
                </p>
                <ol>
                  <li>
                    <p>
                      <strong>
                        What are feature facilities for partner rooms?
                      </strong>
                      <br />
                      Feature facilities allow partners to highlight one of
                      their rooms on our website's feature tab, increasing its
                      visibility to potential customers.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>
                        How long can a room be featured on the website?
                      </strong>
                      <br />
                      Partners can feature one room for a minimum of 7 days.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Can partners change the featured room?</strong>
                      <br />
                      Yes, partners can change the featured room after 7 days.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>
                        How many rooms can be featured under the one-year
                        subscription plan?
                      </strong>
                      <br />
                      Partners can feature one room at a time under the one-year
                      subscription plan.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>
                        Are feature facilities available for both subscription
                        plans?
                      </strong>
                      <br />
                      Feature facilities are available only for partners who
                      choose the one-year subscription plan.
                    </p>
                  </li>
                </ol>
              </div>
            ) : (
              <p className="text-center text-danger fw-bold">
                Find Rooms...
                <Spinner size="sm" animation="grow" />
              </p>
            )}
          </div>
        </section>
      </div>
      <ToastContainer className="toast-position" position="top-center" />
    </div>
  );
};

export default FeaturedRoom;
