import express from "express";
import { getAllUsers, getMessages, sendMessage } from "../controllers/chatController.js";
import authMiddleware from "../middleware/auth.js";

const chatRouter = express.Router();

chatRouter.get("/users", authMiddleware, getAllUsers);
chatRouter.post("/send", authMiddleware, sendMessage);
chatRouter.post("/get", authMiddleware, getMessages);

export default chatRouter;
