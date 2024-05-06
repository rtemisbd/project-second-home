import React, { useEffect, useState } from "react";

const Map = ({ branch }) => {
  return (
    <div>
      <div>
        <iframe
          src={branch?.locationLink}
          width="100%"
          height="400"
          style={{ border: 0 }}
          // allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="map-link"
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
