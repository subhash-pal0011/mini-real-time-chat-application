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

    console.log("[SOCKET] Connecting for user:", user._id);

    // ✅ Socket connection
    const socketInstance = io("https://chatify-backend-ybm4.onrender.com", {
      auth: { userId: user._id }, // recommended way
      transports: ["websocket"],   // force websocket only
    });

    // Handlers
    const handleOnlineUsers = (users) => {
      console.log("[SOCKET] Online users updated:", users);
      setOnlineUser(Array.isArray(users) ? users : []);
    };

    const handleReceiveMessage = ({ from, message }) => {
      console.log("[SOCKET] Message received from:", from, "Message:", message);
      // aap yahan GlobellyMessage me update kar sakte ho
    };

    // Socket events
    socketInstance.on("connect", () => console.log("[SOCKET] Connected ID:", socketInstance.id));
    socketInstance.on("connect_error", (err) => console.error("[SOCKET] Connection error:", err));
    socketInstance.on("getOnlineUser", handleOnlineUsers);
    socketInstance.on("receiveMessage", handleReceiveMessage);

    setSocket(socketInstance);

    // Cleanup
    return () => {
      console.log("[SOCKET] Disconnecting for user:", user._id);
      socketInstance.off("getOnlineUser", handleOnlineUsers);
      socketInstance.off("receiveMessage", handleReceiveMessage);
      socketInstance.disconnect();
      setSocket(null);
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUser }}>
      {children}
    </SocketContext.Provider>
  );
};
