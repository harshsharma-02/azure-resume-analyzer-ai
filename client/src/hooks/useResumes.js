import { useEffect, useState } from "react";
import API from "../api/axios";

function useResumes() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await API.get("/resume");

        setResumes(res.data);

        console.log("RESUMES FROM API:", res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchResumes();
  }, []);

  return resumes;
}

export default useResumes;
