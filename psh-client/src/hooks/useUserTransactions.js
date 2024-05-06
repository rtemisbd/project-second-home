import { useContext } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../contexts/UserProvider";

const useUserTransactions = () => {
  const [transactions, setTransaction] = useState([]);
  const { user } = useContext(AuthContext);
  console.log(user);
  const { isLoading, refetch } = useQuery([user?.email], () =>
    fetch(`https://api.psh.com.bd/api/transaction/${user?.email}`, {
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
