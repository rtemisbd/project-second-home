import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverBaseUrl } from "../../serverApi/baseUrl";

const BannerSlider = () => {
  const [data, setData] = useState([]);
  const [visibleImages, setVisibleImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${serverBaseUrl}/banner`);
      setData(data);
      setVisibleImages(data.slice(0, 4));
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const interval = setInterval(() => {
      setAnimate(true);

      setTimeout(() => {
        const newIndex = (index + 4) % data.length;
        setVisibleImages(data.slice(newIndex, newIndex + 4));
        setIndex(newIndex);
        setAnimate(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [data, index]);

  return (
    <div className="max-w-screen-lg mx-auto flex gap-2  ">
      {visibleImages.map((item, ind) => (
        <div
          key={item?._id}
          className={`h-[170px] md:h-[346px] w-[245px] rounded-xl shadow overflow-hidden relative transition-all duration-500 ease-in
             ${ind === 0 || ind === 2 ? "sm:mt-2 md:mt-4" : "mt-0"}`}
        >
          <img
            src={item?.photos[0]}
            alt={item?.name}
            className={`absolute top-0 left-0 h-full w-full object-fill rounded-xl transition-all duration-500 ease-in
               ${
                 animate
                   ? "-translate-x-full opacity-0"
                   : "translate-x-0 opacity-100"
               }`}
          />
        </div>
      ))}
    </div>
  );
};

export default BannerSlider;
