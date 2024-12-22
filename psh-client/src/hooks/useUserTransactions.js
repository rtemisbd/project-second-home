import { useContext } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../contexts/UserProvider";
import { serverBaseUrl } from "../serverApi/baseUrl";

const useUserTransactions = () => {
  const [transactions, setTransaction] = useState([]);
  const { user } = useContext(AuthContext);

  const { isLoading, refetch } = useQuery([user?.phone], () =>
    fetch(`${serverBaseUrl}/transaction/${user?.phone}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        setTransaction(data?.data);
      })
  );
  console.log(transactions);

  return [transactions, refetch];
};

export default useUserTransactions;
