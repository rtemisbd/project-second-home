import React, { useState } from "react";

import axios from "axios";

import "jspdf-autotable";
import { useQuery } from "react-query";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { placeLoadingShow } from "../../redux/reducers/loadingStateSlice";
import LoadingState from "../../pages/LoadingState/LoadingState";
import { Spinner } from "react-bootstrap";
import AdjustmentTable from "./AdjustmentTable";

const AdjustmentList = () => {
  const dispatch = useDispatch();

  const handleClose = () => dispatch(placeLoadingShow(false));

  const [isLoading, setIsLoading] = useState(false);

  const [pageCount, setPageCount] = useState(0);

  const [page, setPage] = useState(1);

  const [data, setData] = useState([]);

  // Get All Adjustment

  const { refetch } = useQuery(
    [
      "fetchAdjustments",
      page,
      // branch,
      // paymentStatus,
      // bookingStatus,
      // fromDate,
      // toDate,
    ],
    async () => {
      try {
        const queryParams = new URLSearchParams({
          // fromDate: fromDate,
          // toDate: toDate,
          // branch: branch,
          // paymentStatus: paymentStatus,
          // status: bookingStatus,
          page: page,
          size: 10,
        });

        const response = await fetch(
          `https://api.psh.com.bd/api/adjustment?${queryParams.toString()}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Network Error");
        }

        const data = await response.json();
        setData(data);

        const totalPageCount = Math.ceil(data?.totalAdjustments / 10);
        setPageCount(totalPageCount);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  // handle Accept Adjustment
  const handleAccept = async (adjustment) => {
    const adjustmentData = {
      status: "Accepted",
      adjustmentAmount: adjustment?.adjustmentAmount,
    };

    try {
      dispatch(placeLoadingShow(true));
      await axios.patch(
        `https://api.psh.com.bd/api/adjustment/${adjustment._id}`,
        adjustmentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      handleClose();
      toast.success("Accepted");
      refetch();
    } catch (error) {
      handleClose();
      toast.error(error.response.data.message);
    }
  };

  //delete

  const handleDelete = async (id) => {
    const confirmation = window.confirm("Are you Sure?");
    if (confirmation) {
      const url = `https://api.psh.com.bd/api/adjustment/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          refetch();
          toast.success("Deleted");
        });
    }
  };

  return (
    <div className="wrapper">
      <LoadingState handleClose={handleClose} />
      <div className="content-wrapper" style={{ background: "unset" }}>
        <section className="content customize_list">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-7">
                <h6 className="college_h6">Adjustment List</h6>
              </div>
            </div>
            <hr style={{ height: "1px", background: "rgb(191 173 173)" }} />
            {isLoading ? (
              <p
                style={{ margin: "150px 0" }}
                className="text-center text-danger fw-bold"
              >
                Please Wait... <Spinner size="sm" animation="grow" />
              </p>
            ) : data?.adjustments?.length > 0 ? (
              <div className="card">
                <div className="card-body card_body_sm">
                  <AdjustmentTable
                    data={data?.adjustments}
                    page={page}
                    pageCount={pageCount}
                    setPage={setPage}
                    isLoading={isLoading}
                    refetch={refetch}
                    handleAccept={handleAccept}
                    handleDelete={handleDelete}
                  />
                </div>
              </div>
            ) : (
              <p className="text-center text-danger fw-bold">
                Find Bookings... <Spinner size="sm" animation="grow" />
              </p>
            )}
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

export default AdjustmentList;
