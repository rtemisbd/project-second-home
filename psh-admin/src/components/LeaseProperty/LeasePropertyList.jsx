import { useEffect, useState } from "react";

import { baseUrl } from "../../utils/getBaseURL";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";
import { Spinner, Table } from "react-bootstrap";
import LoadingState from "../../pages/LoadingState/LoadingState";
import { placeLoadingShow } from "../../redux/reducers/loadingStateSlice";
import { formatDate } from "../../utils/dateConvert";
import axios from "axios";

const LeasePropertyList = () => {
  const dispatch = useDispatch();
  const { page, size } = useSelector((state) => state.pagination);
  const [data, setData] = useState([]);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [findingStatement, setFindingStatement] = useState(true);
  const handleClose = () => dispatch(placeLoadingShow(false));

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams({
          page,
          size,
        });
        const { data } = await axios.get(
          `${baseUrl}/api/leaseProperty?${queryParams.toString()}`
        );

        setData(data?.data?.data);

        setTotalDataCount(data?.data?.totalCount);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [page, size]);

  return (
    <div className="wrapper">
      <LoadingState handleClose={handleClose} />
      <div className="wrapper">
        <div className="content-wrapper h-0 " style={{ background: "unset" }}>
          <h4 className="customize mx-lg-5 mb-3">Lease Property</h4>
        </div>
      </div>
      <div className="content-wrapper mt-3 " style={{ background: "unset" }}>
        <section className="content customize_list "> 
          {/* /.row (main row) */}
          {isLoading ? (
            <p
              style={{ margin: "150px 0" }}
              className="text-center text-danger fw-bold"
            >
              Please Wait... <Spinner size="sm" animation="grow" />
            </p>
          ) : data?.length > 0 ? (
            <div className="card">
              <div className="card-body card_body_sm">
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Date</th>
                      <th>Owner Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Property Type</th>
                      <th>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.length ? (
                      data.map((lease, ind) => (
                        <tr style={{ fontSize: "15px", border: "none" }}>
                          <td>{ind + 1}</td>
                          <td>{formatDate(lease?.createdAt)}</td>
                          <td>{lease?.name}</td>
                          <td>{lease?.mobile}</td>
                          <td>{lease?.email}</td>
                          <td>{lease?.propertyType}</td>
                          <td>{lease?.address}</td>
                        </tr>
                      ))
                    ) : (
                      <p></p>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
          ) : findingStatement ? (
            <p className="text-center text-danger fw-bold">
              Finding Transactions... <Spinner size="sm" animation="grow" />
            </p>
          ) : (
            <p className="text-center text-danger fw-bold">No Data Found</p>
          )}
        </section>
        {/* pagination */}
        <Pagination totalDataCount={totalDataCount} />
      </div>
    </div>
  );
};

export default LeasePropertyList;
