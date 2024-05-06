import React from "react";
import Skeleton from "react-loading-skeleton";
import "./CardSkeleton.css";
const CardSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((item, i) => (
      <div key={i}>
        <Skeleton className="rounded" height={150} width={"100%"} />
        <Skeleton count={5} />
      </div>
    ));
};

export default CardSkeleton;
