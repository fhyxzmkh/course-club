import { Space } from "antd";

export const SingleMessage = (props) => {
  return (
    <Space.Compact style={{ width: "100%" }} block>
      <div className="font-bold">{props.message.senderName + ":"}</div>
      <div>{props.message.content}</div>
    </Space.Compact>
  );
};
