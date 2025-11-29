import React, { useContext, useEffect } from "react";
import "./Chat.css";
import ChatBox from "../../components/ChatBox/ChatBox";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/RightSidebar/RightSideBar";
import { AppContext } from "../../context/AppContext";

const Chat = () => {
  const { socket } = useContext(AppContext);

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (message) => {
        console.log("New Message Received:", message);
        // Here you would update the chatData state
      });
    }
  }, [socket]);

  return (
    <div className="chat">
      <div className="chat-container">
        <LeftSideBar />
        <ChatBox />
        <RightSideBar />
      </div>
    </div>
  );
};

export default Chat;
