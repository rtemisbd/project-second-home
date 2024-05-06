import { useContext } from "react";
import { useEffect, useState } from "react";
import { AuthContext } from "../contexts/UserProvider";

const useUser = () => {
  const [singleUser, setSingleUser] = useState({});
  const { user } = useContext(AuthContext);
  useEffect(() => {
    fetch(`https://api.psh.com.bd/api/users/${user?._id}`)
      .then((res) => res.json())
      .then((data) => setSingleUser(data));
  }, []);
  return [singleUser];
};
export default useUser;
