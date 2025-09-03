import { Server } from "socket.io";

const userSocketMap = {}; // userId -> socketId
let io;

export const setupSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.URL, 
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUser", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      if (userId) {
        delete userSocketMap[userId];
      }
      io.emit("getOnlineUser", Object.keys(userSocketMap));
    });

    socket.on("sendMessage", ({ to, message }) => {
      const receiverSocketId = userSocketMap[to];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", {
          from: userId,
          message,
        });
      }
    });
  });
};
export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];
export { io };