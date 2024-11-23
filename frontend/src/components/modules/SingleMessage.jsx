import { Space } from "antd";

export const SingleMessage = (props) => {
  return (
    <Space.Compact style={{ width: "100%" }} block>
      <div className="font-bold w-1/5 mr-2 flex-shrink-0">
        {props.message.senderName + ":"}
      </div>
      <div className="p-2 px-4 bg-gray-200 rounded-lg flex-shrink overflow-wrap-break-word overflow-wrap-anywhere">
        {props.message.content}
      </div>
    </Space.Compact>
  );
};
