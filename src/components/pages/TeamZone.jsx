import { Chat } from "../modules/Chat.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

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
