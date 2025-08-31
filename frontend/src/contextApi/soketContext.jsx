// import { createContext, useContext, useEffect, useState } from "react";
// import io from "socket.io-client";
// import { useUser } from "./UserContext";

// // ✅ Context create
// const SocketContext = createContext();

// // ✅ Custom hook for using context
// export const useSocketContext = () => {
//        return useContext(SocketContext);
// };

// // ✅ Provider
// export const SocketContextProvider = ({ children }) => {
//        const [socket, setSocket] = useState(null);
//        const [onlineUser, setOnlineUser] = useState([]);
//        const { user } = useUser();

//        useEffect(() => {
//               if (user) {
//                      // ✅ Backend socket server connect
//                      // http://localhost:8000
//                      const socketInstance = io("https://chatify-backend-ybm4.onrender.com", {
//                             query: { userId: user?._id },
//                      });

//                      // ✅ Online users suno
//                      socketInstance.on("getOnlineUser", (users) => {
//                             setOnlineUser(users);
//                      });

//                      setSocket(socketInstance);

//                      // ✅ Cleanup
//                      return () => socketInstance.close();
//               } else {
//                      if (socket) {
//                             socket.close();
//                             setSocket(null);
//                      }
//               }
//        }, [user]);

//        return (
//               <SocketContext.Provider value={{ socket, onlineUser }}>
//                      {children}
//               </SocketContext.Provider>
//        );
// };







// frontend/context/SocketContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useUser } from "./UserContext";

const SocketContext = createContext();
export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const { user } = useUser();
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);

  useEffect(() => {
    if (!user) return;

    const socketInstance = io(process.env.VITE_BACKEND_URL || "http://localhost:3000", {
      auth: { userId: user._id }, // recommended
      transports: ["websocket"],
    });

    socketInstance.on("connect", () => console.log("[SOCKET] Connected:", socketInstance.id));
    socketInstance.on("connect_error", (err) => console.error("[SOCKET] Error:", err));

    socketInstance.on("getOnlineUser", (users) => setOnlineUser(users || []));
    socketInstance.on("receiveMessage", ({ from, message }) => {
      console.log("Message received from", from, ":", message);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
      setSocket(null);
    };
  }, [user]);

  return <SocketContext.Provider value={{ socket, onlineUser }}>{children}</SocketContext.Provider>;
};
