import { useState } from "react";
import { useQuery } from "react-query";
import { baseUrl } from "../utils/getBaseURL";

const useBranch = () => {
  const [allBranch, setAllBranch] = useState([]);
  const { isLoading, refetch } = useQuery("branches", () =>
    fetch(`${baseUrl}/api/branch`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setAllBranch(data);
      })
  );

  // setTimeout(() => {
  //   refetch();
  // }, 5000);

  return {
    allBranch,
    isLoading,
    refetch,
  };
};

export default useBranch;
