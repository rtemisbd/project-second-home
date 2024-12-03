import { useState } from "react";
import { useQuery } from "react-query";
import { baseUrl } from "../utils/getBaseURL";

const useRentRoom = () => {
  const [bookedDates, setBookedDate] = useState([]);
  const { isLoading, refetch } = useQuery([], () => {
    const queryParams = new URLSearchParams({
      checkingDate: new Date(),
      // branch: branch,
    });
    fetch(`${baseUrl}/api/rent-rooms?${queryParams.toString()}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setBookedDate(data);
      });
  });
  return [bookedDates, refetch];
};

export default useRentRoom;
