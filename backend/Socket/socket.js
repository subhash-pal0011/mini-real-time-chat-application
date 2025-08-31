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








import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const userSocketMap = {}; // Track connected users

const io = new Server(server, {
  cors: {
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:5173',
      process.env.PROD_URL || 'https://conversationhub.onrender.com',
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Socket connection
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // Emit online users
  io.emit('getOnlineUser', Object.keys(userSocketMap));

  // Disconnect
  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
    if (userId) delete userSocketMap[userId];
    io.emit('getOnlineUser', Object.keys(userSocketMap));
  });

  // Send message
  socket.on('sendMessage', ({ to, message }) => {
    const receiverSocketId = userSocketMap[to];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receiveMessage', { from: userId, message });
    }
  });
});

// Helper to get receiver socket ID
export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

export { app, server, io };