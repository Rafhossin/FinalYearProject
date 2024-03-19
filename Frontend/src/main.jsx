import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserContext from "./UserContext";

const Main = () => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </UserContext.Provider>
  );
};

createRoot(document.getElementById("root")).render(<Main />);
