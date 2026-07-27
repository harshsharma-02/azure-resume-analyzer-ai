import { useEffect, useState } from "react";
import API from "../api/axios";

function useAIFeedback(resumeId) {
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!resumeId) {
      return;
    }

    const fetchFeedback = async () => {
      try {
        const res = await API.get(`/ai/${resumeId}`);

        setFeedback(res.data.aiFeedback);
      } catch (error) {
        console.log(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [resumeId]);

  return {
    feedback,
    loading,
  };
}

export default useAIFeedback;
