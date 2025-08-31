// import express from "express";
// import http from 'http';
// import { Server } from "socket.io";

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//        cors: {
//               // origin: [
//               //        process.env.FRONTEND_URL || "https://conversationhub.onrender.com",
//               //        process.env.DEV_URL || "http://localhost:5173"
//               // ],
//               origin: [process.env.FRONTEND_URL, process.env.DEV_URL],
//               methods: ["GET", "POST"],
//        },
// });

// const userSocketMap = {};

// // Socket connection
// io.on('connection', (socket) => {
//        const userId = socket.handshake.query.userId;
//        if (userId) userSocketMap[userId] = socket.id;

//        io.emit('getOnlineUser', Object.keys(userSocketMap));

//        socket.on('disconnect', () => {
//               delete userSocketMap[userId];
//               io.emit('getOnlineUser', Object.keys(userSocketMap));
//        });

//        socket.on('sendMessage', ({ to, message }) => {
//               const receiverSocketId = userSocketMap[to];
//               if (receiverSocketId) {
//                      io.to(receiverSocketId).emit('receiveMessage', { from: userId, message });
//               }
//        });
// });

// export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

// export { app, server, io };



// socketServer.js





// backend/Socket/socket.js
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// CORS settings
const io = new Server(server, {
  cors: {
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      process.env.PROD_URL || "https://conversationhub.onrender.com",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Map to track connected users
const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.auth?.userId; // recommended over query
  if (userId) userSocketMap[userId] = socket.id;

  console.log(`User connected: ${userId}, socketID: ${socket.id}`);
  io.emit("getOnlineUser", Object.keys(userSocketMap));

  socket.on("sendMessage", ({ to, message }) => {
    const receiverSocketId = userSocketMap[to];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", { from: userId, message });
    }
  });

  socket.on("disconnect", () => {
    if (userId) delete userSocketMap[userId];
    io.emit("getOnlineUser", Object.keys(userSocketMap));
    console.log(`User disconnected: ${userId}`);
  });
});

// Helper
export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

export { app, server, io };
