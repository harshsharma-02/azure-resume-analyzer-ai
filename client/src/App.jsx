import { useEffect, useState } from "react";
import api from "./services/api";
<<<<<<< HEAD
import AppRoutes from "./routes/AppRoutes";
=======
>>>>>>> 3921805a54f0f98b13b22c6133d33a482310d10b

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
<<<<<<< HEAD
    api
      .get("/")
=======
    
      api.get("/health")
>>>>>>> 3921805a54f0f98b13b22c6133d33a482310d10b
      .then((res) => {
        setMessage(res.data.status);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
<<<<<<< HEAD
    <div>
      <AppRoutes />
=======
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Azure Resume Analyzer AI</h1>
>>>>>>> 3921805a54f0f98b13b22c6133d33a482310d10b
      <h2>{message}</h2>
    </div>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 3921805a54f0f98b13b22c6133d33a482310d10b
