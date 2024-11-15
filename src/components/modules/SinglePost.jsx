import { Card, Divider } from "antd";
import { Avatar } from "antd";
import { CommentList } from "./CommentList.jsx";
import { NewComment } from "./NewComment.jsx";
import { useState } from "react";

const { Meta } = Card;

export const SinglePost = ({ post }) => {
  const [comments, setComments] = useState([]);

  return (
    <>
      <Card type="Inner">
        <Meta
          avatar={<Avatar src="https://www.loliapi.com/acg/pp/" />}
          title={post.creator_name}
          description={post.content}
        />
        <Divider />
        <NewComment parentId={post._id} setComments={setComments} />
        <CommentList
          parentId={post._id}
          comments={comments}
          setComments={setComments}
        />
      </Card>
    </>
  );
};
