import React, { useEffect, useState } from "react";
import UseFetch from "../../hooks/useFetch";
import { baseUrl } from "../../utils/getBaseURL";
import { Modal } from "react-bootstrap";

const PropertyDetails2 = ({
  id,
  category,
  setShowDetailModal,
  handleShowDetails,
}) => {
  const { data3 } = UseFetch("facilityCategory");
  const [data, setData] = useState(null);
  const [seat, setSeat] = useState(null);

  useEffect(() => {
    if (category === "Private Room") {
      const fetchData = async () => {
        try {
          const response = await fetch(`${baseUrl}/api/property/${id}`);

          const { property } = await response.json();
          setData(property);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
    if (category === "Shared Room") {
      const fetchData = async () => {
        try {
          const response = await fetch(`${baseUrl}/api/seats/${id}`);
          const { data } = await response.json();
          setSeat(data.seat);

          if (data?.seat) {
            try {
              const responseForRoom = await fetch(
                `${baseUrl}/api/property/${data?.seat?.roomId}`
              );
              const { property } = await responseForRoom.json();
              setData(property);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [id, category]);
  console.log({ data, seat });

  return (
    <Modal
      className="detail-model-container"
      show={handleShowDetails}
      onHide={() => setShowDetailModal(false)}
      //   style={{
      //     width: "700px",
      //   }}
    >
      <Modal.Header
        closeButton
        style={
          {
            //   backgroundColor: "#35B0A7",
            //   height: "36px",
            //   width: "100%",
            //   borderRadius: "3px 3px 0px 0px",
          }
        }
      >
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            // width: "100%",
            borderRadius: "3px",
            backgroundColor: "white",
          }}
        >
          <div>
            <h3>Property Details</h3>
          </div>

          <div>
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
                <p>{data?.category?.name}</p>
              </div>
              <div className="col-lg-3">
                <label htmlFor="">Branch</label>
                <p>{data?.branch?.name}</p>
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
                                <span> {item.perDay?.toLocaleString()} Tk</span>

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
      </Modal.Body>
    </Modal>
  );
};

export default PropertyDetails2;
