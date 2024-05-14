import { useContext } from "react";
import { useEffect, useState } from "react";
import { serverBaseUrl } from "../serverApi/baseUrl";

const usePromos = () => {
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    fetch(`${serverBaseUrl}/promo`)
      .then((res) => res.json())
      .then((data) => setPromos(data));
  }, []);
  return [promos];
};
export default usePromos;
