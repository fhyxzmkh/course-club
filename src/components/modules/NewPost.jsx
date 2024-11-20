import { Button, Input, Space } from "antd";
import { useState } from "react";
import ObjectID from "bson-objectid";

export const NewPost = ({ setPosts, userId }) => {
  const [postValue, setPostValue] = useState("");

  async function handleSubmit() {
    if (postValue === "") return;

    if (userId === null) {
      alert("请先登录！");
      return;
    }

    const postData = {
      _id: new ObjectID(),
      creator_name: "admin",
      content: postValue,
    };

    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("网络响应失败");
      }

      setPosts((prevPosts) => [postData, ...prevPosts]);
      setPostValue("");
    } catch (error) {
      console.error("提交帖子时出错:", error);
    }
  }

  return (
    <div>
      <Space.Compact style={{ width: "100%" }} size="large" block>
        <Input
          placeholder="New post"
          value={postValue}
          onChange={(e) => setPostValue(e.target.value)}
        />
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Space.Compact>
    </div>
  );
};
