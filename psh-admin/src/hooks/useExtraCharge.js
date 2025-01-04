import { useState } from "react";
import { useQuery } from "react-query";
import { baseUrl } from "../utils/getBaseURL";

const useExtraCharge = () => {
  const [extraCharge, setExtraCharge] = useState([]);
  const { isLoading, refetch } = useQuery([], () =>
    fetch(`${baseUrl}/api/extraCharge`, {
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
