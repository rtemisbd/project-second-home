import React, { useEffect, useRef, useState } from "react";
import healthyMealIcon from "../../assets/img/healthy-meal.png";
import security24 from "../../assets/img/security-24.svg";
import "./styles/Facility.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";
import "@splidejs/react-splide/css/core";
import YouTube from "react-youtube";
import { youtubeSlider } from "../../helpers/utils/youtubeSlider";
import LoadingState from "../../pages/LoadingState/LoadingState";

const Facility = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [videoEnded, setVideoEnded] = useState([]);
  // const [youtubeVideoLinks, setYoutubeVideoLinks] = useState([]);
  const splideRef = useRef(null);
  const playerRefs = useRef([]);

  const youtubeVideoLinks = [
    "https://www.youtube.com/embed/B7kZf4bmj1s?si=dXWNL8qtTsk27-rK?rel=0",
    "https://youtu.be/VoDUk7G1dN4?si=ficVVq7oBB6v8ke1?rel=0",
    "https://youtu.be/dHMzkV5XZ0Y?si=rQ1vONFrJt8k5j2b?rel=0",
    "https://youtu.be/SpgFHQ9LFTU?si=QU_L3Q2yfVkoqPky?rel=0",
    "https://youtu.be/mPbJNN1sPwI?si=Y5ly5yTSau2IgcxO?rel=0",
  ];

  // useEffect(() => {
  //   const fetchPlaylistVideos = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `https://youtube.com/playlist?list=PLhmWShztbaVd3O69pu5yGVGUz0IYHUwAX`
  //       );
  //       const $ = cheerio.load(data);

  //       const videoData = [];
  //       $('a[title][href*="/watch"]').each((index, element) => {
  //         const title = $(element).attr("title");
  //         const videoId = $(element).attr("href").split("v=")[1].split("&")[0];
  //         videoData.push({ title, videoId });
  //       });

  //       setYoutubeVideoLinks(videoData);
  //     } catch (error) {
  //       console.error("Error scraping playlist data:", error);
  //     }
  //   };

  //   fetchPlaylistVideos();
  // }, []);

  const videoOptions = {
    playerVars: {
      autoplay: 0,
      rel: 0,
    },
  };

  const extractVideoId = (url) => {
    const regex = /(?:\?v=|\/embed\/|\.be\/|\/v\/)([^&#?/]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };
  const handleSlideChange = (splide) => {
    const newActiveSlide = splide.index;
    setActiveSlide(newActiveSlide);

    playerRefs.current.forEach((player, index) => {
      if (player) {
        if (index === newActiveSlide) {
          player.playVideo();
        } else {
          player.pauseVideo();
        }
      }
    });
  };

  const handleVideoEnd = (index) => {
    // Mark the video as ended
    setVideoEnded((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = true;
      return updatedState;
    });
  };

  return (
    <div className="md:py-[20px] bg-gray-100">
      <div className="custom-container ">
        <div className=" flex items-center flex-col-reverse md:flex-row gap-16">
          {/* Left Section */}
          <div className="w-full md:w-1/2 space-y-8 sm:px-4 md:px-0 facility sm:mb-4">
            {/* Feature Item */}
            <div className=" w-full flex items-center gap-4 border-white border-l-4 border-r-0 border-b-0 border-t shadow-sm py-2 rounded-lg">
              <div>
                <img
                  src="/images/Icon.png"
                  alt="Wi-Fi Icon"
                  className="facility_img"
                />
              </div>
              <div>
                <h2>Enjoy free Wi-Fi</h2>
                <p className="sm:text-sm md:text-base mt-1">
                  Enjoy complimentary high-speed internet access throughout the
                  premises
                </p>
              </div>
            </div>
            {/* Feature Item */}
            <div className="  w-full flex items-center gap-4 border-white border-l-4 border-r-0 border-b-0 border-t shadow-sm py-2 rounded-lg  ">
              <div>
                <img
                  src={healthyMealIcon}
                  alt="Healthy Meal Icon"
                  className="facility_img"
                />
              </div>
              <div>
                <h2>Healthy Meal</h2>
                <p className="sm:text-sm md:text-base mt-1">
                  Provide nutritious and well-balanced meal choices prepared
                  with fresh ingredients.
                </p>
              </div>
            </div>
            {/* Feature Item */}
            <div className="  w-full flex items-center gap-4 border-white border-l-4 border-r-0 border-b-0 border-t shadow-sm py-2 rounded-lg ">
              <div>
                <img
                  src={security24}
                  alt="Security Icon"
                  className="facility_img"
                />
              </div>
              <div>
                <h2>24/7 Security</h2>
                <p className="sm:text-sm md:text-base mt-1">
                  Rest assured with round-the-clock security measures to ensure
                  a safe and secure environment.
                </p>
              </div>
            </div>
          </div>

          {/* YouTube Slider */}
          <div className="w-full md:w-1/2 px-3 ">
            <Splide
              options={youtubeSlider(youtubeVideoLinks)}
              onMove={handleSlideChange}
              ref={splideRef}
            >
              {youtubeVideoLinks.map((link, index) => {
                const videoId = extractVideoId(link);
                return (
                  <SplideSlide key={index} className="aspect-w-16 aspect-h-9">
                    {videoId ? (
                      <div>
                        <YouTube
                          videoId={videoId}
                          opts={videoOptions}
                          onReady={(event) => {
                            playerRefs.current[index] = event.target;
                          }}
                          onEnd={() => handleVideoEnd(index)}
                        />
                      </div>
                    ) : (
                      <LoadingState />
                    )}
                  </SplideSlide>
                );
              })}
            </Splide>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facility;
