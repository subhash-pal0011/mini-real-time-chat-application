// import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import path from 'path'; // 👉 img ike liye

// // Routers
// import router from './router/SighnupRouter.js';
// import loginRouter from './router/LoginRouter.js';
// import logoutRouter from './router/LogoutRouter.js';
// import postRouter from './router/PostMessageRouter.js';
// import getRouter from './router/GetMessageRouter.js';
// import searchRouter from './router/SearchRouter.js';
// import chatProfile from './router/CahtProfileRouter.js';
// // Socket
// import { app, server  } from './Socket/socket.js';


// const __dirname = path.resolve();

// // dotenv.config();
// dotenv.config({ path: "./backend/.env" });

// // Middleware
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// // CORS
// app.use(cors({ origin: 'https://conversationhub.onrender.com', credentials: true }));

// // Test route
// app.get('/', (req, res) => res.send('Server Running'));

// // API Routes
// app.use('/api/signup', router);
// app.use('/api/login', loginRouter);
// app.use('/api/logout', logoutRouter);
// app.use('/api/postmessage', postRouter);
// app.use('/api/getmessage', getRouter);
// app.use('/api/search', searchRouter);
// app.use('/api/chatprofile', chatProfile);


// // app.use(express.static(path.join(__dirname, "/frontend/dist")));

// // app.get(/.*/, (req , res) => {  // YE TARGET KEEGA HTML KE PAGE KO FRONTEND KE
// //     res.sendFile(path.join(__dirname , "frontend" , "dist" , "index.html"))
// // })


// app.use((req, res, next) => {  // PAGE NOT DEFINE KE LIYE HII
//     res.status(404).json({
//         success: false,
//         message: "Route not found, please try again!"
//     });
// });

// // MongoDB
// const PORT = process.env.PORT || 3000;

// mongoose.connect(process.env.MONGO_URL)
//     .then(() => console.log('MongoDB connected ✅'))
//     .catch(err => console.error('MongoDB connection error:', err.message));

// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));







// backend/index.js













import express from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";

// Routers
import signupRouter from "./router/SighnupRouter.js";
import loginRouter from "./router/LoginRouter.js";
import logoutRouter from "./router/LogoutRouter.js";
import postRouter from "./router/PostMessageRouter.js";
import getRouter from "./router/GetMessageRouter.js";
import searchRouter from "./router/SearchRouter.js";
import chatProfileRouter from "./router/CahtProfileRouter.js";

// Socket
import { app, server } from "./Socket/socket.js";

dotenv.config({ path: "./backend/.env" });
const __dirname = path.resolve();

// Middleware
import cookieParser from "cookie-parser";
import cors from "cors";
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// CORS
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      process.env.PROD_URL || "https://conversationhub.onrender.com",
    ],
    credentials: true,
  })
);

// Routes
app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/postmessage", postRouter);
app.use("/api/getmessage", getRouter);
app.use("/api/search", searchRouter);
app.use("/api/chatprofile", chatProfileRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found!" });
});

// MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB error:", err.message));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
