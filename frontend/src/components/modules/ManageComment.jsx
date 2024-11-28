import { useEffect, useState } from "react";
import axios from "axios";
import { Button, List } from "antd";

export const ManageComment = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      const response = await axios.get("/api/admin-getComments");
      setComments(response.data);
    };
    getComments();
  }, []);

  const handleDelete = async (commentId) => {
    try {
      await axios.get(`/api/admin-deleteComment?commentId=${commentId}`);
      const updatedComments = comments.filter(
        (comment) => comment._id !== commentId,
      );
      setComments(updatedComments);
      alert("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment. Please try again.");
    }
  };

  return (
    <>
      <div className="w-1/2 mx-auto overflow-y-auto bg-white  mt-4">
        <List
          header={<p className="font-bold text-center">评论列表</p>}
          bordered
          dataSource={comments}
          renderItem={(comment) => (
            <List.Item className="flex justify-between items-center">
              <div>
                <span className="font-semibold">{comment.creator_name}</span> :{" "}
                {comment.content}
              </div>
              <Button
                color="danger"
                variant="outlined"
                className="ml-auto"
                onClick={() => handleDelete(comment._id)}
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
