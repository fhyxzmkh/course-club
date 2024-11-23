import { SingleUser } from "./SingleUser.jsx";

export const ChatList = (props) => {
  return (
    <>
      <h3 className="font-bold mb-4 text-2xl text-center">Open Chats</h3>
      {props.teamMembers.map((member, i) => {
        return (
          <SingleUser
            key={i}
            member={member}
            setActiveChat={props.setActiveChat}
            isActive={member.name === props.activeChat.recipient.name}
          />
        );
      })}
    </>
  );
};
