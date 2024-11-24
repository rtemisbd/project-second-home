import { useEffect, useState } from "react";
import { serverBaseUrl } from "../serverApi/baseUrl";

const useRecommended = () => {
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const queryParams = new URLSearchParams({ recommended: "yes" });
    fetch(`${serverBaseUrl}/property/properties/recommended`)
      .then((res) => res.json())
      .then((data) => {
        setRecommended(data);
      });
  }, []);

  return recommended;
};
export default useRecommended;
