import { Chat } from "../modules/Chat.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import useWebSocket, { ReadyState } from "react-use-websocket";

const ALL_CHAT = {
  _id: "ALL_CHAT",
  name: "ALL_CHAT",
};

const TEST_MESSAGES = [
  {
    sender: {
      _id: 0,
      name: "Kenneth",
    },
    content: "I am chatting...",
  },
  {
    sender: {
      _id: 1,
      name: "Spike",
    },
    content: "Me too!",
  },
];

const TEST_DATA = {
  recipient: ALL_CHAT,
  messages: TEST_MESSAGES,
};

export const TeamZone = () => {
  const socketUrl = "ws://localhost:8080/WebSocket";

  const [activeChat, setActiveChat] = useState(TEST_DATA);

  useEffect(() => {
    const loadMessageHistory = async (recipient) => {
      try {
        const response = await axios.get("/api/chat", {
          params: { recipientId: recipient._id },
        });

        console.log(response);
        console.log(response.data);

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

  const addMessages = (data) => {
    console.log("addMessages:" + data);
    setActiveChat((prevActiveChat) => ({
      recipient: prevActiveChat.recipient,
      messages: prevActiveChat.messages.concat(data),
    }));
  };

  // useEffect(() => {
  //   const socket = io("ws://localhost:8080/WebSocket");
  //
  //   socket.on("connect", () => {
  //     console.log("WebSocket连接已建立");
  //   });
  //
  //   //socket.on("message", addMessages);
  //
  //   return () => socket.off("message", addMessages);
  // }, []);

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log("opened"),
    onMessage: () => addMessages,
    onClose: () => console.log("closed"),
    shouldReconnect: (closeEvent) => true,
  });

  return (
    <>
      <div className="flex relative">
        <div className="relative">
          <Chat data={activeChat} />
        </div>
      </div>
    </>
  );
};
