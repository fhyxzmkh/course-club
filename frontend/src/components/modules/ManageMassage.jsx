import { useEffect, useState } from "react";
import axios from "axios";
import { Button, List } from "antd";

export const ManageMassage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      const response = await axios.get("/api/admin-getMessages");
      setMessages(response.data);
    };
    getMessages();
  }, []);

  const handleDelete = async (messageId) => {
    try {
      await axios.get(`/api/admin-deleteMessage?messageId=${messageId}`);
      const updatedMessages = messages.filter(
        (message) => message._id !== messageId,
      );
      setMessages(updatedMessages);
      alert("Message deleted successfully!");
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Failed to delete message. Please try again.");
    }
  };

  return (
    <>
      <div className="w-1/2 mx-auto overflow-y-auto bg-white mt-4">
        <List
          header={<p className="font-bold text-center">消息列表</p>}
          bordered
          dataSource={messages}
          renderItem={(message) => (
            <List.Item className="flex justify-between items-center">
              <div>
                <span className="font-semibold">{message.senderName}</span> :{" "}
                {message.content}
              </div>
              <Button
                color="danger"
                variant="outlined"
                className="ml-auto"
                onClick={() => handleDelete(message._id)}
              >
                Delete
              </Button>
            </List.Item>
          )}
        />
      </div>
    </>
  );
};
