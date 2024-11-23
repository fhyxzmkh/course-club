// const commit = {
//   _id: String,
//   creator_name: String,
//   parent_name: String,
//   content: String,
// };

export const SingleComment = ({ comment }) => {
  return (
    <div>
      <p>
        {comment.creator_name} : {comment.content}
      </p>
    </div>
  );
};
