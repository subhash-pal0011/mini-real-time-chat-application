import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useUser } from "./UserContext";

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const { user } = useUser();

  useEffect(() => {
  if (!user?._id) return;

  const socketInstance = io("https://chatify-z6db.onrender.com", {
    query: { userId: user._id },
    transports: ["websocket"],
  });

  socketInstance.on("getOnlineUser", (users) => {
    if (Array.isArray(users)) {
      setOnlineUser(users);
    } else {
      setOnlineUser([]);
      console.warn("Received invalid onlineUser data from socket:", users);
    }
  });

  setSocket(socketInstance);

  return () => {
    socketInstance.disconnect();
  };
}, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUser }}>
      {children}
    </SocketContext.Provider>
  );
};