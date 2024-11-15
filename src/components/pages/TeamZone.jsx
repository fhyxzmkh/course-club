import { Chat } from "../modules/Chat.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { ChatList } from "../modules/ChatList.jsx";

const TEAM_CHAT = {
  _id: "TEAM_CHAT",
  name: "TEAM_CHAT",
};

export const TeamZone = (props) => {
  const socketUrl = "ws://localhost:8080/WebSocket";

  const [teamMembers, setTeamMembers] = useState([]);

  //const [activeUser, setActiveUser] = useState(TEAM_CHAT);

  const [activeChat, setActiveChat] = useState({
    recipient: TEAM_CHAT,
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

    loadMessageHistory(activeChat.recipient);
  }, [activeChat.recipient._id]);

  useEffect(() => {
    if (props.userId === null) return;
    axios
      .get(`/api/teamMembers?userId=${props.userId}`)
      .then((response) => {
        setTeamMembers([TEAM_CHAT].concat(response.data));
      })
      .catch((error) => {
        console.error("Error fetching team members:", error);
      });
  }, [props.userId]);

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

        console.log(messageData);

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
          <div className="w-1/4">
            <ChatList
              teamMembers={teamMembers}
              activeChat={activeChat}
              setActiveChat={setActiveChat}
            />
          </div>
          <div className="w-3/4">
            <Chat data={activeChat} />
          </div>
        </div>
      </div>
      )
    </>
  );
};
