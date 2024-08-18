import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useQuery } from "react-query";
import { formatDate } from "../../utils/dateConvert";

const StudySpace = () => {
  const [data, setData] = useState([]);

  const { refetch } = useQuery(
    ["fetchTeachingData"],
    async () => {
      try {
        const response = await fetch(
          `https://api.psh.com.bd/api/teaching-form`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Network Error");
        }

        const data = await response.json();
        setData(data?.data);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <section className="content customize_list">
          <div className="container-fluid">
            <h4 className="mb-4">Study Applications :</h4>
            <Table bordered responsive>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Purpose</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Arrival Date</th>
                  <th>Arrival Time</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((study, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{study?.purpose}</td>
                    <td>{study?.name}</td>
                    <td>{study?.mobileNumber}</td>
                    <td>{formatDate(study?.arrivalDate)}</td>
                    <td>{study?.arrivalTime}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudySpace;
