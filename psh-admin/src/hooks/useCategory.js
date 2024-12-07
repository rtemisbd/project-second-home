import { useState } from "react";
import { useQuery } from "react-query";
import { baseUrl } from "../utils/getBaseURL";

const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const { isLoading, refetch } = useQuery("categories", () =>
    fetch(`${baseUrl}/api/category`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
  );

  return {
    categories,
    isLoading,
    refetch,
  };
};

export default useCategory;
