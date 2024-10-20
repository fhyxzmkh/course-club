import { List, Typography } from "antd";

export const ResourceDownload = () => {
  const resources = [{ title: "教材" }, { title: "Slides" }, { title: "试卷" }];

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-1/2">
        <List
          className="bg-white h-full min-h-screen"
          bordered
          dataSource={resources}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text>{item.title}</Typography.Text>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
