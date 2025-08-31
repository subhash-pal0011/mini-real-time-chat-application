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
import io from "socket.io-client";
import { useUser } from "./UserContext";

const SocketContext = createContext();
export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
       const { user } = useUser();
       const [socket, setSocket] = useState(null);
       const [onlineUser, setOnlineUser] = useState([]);

       useEffect(() => {
              if (!user) return;

              console.log("Connecting socket for user:", user._id);

              const socketInstance = io("https://chatify-backend-ybm4.onrender.com", {
                     query: { userId: user._id },
                     transports: ["websocket"], // force WSS
              });

              socketInstance.on("connect", () => {
                     console.log("Socket connected. ID:", socketInstance.id);
              });

              socketInstance.on("connect_error", (err) => {
                     console.error("Socket connection error:", err);
              });

              socketInstance.on("getOnlineUser", (users) => {
                     console.log("Online users updated:", users);
                     //       setOnlineUser(users);
                     setOnlineUser(Array.isArray(users) ? users : []);
              });

              socketInstance.on("receiveMessage", ({ from, message }) => {
                     console.log("Message received from:", from, "Message:", message);
              });

              setSocket(socketInstance);

              return () => {
                     console.log("Cleaning up socket for user:", user._id);
                     socketInstance.close();
                     setSocket(null);
              };
       }, [user]);

       return (
              <SocketContext.Provider value={{ socket, onlineUser }}>
                     {children}
              </SocketContext.Provider>
       );
};
