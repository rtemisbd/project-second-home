import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Recommended from "../../components/home/Recommended";
import UseFetch from "../../hooks/useFetch";

const EventDetails = () => {
  const { id } = useParams();
  const { data: allEvent } = UseFetch(`event`);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`https://api.psh.com.bd/api/event/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [id]);
  return (
    <div className="custom-container sm:px-2 sm:pt-2 md:px-0 md:pt-0">
      <div className="custom-container">
        <h2 className="text-xl font-bold mb-5 mt-12">{data?.name}</h2>
        <div className=" md:px-0 sm:px-6 ">
          <div className="image-overlay-container">
            <img
              className="image-overlay-img"
              src={data?.photos}
              alt="Overlay Image"
            />
            {/* <div className="image-overlay-text">
              <div className="sm:p-2 flex text-white">
                <p className="layout_tag">{data?.name}</p>
                <p className="mx-4 layout_dot">.</p>
                <p className="layout_date">10 December 2023</p>
              </div>
              <div className="sm:p-2">
                <h6 className="business font-bold">
                  Jadi Tontonan Wajib Saat Natal, Ini 6 Urutan Film Home Alone
                  dari Paling Lama hingga Terbaru
                </h6>
              </div>
              <div className="sm:p-2">
                <p className="layout_p">
                  Intip rekomendasi beach club di Bali ini untuk melihat sunset
                  atau menikmati suasana pinggir pantai seru bersama oran…
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 sm:px-5 gap-x-8 gap-y-16">
        <div className="flex flex-col items-start col-span-8 space-y-3 sm:col-span-12 xl:col-span-8">
          <span className="text-green-700 text-sm hidden md:block mt-4">
            {" "}
            {data?.name}
          </span>
          {/* <h1 className="text-gray-800 text-4xl font-bold mt-2 mb-2 leading-tight">
            Ignorant branched humanity led now marianne too.
          </h1> */}
          {/* <p className="text-gray-600 mb-4"> */}
          <div
            dangerouslySetInnerHTML={{ __html: data?.desc }}
            key={data._id}
            style={{ maxWidth: "80%" }}
          />
        </div>

        <div className="flex flex-col items-start col-span-4 space-y-3 sm:col-span-12 xl:col-span-4 mt-12">
          {allEvent?.map((item) => (
            <Link to={`/event/${item?._id}`} key={item?._id}>
              <div className="rounded w-full flex flex-col md:flex-row mb-10">
                <img
                  src={item?.photos[0]}
                  className="block md:hidden lg:block rounded-md h-64 md:h-32 m-4 md:m-0"
                />
                <div className="bg-white rounded px-4">
                  <span className="text-green-700 text-sm hidden md:block">
                    {" "}
                    {item?.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Recommended />
    </div>
  );
};

export default EventDetails;
