import { useState } from "react";
import { useQuery } from "react-query";
import { getFromLocalStorage } from "../utils/local-storage";
import { authKey } from "../utils/storageKey";

const useTransaction = () => {
  const [transactions, setTransaction] = useState([]);
  // Get the access token
  const accessToken = getFromLocalStorage(authKey);

  // Set the headers
  const headers = {
    Authorization: `${accessToken}`,
    "Content-Type": "application/json",
  };
  const { isLoading, refetch } = useQuery([transactions], () =>
    fetch(`https://api.psh.com.bd/api/transaction`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setTransaction(data?.transaction);
      })
  );
  return [transactions, refetch];
};

export default useTransaction;
