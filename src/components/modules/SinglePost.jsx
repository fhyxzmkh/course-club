import { Button, Card, Collapse, Divider, Input, Space } from "antd";
import { Avatar } from "antd";
import { CommentList } from "./CommentList.jsx";

const { Meta } = Card;

const item = [
  {
    key: "1",
    label: "展开评论区",
    children: <CommentList />,
  },
];

export const SinglePost = () => {
  return (
    <>
      <Card type="Inner">
        <Meta
          avatar={
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
          }
          title="Username"
          description="This is content..."
        />
        <Divider />
        <Space.Compact style={{ width: "100%" }}>
          <Input placeholder="Comment" />
          <Button type="primary">Submit</Button>
        </Space.Compact>
        <Collapse className="mt-2" items={item} />
      </Card>
    </>
  );
};
