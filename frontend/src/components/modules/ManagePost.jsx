import { useEffect, useState } from "react";
import axios from "axios";
import { Button, List } from "antd";

export const ManagePost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get("/api/admin-getPostList");
      setPosts(response.data);
    };
    getPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await axios.get(`/api/admin-deletePost?postId=${postId}`);
      const updatedPosts = posts.filter((post) => post._id !== postId);
      setPosts(updatedPosts);
      alert("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    }
  };

  return (
    <>
      <div className="w-1/2 mx-auto overflow-y-auto bg-white mt-4">
        <List
          header={<p className="font-bold text-center">帖子列表</p>}
          bordered
          dataSource={posts}
          renderItem={(post) => (
            <List.Item className="flex justify-between items-center">
              <div>
                <span className="font-semibold">{post.creator_name}</span> :{" "}
                {post.content}
              </div>
              <Button
                color="danger"
                variant="outlined"
                className="ml-auto"
                onClick={() => handleDelete(post._id)}
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
