import { useEffect, useState } from "react";
import axios from "axios";
import { serverBaseUrl } from "../serverApi/baseUrl";

const UseFetch = (path) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${serverBaseUrl}/${path}`);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${serverBaseUrl}/${path}`);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
    reFetch,
  };
};

export default UseFetch;
