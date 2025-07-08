import { useContext } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/UserProvider";
import { AiOutlineEye } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";

const ResortOverview = () => {
  const { resort } = useContext(AuthContext);
  console.log(resort);
  

  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <section className="content customize_list">
          <div className="container-fluid">
            <div className="card">
              <div className="card-body card_body_sm">
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Logo</th>
                      <th>Name</th>
                      <th>District</th>
                      <th>Contact</th>
                      <th>Types of Villa</th>
                      <th>Totat Villa</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div>
                          <img
                            src={resort?.logo}
                            alt={resort?.name}
                            style={{ width: 120, height: 100 }}
                          />
                        </div>
                      </td>

                      <td>{resort?.name}</td>
                      <td>{resort?.district}</td>
                      <td>
                        {resort?.contactNumbers?.map((contact, ind) => (
                          <p key={ind}>{contact}</p>
                        ))}
                      </td>
                      <td>
                        {resort?.villaTypes?.map((type, ind) => (
                          <p key={ind}>{type}</p>
                        ))}
                      </td>
                      <td>
                        <p> Published : {resort?.totalVilla?.published}</p>
                        <p style={{ color: "red" }}>
                          Unpublished : {resort?.totalVilla?.unpublished}
                        </p>
                      </td>
                      <td className="d-flex align-items-center">
                        {/* detail */}
                        <button
                          type="button"
                          className="bg-white"
                          onClick={() => {
                            // setId(room?._id);
                            // setSelectedCategory(room?.categoryDetails?.name);
                            // setShowDetailModal(!showDetailModal);
                          }}
                        >
                          <AiOutlineEye
                            style={{
                              width: "32px",
                              height: "32px",
                              color: "green",
                            }}
                          />
                        </button>
                        {/* edit */}
                        <div>
                          <Link to="/dashboard/resort/edit-resort">
                            <BiSolidEdit
                              style={{
                                width: "32px",
                                height: "32px",
                                color: "blue",
                              }}
                            />
                          </Link>
                        </div>
                        {/* delete */}
                        <button
                          type="button"
                          className="bg-white"
                          style={{
                            cursor: "not-allowed",
                          }}
                          disabled
                          onClick={() => {
                            // setId(room?._id);
                            // setSelectedCategory(room?.categoryDetails?.name);
                            // setShowDetailModal(!showDetailModal);
                          }}
                        >
                          <RiDeleteBin6Line
                            style={{
                              width: "32px",
                              height: "32px",
                              color: "red",
                            }}
                          />
                        </button>
                      </td>
                    </tr>
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

export default ResortOverview;
