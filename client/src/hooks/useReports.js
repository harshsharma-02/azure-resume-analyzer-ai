import { useEffect, useState } from "react";
import API from "../api/axios";

const useReports = () => {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const response = await API.get("/evaluate/reports");

      setReports(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return reports;
};

export default useReports;
