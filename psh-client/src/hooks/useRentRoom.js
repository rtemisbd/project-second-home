import { useState } from "react";
import { useQuery } from "react-query";
import { serverBaseUrl } from "../serverApi/baseUrl";

const useRentRoom = () => {
  const [bookedDates, setBookedDate] = useState([]);
  const { isLoading, refetch } = useQuery([], () => {
    const queryParams = new URLSearchParams({
      checkingDate: new Date(),
    });
    fetch(`${serverBaseUrl}/rent-rooms?${queryParams.toString()}`, {
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
