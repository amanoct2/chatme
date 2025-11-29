import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    text: { type: String, default: "" },
    image: { type: String, default: "" },
    timestamp: { type: Number, default: Date.now() }
})

const messageModel = mongoose.models.message || mongoose.model("message", messageSchema);

export default messageModel;
