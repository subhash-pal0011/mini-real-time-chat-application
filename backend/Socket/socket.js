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
            "https://conversationhub.onrender.com",
            "http://localhost:5173",
        ],
        methods: ["GET", "POST"],
        credentials: true,
    },
});

const userSocketMap = {};

// ✅ Socket connection
io.on("connection", (socket) => {
    const userId = socket.handshake.auth.userId || socket.handshake.query.userId;
    console.log(`[SOCKET CONNECT] SocketID: ${socket.id}, UserID: ${userId}`);

    if (userId) {
        userSocketMap[userId] = socket.id;
        console.log("[USER MAP] Updated:", userSocketMap);
    }

    // Emit online users
    io.emit("getOnlineUser", Object.keys(userSocketMap));
    console.log("[ONLINE USERS] Emitted:", Object.keys(userSocketMap));

    // Listen to messages
    socket.on("sendMessage", ({ to, message }) => {
        console.log(`[SEND MESSAGE] From: ${userId} To: ${to}`, message);
        const receiverSocketId = userSocketMap[to];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("receiveMessage", { from: userId, message });
            console.log(`[MESSAGE SENT] To SocketID: ${receiverSocketId}`);
        } else {
            console.log(`[RECEIVER OFFLINE] UserID: ${to}`);
        }
    });

    // Handle disconnect
    socket.on("disconnect", (reason) => {
        console.log(`[DISCONNECT] SocketID: ${socket.id}, Reason: ${reason}`);
        if (userId) {
            delete userSocketMap[userId];
            io.emit("getOnlineUser", Object.keys(userSocketMap));
            console.log("[ONLINE USERS] After disconnect:", Object.keys(userSocketMap));
        }
    });
});

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

export { app, server, io };









