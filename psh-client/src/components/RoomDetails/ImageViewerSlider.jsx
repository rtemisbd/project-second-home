import React, { useCallback, useState } from "react";
import { MdClose } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import ImageViewer from "react-simple-image-viewer";

const ImageViewerSlider = ({ photos }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <div>
      <div className="grid grid-cols-2 cursor-pointer details-img">
        <div onClick={() => openImageViewer(0)}>
          {photos.length ? (
            <img
              src={photos[0]}
              className="rounded w-[100%] lg:h-[400px] md:h-[280px] sm:h-[230px]"
              alt=""
            />
          ) : (
            <Skeleton className=" w-[100%] lg:h-[400px] md:h-[280px] sm:h-[230px]" />
          )}
        </div>
        <div className="grid grid-cols-2 gap-3 ml-3 relative">
          {photos ? (
            photos?.slice(1, 5).map((photo, index) => (
              <div key={index} onClick={() => openImageViewer(index)}>
                <img
                  src={photo}
                  alt=""
                  className="rounded w-[100%] lg:h-[195px] md:h-[134px] sm:h-[110px]"
                />
              </div>
            ))
          ) : (
            <>
              <Skeleton className="rounded w-[100%] lg:h-[195px] md:h-[134px] sm:h-[110px]" />
              <Skeleton className="rounded w-[100%] lg:h-[195px] md:h-[134px] sm:h-[110px]" />
              <Skeleton className="rounded w-[100%] lg:h-[195px] md:h-[134px] sm:h-[110px]" />
              <Skeleton className="rounded w-[100%] lg:h-[195px] md:h-[134px] sm:h-[110px]" />
            </>
          )}
          <div className="absolute md:bottom-16 sm:bottom-10 md:right-28 sm:right-5">
            <span className="md:text-5xl sm:text-[25px] ">
              +{photos ? photos?.slice(4).length : ""}
            </span>
          </div>
        </div>
      </div>
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
            className="fixed top-20 right-4 bg-white text-black p-2 rounded-full shadow-lg bg-opacity-70 hover:bg-opacity-100 "
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

export default ImageViewerSlider;
