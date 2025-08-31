import express from "express";
import http from 'http';
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
       cors: {
              origin: "http://localhost:5173",
              methods: ["GET", "POST"],
       },
});

const userSocketMap = {};

// Socket connection
io.on('connection', (socket) => {
       const userId = socket.handshake.query.userId;
       if (userId) userSocketMap[userId] = socket.id;

       io.emit('getOnlineUser', Object.keys(userSocketMap));

       socket.on('disconnect', () => {
              delete userSocketMap[userId];
              io.emit('getOnlineUser', Object.keys(userSocketMap));
       });

       socket.on('sendMessage', ({ to, message }) => {
              const receiverSocketId = userSocketMap[to];
              if (receiverSocketId) {
                     io.to(receiverSocketId).emit('receiveMessage', { from: userId, message });
              }
       });
});

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

export { app, server, io };







