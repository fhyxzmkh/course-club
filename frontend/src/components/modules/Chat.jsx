import { SingleMessage } from "./SingleMessage.jsx";
import { NewMessage } from "./NewMessage.jsx";
import { List } from "antd";

export const Chat = (props) => {
  return (
    <div className="flex-col">
      <div>
        <List
          itemLayout="vertical"
          bordered={true}
          dataSource={props.data.messages}
          split={false}
          renderItem={(m, i) => (
            <List.Item key={i}>
              <SingleMessage message={m} key={i} />
            </List.Item>
          )}
          style={{ minHeight: "680px", maxHeight: "680px", overflowY: "auto" }} // 设置最大高度和滚动条
        />
      </div>
      <NewMessage recipient={props.data.recipient} />
    </div>
  );
};
