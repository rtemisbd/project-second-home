import { useState } from "react";
import { useQuery } from "react-query";
import { serverBaseUrl } from "../serverApi/baseUrl";

const useExtraCharge = () => {
  const [extraCharge, setExtraCharge] = useState([]);
  const { isLoading, refetch } = useQuery([], () =>
    fetch(`${serverBaseUrl}/extraCharge`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setExtraCharge(data);
      })
  );
  return [extraCharge, refetch];
};

export default useExtraCharge;
