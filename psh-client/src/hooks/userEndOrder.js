import { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../contexts/UserProvider";
import { serverBaseUrl } from "../serverApi/baseUrl";

const userEndOrder = () => {
  const { user } = useContext(AuthContext);
  const {
    data: userOrder,
    isLoading,
    refetch,
  } = useQuery([user], () =>
    fetch(`${serverBaseUrl}/order/${user?.email}`, {
      method: "GET",
    }).then((res) => res.json())
  );

  return [userOrder, refetch, isLoading];
};

export default userEndOrder;
