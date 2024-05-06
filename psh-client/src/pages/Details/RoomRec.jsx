import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";
import SingleCard from "../../components/home/SingleCard";

const RoomRec = ({ publishedRecomended }) => {
  return (
    <Splide
      options={{
        // type: "loop",
        arrows: publishedRecomended?.length > 5 ? true : false,
        rewind: true,
        drag: "free",
        autoplay: true,
        gap: "1rem",
        perPage: 5,
        height: "22rem",
        pagination: false,
        breakpoints: {
          1200: { arrows: true, perPage: 5 },
          800: { arrows: true, perPage: 2 },
          640: { arrows: true, perPage: 1, padding: "5rem" },
        },
      }}
    >
      {publishedRecomended?.map((item, index) => (
        <SplideSlide>
          <SingleCard item={item} key={index} />
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default RoomRec;
