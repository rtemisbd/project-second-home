import { useEffect, useState } from "react";
import { baseUrl } from "../utils/getBaseURL";

const usePromo = () => {
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/api/promo`)
      .then((res) => res.json())
      .then((data) => setPromos(data));
  }, []);
  return [promos];
};
export default usePromo;
