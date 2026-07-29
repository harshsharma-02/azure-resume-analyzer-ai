import { useEffect, useState } from "react";
import API from "../api/axios";

function useResumes() {
  const [resumes, setResumes] = useState([]);

  const refreshResumes = async () => {
    try {
      const res = await API.get("/resume");
      setResumes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refreshResumes();
  }, []);

  return {
    resumes,
    refreshResumes,
  };
}

export default useResumes;