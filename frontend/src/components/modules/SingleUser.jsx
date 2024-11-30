import { Space } from "antd";
import { useEffect, useState } from "react";

const TEAM_CHAT = {
  _id: "TEAM_CHAT",
  name: "TEAM_CHAT",
};

export const SingleUser = (props) => {
  const [isHighlight, setIsHighlight] = useState(false);

  useEffect(() => {
    setIsHighlight(props.isActive);
  }, [props.isActive]);

  const currentRecipient = {
    _id: props.member.googleId,
    name: props.member.name,
  };

  const handleClick = (e) => {
    if (props.member._id === TEAM_CHAT._id) {
      if (isHighlight) {
        setIsHighlight(false);
      }

      props.setActiveChat({
        recipient: TEAM_CHAT,
        messages: [],
      });
    } else {
      if (isHighlight) {
        setIsHighlight(false);
      }

      props.setActiveChat({
        recipient: currentRecipient,
        messages: [],
      });
    }
  };

  return (
    <>
      <Space.Compact
        block
        className={`w-auto rounded-sm p-4 hover:bg-gray-100 ${
          isHighlight === true ? "bg-gray-300" : ""
        }`}
        onClick={handleClick}
      >
        {props.member.name}
      </Space.Compact>
    </>
  );
};
