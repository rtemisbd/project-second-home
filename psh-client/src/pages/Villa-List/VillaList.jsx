import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { serverBaseUrl } from "../../serverApi/baseUrl";
import { PropagateLoader } from "react-spinners";
import VillaCard from "../../components/home/VillaCard";

const VillaList = () => {
  const { state } = useLocation();
  console.log(state);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [bookedData, setBookedData] = useState([]);

  const [resort, setResort] = useState(state?.resort || "");
  const [adults, setAdults] = useState(state?.adults || 0);
  const [kids, setKids] = useState(state?.kids || 0);
  const [checkIn, setCheckIn] = useState(state?.checkIn || "");
  const [checkOut, setCheckOut] = useState(state?.checkOut || "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({
          resortId: resort,
          adults,
          kids,
          isPublished: "Published",
        });

        const { data } = await axios.get(
          `${serverBaseUrl}/villa?${queryParams.toString()}`
        );

        setData(data?.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
        throw error;
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBookedData = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({
          resort: resort,
          bookStartDate: checkIn,
          bookEndDate: checkOut,
        });
    
        const { data } = await axios.get(
          `${serverBaseUrl}/villaRentDates?${queryParams.toString()}`
        );

        setBookedData(data?.data);
        // setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
        throw error;
      }
    };

    fetchBookedData();
  }, []);

  console.log(data);
  console.log(bookedData);

  return (
    <div className="custom-container">
      {/* <Header type="list" /> */}
      <div className="mt-5">
        <div className="grid grid-cols-12">
          <div className="flex flex-col col-span-12 sm:col-span-12 lg:col-span-12">
            {loading ? (
              <p className="flex justify-center py-96">
                <PropagateLoader
                  size={13}
                  speedMultiplier={0.8}
                  color="#36d7b7"
                />{" "}
              </p>
            ) : data?.length > 0 ? (
              <>
                <div className="px-4 md:px-0 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-x-7 lg:gap-x-5">
                  {data?.map((villa) => (
                    <div key={villa._id}>
                      <VillaCard villa={villa} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center items-center text-bg-danger not_found h-[800px]">
                  <div>
                    <h1 className="sorry_text_h1">
                      Sorry!
                      <br />
                      <span>No Results Found</span>
                    </h1>
                    <p className="sorry_text_p">
                      It looks like we couldn't find any available rooms or
                      seats matching your criteria.
                    </p>
                    <div className="mt-12">
                      <Link to={"/"}>
                        <button className="ml-1 rounded bg-[#00bbb4] font-bold px-8 py-3 uppercase text-white text-sm">
                          GO TO HOME
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div>
                    <img
                      className="img-fluid"
                      src="/assets/img2/Sorry 2.png"
                      alt="sorry psh"
                      style={{ width: "100%", height: 600 }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaList;
