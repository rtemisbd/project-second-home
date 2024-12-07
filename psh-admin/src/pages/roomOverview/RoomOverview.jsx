import { useEffect, useState } from "react";
import { MdRefresh } from "react-icons/md";
import useBranch from "../../hooks/useBranch";
import useCategory from "../../hooks/useCategory";
import { Spinner } from "react-bootstrap";
import { useQuery } from "react-query";
import { baseUrl } from "../../utils/getBaseURL";

const RoomOverview = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [branch, setBranch] = useState("All");
  const [category, setCategory] = useState("All");

  const [data, setData] = useState([]);
  const [totalDataCount, setTotalDataCount] = useState(0);

  const { allBranch } = useBranch();
  const { categories } = useCategory();

  //   get properties
  const { refetch } = useQuery(
    ["fetchProperties", branch, category],
    async () => {
      try {
        const queryParams = new URLSearchParams({
          //   startDate: fromDate,
          //   endDate: toDate,
          destination: branch,
          category,
        });

        const response = await fetch(
          `${baseUrl}/api/property?${queryParams.toString()}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(`API error with status: ${response.status}`);
        }

        const json = await response.json();
        setData(json?.properties || []);
        setTotalDataCount(json?.totalCount || 0);
      } catch (error) {
        throw new Error(error);
      }
    }
    // { refetchOnWindowFocus: false }
  );
  console.log({ data, totalDataCount, category });

  useEffect(() => {
    refetch();
  }, [branch, category, refetch]);

  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <section className="content customize_list">
          <div className="container-fluid">
            {/* searching fields */}
            <div className="d-lg-flex justify-content-end gap-2 ">
              {/* from date */}
              <div className="">
                <label htmlFor="">From Date </label>
                <br />
                <div>
                  <input
                    type="date"
                    onChange={(e) => setFromDate(e.target.value)}
                    name=""
                    id="fromDateId"
                    value={fromDate}
                    className="rounded"
                  />
                </div>
              </div>
              {/* to date */}
              <div className="">
                <label htmlFor="">To Date </label> <br />
                <div>
                  <input
                    type="date"
                    name=""
                    id="toDateId"
                    onChange={(e) => setToDate(e.target.value)}
                    value={toDate}
                    className="rounded"
                  />
                </div>
              </div>
              {/* branch */}
              <div>
                <label htmlFor="">Branch </label> <br />
                <select
                  className="rounded"
                  style={{ height: "30px" }}
                  onChange={(e) => setBranch(e.target.value)}
                  id="branchId"
                  value={branch}
                >
                  <option value="All">All</option>
                  {allBranch?.map((branch) => (
                    <option value={branch?.name}>{branch?.name}</option>
                  ))}
                </select>
              </div>
              {/* category */}
              <div>
                <label htmlFor="">Room Type </label> <br />
                <select
                  className="rounded"
                  style={{ height: "30px" }}
                  onChange={(e) => setCategory(e.target.value)}
                  id="categoryId"
                  value={category}
                >
                  <option value="">All</option>
                  {categories?.map((category) => (
                    <option value={category?.name}>{category?.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <hr style={{ height: "1px", background: "rgb(191 173 173)" }} />
            {/* overview table */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default RoomOverview;
