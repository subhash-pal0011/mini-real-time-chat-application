import { Server } from "socket.io";

const userSocketMap = {}; // userId -> socketId
let io;

// ✅ Socket setup function
export const setupSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"], // frontend origin
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap[userId] = socket.id;
    }

    // ✅ Send online users list
    io.emit("getOnlineUser", Object.keys(userSocketMap));

    // ✅ On disconnect
    socket.on("disconnect", () => {
      if (userId) {
        delete userSocketMap[userId];
      }
      io.emit("getOnlineUser", Object.keys(userSocketMap));
    });

    // ✅ Messaging
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

// ✅ Helper function
export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

// ✅ Export io for other files
export { io };

