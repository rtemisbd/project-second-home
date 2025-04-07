import { useContext } from "react";
import { useEffect, useState } from "react";
import { AuthContext } from "../contexts/UserProvider";
import { serverBaseUrl } from "../serverApi/baseUrl";
import axios from "axios";
import getHeader from "../helpers/utils/getHeaders";


const useUser = () => {
  const [singleUser, setSingleUser] = useState(null);
  const { user } = useContext(AuthContext);
  const headers = getHeader()

  useEffect(() => {
    if (!user?._id || !headers) return; 

    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${serverBaseUrl}/users/${user?._id}`, {headers});
    
        setSingleUser(data?.data);
      } catch (error) {
        // console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []); 

  return [singleUser, setSingleUser]; 
};

export default useUser;
