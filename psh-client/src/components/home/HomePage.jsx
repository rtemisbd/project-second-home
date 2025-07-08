import React from "react";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import SingleCard from "./SingleCard";
import CardSkeleton from "../CardSkeleton/CardSkeleton";
import VillaCard from "./VillaCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { propertySlider } from "../../helpers/utils/projectSlider";
import "./styles/Recommended.css";
import "./styles/SingleCard.css";

export default function HomePage({
  data,
  activeTab,
  categories,
  handleTabChange,
  villas,
  showVilla,
}) {
  console.log(data);

  return (
    <div className="category-item">
      <div className="text-left mt-3">
        <Tabs value={activeTab}>
          <TabsHeader
            className="rounded-none bg-transparent p-0 md:gap-x-5 sm:gap-x-4 mb-2"
            indicatorProps={{
              className:
                "bg-transparent border-b-2 border-[#00BBB4] shadow-none rounded-none ",
            }}
          >
            <Tab
              value="All"
              onClick={() => handleTabChange("All")}
              className="w-fit md:text-[20px] sm:text-[14px] category-type z-0 text-[#00bbb4]"
            >
              Featured
            </Tab>
            {categories?.map((category, index) => (
              <Tab
                value={category.name}
                key={index}
                onClick={() => handleTabChange(category.name)}
                className="w-fit md:text-[20px] sm:text-[12px] category-type px-0 z-0"
              >
                {category.name}
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
      </div>

      {/* Cards */}
      {data?.length ? (
        <Splide options={propertySlider(data)}>
          {data.map((item) => (
            <SplideSlide key={item?._id}>
              <SingleCard item={item} />
            </SplideSlide>
          ))}
        </Splide>
      ) : villas?.length && showVilla ? (
        <Splide options={propertySlider(villas)}>
          {villas.map((villa) => (
            <SplideSlide key={villa?._id}>
              <VillaCard villa={villa} />
            </SplideSlide>
          ))}
        </Splide>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-x-5">
          <CardSkeleton cards={4} />
        </div>
      )}
    </div>
  );
}
