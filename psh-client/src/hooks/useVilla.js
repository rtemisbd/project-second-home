import { useEffect, useState } from "react";
import { serverBaseUrl } from "../serverApi/baseUrl";
import axios from "axios";

const useVilla = () => {
  const [villas, setVillas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${serverBaseUrl}/villa?isPublished=Published`
      );
      setVillas(data?.data);
    };
    fetchData();
  }, []);

  return villas;
};
export default useVilla;
