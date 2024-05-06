import { useEffect } from "react";
import { useState } from "react";

const useBranch = () => {
  const [allBranch, setAllBranch] = useState([]);
  useEffect(() => {
    fetch("https://api.psh.com.bd/api/branch")
      .then((res) => res.json())
      .then((data) => {
        setAllBranch(data);
      });
  }, []);
  return [allBranch];
};

export default useBranch;
