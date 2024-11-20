import { Button, Input, Space } from "antd";
import { useEffect, useState } from "react";
import ObjectID from "bson-objectid";
import axios from "axios";

export const NewComment = ({ parentId, setComments, userId }) => {
  const [commentValue, setCommentValue] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (userId === null) return;
    axios
      .get(`/api/profile?userId=${userId}`)
      .then((response) => {
        setName(response.data.name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  async function handleSubmit() {
    if (commentValue === "") return;

    if (userId === null) {
      alert("请先登录!");
      return;
    }

    const commentData = {
      _id: new ObjectID(),
      creator_name: name,
      parent: parentId,
      content: commentValue,
    };

    try {
      const response = await fetch("/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error("网络响应失败");
      }

      setComments((prevComments) => [commentData, ...prevComments]);
      setCommentValue("");
    } catch (error) {
      console.error("提交评论时出错:", error);
    }
  }

  return (
    <div>
      <Space.Compact style={{ width: "100%" }} size="small" block>
        <Input
          placeholder="New comment"
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
        />
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Space.Compact>
    </div>
  );
};
