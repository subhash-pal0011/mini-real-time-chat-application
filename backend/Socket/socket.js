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





import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
       cors: {
              origin: [
                     "https://conversationhub.onrender.com", // production frontend
                     "http://localhost:5173",               // local dev frontend
              ],
              methods: ["GET", "POST"],
              credentials: true,
       },
       transports: ["websocket"], // force websocket transport
});

const userSocketMap = {};

io.on("connection", (socket) => {
       const userId = socket.handshake.query.userId;
       console.log("Socket connected. ID:", socket.id, "UserID:", userId);

       if (userId) {
              userSocketMap[userId] = socket.id;
              console.log("User added to map:", userSocketMap);
       }

       // Emit online users
       io.emit("getOnlineUser", Object.keys(userSocketMap));
       console.log("Online users emitted:", Object.keys(userSocketMap));

       // Listen to messages
       socket.on("sendMessage", ({ to, message }) => {
              console.log("sendMessage received:", { from: userId, to, message });
              const receiverSocketId = userSocketMap[to];
              if (receiverSocketId) {
                     io.to(receiverSocketId).emit("receiveMessage", { from: userId, message });
                     console.log("Message sent to:", receiverSocketId);
              } else {
                     console.log("Receiver not online:", to);
              }
       });

       // Handle disconnect
       socket.on("disconnect", () => {
              console.log("Socket disconnected:", socket.id);
              delete userSocketMap[userId];
              io.emit("getOnlineUser", Object.keys(userSocketMap));
              console.log("Online users after disconnect:", Object.keys(userSocketMap));
       });
});

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

export { app, server, io };









