import { useContext } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../contexts/UserProvider";
import { serverBaseUrl } from "../serverApi/baseUrl";

const useUserTransactions = () => {
  const [transactions, setTransaction] = useState([]);
  const { user } = useContext(AuthContext);

  const { isLoading, refetch } = useQuery([user?.email], () =>
    fetch(`${serverBaseUrl}/transaction/${user?.email}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setTransaction(data?.transaction);
      })
  );
  return [transactions, refetch];
};

export default useUserTransactions;
