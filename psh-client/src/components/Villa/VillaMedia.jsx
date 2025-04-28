import React, { useCallback, useEffect, useRef, useState } from "react";
import { MdClose, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import YouTube from "react-youtube";
import ImageViewer from "react-simple-image-viewer";
import getYouTubeVideoId from "../../helpers/utils/getYouTubeVideoId";
import { playerOptions } from "../../helpers/utils/playerOptions";

const VillaMedia = ({ video, photos = [] }) => {
  const videoId = getYouTubeVideoId(video);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerContainerRef = useRef(null);
  const playerRef = useRef(null);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
    if (playerRef.current) {
      if (!isMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
    }
  };

  const openVideoInYouTube = (e) => {
    e.stopPropagation();
    if (video) window.open(video, "_blank");
  };

  const handleReady = (event) => {
    playerRef.current = event.target;
    if (isMuted) {
      event.target.mute();
    } else {
      event.target.unMute();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsPlaying(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (playerContainerRef.current) {
      observer.observe(playerContainerRef.current);
    }

    return () => {
      if (playerContainerRef.current) {
        observer.unobserve(playerContainerRef.current);
      }
    };
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 mb-4">
        {/* Video Section */}
        <div
          ref={playerContainerRef}
          className="relative group rounded w-full lg:h-[371px] md:h-[280px] sm:h-[200px] cursor-pointer overflow-hidden bg-gray-100"
          onClick={openVideoInYouTube}
        >
          {videoId ? (
            <>
              {isPlaying && (
                <div className="w-full h-full">
                  <YouTube
                    videoId={videoId}
                    opts={playerOptions}
                    onReady={handleReady}
                    className="w-full h-full"
                  />
                </div>
              )}

              <button
                onClick={toggleMute}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg text-black z-10 opacity-80 hover:opacity-100"
              >
                {isMuted ? <MdVolumeUp size={20} /> : <MdVolumeOff size={20} />}
              </button>

              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
            </>
          ) : (
            <Skeleton className="w-full aspect-video rounded-lg" />
          )}
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-2 gap-y-[3px] md:gap-y-1 gap-x-1 md:gap-x-[6px] ml-1 md:ml-[6px] relative">
          {photos?.slice(0, 4).length ? (
            photos?.slice(0, 4).map((photo, index) => (
              <div key={index} onClick={() => openImageViewer(index)}>
                <img
                  src={photo}
                  alt=""
                  className="rounded w-full lg:h-[183px] md:h-[134px] sm:h-[100px]"
                />
              </div>
            ))
          ) : (
            <>
              {[...Array(4)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="rounded w-full lg:h-[180px] md:h-[134px] sm:h-[100px]"
                />
              ))}
            </>
          )}
          {photos?.length > 4 && (
            <div className="absolute md:bottom-16 sm:bottom-10 md:right-28 sm:right-5">
              <span className="md:text-5xl sm:text-[25px]">
                +{photos?.slice(4).length}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Image Viewer Modal */}
      {isViewerOpen && (
        <>
          <ImageViewer
            src={photos}
            currentIndex={currentImage}
            disableScroll={false}
            closeOnClickOutside={true}
            onClose={closeImageViewer}
            leftArrowComponent={"<"}
            rightArrowComponent={">"}
            backgroundStyle={{
              backgroundColor: "rgba(0,0,0,0.9)",
            }}
          />
          <button
            className="fixed top-20 right-4 bg-white text-black p-2 rounded-full shadow-lg bg-opacity-70 hover:bg-opacity-100"
            onClick={closeImageViewer}
            style={{ zIndex: 1001 }}
          >
            <MdClose size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default VillaMedia;
