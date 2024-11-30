// const commit = {
//   _id: String,
//   creator_name: String,
//   parent_name: String,
//   content: String,
// };

import { Divider } from "antd";

export const SingleComment = ({ comment }) => {
  return (
    <>
      <div>
        <span className="font-bold">{comment.creator_name}</span>
        <span> : </span>
        <span>{comment.content}</span>
      </div>
    </>
  );
};
