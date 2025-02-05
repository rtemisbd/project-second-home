import React from "react";

const RoomReview = () => {
  return (
    <div className="w-full">
      <div className="facility_h1 p-2 flex mt-5">
        <h2 className="text-xl font-bold text-gray-900 ">
          Reviews {activeReviews?.length}
        </h2>
        {activeReviews?.length > 0 && (
          <div className="flex">
            <div>
              <img
                src="../images/icon/Vector (1).png"
                alt=""
                className="ms-5 mt-1"
                style={{ width: 20, height: 20 }}
              />
            </div>
            <p className="ms-3 text-2xl">5.0</p>
          </div>
        )}
      </div>
      {activeReviews?.slice(0, 1).map((item) => (
        <div key={item.id}>
          <div className="flex items-center gap-x-3 mt-4">
            <p>
              <img loading="lazy" src={profileIcon} alt="" />
            </p>
            <p>{item?.userName}</p>
            <p className="bg-[#FFB800] text-white px-2 rounded">5.0</p>
            <p>
              {item?.createdAt
                ? format(new Date(item.createdAt), "yyyy-MM-dd HH:mm:ss")
                : ""}
            </p>
          </div>
          <p className="mt-2 pl-12">{item?.comment}</p>
        </div>
      ))}

      {activeReviews?.length > 0 && (
        <div className="mt-10">
          <button
            className="text-[#399] border px-8 py-2 border-[#399] hover:bg-[#399] hover:text-white rounded"
            onClick={handleDetailsShow}
          >
            See All {activeReviews?.length} Reviews
          </button>
        </div>
      )}

      <ReviewAll
        handleDetailsShow={handleDetailsShow}
        detailsShow={detailsShow}
        activeReviews={activeReviews}
      />
    </div>
  );
};

export default RoomReview;
