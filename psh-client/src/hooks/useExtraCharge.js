import { useState } from "react";
import { useQuery } from "react-query";
import { serverBaseUrl } from "../serverApi/baseUrl";

const useExtraCharge = ({ data }) => {
  const [extraCharge, setExtraCharge] = useState([]);
  const { isLoading, refetch } = useQuery([data], () =>
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
