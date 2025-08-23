import React from "react";
import { BiSolidEdit } from "react-icons/bi";

import { AiOutlineDelete } from "react-icons/ai";

import UpdateAdjustment from "./UpdateAdjustment";

const AdjustmentData = ({
  adjustment,
  index,
  refetch,
  isLoading,
  page,
  handleAccept,
  handleDelete,
}) => {
  console.log(adjustment);

  return (
    <>
      <tr>
        <td>
          <div>
            <p>#{adjustment?.booking?.bookingId} </p>
            <p>{adjustment?.branch?.name}</p>
          </div>
        </td>

        <td>
          <div>
            <p>#{adjustment?.userId?._id?.slice(-5)}</p>
            <p>{adjustment?.userId?.firstName}</p>
          </div>
        </td>
        <td>
          <p>{adjustment?.booking?.totalAmount?.toLocaleString()} Tk</p>
        </td>
        <td>
          <p>{adjustment?.booking?.discount?.toLocaleString()} Tk</p>
        </td>
        <td>
          <p>{adjustment?.booking?.payableAmount?.toLocaleString()} Tk</p>
        </td>
        <td>
          <p>{adjustment?.booking?.totalReceiveTk?.toLocaleString()} Tk</p>
        </td>
        <td>
          <p>{adjustment?.booking?.dueAmount?.toLocaleString()} Tk</p>
        </td>
        <td>
          <div className="d-flex justify-content-between">
            <p>{adjustment?.adjustmentAmount} Tk</p>
            <button
              disabled={adjustment?.status === "Accepted" ? true : false}
              onClick={() => handleAccept(adjustment)}
              className="btn"
              style={{ backgroundColor: "#00bbb4", color: "white" }}
            >
              {adjustment?.status === "Accepted" ? "Accepted" : "Accept Now"}
            </button>
          </div>
        </td>
        <td>
          <p>{adjustment?.noteForAdjustment} </p>
        </td>
        <td>
          <>
            <div className="d-flex justify-content-center gap-5">
              <button
                type="button"
                className="bg-white"
                data-bs-toggle="modal"
                data-bs-target={`#discount${adjustment?._id}`}
                disabled={adjustment?.status === "Accepted" ? true : false}
              >
                <BiSolidEdit style={{ width: "30px", height: "30px" }} />
              </button>
              <div className="">
                <button
                  className="btn "
                  disabled={
                    adjustment?.status === "Accepted"
                      ? true
                      : false ||
                        adjustment?.booking?.payableAmount ===
                          adjustment?.booking?.totalReceiveTk
                      ? true
                      : false
                  }
                >
                  <AiOutlineDelete
                    onClick={() => handleDelete(adjustment?._id)}
                    style={{ width: "30px", height: "30px" }}
                    className="delete-button"
                  />
                </button>
              </div>
            </div>
            {/* Modal order Date Update */}

            <div>
              <UpdateAdjustment data={adjustment} refetch={refetch} />
            </div>

            <div className="d-flex justify-content-center"></div>
            <div
              className="modal fade"
              id={`loginModal${adjustment._id}`}
              tabIndex="{-1}"
              role="dialog"
              aria-labelledby="loginModal"
              aria-hidden="true"
            ></div>
          </>
        </td>
      </tr>
      {/* Modals */}
    </>
  );
};

export default AdjustmentData;
