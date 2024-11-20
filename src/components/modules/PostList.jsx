import { useEffect, useState } from "react";
import { SinglePost } from "./SinglePost.jsx";
import { List } from "antd";
import { NewPost } from "./NewPost.jsx";

export const PostList = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/post");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <NewPost setPosts={setPosts} userId={props.userId} />
      <List
        itemLayout="vertical"
        bordered={true}
        dataSource={posts}
        split={false}
        renderItem={(post) => (
          <List.Item key={post._id}>
            <SinglePost post={post} userId={props.userId} />
          </List.Item>
        )}
        style={{ minHeight: "780px", maxHeight: "780px", overflowY: "auto" }} // 设置最大高度和滚动条
      />
    </>
  );
};
