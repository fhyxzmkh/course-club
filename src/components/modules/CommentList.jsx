import { SingleComment } from "./SingleComment.jsx";
import { useEffect, useState } from "react";

export const CommentList = ({ parentId, comments, setComments }) => {
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`api/comment?parentId=${parentId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchComments();
  }, [parentId]);

  return (
    <>
      {comments.map((comment) => (
        <SingleComment key={comment._id} comment={comment} />
      ))}
    </>
  );
};
