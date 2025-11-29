import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../config/api";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [chatData, setChatData] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [socket, setSocket] = useState(null);

    const loadUserData = async (token) => {
        // Placeholder for loading user data from backend
        // For now, just setting token
        if (token) {
            setToken(token);
            localStorage.setItem("token", token);
            navigate('/chat');
        } else {
            navigate('/');
        }
    }

    useEffect(() => {
        if (token) {
            const newSocket = io("http://localhost:4000", {
                query: { token }
            });
            setSocket(newSocket);

            loadUserData(token);

            return () => newSocket.close();
        } else {
            navigate('/');
        }
    }, [token])

    const value = {
        userData, setUserData,
        chatData, setChatData,
        loadUserData,
        token, setToken,
        url: "http://localhost:4000",
        socket
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
