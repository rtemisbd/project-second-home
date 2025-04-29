import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { serverBaseUrl } from "../../serverApi/baseUrl";

const ResortDetail = () => {
  const { id } = useParams();
  const [resort, setResort] = useState(null);
  const [addedWishList, setAddedWishlist] = useState(false);

  useEffect(() => {
    const fetchVilla = async () => {
      const { data } = await axios.get(`${serverBaseUrl}/resort/${id}`);
      setResort(data?.data);
    };
    fetchVilla();
  }, [id]);
  console.log(resort);

  return (
    <div>
      <h2>resort details</h2>
    </div>
  );
};

export default ResortDetail;
