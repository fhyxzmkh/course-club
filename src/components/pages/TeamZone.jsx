import { Chat } from "../modules/Chat.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import useWebSocket, { ReadyState } from "react-use-websocket";

const ALL_CHAT = {
  _id: "ALL_CHAT",
  name: "ALL_CHAT",
};

export const TeamZone = (props) => {
  const socketUrl = "ws://localhost:8080/WebSocket";

  const [activeChat, setActiveChat] = useState({
    recipient: ALL_CHAT,
    messages: [],
  });

  useEffect(() => {
    const loadMessageHistory = async (recipient) => {
      try {
        const response = await axios.get("/api/chat", {
          params: { recipientId: recipient._id },
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

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log("opened"),

    onMessage: (event) => {
      try {
        const messageData = JSON.parse(event.data);

        setActiveChat((prevActiveChat) => ({
          recipient: messageData.recipientId,
          messages: prevActiveChat.messages.concat(messageData),
        }));
      } catch (error) {
        console.error("Error updating message history:", error);
      }
    },
    onClose: () => console.log("closed"),
    shouldReconnect: (closeEvent) => true,
  });

  return (
    <>
      <div className="flex relative">
        {props.userId === null ? (
          <p>请先登录！</p>
        ) : (
          <div className="relative">
            <Chat data={activeChat} />
          </div>
        )}
      </div>
    </>
  );
};
