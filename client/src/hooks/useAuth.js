import { useEffect, useState } from "react";
import API from "../api/axios";

function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/profile");

        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  return user;
}

export default useAuth;
