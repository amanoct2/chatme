import userModel from "../models/userModel.js";
import messageModel from "../models/messageModel.js";

// Get All Users (for sidebar)
const getAllUsers = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const users = await userModel.find({ _id: { $ne: currentUserId } }).select("-password");
        res.json({ success: true, users });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Send Message (HTTP fallback or for persistence)
const sendMessage = async (req, res) => {
    try {
        const { receiverId, text, image } = req.body;
        const senderId = req.user.id;

        const newMessage = new messageModel({
            senderId,
            receiverId,
            text,
            image,
            timestamp: Date.now()
        })

        await newMessage.save();
        res.json({ success: true, message: "Message Sent" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Get Messages
const getMessages = async (req, res) => {
    try {
        const { userId } = req.body;
        const currentUserId = req.user.id;

        const messages = await messageModel.find({
            $or: [
                { senderId: currentUserId, receiverId: userId },
                { senderId: userId, receiverId: currentUserId }
            ]
        }).sort({ timestamp: 1 });

        res.json({ success: true, messages });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { getAllUsers, sendMessage, getMessages };
