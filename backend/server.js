import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import chatRouter from "./routes/chatRoute.js";
import { Server } from "socket.io";
import http from "http";

// App Config
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});
const port = process.env.PORT || 4000;
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);

app.get("/", (req, res) => {
    res.send("API Working");
});

// Socket.io
io.on("connection", (socket) => {
    console.log("New Client Connected: " + socket.id);

    socket.on("join", (userId) => {
        socket.join(userId);
        console.log("User Joined: " + userId);
    });

    socket.on("sendMessage", (message) => {
        const { receiverId, text, image, senderId } = message;
        io.to(receiverId).emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
        console.log("Client Disconnected");
    });
});

server.listen(port, () => console.log(`Server started on PORT ${port}`));
