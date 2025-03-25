import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverBaseUrl } from "../../serverApi/baseUrl";

const VillaDetails = () => {
  const { id } = useParams();
  const [villa, setVilla] = useState(null);

  useEffect(() => {
    const fetchVilla = async () => {
      const { data } = await axios.get(`${serverBaseUrl}/villa/${id}`);
      setVilla(data?.data);
    };
    fetchVilla();
  }, [id]);
  console.log(villa);

  return (
    <div>
      <h2>villa details</h2>
    </div>
  );
};

export default VillaDetails;
