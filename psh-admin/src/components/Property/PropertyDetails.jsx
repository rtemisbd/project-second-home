import React, { useEffect, useState } from "react";
import UseFetch from "../../hooks/useFetch";
import axios from "axios";
import { baseUrl } from "../../utils/getBaseURL";

const PropertyDetails = ({ show, setShow, id }) => {
  const { data3, loading3, error3, refetch3 } = UseFetch("facilityCategory");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/property/${id}`);
        // const res = await response.json();
        // console.log(res);

        const { property } = await response.json();
        setData(property);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="">
      <div
        className="modal fade "
        id={`propertyDetails${data?._id}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" style={{ maxWidth: "1000px" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title fs-4" id="staticBackdropLabel">
                Propery Details
              </h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body w-100 ps-5">
              <div className="row gap-3">
                {data?.photos &&
                  data?.photos?.map((photo, index) => (
                    <div className="col-lg-2" key={index}>
                      <img
                        src={photo}
                        alt=""
                        style={{ width: "150px", height: "150px" }}
                      />
                    </div>
                  ))}
              </div>
              <h4
                className="mt-4 px-3 rounded"
                style={{ backgroundColor: "#00bbb4", color: "White" }}
              >
                Key Details
              </h4>
              <div className="row ps-5 ">
                <div className="col-lg-3 mt-2">
                  {" "}
                  <label htmlFor="">Property Type</label>
                  <p>{data?.categoryDetails?.name}</p>
                </div>
                <div className="col-lg-3">
                  <label htmlFor="">Branch</label>
                  <p>{data?.branchDetails?.name}</p>
                </div>
                <div className="col-lg-3">
                  {" "}
                  <label htmlFor="">Floor Number</label>
                  <p> {data?.floor}</p>
                </div>
                {data?.category?.name === "Apartment" ? (
                  ""
                ) : (
                  <div className="col-lg-3">
                    <label htmlFor="">Room Number</label>
                    <p> {data?.roomNumber}</p>
                  </div>
                )}

                {data?.category?.name === "Shared Room" ? (
                  ""
                ) : (
                  <>
                    <div className="col-lg-3">
                      {" "}
                      <label htmlFor="">Per Day</label>
                      <p> {data?.perDay?.toLocaleString()}</p>
                    </div>
                    <div className="col-lg-3">
                      {" "}
                      <label htmlFor="" className="text-danger">
                        Discount Price (Day)
                      </label>
                      <p> {data?.dAmountForDay?.toLocaleString()}</p>
                    </div>
                    <div className="col-lg-3">
                      {" "}
                      <label htmlFor="">Per Month</label>
                      <p> {data?.perMonth?.toLocaleString()}</p>
                    </div>
                    <div className="col-lg-3">
                      {" "}
                      <label htmlFor="" className="text-danger">
                        Discount Price (Month)
                      </label>
                      <p> {data?.dAmountForMonth?.toLocaleString()}</p>
                    </div>
                    <div className="col-lg-3">
                      {" "}
                      <label htmlFor="">Per Year</label>
                      <p> {data?.perYear?.toLocaleString()}</p>
                    </div>
                    <div className="col-lg-3">
                      {" "}
                      <label htmlFor="" className="text-danger">
                        Discount Price (Year)
                      </label>
                      <p> {data?.dAmountForYear?.toLocaleString()}</p>
                    </div>
                  </>
                )}
                {data?.category?.name === "Apartment" ? (
                  ""
                ) : (
                  <div className="col-lg-3">
                    <label htmlFor="">Room Size</label>
                    <p> {data?.area} Square feet</p>
                  </div>
                )}
                <div className="col-lg-3">
                  {" "}
                  <label htmlFor="">Furnishing</label>
                  <p>{data?.furnitured}</p>
                </div>
                <div className="col-lg-3">
                  {" "}
                  <label htmlFor="">Balcony</label>
                  <p> {data?.balcony}</p>
                </div>
                <div className="col-lg-3">
                  {" "}
                  <label htmlFor="">Bed Room</label>
                  <p> {data?.bedroom}</p>
                </div>
                <div className="col-lg-3">
                  {" "}
                  <label htmlFor="">Wifi</label>
                  <p> {data?.WiFi}</p>
                </div>
                <div className="col-lg-3">
                  {" "}
                  <label htmlFor="">CCTV</label>
                  <p>{data?.CCTV} </p>
                </div>
                <div className="col-lg-3">
                  {" "}
                  <label htmlFor="">Meal</label>
                  <p>{data?.meal} Times a day</p>
                </div>
              </div>

              {data3?.map((pd) => (
                <div style={{ width: "100%" }} key={pd._id} className="text-sm">
                  <h4
                    className="mt-4 px-3 rounded"
                    style={{ backgroundColor: "#00bbb4", color: "White" }}
                    id={pd?.name}
                  >
                    {pd.name}
                  </h4>

                  <div className="row p-3">
                    {data?.facility
                      ?.filter((res) => res.facilityCategory === pd._id)
                      ?.map((item) => (
                        <div className="d-flex flex-column col-lg-2">
                          <img
                            src={item.photos[0]}
                            alt=""
                            style={{ maxWidth: "none", width: "32px" }}
                          />
                          <p className="mt-3 ">{item.name ? item.name : ""}</p>
                        </div>
                      ))}
                  </div>
                </div>
              ))}

              {/* Facilities Section */}
              {/* {data3?.map((category) => {
                  const filteredFacilities = data?.facility?.filter(
                    (facilityId) =>
                      facilityId.name ===
                      category?.facility.map((res) => res.name)
                  );
                  // console.log({
                  //   category,
                  //   filteredFacilities,
                  //   all: data?.facility,
                  // });

                  return (
                    filteredFacilities?.length > 0 && (
                      <div key={category._id} style={{ width: "100%" }}>
                        <h4 className="mt-4 px-3 rounded bg-primary text-white">
                          {category.name}
                        </h4>
                        <div className="d-flex gap-3 flex-wrap">
                          {filteredFacilities.map((facility) => (
                            <div className="text-center" key={facility._id}>
                              <img
                                src={facility.photos[0]}
                                alt={facility.name}
                                style={{ width: "50px", height: "50px" }}
                              />
                              <p className="mt-2">{facility.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  );
                })} */}
              {/* {data3?.map((pd) => (
                  <div style={{ width: "100%" }} key={pd._id}>
                    <h4
                      className="mt-4 px-3 rounded"
                      style={{ backgroundColor: "#00bbb4", color: "White" }}
                      id={pd?.name}
                    >
                      {pd.name}
                    </h4>

                    <div>
                      {data?.facility
                        ?.filter((res) => res === pd._id)
                        ?.map((item) => (
                          <div key={item._id}>
                            <div>
                              <div>
                                <div>
                                  <img
                                    src={item.photos[0]}
                                    alt=""
                                    style={{ maxWidth: "none" }}
                                  />
                                </div>

                                <h2 className="mt-3 text-gray-900">
                                  {item.name ? item.name : ""}
                                </h2>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))} */}

              {/* {data3?.slice(0, 3).map((pd) => (
                <div style={{ width: "100%" }} key={pd._id}>
                  <div className="facility_h1 p-2">
                    <h4
                      id={pd?.name}
                      style={{ backgroundColor: "#00bbb4", color: "White" }}
                      className="ps-3 rounded"
                    >
                      {pd.name}
                    </h4>
                  </div>
                  <div className="row p-5">
                    {data?.facility
                      ? data?.facility
                          .filter((item) => item.facilityCategory === pd._id)
                          .map((item) => (
                            <React.Fragment key={item._id}>
                              <div className="d-flex flex-column col-lg-2">
                                <img
                                  src={item.photos[0]}
                                  alt=""
                                  style={{ maxWidth: "none", width: "40px" }}
                                />
                                <p className="mt-3 ">
                                  {item.name ? item.name : ""}
                                </p>
                              </div>
                            </React.Fragment>
                          ))
                      : ""}
                  </div>
                </div>
              ))} */}
              {data?.seats?.length !== 0 ? (
                <h4
                  className="mt-4 mb-4 ps-3 rounded"
                  style={{ backgroundColor: "#00bbb4", color: "White" }}
                >
                  Seats
                </h4>
              ) : (
                ""
              )}

              <div className="mb-5 gap-5">
                {data?.seats &&
                  data?.seats.map((item) => {
                    return (
                      <div className=" mt-2">
                        <div className=" ">
                          <div className="  ">
                            <div className="d-flex gap-3">
                              <img
                                src={item.photos ? item.photos[0] : ""}
                                alt=""
                                style={{ width: "400px", height: "160px" }}
                                className="rounded"
                              />
                              <div>
                                <div className=" ">
                                  <label htmlFor=""> Seat No : </label>
                                  <span> {item.seatNumber}</span>
                                </div>

                                <div className=" d-flex gap-3 ">
                                  <label htmlFor=""> Per Day : </label>
                                  <span>
                                    {" "}
                                    {item.perDay?.toLocaleString()} Tk
                                  </span>

                                  <label
                                    htmlFor=""
                                    style={{
                                      color: "red",
                                    }}
                                  >
                                    {" "}
                                    Discount Price :{" "}
                                  </label>
                                  <span>
                                    {" "}
                                    {item.dAmountForDay?.toLocaleString()} Tk
                                  </span>
                                </div>

                                <div className=" d-flex gap-3">
                                  <label htmlFor=""> Per Monnth : </label>
                                  <span>
                                    {" "}
                                    {item.perMonth?.toLocaleString()} Tk
                                  </span>
                                  <label
                                    htmlFor=""
                                    style={{
                                      color: "red",
                                    }}
                                  >
                                    {" "}
                                    Discount Price:{" "}
                                  </label>
                                  <span>
                                    {" "}
                                    {item.dAmountForMonth?.toLocaleString()} Tk
                                  </span>
                                </div>
                                <div className=" d-flex gap-3">
                                  <label htmlFor=""> Per Year : </label>
                                  <span>
                                    {" "}
                                    {item?.perYear?.toLocaleString()} Tk
                                  </span>
                                  <label
                                    htmlFor=""
                                    style={{
                                      color: "red",
                                    }}
                                  >
                                    {" "}
                                    Discount Price :{" "}
                                  </label>
                                  <span>
                                    {" "}
                                    {item?.dAmountForYear?.toLocaleString()} Tk
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
