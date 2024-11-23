import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getFromLocalStorage } from "../../utils/local-storage";
import { authKey } from "../../utils/storageKey";
import { baseUrl } from "../../utils/getBaseURL";

const ManageMeal = () => {
  const [data, setData] = useState([]);

  // Get all Bookings
  const { refetch } = useQuery(
    ["fetchBookings"], // Unique query key
    async () => {
      try {
        // Get the access token
        const accessToken = getFromLocalStorage(authKey);
        // Set the headers
        const headers = {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        };

        const response = await fetch(`${baseUrl}/api/order`, {
          method: "GET",
          headers: headers,
        });

        if (!response.ok) {
          throw new Error("Network Error");
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  // useEffect(() => {
  //   fetch(`http://localhost:8000/api/order`)
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // }, []);

  console.log(data);

  return (
    <div>
      <h2>meal : {data?.approvedCount}</h2>
    </div>
  );
};

export default ManageMeal;
