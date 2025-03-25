import { useContext } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../contexts/UserProvider";
import { serverBaseUrl } from "../serverApi/baseUrl";
import axios from "axios";
import getHeader from "../helpers/utils/getHeaders";
import { decrypt } from "../utilities/decryption";

const useUserTransactions = () => {
  const [transactions, setTransaction] = useState([]);
  const { user } = useContext(AuthContext);
  const headers = getHeader()

  const { isLoading, refetch } = useQuery([user?.phone], async() =>{
    const {data} = await axios.get(`${serverBaseUrl}/transaction/${user?.phone}`, {headers})
    const decrypted =  decrypt(data?.data)
    setTransaction(decrypted)
  })
  return [transactions, refetch];
};

export default useUserTransactions;
