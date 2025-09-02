// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import path from "path";
// import http from "http";
// import { setupSocket, io } from "./Socket/socket.js";

// // Routers
// import router from "./router/SighnupRouter.js";
// import loginRouter from "./router/LoginRouter.js";
// import logoutRouter from "./router/LogoutRouter.js";
// import postRouter from "./router/PostMessageRouter.js";
// import getRouter from "./router/GetMessageRouter.js";
// import searchRouter from "./router/SearchRouter.js";
// import chatProfile from "./router/CahtProfileRouter.js";

// dotenv.config();

// const app = express();
// const server = http.createServer(app);

// // ✅ Setup socket.io
// setupSocket(server);

// const __dirname = path.resolve();

// // ✅ Middlewares
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// app.use(
//        cors({
//               origin: process.env.URL || "http://localhost:5173",
//               credentials: true,
//        })
// );

// // ✅ API Routes
// app.use("/api/signup", router);
// app.use("/api/login", loginRouter);
// app.use("/api/logout", logoutRouter);
// app.use("/api/postmessage", postRouter);
// app.use("/api/getmessage", getRouter);
// app.use("/api/search", searchRouter);
// app.use("/api/chatprofile", chatProfile);

// // ✅ Serve React frontend
// app.use(express.static(path.join(process.cwd(), "frontend", "dist")));

// // ✅ Catch-all route → React handles routing
// app.get(/.*/, (req, res) => {
//        res.sendFile(path.join(process.cwd(), "frontend", "dist", "index.html"));
// });

// // ✅ 404 handler for undefined API routes
// app.use((req, res) => {
//        res.status(404).json({
//               success: false,
//               message: "Route not found, please try again!",
//        });
// });

// // ✅ MongoDB connection
// const PORT = process.env.PORT || 8000;

// mongoose
//        .connect(process.env.MONGO_URL)
//        .then(() => console.log("MongoDB connected ✅"))
//        .catch((err) => console.error("MongoDB connection error:", err.message));

// // ✅ Start server
// server.listen(PORT, () =>
//        console.log(`Server running on http://localhost:${PORT}`)
// );

// // ✅ Export app, server, io
// export { app, server, io };







import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import http from "http";
import { setupSocket } from "./Socket/socket.js";

// Routers
import router from "./router/SighnupRouter.js";

// ... other routers

dotenv.config();
const app = express();
const server = http.createServer(app);
setupSocket(server);

const __dirname = path.resolve();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.URL || "http://localhost:5173",
  credentials: true,
}));

// API routes
app.use("/api/signup", router);
// ... other routes

// Serve React frontend
app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found ❌" });
});

// MongoDB connect
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error("MongoDB connection error:", err.message));

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
