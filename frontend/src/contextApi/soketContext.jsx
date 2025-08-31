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

// Context
const SocketContext = createContext();
export const useSocketContext = () => useContext(SocketContext);

// Provider
export const SocketContextProvider = ({ children }) => {
  const { user } = useUser();
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);

  useEffect(() => {
    if (user) {
      const socketInstance = io(process.env.REACT_APP_SOCKET_URL || "https://chatify-backend-ybm4.onrender.com", {
        query: { userId: user._id },
        transports: ["websocket"], // use websocket to avoid polling CORS issues
        withCredentials: true,
      });

      socketInstance.on("getOnlineUser", (users) => setOnlineUser(users));

      setSocket(socketInstance);

      return () => socketInstance.disconnect();
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUser }}>
      {children}
    </SocketContext.Provider>
  );
};
