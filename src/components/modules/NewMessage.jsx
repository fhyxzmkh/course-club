import { Button, Input, Space } from "antd";
import { useState } from "react";
import axios from "axios";

export const NewMessage = (props) => {
  const [messageValue, setMessageValue] = useState("");

  const sendMessage = async () => {
    if (messageValue === "") {
      return;
    }

    try {
      const message = {
        recipient: props.recipient,
        content: messageValue,
      };

      await axios.post("/api/message", message);

      setMessageValue("");

      console.log("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Space.Compact style={{ width: "100%" }} block>
      <Input
        placeholder="New message"
        value={messageValue}
        onChange={(e) => setMessageValue(e.target.value)}
      />
      <Button type="primary" onClick={sendMessage}>
        Submit
      </Button>
    </Space.Compact>
  );
};
