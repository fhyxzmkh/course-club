const TEAM_CHAT = {
  _id: "TEAM_CHAT",
  name: "TEAM_CHAT",
};

export const SingleUser = (props) => {
  const currentRecipient = {
    _id: props.member.googleId,
    name: props.member.name,
  };

  const handleClick = (e) => {
    if (props.member._id == TEAM_CHAT._id) {
      props.setActiveChat({
        recipient: TEAM_CHAT,
        messages: [],
      });
    } else {
      props.setActiveChat({
        recipient: currentRecipient,
        messages: [],
      });
    }
  };

  return (
    <>
      <div
        className={`bg-white rounded-sm p-4 hover:bg-gray-200 ${
          props.isActive ? "bg-gray-400" : ""
        }`}
        onClick={handleClick}
      >
        {props.member.name}
      </div>
    </>
  );
};
