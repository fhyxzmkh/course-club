import { Chat } from "../modules/Chat.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Result } from "antd";

const ALL_CHAT = {
  _id: "ALL_CHAT",
  name: "ALL_CHAT",
};

export const ClassZone = (props) => {
  const socketUrl = "ws://localhost:8080/WebSocket";

  const [activeChat, setActiveChat] = useState({
    recipient: ALL_CHAT,
    messages: [],
  });

  useEffect(() => {
    const loadMessageHistory = async (recipient) => {
      try {
        const response = await axios.get("/api/chat", {
          params: {
            recipientId:
              recipient._id === undefined ? recipient.googleId : recipient._id,
          },
        });

        setActiveChat({
          recipient: recipient,
          messages: response.data,
        });
      } catch (error) {
        console.error("Error loading message history:", error);
      }
    };

    loadMessageHistory(ALL_CHAT);
  }, []);

  const { sendMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => console.log("WebSocket连接已打开"),
    onMessage: (event) => {
      try {
        const messageData = JSON.parse(event.data);
        setActiveChat((prevActiveChat) => ({
          ...prevActiveChat,
          messages: [...prevActiveChat.messages, messageData],
        }));
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    },
    onClose: () => console.log("WebSocket连接已关闭"),
    shouldReconnect: (closeEvent) => true,
  });

  if (props.userId === null) {
    return (
      <div className="p-4 bg-gray-100 min-h-screen flex justify-center">
        <Result
          className="font-bold"
          status="warning"
          title="This page is only visible when logged in!"
        />
      </div>
    );
  }

  return (
    <>
      <div className="p-4 bg-gray-100 min-h-screen flex justify-center">
        <div className="bg-white flex p-4 rounded w-full max-w-screen-lg shadow-md h-screen overflow-y-auto ">
          <div className="w-full">
            <Chat data={activeChat} />
          </div>
        </div>
      </div>
    </>
  );
};
