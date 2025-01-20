import { useDispatch, useSelector } from "react-redux";
import LoadingState from "../../pages/LoadingState/LoadingState";
import Pagination from "../Pagination/Pagination";
import { placeLoadingShow } from "../../redux/reducers/loadingStateSlice";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { baseUrl } from "../../utils/getBaseURL";

const NewAdminPropertyList = () => {
  const dispatch = useDispatch();
  const { page, size } = useSelector((state) => state.pagination);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [data, setData] = useState([]);

  const handleClose = () => dispatch(placeLoadingShow(false));

  const { refetch } = useQuery(["propertyList"], async () => {
    try {
      // Construct query parameters
      const queryParams = new URLSearchParams({
        page,
        size,
        fromClient: true,
      });

      // Pass the query parameters in the URL
      const response = await axios.get(
        `${baseUrl}/api/property/admin?${queryParams.toString()}`
      );
      console.log("Response Data:", response);

      // Check if data exists
      if (response?.data?.properties) {
        setData(response.data.properties);
        setTotalDataCount(response.data.totalCount);
      } else {
        console.log("No properties found");
        setData([]);
        setTotalDataCount(0);
      }
    } catch (err) {
      console.error("Error fetching properties:", err);
      throw err;
    }
  });
  console.log(data);

  useEffect(() => {
    refetch();
  }, [refetch, page, size]);

  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <section className="content customize_list">
          <div className="container-fluid">
            <LoadingState handleClose={handleClose} />
          </div>
          <Pagination totalDataCount={totalDataCount} />
        </section>
      </div>
    </div>
  );
};

export default NewAdminPropertyList;
