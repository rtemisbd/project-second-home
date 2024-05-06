import { useContext } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../contexts/UserProvider";

const useUserSubscription = () => {
  const [userSubscription, setUserSubscription] = useState([]);
  const { user } = useContext(AuthContext);

  const { isLoading, refetch } = useQuery([user?.email], () =>
    fetch(`https://api.psh.com.bd/api/subscriptionOrder/${user?.email}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserSubscription(data?.subscriptionHistory);
      })
  );
  return [userSubscription, refetch];
};

export default useUserSubscription;
