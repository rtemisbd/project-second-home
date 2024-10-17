import { useState } from "react";
import { useQuery } from "react-query";
import { getFromLocalStorage } from "../utils/local-storage";
import { authKey } from "../utils/storageKey";

const useBooking = () => {
  const [bookings, setBookings] = useState([]);
  // Get the access token
  const accessToken = getFromLocalStorage(authKey);

  // Set the headers
  const headers = {
    Authorization: `${accessToken}`,
    "Content-Type": "application/json",
  };

  const { isLoading, refetch } = useQuery([bookings], () =>
    fetch(`https://api.psh.com.bd/api/order`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings(data?.orders);
      })
  );
  setTimeout(() => {
    refetch();
  }, 5000);
  return [bookings, refetch];
};

export default useBooking;
