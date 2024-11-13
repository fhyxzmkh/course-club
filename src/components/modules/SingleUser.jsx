export const SingleUser = (props) => {
  return (
    <>
      <div
        className={`bg-white rounded-sm p-4 hover:bg-gray-200 active:bg-gray-300 ${
          props.active ? "bg-gray-300" : ""
        }`}
      >
        {props.member.name}
      </div>
    </>
  );
};
