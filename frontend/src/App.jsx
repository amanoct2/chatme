import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import ProfileUpdate from "./pages/ProfileUpdate/ProfileUpdate";
import Chat from "./pages/Chat/Chat";
import LeftSideBar from "./components/LeftSideBar/LeftSideBar";
import ChatBox from "./components/ChatBox/ChatBox";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<ProfileUpdate />} />
        <Route path="/left" element={<LeftSideBar />} />
        <Route path="/chatbox" element={<ChatBox />} />
        {/* < Route path= '/chat' element={Chat}/> */}
      </Routes>
    </>
  );
};

export default App;
