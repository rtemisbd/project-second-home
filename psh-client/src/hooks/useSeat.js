import { useEffect, useState } from "react";
import { serverBaseUrl } from "../serverApi/baseUrl";

const useSeat = () => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    fetch(`${serverBaseUrl}/seats`)
      .then((res) => res.json())
      .then((data) => {
        setSeats(data.data);
      });
  }, []);
  return seats;
};
export default useSeat;
