import React, { useState } from "react";
import UseFetch from "../../hooks/useFetch";

const Facilities = ({ allFacilities }) => {
  const { data: facilities } = UseFetch("facilityCategory");
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleExpand = (id) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <>
      {facilities?.map((pd) => (
        <div style={{ width: "100%" }} key={pd._id} className="text-sm">
          <div className="facility_h1 p-2">
            <h2 id={pd?.name} className="text-xl font-bold text-gray-900">
              {pd.name}
            </h2>
          </div>
          <div className="grid grid-cols-6 md:gap-x-4 md:gap-y-16 sm:gap-y-4 py-5 md:px-2">
            {(expandedCategories[pd._id]
              ? allFacilities?.filter((res) => res.facilityCategory === pd._id)
              : allFacilities
                  ?.filter((res) => res.facilityCategory === pd._id)
                  ?.slice(0, 5)
            )?.map((item) => (
              <React.Fragment key={item._id}>
                <div className="flex flex-col items-start col-span-12 sm:col-span-2 lg:col-span-1 md:col-span-3">
                  <div>
                    <div className="flex md:justify-center sm:justify-start">
                      <img
                        src={item.photos[0]}
                        alt=""
                        style={{ maxWidth: "none" }}
                        className="sm:w-[22px]"
                      />
                    </div>

                    <h2 className="mt-3 text-gray-900">
                      {item.name ? item.name : ""}
                    </h2>
                  </div>
                </div>
              </React.Fragment>
            ))}

            {allFacilities?.filter((res) => res.facilityCategory === pd._id)
              .length > 5 && (
              <div
                className="flex flex-col items-start col-span-12 md:space-y-3 sm:space-y-1 sm:col-span-2 lg:col-span-1 md:col-span-3 cursor-pointer"
                onClick={() => toggleExpand(pd._id)}
              >
                <p className="bg-[#F4F4F4] px-5 py-3 font-bold">
                  {expandedCategories[pd._id] ? "See Less" : "See More"}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Facilities;
