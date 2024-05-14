import { useEffect } from "react";
import { useState } from "react";
import { serverBaseUrl } from "../serverApi/baseUrl";

const useBranch = () => {
  const [allBranch, setAllBranch] = useState([]);
  useEffect(() => {
    fetch(`${serverBaseUrl}/branch`)
      .then((res) => res.json())
      .then((data) => {
        setAllBranch(data);
      });
  }, []);
  return [allBranch];
};

export default useBranch;
