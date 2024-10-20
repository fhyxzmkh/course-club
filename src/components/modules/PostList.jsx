import { SinglePost } from "./SinglePost.jsx";
import { List } from "antd";

const posts = [
  { id: 1, content: "Post 1" },
  { id: 2, content: "Post 2" },
  { id: 3, content: "Post 3" },
  { id: 4, content: "Post 4" },
  { id: 5, content: "Post 5" },
];

export const PostList = () => {
  return (
    <>
      <List
        itemLayout="vertical"
        bordered={true}
        dataSource={posts}
        split={false}
        renderItem={(post) => (
          <List.Item key={post.id}>
            <SinglePost />
          </List.Item>
        )}
        style={{ maxHeight: "800px", overflowY: "auto" }} // 设置最大高度和滚动条
      />
    </>
  );
};
