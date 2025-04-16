import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { serverBaseUrl } from "../../serverApi/baseUrl";
import VillaMedia from "../../components/Villa/VillaMedia";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

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
    <div className="custom-container sm:px-2 sm:pt-2 md:px-0 md:pt-0">
      {villa?.media?.photos.length > 0 ? (
        <div className="flex items-center gap-x-3 md:mt-3 sm:mt-0">
          <Link to="/" className="hover:text-[#00bbb4] md:block sm:hidden">
            <p>Home</p>
          </Link>
          <p className="sm:hidden md:block">
            <MdKeyboardArrowRight className="w-[20px] h-[20px]" />
          </p>

          <p className="sm:hidden md:block">Villa</p>

          <p className="sm:hidden md:block">
            <MdKeyboardArrowRight className="w-[20px] h-[20px]" />
          </p>
          <Link to="/" className="md:hidden sm:block">
            <p>
              <MdKeyboardArrowLeft className="w-[20px] h-[20px]" />
            </p>
          </Link>
          <p>Villa Details</p>
        </div>
      ) : (
        ""
      )}
      <div className="mt-2">
        <div className=" ">
          <VillaMedia
            video={villa?.media?.video}
            photos={villa?.media?.photos}
          />
        </div>
      </div>
    </div>
  );
};

export default VillaDetails;
