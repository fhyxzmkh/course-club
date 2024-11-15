import { Chat } from "../modules/Chat.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import useWebSocket, { ReadyState } from "react-use-websocket";

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

        const _recipient = {
          _id: messageData.recipientId,
          name: messageData.recipientName,
        };

        setActiveChat((prevActiveChat) => ({
          recipient: _recipient,
          messages: prevActiveChat.messages.concat(messageData),
        }));
      } catch (error) {
        console.error("Error updating message history:", error);
      }
    },
    onClose: () => console.log("closed"),
    shouldReconnect: (closeEvent) => true,
  });

  if (props.userId === null) {
    return <p>请先登录！</p>;
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
