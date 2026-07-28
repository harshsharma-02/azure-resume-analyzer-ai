import { useEffect, useState } from "react";
import api from "./services/api";

import AppRoutes from "./routes/AppRoutes";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {

    api
      .get("/")
      api.get("/health")
      .then((res) => {
        setMessage(res.data.status);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <AppRoutes />
    {/* <div style={{ textAlign: "center", marginTop: "100px" }}>
    </div> */}
    </div>
  );
}


export default App;