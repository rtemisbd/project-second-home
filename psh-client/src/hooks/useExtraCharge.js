import { useState } from "react";
import { useQuery } from "react-query";

const useExtraCharge = ({ data }) => {
  const [extraCharge, setExtraCharge] = useState([]);
  const { isLoading, refetch } = useQuery([data], () =>
    fetch(`https://api.psh.com.bd/api/extraCharge`, {
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
