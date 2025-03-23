import { useGetToken } from "../../hooks/useGetToken";

const getHeader = () => {
  const accessToken = useGetToken("token");

  return {
    Authorization: `${accessToken}`,
    "Content-Type": "application/json",
  };
};

export default getHeader;
