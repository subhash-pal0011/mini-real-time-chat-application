import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./contextApi/UserContext.jsx";
import { SocketContextProvider } from "./contextApi/soketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <SocketContextProvider>
      <App />
      </SocketContextProvider>
    </UserProvider>
  </StrictMode>
);

